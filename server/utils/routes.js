const Pets = require('../controllers/pets');

module.exports = function(app) {
    app.get('/pets', Pets.getAll);
    app.post('/pets', Pets.add);
    app.get('/pets/:_id', Pets.getOne);
    app.put('/pets/:_id', Pets.edit);
    app.delete('/pets/:_id', Pets.adopt);
}