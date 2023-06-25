const Joi = require('joi');

const validateData = (req, res, next) => {
    const schema = Joi.object({
        limits: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1),
        order_by: Joi.string().valid('stock_ASC', 'stock_DESC', 'precio_ASC', 'precio_DESC'),
        precio_max: Joi.number().integer().min(12000),
        precio_min: Joi.number().integer().min(0),
        categoria: Joi.string().valid('collar', 'aros', 'anillo'),
        metal: Joi.string().valid('oro', 'plata')
    });
    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    next();
};

module.exports = { validateData };