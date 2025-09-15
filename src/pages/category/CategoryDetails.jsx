import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlansByCategoryQuery } from "../../redux/queries/planApi";
import Layout from "../../Layout";
import { Typography, Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { CheckCircle } from "lucide-react";

function PricingCard({ planId, title, desc, price, duration, options, addOns }) {
  const navigate = useNavigate();
  return (
    <Card className="rounded-2xl border border-gray-100 shadow-md hover:shadow  transition-transform duration-300">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="!m-0 p-6 border-b border-gray-100 bg-gradient-to-tr from-gray-50 to-white rounded-t-2xl">
        <Typography variant="h6" color="blue-gray" className="capitalize font-bold mb-1">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal !text-gray-500 mb-2">
          {desc}
        </Typography>
        <Typography variant="small" className="text-xs uppercase tracking-wide text-gray-400">
          {duration}
        </Typography>

        <Typography variant="h3" color="blue-gray" className="!mt-4 flex items-end gap-1">
          <span className="text-4xl font-extrabold text-blue-600">{price.toFixed(3)} KD</span>
          <Typography as="span" className="self-end opacity-70 text-base font-medium">
            /session
          </Typography>
        </Typography>
      </CardHeader>
      <CardBody className="pt-6">
        {/* Features */}
        <ul className="flex flex-col gap-3 mb-6">
          {options.map((info, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-700">
              <span className="p-1 rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </span>
              <Typography variant="small" className="font-normal text-sm">
                {info}
              </Typography>
            </li>
          ))}
        </ul>

        {/* Add-ons */}
        {addOns?.length > 0 && (
          <div className="mb-6">
            <Typography variant="small" className="font-semibold text-gray-800 mb-3 block">
              Add-ons
            </Typography>
            <ul className="flex flex-col gap-2 text-gray-600 text-sm">
              {addOns.map((add, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{add.name}</span>
                  <span className="text-blue-500 font-medium">+{add.price.toFixed(3)} KD</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          fullWidth
          onClick={() => navigate(`/booking/${planId}`)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition">
          Book Now
        </Button>
      </CardBody>
    </Card>
  );
}

const PlansByCategory = () => {
  const { id } = useParams();
  const { data: plans, isLoading, isError } = useGetPlansByCategoryQuery(id);

  if (isLoading) return <Layout>Loading...</Layout>;
  if (isError) return <Layout>Error fetching plans.</Layout>;

  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Typography color="blue-gray" className="mb-2 font-bold text-sm uppercase tracking-wider">
            Photography Packages
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !leading-snug lg:!text-4xl !text-2xl font-extrabold">
            Choose the right plan for your special moments
          </Typography>
          <Typography variant="lead" className="mb-12 font-normal !text-gray-500 max-w-2xl mx-auto">
            Each package is crafted to give you the best photography experience.
          </Typography>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-6xl mx-auto">
            {plans?.map((plan) => (
              <PricingCard
                key={plan._id}
                title={plan.name}
                planId={plan._id}
                desc={plan.description}
                price={plan.discountedPrice}
                duration={plan.duration}
                options={plan.features || []}
                addOns={plan.addOns || []}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlansByCategory;
