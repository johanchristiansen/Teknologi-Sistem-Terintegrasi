# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app/

# Expose port 80 for the FastAPI application
EXPOSE 80

# Define the command to run your FastAPI application
CMD ["uvicorn", "personality:app", "--host", "0.0.0.0", "--port", "80"]