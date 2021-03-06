# graduates
Gratuates formation project in I4S

# Dependencies

## Server
Create a virtualenv to isolate our package dependencies locally
```
  $ virtualenv -p python3 env
  $ source env/bin/activate
  
  $ pip install --upgrade pip
  $ pip install django-cors-headers djangorestframework-jwt django djangorestframework==3.4.7
  
  $ cd server
  $ python manage.py runserver
```
  
## Client
```   
   #To install necesary software 
   $ sudo apt-get install node
   $ sudo apt-get install npm
   $ sudo ln -s /usr/bin/nodejs /usr/bin/node
   
   #To install project dependencies
   $ sudo npm install -g gulp
   $ sudo npm install
   $ bower install
   
   #To init client server
   $ npm start
   #Fix problems with EACCES permission denied
   https://docs.npmjs.com/getting-started/fixing-npm-permissions
   
   1. Find the path to npm's directory
   $ npm config get prefix
   
   2. Change the owner of npm's directories to the name of the current user (your username!):
   $ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
   
   #If bower install doesn't work, run
   $ sudo apt-get remove node
   $ sudo apt-get autoremove
   $ sudo apt-get install nodejs-legacy

```
