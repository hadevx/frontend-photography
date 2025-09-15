import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlansByCategoryQuery } from "../../redux/queries/planApi";
import Layout from "../../Layout";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

const PricingCard = ({ planId, title, desc, price, duration, options, addOns, featured }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`rounded-3xl p-8 ring-1 sm:p-10 shadow-lg flex flex-col justify-between transition-transform duration-300
        ${featured ? "bg-gray-800 ring-white/10" : "bg-white/80 ring-gray-200 hover:shadow-2xl"}`}>
      <h3 className={`text-2xl font-bold ${featured ? "text-indigo-400" : "text-gray-800"}`}>
        {title}
      </h3>
      <p className={`mt-4  ${featured ? "text-gray-300" : "text-gray-600"}`}>{desc}</p>
      <p className="mt-2  uppercase tracking-wide text--white">{duration}</p>

      <p className="mt-6 flex items-baseline gap-x-2">
        <span className={`text-4xl font-extrabold ${featured ? "text-white" : "text-blue-600"}`}>
          {price.toFixed(3)} KD
        </span>
        <span className="text-base font-medium self-end opacity-70">/session</span>
      </p>

      <ul className="mt-6 space-y-3">
        {options.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-gray-700">
            <CheckIcon className={`h-5 w-5 ${featured ? "text-indigo-400" : "text-green-600"}`} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate(`/booking/${planId}`)}
        className={`mt-8 w-full py-3 rounded-xl font-semibold text-white transition
          ${featured ? "bg-indigo-500 hover:bg-indigo-400" : "bg-blue-600 hover:bg-blue-500"}`}>
        Book Now
      </button>
    </motion.div>
  );
};

const PlansByCategory = () => {
  const { id } = useParams();
  const { data: plans, isLoading, isError } = useGetPlansByCategoryQuery(id);

  if (isLoading) return <Layout>Loading...</Layout>;
  if (isError) return <Layout>Error fetching plans.</Layout>;

  return (
    <Layout>
      <section className="relative py-20 px-6 ">
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
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-base font-semibold text-indigo-400 uppercase tracking-wide">
            Pricing
          </h2>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight  sm:text-5xl">
            Choose the right plan for your special moments
          </h1>
          <p className="mt-4 text-lg  max-w-2xl mx-auto">
            Each package is crafted to give you the best photography experience.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
    </Layout>
  );
};

export default PlansByCategory;
