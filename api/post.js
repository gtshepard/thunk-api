const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

//import axios from 'axios'
const geoSphere = require('spherical-geometry-js');
//const GOOGLE_MAPS_API_KEY = 'AIzaSyDC7gMlaQ697ieUiGtMpldPvrOqouEAoVg';
//const geo = require('https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&libraries=geometry');

router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});

//get all posts made by a specific user
router.get('/user/:id', (req, res, next) => {
    Post.findAll({where:{userId:[req.params.id]}}).then((posts) => res.status(201).json(posts));
});

//get feed for a user (posts with in the location radius of the user)
router.get('/user/:id/:radius/:lat/:lng', (req, res, next) => {

    //location of the user, long lat
    //location radius of user
    //location of a post
    //calculate distance between post and user and see if the post is <= to location radius
    //clark st 40.697835, -73.993762
  //animoto  40.730876, -73.992002
  //wsq park 40.731091, -73.997318
  //nyu tish 40.729753, -73.993780
  //hunter college  40.768543, -73.964526
  //shanes 40.728273, -73.987688
  //boardwalk JShore: 40.393044, -74.013410
  //  console.log(dis);

  //  let acceptableDistance = User.findByPk(req.params.id).distanceRadius;
    //console.log(user);
    //new google.maps.LatLng(-34, 151),
    //map.setCenter({lat: -34, lng: 151});
    //let distance = geo.spherical.computeDistanceBetween({lat: -34, lng: 151}, {lat: 32, lng: 150});
    //need distance
    //Post.findAll().then(() => console.log(dis)).then((posts) => res.status(201).json(posts));
    /**Post.findAll({
      where:{
        userId: [geoSphere.computeDistanceBetween({lat:40.697835, lng: -73.993762}, {lat: 40.730876 , lng: -73.992002})]
      }
  }).then((posts) => res.status(201).json(posts));
**/

  function getMiles(i) {
    return i*0.000621371192;
  }
  //console.log("DIST: ", getMiles(geoSphere.computeDistanceBetween({lat:40.393044, lng:-74.013410 }, {lat: 40.730876 , lng: -73.992002})));
  Post.findAll().then((posts) => posts.filter((e) => (req.params.radius > getMiles(geoSphere.computeDistanceBetween({lat:e.lattitude ,lng: e.longitude}, {lat: req.params.lat, lng: req.params.lng}))))).then((p) => res.status(201).json(p));

});

// TODO: get posts by hashtag, also count the posts.

router.post('/', (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

module.exports = router;
