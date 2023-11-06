from typing import List
from fastapi import FastAPI, HTTPException
import json
from pydantic import BaseModel

class PersonalityItem(BaseModel):
    Nama: str
    Id: int
    Umur: int
    Pekerjaan: str
    Deskripsi_Kepribadian: List[str]
    Kombinasi_Fragrance: list

personality_json_filename = "personality.json"

with open(personality_json_filename , "r") as read_file:
    personality_data = json.load(read_file)

app = FastAPI()

@app.get("/")
async def read_item():
    return {"Message": "Welcome to CusGan"}

@app.get('/personality')
async def read_all_personality():
    return personality_data['personality']

@app.get('/personality/{item_id}')
async def read_personality(item_id: int):
    for person in personality_data['personality']:
        if person['Id'] == item_id:
            return person
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )

@app.post('/personality')
async def add_personality(item: PersonalityItem):
    item_dict = item.dict()
    item_found = False
    for person in personality_data['personality']:
        if person['Id'] == item_dict['Umur']:
            item_found = True
            return f"Person with Age {item_dict['Umur']} exists."
    
    if not item_found:
        personality_data['personality'].append(item_dict)
        with open(personality_json_filename, "w") as write_file:
            json.dump(personality_data, write_file)

        return item_dict
    raise HTTPException(
        status_code=404, detail=f'Person not found'
    )

@app.put('/personality')
async def update_personality(item: PersonalityItem):
    item_dict = item.dict()
    item_found = False
    for idx, person in enumerate(personality_data['personality']):
        if person['Id'] == item_dict['Umur']:
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

@app.delete('/personality/{item_id}')
async def delete_personality(item_id: int):
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
