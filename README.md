# Recipeer

## Contents
- [What is Recipeer?](#what-is-recipeer)
- [Technologies Utilized](#technologies-utilized)
- [Setup](#setup)
- [Functionality](#functionality)
- [Future Goals](#future-goals)

<br></br>

# What is Recipeer?

Recipeer is a full-stack web application designed to fill the void when it comes to peer-to-peer recipe sharing. I strove to create a website where users can easily share their favorite recipes for others to discover. My inspiration for this app stems from my background as a line cook and passionate home cook. I aim to create an ecosystem of recipes driven by the end-user, rather than an accumulation of recipes curated by site editors. Anyone can create and post a recipe, complete with pictures, for others to discover and enjoy. Recipes are easily accessible, without the trudgery of scrolling past articles and blog posts to view them.

Regardless of cooking skill or experience, Recipeer is designed ot be intuitive, robust, and full-featured to satisfy a wide variety of discerning users. 

<img src=https://i.imgur.com/qYfhxvS.png alt=splash-image width=100%>

<br></br>

# Technologies Utilized

- Python
- Flask
- SQLAlchemy
- PostgresQL
- JavaScript
- Node.js
- React
- Redux
- HTML/CSS
- Docker
- AWS S3

<br></br>

# Setup

1. Clone this repostory
2. Install backend dependencies

```bash
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

3. Create an `.env` file based on the `.env.example` file
4. Create PostgresQL user and database matching `DATABASE_URL` in `.env`
5. Enter virtual environment to upgrade and seed database, then start flask application

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

6. In the `/react-app/` directory, install the npm dependencies and start the backend server

```bash
npm install
npm start
```

<br></br>

# Functionality

## Users
- Users can register and login to use Recipeer
- Users can edit their account information on their profile page

<br></br>

### Sign-Up Form
<img src=https://i.imgur.com/KAB36K6.png alt=sign-up width=100%>

<br></br>

## Recipes, Ingredients, and Instructions
- Users can create recipes with a title, cook time, difficulty and attributes/types
  - Attributes are related to dietary concerns
  - Types are indicative of type of meal, i.e. entree, snack, dessert, etc.
- Users can add a variable number of ingredients and instructions
  - Ingredients are created using a quantity, unit of measurement, and ingredient name
  - Instructions are ordered and created using a texarea input for the full instruction step
    - Each instruction can have a picture uploaded with it
- Users can edit their own recipes by toggling "edit mode" to:
  - Alter recipe details
  - Delete recipe
  - Add/edit/remove ingredients
  - Add/edit/remove instructions
  - Add/remove pictures
- Users can rate recipes out of 5 stars on each recipe page

<br></br>

### Create recipe
<img src=https://i.imgur.com/9B0I029.png alt=create-recipe width=100%>

<br></br>

### View recipe page
<img src=https://i.imgur.com/XlxtO7a.png alt=recipe-page width=100%>

<br></br>

### Toggle edit-mode
<img src=https://i.imgur.com/NaVpJuG.png alt=toggle-edit width=100%>

<br></br>

### Edit recipe details
<img src=https://i.imgur.com/4fxN8du.png alt=edit-recipe-details width=100%>

<br></br>

### Edit recipe ingredient
<img src=https://i.imgur.com/93fbBkC.png alt=edit-ingredient width=100%>

<br></br>

### Add instruction
<img src=https://i.imgur.com/4qxWlmu.png alt=add-instruction width=100%>

<br></br>

### Upload picture
<img src=https://i.imgur.com/HuzZrlP.png alt=upload-image width=100%>

<br></br>
## Feedback/Ratings
- Users can post feedback on recipe pages
  - Users can edit their feedback
  - Users can delele their feedback

<br></br>

### Feedback Section
<img src=https://i.imgur.com/ngpmxOo.png alt=feedback-section width=100%>

<br></br>

# Future Goals
1. I will implement a Shopping List where User's can add recipe ingredients to their shopping list to easily compile a list of groceries to help plan out that special dinner
2. I will implement a detailed search/filter system to find recipes based on attributes, types, ingredients, and recipe titles.  I will use a custom string-matching algorithm to allow for partial/close matches to titles and ingredients and weight the relevance to aid in result sorting and display. 
3. I will implement a recipe recommendation algorithm to recommend recipes to users based on three main metrics:
   - Recommendations based on the User's rating history
   - Recommendations based on the currently viewed recipe
   - Recommendations based on the User's current session browsing history
4. I will implement user-defined tags to allow recipe creators more freedom in how their recipes are labeled and to aid in SEO
5. I will integrate Google Maps API to add a location attribute to users and/or recipes to help filter recipes based on regions. Users should be able to drop a pin anywhere in the world and view the most popular recipes in a given radius.  
