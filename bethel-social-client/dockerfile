FROM node:14

WORKDIR /app/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g http-server

CMD ["http-server", "dist", "-p", "8080", "--cors", "-c-1"]

EXPOSE 8080