import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlansByCategoryQuery } from "../../redux/queries/planApi";
import Layout from "../../Layout";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";
import CustomLoader from "../../components/CustomLoader";
const PricingCard = ({ planId, title, desc, price, duration, options, addOns, featured }) => {
  const navigate = useNavigate();
  console.log(options);
  return (
    <div className="home-card1 w-[100vw] lg:w-full shadow-[0_0_10px_rgb(255,255,255)]">
      <span className="home-text159">{title}</span>
      <span className=" mb-5 text-xl">{desc}</span>
      <span className=" text-4xl font-black mb-5 text-blue-700">{price.toFixed(3)} KD</span>
      <div className="home-get-started6 template-button hover:shadow-none  shadow-[0_0_10px_rgb(0,0,0)]">
        <span className="home-text161 " onClick={() => navigate(`/booking/${planId}`)}>
          Choose Plan
        </span>
      </div>
      <span className="home-text162">What&apos;s included</span>
      <div className="home-bullet-points1">
        {options.map((option) => (
          <div className="home-point10">
            <svg viewBox="0 0 877.7142857142857 1024" className="home-icon16">
              <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
            </svg>
            <span className="home-text163 text-xl">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlansByCategory = () => {
  const { id } = useParams();
  const { data: plans, isLoading } = useGetPlansByCategoryQuery(id);

  return (
    <Layout>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <section className="relative py-20  lg:px-6 home-pricing overflow-hidden">
          {/* Background gradient shape */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-12 mt-12">
            <h2 className="text-base font-semibold text-gray-200 uppercase tracking-wide">Plans</h2>
            <h1 className="mt-2 text-4xl text-white font-extrabold tracking-tight  sm:text-5xl">
              Choose the right plan for your special moments
            </h1>
            <p className="mt-4 text-lg  max-w-2xl mx-auto text-white">
              Each package is crafted to give you the best photography experience.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid gap-4 px-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {plans?.map((plan, idx) => (
              <PricingCard
                key={plan._id}
                planId={plan._id}
                title={plan.name}
                desc={plan.description}
                price={plan.discountedPrice}
                duration={plan.duration}
                options={plan.features || []}
                addOns={plan.addOns || []}
                featured={plan.featured || false}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PlansByCategory;
