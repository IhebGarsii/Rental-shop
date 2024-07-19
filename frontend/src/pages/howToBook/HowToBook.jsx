import React from "react";
import filterScreenshot from "../../assets/filterScreenshot.png";
import howToBookCars from "../../assets/howToBookCars.png";
import mybooking from "../../assets/mybooking.png";
import carDetail from "../../assets/carDetail.png";
import "./howToBook.css";
function HowToBook() {
  return (
    <div className="HowToBook">
      <div className="top-how">
        <div className="top-how1">
          <div className="left-top">
            <p>
              Before you can reserve any car from our website, first you need to
              search for the perfect car for your trip. The reservation form is
              available on the car details page.
            </p>
            <p>Here are few ways to get to the car details page.</p>
          </div>
          <div className="right-top">
            <h3>EXTRA CHARGES</h3>
            <p>
              Please take note that different pick-up and its return location
              will incur the following additional charges (per way).
            </p>
          </div>
        </div>
        <div className="top-how2">
          <img src={filterScreenshot} alt="" />
          <img src={howToBookCars} alt="" />
          <img src={mybooking} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            repudiandae, eius ratione facere neque minus placeat error libero
            dolore id.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            repudiandae, eius ratione facere neque minus placeat error libero
            dolore id.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            repudiandae, eius ratione facere neque minus placeat error libero
            dolore id.
          </p>
        </div>
      </div>
      <hr />

      <br />

      <div className="bottom-how">
        <div className="how-detail">
          <div className="detail-expain">
            <h2>CAR DETAILS PAGE</h2>
            <p>
              More details about the car is displayed here. This is also where
              you can make the reservation for the car. Image on the right shows
              the page for Nissan Almera.
            </p>
            <p>
              Fill up the form on the right side by selecting the pick-up and
              drop-off location. You will also need to select the time and date.
              The estimated price is shown. Click “Book Now” to proceed.
            </p>
            <p>
              After clicking the button another form will now be displayed. This
              is the main reservation form.
            </p>
            <p>
              Please enter all of your details here and ways to contact and
              submit the form.
            </p>
          </div>
          <img src={carDetail} alt="" />
        </div>
        <div className="how-email">
          <h2>WAIT FOR OUR EMAIL</h2>
          <p>
            After filling up the form, we will check your application and
            confirm the prices. We will send you an email with the details. If
            you have any enquiries you may reply to our emails. Once everything
            has been agreed upon and based on what was agreed in the email, you
            need to pay the up-front payment to our bank account. The details
            are included in the email.
          </p>
        </div>

        <div className="how-steps">
          <div className="steps-container">
            <h3>RECEIVING THE CAR</h3>
            <p>
              Please be at the agreed pick-up location to receive your rented
              car. Our representative will be on-hand to meet you.
            </p>
          </div>
          <div className="steps-container">
            <h3>RETURNING THE CAR</h3>
            <p>
              The car will need to be returned at the agreed time and date. Our
              representative will be there to inspect and receive the car.
            </p>
          </div>
          <div className="steps-container">
            <h3>QUESTIONS?</h3>
            <p>
              Any questions? Please send us an email at NAME@EMAIL.COM or
              contact us via phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToBook;
