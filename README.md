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
- Listing restaurants and their posters.
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

### Upload file
- Click "Select File" button on top of page, choose a JSON file that you are going to upload and then click "Import Restaurant by JSON" button to import restaurants to database.  Using the JSON file format as following sample:

{
  "results": [
    {
      "id": 1,
      "name": "Sababa 沙巴巴中東美食",
      "name_en": "Sababa Pita Bar",
      "category": "中東料理",
      "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
      "location": "台北市羅斯福路三段 283 巷 17 號",
      "phone": "02 2363 8009",
      "google_map": "https://goo.gl/maps/BJdmLuVdDbw",
      "rating": 4.1,
      "description": "沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。"
    }
  ]
}

### Sorting
- User can sort and dislpay restaurants in selected order.  The available sorting methods include sorting by:
	- name in English
	- rating
	- category
	- location
- With searching restaurants by keyword, user can sort based on search results

### Specifications
- MongoDB
- Express
- Seed data: restaurant.json
- Using Bootstrap, RWD
- Using middleware, express routes
- Error/exception handling
	- Error message pops up if user enter empty keywords in search bar
	- Message pops up if there's no search results by user's keyword
	- Error message pops up if user upload and import none JSON file
	- Confirm window pops up before deleting restaurant data
	- Form input validation for create and edit function by bootstrap on browser and express on server end
- The app has scalabilities to add more restaurants data

