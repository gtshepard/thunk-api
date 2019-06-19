## RESTful API for Thunk (social media app - anonymous thought sharing)

#### USAGE 

- The REST Interface's availible endpoints are listed below in conjucntion with HTTP method needed to make a request to each endpoint 

##### User

###### get all users (GET)
- ```/api/v1/user/```
###### get user by id (GET)
- ```/ap1/v1/user/:userid```
###### create a user (POST)
- ```/api/v1/user```
###### update a user (PUT)
- ```/api/v1/user/:userid```
###### delete a user (DELETE)
- ```/api/v1/user/:userid```

##### Posts 

###### get all posts made by a specific user (GET)
- ```/api/v1/post/user/:userid```
###### get all posts within x miles of the users location (where x is the distance radius) (GET)
- ```/api/v1/post/user/:userid/:radius/:lat/:lng```
###### get number of likes for a post (GET)
- ```/api/v1/post/likes/post/:postid```
###### get number of dislikes for a post (GET)
- ```/api/v1/post/dislikes/post/:postid```
###### get all time best posts based on vote count (GET)
- ```/api/v1/post/best```
###### get all time worst posts based on vote count (GET)
- ```/api/v1/post/worst```
###### create a post for a user (POST)
- ```/api/v1/post/``` 
###### user likes a post (POST)
- ```/api/v1/post/likes/post/:postid/user/:userid```
###### user dislikes a post (POST)
- ```/dislikes/post/:postid/user/:userid```
###### update post by id (PUT)
- ```/api/v1/post/:postid``` 
###### delete post by id (DELETE)
- ```/api/v1/post/:postid``` 

##### Comment

###### get all comments (GET)
- ```/api/v1/comment/```
###### get all comments for a specific post (GET)
- ```/api/v1/comment/post/:postid```
###### get all comments for a specific user (GET)
- ```/api/v1/comment/user/:userid```
###### create a comment (POST)
- ```/api/v1/comment/```
###### update a comment by id (remember all attirbutes in requets body) (PUT)
- ```/api/v1/comment/:commentid```
###### delete a comment by id (POST)
- ```/api/v1/comment/:commentid```

##### Tag 

###### get all tags for a post 
- ```/api/v1/tag/post/:postid```
###### get all identical tags 
- ```/api/v1/tag/:tag```
###### create a tag for a post (POST)
- ```/api/v1/tag/post/:postid```

#### Coming soon 

##### Post 
###### get all posts with specific tag (GET)
###### get vote count for post 

##### Tag 
###### delete a tag (DELETE)
###### get trending tags (GET)
###### get number of occurences of a specific tag (GET)

an example call on when the server is running on the local machine. 
- http://localhost:3000/api/v1/users

(NOTE will need to specify) 
the HTTP method associated with the request with your code, for example if you are using  )
- axios.get('http://localhost:3000/api/v1/users')


### Tech Stack 
  - Node.js + Express + Sequelize + PostgreSQL
  
### How To Run This Program
  - verify Node is installed ``` npm -v ```
  - if not ```sudo apt install nodejs```
  - go to project dir 
  - ```npm init ```
  - then run ```npm install``` to install the latest dependencies.
  - then run ```nodemon app.js``` to start the server.  
  - make sure you have a relational database of your choice configured to run. 
  
- the api has the following endpoints (were the colon (:) denotes a parameter)
end points are grouped by the HTTP methods that can call them. 

