const { body, validationResult } = require('express-validator');

const validateUserOnRegistration = [
    body('user_name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one digit')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserOnLogin = [
    body('user_name').custom((value, { req }) => {
        if (!value && !req.body.email) {
            throw new Error('Either user name or email is required');
        }
        return true;
    }),
    // body('password').notEmpty().withMessage('Password is required')
    //     .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    //     .matches(/\d/).withMessage('Password must contain at least one digit')
    //     .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUserOnRegistration,
    validateUserOnLogin
};