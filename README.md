# Restaurant List Extention
A web application for listing favorite restaurant list with CRUD function

## Prerequisites
Make sure you have installed the following prerequisites:
- Node.js
- Dependencies - Make sure you've installed Node.js and npm first, then install depencies using npm:

$ npm install

## Initializing project
Make sure you've got all prerequisites, then initializing project by node using npm scripts:

$ npm run start

or initializing project by nodemon using:

$ npm run dev

Establish seed data:
$ npm run seed

## Features
### index page
- User can view all restaurants and their posters.  The list of restaurants is ordered by name
- User can click on either photo or name of a restaurant to access detail page
- User can create new restaurant and name it
- User can update selected restaurant
- User can delete restaurant from list
- User can upload file, and import mutil restaurants from one JSON file

### detail page
- User can read details of a selected restaurant
- User can access to create, update, delete, upload features from this page

### Specifications
- MongoDB
- Express
- Seed data: restaurant.json
- Using Bootstrap, RWD
- Error/exception handling
	- Error message pops up if user clicks button without selecting any target first
	- Confirm window pops up before deleting restaurant data
- The app has scalabilities to add more restaurants data