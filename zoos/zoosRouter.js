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
        res.status(500).json({ message: 'internal server error.'})
    })
})

router.get('/:id', (req, res) => {
    db(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal server error.'})
    })
})


router.post('/', (req, res) => {
    const post = req.body;
    db('zoos') 
    .insert(post, 'id')
    .then(result => {
        if (req.body.name.length === 0 || !req.body.name) {
            res.status(400).json({ message: 'Please provide a name'})
        } else {
            res.status(201).json(result)
        }
        
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal server error.'})
    })
})

router.put('/:id', (req, res) => {
    const post = { ...req.body };
    const id = req.params.id;

    db(id, post)
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal server error.'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db(id)
    .then(count => {
        if (count > 0){
            return res.status(200).json(count)
        } else {
            return res.status(404).json({ message: 'User not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Internal server error'})
    })
})


module.exports = router;