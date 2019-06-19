## RESTful API for Thunk (social media app - anonymous thought sharing)

#### USAGE

- The REST Interface's availible endpoints are listed below in conjunction with HTTP method needed to make a request to each endpoint

##### Auth

###### sign in with google (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/auth/google ```

###### logout (DELETE)
- ``` https://thunk-api-19.herokuapp.com/api/v1/auth/google/logout ```

##### Thoughts 

###### get all thoughts (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/thought ```
###### get all thoughts for a specific user (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/post/thought ```
###### get all posts within x miles of the users location (where x is the distance radius) (GET)
- ``` https://thunk-api-19.herokuapp.com/api/v1/thought/user/:userid/:radius/:lat/:lng```

##### User

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

##### Posts

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

##### Comment

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

##### Tag

###### get all tags for a post
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/post/:postid```
###### get all identical tags
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/:tag```
###### create a tag for a post (POST)
- ``` https://thunk-api-19.herokuapp.com/api/v1/tag/post/:postid```

#### Coming soon

##### Post
###### get all posts with specific tag (GET)
###### get vote count for post

##### Tag
###### delete a tag (DELETE)
###### get trending tags (GET)
###### get number of occurences of a specific tag (GET)

###### for POST requests creating a thought

``` 
{
      "text": "i've thunk, and heres my thought. i love this app"
      "lattitude": "40.748778" ,
      longitude: "-73.985643",
      report: "1"
} 
```

##### Example Responses

- all ```/thought``` endpoints return an array of thoughts. format of a thought is as follows 
``` json 
      {
             "post":{},
             "comment":[],
             "count": 0,
             "tag":[]
      }
```
- the post field is a post object
- the commment array is an array of comment obejects.
- the tag array is an array of tag objects 


###### get all thoughts within x miles of the users location (where x is the distance radius) in order of most recent (GET)
- ```axios.get(`https://thunk-api-19.herokuapp.com/api/v1/thought/user/1/23/40.730876/-73.992002`)```

```json 
[
    {
        "post": {
            "id": 6,
            "text": "were hot dogs named after dogs, or were dogs named after hot dogs",
            "lattitude": 40.729753,
            "longitude": -73.99378,
            "report": "1",
            "createdAt": "2019-06-19T20:07:12.183Z",
            "updatedAt": "2019-06-19T20:07:12.183Z",
            "userId": 3
        },
        "comment": [],
        "count": 0,
        "tag": []
    },
    {
        "post": {
            "id": 5,
            "text": "to think is to know, to know is to think",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T20:07:12.176Z",
            "updatedAt": "2019-06-19T20:07:12.176Z",
            "userId": 2
        },
        "comment": [],
        "count": 0,
        "tag": []
    },
    {
        "post": {
            "id": 4,
            "text": "why is the sky blue?",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T20:07:12.169Z",
            "updatedAt": "2019-06-19T20:07:12.169Z",
            "userId": 2
        },
        "comment": [
            {
                "id": 3,
                "text": "YASSSSSSSSS",
                "report": 10,
                "markOwner": false,
                "createdAt": "2019-06-19T20:07:12.220Z",
                "updatedAt": "2019-06-19T20:07:12.220Z",
                "postId": 4,
                "userId": 1
            }
        ],
        "count": 0,
        "tag": []
    },
    {
        "post": {
            "id": 3,
            "text": "my first time in new york wasssup?",
            "lattitude": 40.730876,
            "longitude": -73.992002,
            "report": "1",
            "createdAt": "2019-06-19T20:07:12.163Z",
            "updatedAt": "2019-06-19T20:07:12.163Z",
            "userId": 2
        },
        "comment": [
            {
                "id": 4,
                "text": "get it",
                "report": 10,
                "markOwner": false,
                "createdAt": "2019-06-19T20:07:12.228Z",
                "updatedAt": "2019-06-19T20:07:12.228Z",
                "postId": 3,
                "userId": 2
            }
        ],
        "count": 0,
        "tag": [
            {
                "id": 6,
                "tag": "myfirsttime",
                "createdAt": "2019-06-19T20:07:12.366Z",
                "updatedAt": "2019-06-19T20:07:12.366Z",
                "post_tags": {
                    "createdAt": "2019-06-19T20:07:12.378Z",
                    "updatedAt": "2019-06-19T20:07:12.378Z",
                    "tagId": 6,
                    "postId": 3
                }
            }
        ]
    }
]
```
