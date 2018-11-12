const error = require('restify-errors');
const Customer = require('../models/Customer');



module.exports = server => {

    // Get Record of Customer
    server.get('/customer', async (req, res, next) => {
        try {
            const customer = await Customer.find({});
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError());
        }
    });




    // get Single Customer by id
    server.get('/customer/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFOundError('No customer found'));
        }
    });


    // Post Data of cuStomer
    server.post('/customer', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError('Expects `application/json`'))
        }
        const { name, email, balance } = req.body;

        const customer = new Customer({ name, email, balance });
        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) { return next(new errors.InternalError(err.message)); }
    })



    //update
    server.put('/customers/:id', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}` ));}
    }
    );


    // Delete Customer
    server.del('/customers/:id',async (req, res, next) => {
            try { const customer = await Customer.findOneAndRemove({ _id: req.params.id});
                res.send(204);
                next();
            } catch (err) { return next( new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`)); }
        }
    );

    
};