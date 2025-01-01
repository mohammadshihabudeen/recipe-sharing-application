--Setting Up Django
pip install django
pip install djangorestframework
python -m django startproject myproject
cd myproject
python manage.py startapp recipes
Add the app to your project settings

--Setting Up React
npx create-react-app frontend
cd frontend
npm install axios

--Create and Apply Migrations
python manage.py makemigrations
python manage.py migrate

--creating API endpoints using Django REST Framework
Create a Serializer
Create API Views
Set Up URL Routing
Include the recipes URLs in the main project urls.py
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

--connecting the React frontend to the Django API using Axios
Set Up Axios
Create a Recipe Component
Update the App Component
npm start

--adding the functionality to create new recipes
Create a Recipe Form Component
Update the RecipeList Component
Test the Recipe Creation

--Steps to Fix CORS Issues
pip install django-cors-headers
Update Django Settings
Configure CORS
Restart Your Django Server

--adding the functionality to update and delete recipes
Update the RecipeList Component
Update the RecipeForm Component
Test the Update and Delete Functionality

--Adding image upload functionality for recipes
Update the Recipe Model
pip install Pillow
python manage.py makemigrations
python manage.py migrate
Update the Recipe Serializer
Update the Recipe Form Component
Display the Recipe Image

--Set Up User Authentication in Django
pip install djangorestframework-simplejwt
Update Django Settings
Create Authentication Views
include these URLs in your main urls.py file
--Update the React Frontend
Create an Authentication Service

--Adding user registration functionality will allow users to create their own accounts and manage their recipes
Update Django Settings
pip install django-allauth
Update URL Configuration
Create a Registration Serializer
Create Registration View
Update URL Configuration for Registration
Update the React Frontend

--Improving the styling and responsiveness of your application using material ui
npm install @mui/material @emotion/react @emotion/styled
Update all components




