const request = require('request');
const Payment = require('../models/Payment');

const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();

const secretKey = config.SECRET_KEY;

exports.pay = async (req, res) => {

    try {

        //Initialize payment

        const formData = {
            email: req.body.email,
            amount: parseInt(req.body.price) * 100,
        };

        formData.metadata = {
            fullName: req.body.name,
            // phoneNumber: '487ehwjehwjew',  TODO:// ADD PHONE NUMBER TO SIGNUP DETAILS OF ENTIRE APP
        };

        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            form: formData,
            headers: {
                authorization: 'Bearer ' + secretKey,
            },
        };

        //Make the request
        request.post(options, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                const responseData = JSON.parse(body);
                const { authorization_url } = responseData.data;
                res.status(200).json({ url: authorization_url });
            }
        });
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.verify = async (req, res) => {

    try {

        // Verify Payment
        // I need the reference automatically after initialization and it can be accessed as req.query.reference
        //I should set this route in my paystack dashboard

        const userReferenceFromInitializePayment = req.query.reference;
        const options = {
            url:
                'https://api.paystack.co/transaction/verify/' +
                encodeURIComponent(userReferenceFromInitializePayment),
            headers: {
                authorization: 'Bearer ' + secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache',
            },
        };
        request.get(options, async (err, response, body) => {
            if (err) {
                console.log('Error occured', err);
            } else {
                const resData = JSON.parse(body);

                //Divide the amount by 100 to get the actual amount paying;
                const amount = resData.data.amount / 100;
                const { reference } = resData.data;
                const { fullName } = resData.data.metadata;

                //Save to the database
                const newPayment = new Payment({ fullName, amount, reference });
                await newPayment.save();
                res.redirect(`/payment-success/${newDonation._id}`);
            }
        });
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.receipt = async (req, res) => {

    try {
        const userId = req.params.id;
        const user = await Payment.findById(userId);
        //Redirect to UI
        res.status(200).json({ user: user });
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}
