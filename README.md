## RESTful API for campus management.

### Tech Stack 
  - Node.js + Express + Sequelize + PostgreSQL
  
### How To Run This Program ?
  - verify Node is installed ``` npm -v ```
  - if not ```sudo apt install nodejs```
  - then run ```npm install``` to install the latest dependencies.
  - then run ```node app.js``` to start the server.  
  
- the api has the following endpoints (were the colon (:) denotes a parameter)
end points are grouped by the HTTP methods that can call them. 

#### POST (CREATE)
- /api/v1/campuses/
- /api/v1/students/

#### GET (READ)
- /api/v1/campuses 
- /api/v1/campuses/:id
- /api/v1/students
- /api/v1/students/:id

#### PUT (UPDATE)
- /api/v1/campuses/:id
- /api/v1/students/:id

#### DELETE (DELETE)
- /api/v1/campuses/:id
- /api/v1/students/:id

an example call on when the server is running on the local machine. 
- http://localhost:3000/api/v1/campuses

(NOTE will need to specify 
the HTTP method associated with the request with your code, for example if you are using  )
- axios.get('http://localhost:3000/api/v1/campuses')
