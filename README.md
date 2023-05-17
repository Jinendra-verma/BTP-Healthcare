# Installation steps

Assuming you have python and node installed 


# backend

pip install -r requirements.txt

cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# frontend

cd frontend
npm install
npm start

if above commands fail then uninstall node --> restart pc --> install v 19.9.0 of node --> repeat above steps