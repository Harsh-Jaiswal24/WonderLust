const Joi= require("joi");

module.exports.listingschema= Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        category:Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("",null)
    }).required()
});

module.exports.reviewschema=Joi.object({
    review: Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
    }).required()
});
