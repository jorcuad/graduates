# graduates
Gratuates formation project in I4S

# Dependencies
Create a virtualenv to isolate our package dependencies locally

  virtualenv -p python3 env
  source env/bin/activate
  
  pip install --upgrade pip
  pip install django-cors-headers django djangorestframework
  
  cd server
  python manage.py runserver
