# Steps for starting this application

# DOCKER

define your login .env file for mysql

you will need DB_USER="Your Username"
and DB_password="Your password"

docker compose up --build (to run and build it)
docker compose down (to stop and deconstruct)



# LOCAL
1. Start the client - naviate to BethelSocialMedia\bethel-social-client> 

- npm i
- npm run dev

2. Start the server

- open a new terminal, navigate to BethelSocialMedia\bethel-social-server>

- npm i
- node index.js - to start the server
- node db-init - to drop and repopulate the database

# About this project

Bethel College student organizations have no other way of contacting students except through email. Many students do not check their emails, or are too annoyed with the 
hundreds of emails a day to even bother looking at them. This basic social media will allow student organizations and students themselves to communicate events though text
and images, similar to popular social medias of today.

Security and accountability has been taken into account and serves a large role in development, each account registered on our site must be of @bethelks.edu origin. 
All posts are permanantly linked to the user's @bethelks account which will allow us to hold accounts who violate our terms or the school's terms accountable. 
