const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const renderBuyPage = async(req,res)=>{
    try {
        res.render('buy', {
            key: STRIPE_PUBLISHABLE_KEY,
            amount:25
         })

    } catch (error) {
        console.log(error.message);
    }
}

const payment = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Ensure this is in paise
            currency: 'INR',
            payment_method_types: ['card'], // Payment method
            receipt_email: req.body.stripeEmail, // Customer email
        });

        console.log('Payment Intent created:', paymentIntent);

        // Pass the Payment Intent client secret to the client
        res.json({
            clientSecret: paymentIntent.client_secret,
            successUrl: '/success',
            failureUrl: '/failure'
        });
    } catch (error) {
        console.error('Error during payment:', error);
        res.redirect("/failure");
    }
};



const success = async(req,res)=>{

    try {
        
        res.render('success');

    } catch (error) {
        console.log(error.message);
    }

}

const failure = async(req,res)=>{

    try {
        
        res.render('failure');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure
}