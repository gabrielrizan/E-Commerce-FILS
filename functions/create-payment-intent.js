
require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51L4k4oA9qUJiAiCqnqMgf7Y8GmOYSssQw0bw4yJqZAoCht8reN62NKRlrskL9UcDBBUn4iLTdLmqtneKD1dAFTVY00jYzsbuOP"
);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
