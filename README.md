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

###### get all users
- ```/api/v1/users```
###### get user by id 
- ```/ap1/v1/users/:id```

###### get all posts with distance radius of a user 
- ```/api/v1/posts/user/:id/:radius/:lat/:lng```

###### get all comments
- ```/api/v1/comments```

#### GET (READ)

###### get all users
- ```/api/v1/users```
###### get all posts for a user
- ```/api/v1/users/posts```

###### get all comments for a post 
- ```/api/v1/posts/:id/comments```

###### get all comments for a user 
- ```/api/v1/users/:id/comments```

#### PUT (UPDATE)

###### update a user 
- ```/api/v1/user/:id```
###### update a post
- ```/api/v1/post/:id```'
###### update a comment
- ```/api/v1/comments/:id```

#### DELETE (DELETE)
###### delete a user 
- ```/api/v1/user/:id```

###### delete a post 
- ```/api/v1/post/:id```

###### delete a comment
- ```/api/v1/comment/:id```

an example call on when the server is running on the local machine. 
- http://localhost:3000/api/v1/users

(NOTE will need to specify) 
the HTTP method associated with the request with your code, for example if you are using  )
- axios.get('http://localhost:3000/api/v1/users')
