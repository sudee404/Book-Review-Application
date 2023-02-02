FROM python:alpine

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the code into the image
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Run the Django migrations
RUN python manage.py migrate

# Expose the port that the backend will listen on
EXPOSE 8000

# Start the backend
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
