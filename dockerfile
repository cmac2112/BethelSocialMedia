# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

FROM node:18.0.0-alpine


WORKDIR /usr/src/app

COPY package*.json ./
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
COPY . .

RUN npm install

# Copy the rest of the source files into the image.

COPY db-init.js .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", "index.js"]
