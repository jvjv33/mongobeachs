const express = require('express');
const router = express.Router();

const beach = require('../models/beach');

router.get('/', async (req, res) => {
    try {
        res.send('Beach Works!\n\nUse:\n/search/all - To search all beachs.\n/search/id - To search a specified beach.\n/register/ - To register a new beach.\n/update/id - To update a specified beach.\n/delete/id - To delete a specified beach.');
    } catch (error) {
        res.status(400).send({ error: error});
    }
});

router.get('/search/all', async (req, res) => {
    try {
        const beachs = await beach.find();
        res.send({ beachs });
    } catch (error) {
        res.status(400).send({ error: 'Failed to list beachs'});
    }
});

router.get('/search/:id', async (req, res) => {
    const { id } = req.params.id;
    try {
        if(!await beach.findOne({ id })) return res.status(400).send({ error: 'Beach not exists!'});
        await beach.findById(req.params.id, function (error, data) {
            if(error) {console.log('Error:', error); res.status(400).send({ error: 'Failed to get beach.'});}
            res.send(data);
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Failed to get beach.'});
    }
});

router.post('/register', async (req, res) => {
    const { name } = req.body;
    try {
        if(await beach.findOne({ name })) return res.status(400).send({ error: 'Beach already exists!'});
        const beach_create = await beach.create(req.body);
        return res.send({beach_create});
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: 'Failed to register beach' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const beach_id = await beach.findById(req.params.id);
        if(beach_id == null) return res.status(400).send({ error: 'Beach not exists!'});
        await beach.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }, function (error, data) {
            if(error) console.log('Error:', error.message);
            if(data) res.send('Beach updated!');
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: 'Failed to update beach.'})
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const beach_id = await beach.findById(req.params.id);
        if(beach_id == null) return res.status(400).send({ error: 'Beach not exists!'});
        await beach.findByIdAndDelete(req.params.id, function (error, data) {
            if(error) console.log('Error:', error.message);
            if(data) res.send(data);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to delete beach.'});
    }
})
module.exports = app => app.use('/beach', router);
