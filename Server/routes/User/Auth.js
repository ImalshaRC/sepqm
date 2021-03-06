const router = require("express").Router();
const { User } = require("../../models/User/User.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const crypto = require('crypto');
var nodemailer = require('nodemailer');

router.route("/find").post( async (req, res) => {
	try {
		const customer = await User.findOne({ email: req.body.email });
		if (!customer){
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
		else if(customer.verify != true){
			return res.status(401).send({ message: "Please check your email to verify." });
		}
		else{
			const validPassword = await bcrypt.compare(
				req.body.password,
				customer.password
			);
			if (!validPassword){
				return res.status(401).send({ message: "Invalid Email or Password" });
			}		
			
    		const token = crypto.randomBytes(48).toString('hex');
			// const token = user.generateAuthToken();
			res.status(200).send({ data: customer.firstName, message: "logged in successfully" });
		}	

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

router.route("/findname/:email").post( async (req, res) => {
	try {
		
		let Email = req.params.email;

		const user = await User.findOne({ email: Email });			

		res.status(200).send({ data: user._id, data2: user.email, data3: user.role, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.route("/verify/:token").post( async (req, res) => {
	try {
		
		let token = req.params.token;

		await User.findOneAndUpdate(
			{ token: token },
			{ verify: true },
			{}
		);		

		res.status(200).send({ message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.route("/forgotemail/:email").post( async (req, res) => {

	const pass = crypto.randomBytes(4).toString('hex');

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(pass, salt);

	try {

		let email = req.params.email;

		const user = await User.findOne({ email: email });
		if (!user){
			return res.status(409).send({ message: "Invalid Email. Please check your email again!" });
		}else{

			await User.findOneAndUpdate(
				{ email: email },
				{ password: hashPassword },
				{}
			);
	
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD
				}
			});
			
			var mailOptions = {
				from: 'realasia@gmail.com',
				to: req.body.email,
				subject: 'Your account details',
				html: `<p> Your password has been reset. Your new password is ${pass}. Please change your password after you login. You can do so by clicking on 'Edit your details' button.</p>`
			};
	
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
		}
		res.json(99);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

