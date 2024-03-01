# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app
# CMD ["python", "app.py"]
CMD ["gunicorn", "-k", "eventlet", "-w", "1", "--timeout", "600", "app:app", "-b", "0.0.0.0:5000"]