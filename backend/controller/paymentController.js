const bookingModel = require("../model/bookingModel");
const carModel = require("../model/carModel");
const stripe = require("stripe")(process.env.STRIPE);

const pay = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.body._id);
    console.log(req.body.idCar.images[0]);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: req.body.idCar.model,
            },
            unit_amount: req.body.fullPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/Succ`,
      cancel_url: `http://localhost:5173/Cancel`,
    });
    console.log(booking);

    const car = await carModel.findById(booking.idCar);

    car.payed = true;
    await car.save();
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { pay };
