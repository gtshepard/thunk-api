## RESTful API for campus management.

### Tech Stack 
  - Node.js + Express + Sequelize + PostgreSQL
  
### How To Run This Program
  - verify Node is installed ``` npm -v ```
  - if not ```sudo apt install nodejs```
  - then run ```npm install``` to install the latest dependencies.
  - then run ```node app.js``` to start the server.  
  - make sure you have a relational database of your choice configured to run. 
  
- the api has the following endpoints (were the colon (:) denotes a parameter)
end points are grouped by the HTTP methods that can call them. 

#### POST (CREATE)
- ```/api/v1/users```
- ```/api/v1/posts```
- ```/api/v1/comments```

#### GET (READ)
- ```/api/v1/users```
###### get all posts for a user
- ```/api/v1/users/posts```

###### get all comments for a post 
- ```/api/v1/posts/:id/comments```
- ```/api/v1/users/:id/comments```

#### PUT (UPDATE)
- ```/api/v1/user/:id```
- ```/api/v1/post/:id```
- ```/api/v1/comments/:id```

#### DELETE (DELETE)
- ```/api/v1/user/:id```
- ```/api/v1/post/:id```
- ```/api/v1/comment/:id```

an example call on when the server is running on the local machine. 
- http://localhost:3000/api/v1/users

(NOTE will need to specify 
the HTTP method associated with the request with your code, for example if you are using  )
- axios.get('http://localhost:3000/api/v1/users')
