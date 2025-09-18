import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="home-how-it-works">
      <div className="home-centered-container3">
        <div className="home-heading2">
          <span className="home-text146">How it works</span>
          <span className="home-text147 title">
            Being social and getting leads has never been easier
          </span>
        </div>
        <div className="home-category3">
          <div className="home-headng1">
            <span className="home-text148">
              1 — Sign up
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>

            <div className="home-get-started5 template-button">
              <Link to="/login" className="home-text150">
                Get started
              </Link>
            </div>
          </div>
          <div className="home-container20">
            <img
              alt="pastedImage"
              src="/pastedimage-k5xi%201-1200w.png"
              className="home-pasted-image1"
            />
          </div>
        </div>
        <div className="home-row">
          <div className="home-category4">
            <div className="home-headng2">
              <span className="home-text151">2 — Choose Plan </span>
            </div>
            <img
              alt="pastedImage"
              src="/pastedimage-ibg-1200w.png"
              className="home-pasted-image2"
            />
          </div>
          <div className="home-category5">
            <div className="home-headng3">
              <span className="home-text153">3 — Place Reservation</span>
            </div>
            <img
              alt="pastedImage"
              src="/pastedimage-3c4o-1200w.png"
              className="home-pasted-image3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
