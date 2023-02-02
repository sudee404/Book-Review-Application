FROM node:lts-alpine
 
# Set the working directory
WORKDIR /app

# Copy the dependencies file and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the code into the image
COPY . .

# Build the frontend
RUN npm run build

# Expose the port that the frontend will listen on
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
