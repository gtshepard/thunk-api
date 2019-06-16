const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');
const geoSphere = require('spherical-geometry-js');


router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});

//get all posts made by a specific user
router.get('/user/:id', (req, res, next) => {
    Post.findAll({where:{userId:[req.params.id]}}).then((posts) => res.status(201).json(posts));
});

//get feed for a user (posts with in the location radius of the user)
router.get('/user/:id/:radius/:lat/:lng', (req, res, next) => {
  //55 clark st 40.697835, -73.993762
  //animoto  40.730876, -73.992002
  //wsq park 40.731091, -73.997318
  //nyu tish 40.729753, -73.993780
  //hunter college  40.768543, -73.964526
  //shanes 40.728273, -73.987688
  //boardwalk JShore: 40.393044, -74.013410
  function getMiles(i) {
    return i*0.000621371192;
  }

  Post.findAll().then((posts) => posts.filter((e) => (req.params.radius > getMiles(geoSphere.computeDistanceBetween({lat:e.lattitude ,lng: e.longitude}, {lat: req.params.lat, lng: req.params.lng}))))).then((p) => res.status(201).json(p));
});

router.get('/:hashTag', (req, res, next) => {
    Post.findAll({where: {
        hashTag: [req.params.hashTag]
    }}).then((posts) => res.status(201).json(posts));
});
// TODO: get posts by hashtag, also count the posts.
router.post('/', (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

module.exports = router;
