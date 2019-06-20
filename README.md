## RESTful API for Thunk (social media app - anonymous thought sharing)

### Table of Contents
1. [Usage](#usage)
2. [Endpoints](#endpoints)
    1.  [Auth](#auth)
    2.  [Thought](#thought)
    3.  [User](#user)
    4.  [Post](#post)
    5.  [Comment](#comment)
    6.  [Tag](#tag)
    7.  [Report](#report)
3. [Response and Request Format](#response-and-request-format)



## Usage
* * *
- The REST Interface's availible endpoints are listed below in conjunction with HTTP method needed to make a request to each endpoint
* * *

## Endpoints

* * *

### Auth

* * *
###### sign in with google (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/auth/google ```

###### logout (DELETE)
- ``` https://thunk-api-19.herokuapp.com/api/v1/auth/google/logout ```

* * *

### Thought 

* * *

###### get all thoughts (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/thought ```
###### get all thoughts for a specific user (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/thought ```
###### get all posts within x miles of the users location (where x is the distance radius) (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/thought/user/:userid/:radius/:lat/:lng```
###### get all time best thoughts (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/thought/best ```
###### get all time worst thoughts (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/thought/worst ```

* * *

### User

* * *

###### get all users (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/user/```
###### get user by id (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/user/:userid```
###### create a user (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/user```
###### update a user (PUT)
- ``` https://thunk-api-19.herokuapp.com/api/v1/user/:userid```
###### delete a user (DELETE)
- ``` https://thunk-api-19.herokuapp.com/api/v1/user/:userid```

* * *

### Post

* * *

###### get all posts (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post```
###### get all posts made by a specific user (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/user/:userid```
###### get all posts within x miles of the users location (where x is the distance radius) (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/user/:userid/:radius/:lat/:lng```
###### get number of likes for a post (GET)
- ```/api/v1/post/likes/post/:postid```
###### get number of dislikes for a post (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/dislikes/post/:postid```
###### get all time best posts based on vote count (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/best```
###### get all time worst posts based on vote count (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/worst```
###### create a post for a user (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/```
###### user likes a post (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/likes/post/:postid/user/:userid```
###### user dislikes a post (POST)
- ``` https://thunk-api-19.herokuapp.com/api/dislikes/post/:postid/user/:userid```
###### update post by id (PUT)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/:postid```
###### delete post by id (DELETE)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/:postid```

* * *

### Comment

* * *

###### get all comments (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/```
###### get all comments for a specific post (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/post/:postid```
###### get all comments for a specific user (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/user/:userid```
###### create a comment (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/```
###### update a comment by id (remember all attirbutes in requets body) (PUT)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/:commentid```
###### delete a comment by id (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/comment/:commentid```

* * *

### Tag

* * *

###### get all tags (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/ ``` 

###### get trending tags (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/ ``` 

###### get all tags for a post
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/post/:postid```

###### get all thoughts that contain a specific tag
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/post/:postid```

###### create a tag for a post (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/post/:postid```

* * *


### Report

* * *


### Response and Request Format


* * *

##### Example Responses

* * *

- all ```/thought``` endpoints return an array of thoughts. format of a thought is as follows 
``` json 
      {
             "user": {},
             "post":{},
             "comment":[],
             "count": 0,
             "tag":[]
      }
```
- the post field is a post object
- the commment array is an array of comment obejects.
- the tag array is an array of tag objects 

* * *

###### get all thoughts within x miles of the users location (where x is the distance radius) in order of most recent (GET)
- ```axios.get(`https://thunk-api-19.herokuapp.com/api/v1/thought/user/1/23/40.730876/-73.992002`)```

```json 
[
    {
        "user": {
            "id": 3,
            "google_id": "CCC",
            "distance_radius": 3,
            "createdAt": "2019-06-19T21:50:48.003Z",
            "updatedAt": "2019-06-19T21:50:48.003Z"
        },
        "post": {
            "id": 6,
            "text": "were hot dogs named after dogs, or were dogs named after hot dogs",
            "lattitude": 40.729753,
            "longitude": -73.99378,
            "report": "1",
            "createdAt": "2019-06-19T21:50:48.055Z",
            "updatedAt": "2019-06-19T21:50:48.055Z",
            "userId": 3
        },
        "comment": [],
        "vote": 0,
        "tag": []
    },
    {
        "user": {
            "id": 2,
            "google_id": "BBB",
            "distance_radius": 1,
            "createdAt": "2019-06-19T21:50:47.997Z",
            "updatedAt": "2019-06-19T21:50:47.997Z"
        },
        "post": {
            "id": 5,
            "text": "to think is to know, to know is to think",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T21:50:48.050Z",
            "updatedAt": "2019-06-19T21:50:48.050Z",
            "userId": 2
        },
        "comment": [],
        "vote": 0,
        "tag": []
    },
    {
        "user": {
            "id": 2,
            "google_id": "BBB",
            "distance_radius": 1,
            "createdAt": "2019-06-19T21:50:47.997Z",
            "updatedAt": "2019-06-19T21:50:47.997Z"
        },
        "post": {
            "id": 4,
            "text": "why is the sky blue?",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T21:50:48.044Z",
            "updatedAt": "2019-06-19T21:50:48.044Z",
            "userId": 2
        },
        "comment": [
            {
                "id": 3,
                "text": "YASSSSSSSSS",
                "report": 10,
                "markOwner": false,
                "createdAt": "2019-06-19T21:50:48.088Z",
                "updatedAt": "2019-06-19T21:50:48.088Z",
                "postId": 4,
                "userId": 1
            }
        ],
        "vote": 0,
        "tag": []
    },
    {
        "user": {
            "id": 2,
            "google_id": "BBB",
            "distance_radius": 1,
            "createdAt": "2019-06-19T21:50:47.997Z",
            "updatedAt": "2019-06-19T21:50:47.997Z"
        },
        "post": {
            "id": 3,
            "text": "my first time in new york wasssup?",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T21:50:48.038Z",
            "updatedAt": "2019-06-19T21:50:48.038Z",
            "userId": 2
        },
        "comment": [
            {
                "id": 4,
                "text": "get it",
                "report": 10,
                "markOwner": false,
                "createdAt": "2019-06-19T21:50:48.094Z",
                "updatedAt": "2019-06-19T21:50:48.094Z",
                "postId": 3,
                "userId": 2
            }
        ],
        "vote": 0,
        "tag": [
            {
                "id": 6,
                "tag": "myfirsttime",
                "createdAt": "2019-06-19T21:50:48.205Z",
                "updatedAt": "2019-06-19T21:50:48.205Z",
                "post_tags": {
                    "createdAt": "2019-06-19T21:50:48.214Z",
                    "updatedAt": "2019-06-19T21:50:48.214Z",
                    "tagId": 6,
                    "postId": 3
                }
            }
        ]
    }
]
```
* * *
