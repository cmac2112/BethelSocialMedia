# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the frontend.
RUN node db-init.js
RUN npm run build:frontend

RUN ls -la /usr/src/app/bethel-social-client/dist

# Run the web service on container startup.
CMD ["node", "index.js"]

# Inform Docker that the container listens on port 3000.
EXPOSE 3000
