const router = require("express").Router();
let Payment = require("../../models/payment/Payment.js");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
require("dotenv").config();
const crypto = require('crypto');
var nodemailer = require('nodemailer');
// const { User } = require("../../models/User/User.js");

router.route("/add").post((req,res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const token = crypto.randomBytes(48).toString('hex');

    const link = `http://localhost:3000/verify-payment/${token}`;
    
    var mailOptions = {
        from: 'realasia@gmail.com',
        to: 'chaminduimalsha@gmail.com',
        subject: 'Welcome to Movie App! You successfully created account.',
        text: 'That was easy!',
        html: `<p><em>To veirfy your account please click <a href="${link}" target="_blank" rel="noopener">Here</a>.</em></p>`
    };





    // const cardNo = req.body.cardNo;
    // const amount = req.body.amount;
    // const cvcNo = req.body.cvcNo;
    // const holderName = req.body.holderName;

    // const payment = new Payment({

    //     cardNo, amount, cvcNo, holderName

    // })

    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

            await new Payment({ ...req.body, verify: false, token: token }).save();
            res.status(201).send({ message: "Payment created successfully" });
        }
    });

    
})

router.route("/").get((req, res) => {
    Payment.find().then((payment) => {
        res.json(payment);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/verify/:token").post( async (req, res) => {
	try {
		
		let token = req.params.token;

		await Payment.findOneAndUpdate(
			{ token: token },
			{ verify: true },
			{}
		);		

		res.status(200).send({ message: "Payment successfull" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;