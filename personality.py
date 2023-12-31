# Library
from typing import List
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class PersonalityItem(BaseModel):
    Nama: str
    Id: int
    Umur: int
    Pekerjaan: str
    Deskripsi_Kepribadian: List[str]
    Kombinasi_Fragrance: List[str]

class UpdatePersonalityDescription(BaseModel):
    Nama: str
    Deskripsi_Kepribadian: List[str]

class UserRegistration(BaseModel):
    username: str
    password: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret Key for JWT
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Token Security
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception

personality_json_filename = "personality.json"

with open(personality_json_filename , "r") as read_file:
    personality_data = json.load(read_file)

notes_json_filename = "notes.json"
with open(notes_json_filename, "r") as read_file:
    notes_data = json.load(read_file)

def verify_user_credentials(username: str, password: str):
    with open("users.json", "r") as users_file:
        users_data = json.load(users_file)
        for user in users_data["users"]:
            if user["username"] == username and user["password"] == password:
                return True
    return False

@app.get("/")
async def read_item():
    return {"Message": "Welcome to CusGan"}

@app.get('/personality')
async def read_all_personality(current_user: dict = Depends(get_current_user)):
    return personality_data['personality']

@app.get('/notes')
async def read_all_notes(current_user: dict = Depends(get_current_user)):
    return notes_data['notes']

@app.get('/personality/{item_id}')
async def read_personality(item_id: int, current_user: dict = Depends(get_current_user)):
    for person in personality_data['personality']:
        if person['Id'] == item_id:
            return person
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )

@app.post('/personality')
async def add_personality(
    item: PersonalityItem,
    current_user: dict = Depends(get_current_user)
):
    item_dict = item.dict()
    item_found = False

    # Update the Kombinasi_Fragrance based on Deskripsi_Kepribadian
    for desc in item_dict['Deskripsi_Kepribadian']:
        for note in notes_data['notes']:
            if note['Deskripsi_Kepribadian'] == desc:
                item_dict['Kombinasi_Fragrance'].append(note['Kombinasi_Fragrance'])

    for person in personality_data['personality']:
        if person['Id'] == item_dict['Id']:
            item_found = True
            return f"Person with Age {item_dict['Id']} exists."

    if not item_found:
        personality_data['personality'].append(item_dict)
        with open(personality_json_filename, "w") as write_file:
            json.dump(personality_data, write_file)

        return item_dict
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )


@app.post('/register')
async def register_user(
    registration_data: UserRegistration
):
    new_username = registration_data.username
    new_password = registration_data.password

    # Check if the username is already taken
    with open("users.json", "r") as users_file:
        users_data = json.load(users_file)
        for user in users_data["users"]:
            if user["username"] == new_username:
                raise HTTPException(
                    status_code=400, detail=f"Username {new_username} is already taken. Choose a different username."
                )

    # Add the new user to the users.json file
    new_user = {"username": new_username, "password": new_password}
    users_data["users"].append(new_user)
    with open("users.json", "w") as users_file:
        json.dump(users_data, users_file)

    return {"message": f"User {new_username} registered successfully."}


@app.put('/personality')
async def update_personality(
    item: PersonalityItem,
    current_user: dict = Depends(get_current_user)
):
    item_dict = item.dict()
    item_found = False
    for idx, person in enumerate(personality_data['personality']):
        if person['Id'] == item_dict['Id']:
            item_found = True
            personality_data['personality'][idx] = item_dict
            
            with open(personality_json_filename, "w") as write_file:
                json.dump(personality_data, write_file)
            return "updated"
    
    if not item_found:
        return "Person not found."
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )

@app.post('/update_personality_description')
async def update_personality_description(
    update_data: UpdatePersonalityDescription,
    current_user: dict = Depends(get_current_user)
):
    nama = update_data.Nama
    deskripsi_kepribadian = update_data.Deskripsi_Kepribadian

    # Find the user by name
    for person in personality_data['personality']:
        if person['Nama'] == nama:
            # Update the Deskripsi_Kepribadian for the user
            person['Deskripsi_Kepribadian'] = deskripsi_kepribadian

            # Update the Kombinasi_Fragrance based on Deskripsi_Kepribadian
            person['Kombinasi_Fragrance'] = []  # Clear existing values

            # Iterate through notes to find matching fragrances
            for desc in deskripsi_kepribadian:
                for note in notes_data['notes']:
                    if note['Deskripsi_Kepribadian'] == desc:
                        person['Kombinasi_Fragrance'].append(note['Kombinasi_Fragrance'])

            # Save the updated data to the JSON file
            with open(personality_json_filename, "w") as write_file:
                json.dump(personality_data, write_file)

            return {"message": f"Deskripsi Kepribadian for {nama} updated successfully.", "Kombinasi_Fragrance": person['Kombinasi_Fragrance']}

    raise HTTPException(
        status_code=404, detail=f'Person not found with the name: {nama}'
    )


@app.delete('/personality/{item_id}')
async def delete_personality(
    item_id: int,
    current_user: dict = Depends(get_current_user)
):
    item_found = False
    for idx, person in enumerate(personality_data['personality']):
        if person['Id'] == item_id:
            item_found = True
            personality_data['personality'].pop(idx)
            
            with open(personality_json_filename, "w") as write_file:
                json.dump(personality_data, write_file)
            return "updated"
    
    if not item_found:
        return "Person not found."
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    if verify_user_credentials(form_data.username, form_data.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": form_data.username}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
