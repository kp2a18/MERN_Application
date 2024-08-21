const express = require('express')
const router = express.Router()
const User = require('../modles/User')
const { query, validationResult, body } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndhardworker$#";



router.post("/createuser",
    [body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            //res.json({ success: false });
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });


router.post("/loginuser", [body('email').isEmail(),
body('password', 'incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
        let userData = await User.findOne({ email: email });
        if (!userData) {
            console.log('User not found');
            return res.status(400).json({ errors: "Enter correct credentials" });
        }
        console.log('Stored hashed password:', userData.password);
        const pwdcompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdcompare) {
            console.log('Password comparison failed for email:', email);
            console.log('Entered password:', req.body.password);
            return res.status(400).json({ errors: "Enter correct credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error)
        //res.json({ success: false });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;


