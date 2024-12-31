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






