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
### Index page
- Listing restaurants and their posters.  The list of restaurants is ordered by name
- Clicking on either photo or name of a restaurant to access Detail page
- Clicking on "Create" button brings you to New page to ceate a new restaurant and name it
- Clicking on "edit" button to update selected restaurant
- User can delete restaurant from list
- User can upload file, and import multi restaurants from one JSON file

### Detail page
- User can read details of a selected restaurant
- User can access to create, update, delete, upload features from this page

### New page
- Restaurant name and category are required for creating a new restaurant

### Specifications
- MongoDB
- Express
- Seed data: restaurant.json
- Using Bootstrap, RWD
- Using middleware, express routes
- Error/exception handling
	- Error message pops up if user clicks button without selecting any target first
	- Confirm window pops up before deleting restaurant data
	- Form input validation by bootstrap on browser and express on server end
- The app has scalabilities to add more restaurants data

