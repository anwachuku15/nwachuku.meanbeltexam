const mongoose = require('mongoose'),
           Pet = mongoose.model('Pet');


class Pets {
    getAll(req, res){
        Pet.find({}, (err, pets) => {
            if(err) { console.log(err); }
            res.json({status: 'ok', pets: pets});
        })
    }
    getOne(req, res){
        Pet.findOne({_id: req.params._id}, (err, pet) => {
            if(err) {console.log(err);}
            res.json({status: 'ok', pet: pet});
        })
    }
    add(req, res){
        let p = new Pet(req.body);
        p.save(err => {
            if(err){
                res.json({status: 'not ok', errors: err});
            } else {
                res.json({status: 'ok'});
            }
        });
    }
    edit(req, res){
        Pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err => {
            if(err) {
                res.json({status: 'not ok', errors: err});
            } else {
                res.json({status: 'ok'});
            }
        }); 
    }
    adopt(req, res){
        Pet.findOneAndDelete({_id: req.params._id}, err => {
            if(err) {console.log(err);}
            res.json({status: 'ok'});
        })
    }
}

module.exports = new Pets();