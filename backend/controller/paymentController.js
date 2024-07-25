const bookingModel = require("../model/bookingModel");
const stripe = require("stripe")(process.env.STRIPE);

const pay = async (req, res) => {
  console.log(
    "sssssssssssssssssssssssssssssssssssssssssssssss",
    req.body.idCar.images[0]
  );
  try {
    const booking = bookingModel.findById(req.body.idBooking);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: req.body.idCar.model,
              images: [
                //change the url when deploying http://localhost:4000/uploads/cars/${req.body.idCar.images[0]}
                `https://img.a.transfermarkt.technology/portrait/big/122374-1620936394.JPG?lm=1 `,
              ],
            },
            unit_amount: req.body.idCar.dailyRent * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/Succ`,
      cancel_url: `http://localhost:5173/Cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { pay };
