# BMC - Book My Conference

### Meeting Room Booking System


BMC is a MERN-based application for booking meeting/conference rooms. 


------
Make sure Node.js is installed in your system. If its not, kindly refer [here](https://nodejs.org/en/download/) to install for your OS.

You can download this project or git clone it by running from your terminal:

```
git clone http://github.com/Hrishikesh015/mrbs-se-project.git
```

Make sure that you are in the project folder:

```
ls
```

should yield you :
```
backend  frontend  package.json  package-lock.json  Procfile  README.md
```


Once it's downloaded, install all the dependencies for backend, by:
```
npm i
```

To install all the dependencies for frontend:
```
cd frontend
npm i
cd ..
```

Create a .env file:

Append these details to .env file:
```
NODE_ENV = development
PORT = 5000
MONGO_URI = 'YOUR MONGO URI STRING'
JWT_SECRET = ANY_SECRET_ALPHANUMERIC_STRING
```

Now, that the node modules are installed.

Initialize the database with:
```
node backend/seeder
```

We can now start the dev server (concurrenctly, client & server) by running:
```
npm run dev
```

The landing page will open at http://localhost:3000

-------------

Contributors:

Hrishikesh Koundinya [235hkoundinya@gmail.com](mailto:235hkoundinya@gmail.com) [Backend, Routes, API]<br/>
Jugulam Chethana Datta [chethandatta2@gmail.com](mailto:chethandatta2@gmail.com) [Frontend, Bug Testing]<br/>
Kshama Prasad [kshama.vorumbudi@gmail.com](mailto:kshama.vorumbudi@gmail.com) [SignIn, SignUp, Structuring]<br/>
Lenver Pinto [lenverpinto@gmail.com](mailto:lenverpinto@gmail.com) [Bug Testing, Meeting Room Screen, Meeting Room Route]

-------------

Technologies used:


MongoDB<br/>
Express.js<br/>
React.js<br/>
Node.js<br/>


