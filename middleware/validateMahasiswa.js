// import Joi from 'joi';

// const schema = Joi.object({
//     nama: Joi.string().min(3).required(),
//     nim: Joi.string().min(5).required(),
//     jurusan: Joi.string().min(3).required(),
// });

// module.exports = (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });
//     next();
// };
