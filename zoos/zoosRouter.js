const knex = require('knex');

const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.status(500).json({ message: 'internal server error'})
    })
})




module.exports = router;