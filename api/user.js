const router = require('express').Router();
const {User} = require('../data_model/index');

router.get('/', (req, res, next) => {
    User.findAll().then((users) => res.status(201).json(users));
});

router.get('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => res.status(201).json(user));
});

router.post('/', (req, res, next) => {
    User.create(req.body).then((user) => res.status(201).json(user));
});

router.put('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => user.update(req.body)).then((updatedUser) => res.status(201).json(updatedUser));
});

router.delete('/:id', (req, res, next) => {
    User.destroy({
      where:{id: req.params.id}
    }).then((user) => res.status(201).json(user));
});

module.exports = router
