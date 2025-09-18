import { useRef, useEffect } from "react";
import Layout from "../../Layout";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import {
  useGetLatestProductsQuery,
  useGetCategoriesTreeQuery,
} from "../../redux/queries/productApi";
import Product from "../../components/Product";
import ProductCategorySection from "../../components/ProductCategorySection";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import hero3 from "../../assets/images/hero3.webp";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import FeaturedProducts from "../../components/FeaturedProducts";
import { CollectionStrip } from "../../components/CollectionStripe";
import { MaterialsSection } from "../../components/MaterialSection";
import { HeroSection } from "../../components/HeroSection";
import CategoryList from "../category/CategoryList";
import Marquee from "../../components/Marquee";
import Carousel from "../../components/Carousel ";
import PlansList from "../plans/PlansList";
import Testimonals from "./../../components/Testimonals";
import HowItWorks from "../../components/HowItWorks";
import ActiveUsers from "../../components/ActiveUsers";
import FAQ from "../../components/FAQ";
import AddOns from "../../components/AddOns";
import Contact from "../../components/Contact";
import Test from "../../components/Test";
function Home() {
  return (
    <Layout>
      <HeroSection />
      {/* <PlansList /> */}
      <CategoryList />
      {/* <Test /> */}
      <Contact />
      <AddOns />
      <HowItWorks />
      <section className="home-quote-container">
        <div className="home-quote1">
          <span className="home-message">
            "Photography is not just about taking pictures; it’s about capturing the emotions, the
            stories, and the fleeting moments that define our lives.
          </span>
          <div className="home-author">
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDV8fGdpcmx8ZW58MHx8fHwxNjY0ODA5MjE1&amp;ixlib=rb-1.2.1&amp;w=200"
              className="home-avatar"
            />
            <span className="home-quote2">
              <span className="home-text125">—  Peter McPau</span>
              <span>, Founder and CEO, Active</span>
            </span>
          </div>
        </div>
      </section>
      <section className="home-statistics">
        <div className="home-container15 grid grid-cols-2 lg:grid-cols-4">
          <ActiveUsers caption="— Active users" statistic="3.5M"></ActiveUsers>
          <ActiveUsers caption="— Brands" statistic="50k"></ActiveUsers>
          <ActiveUsers caption="— Likes" statistic="250K"></ActiveUsers>
          <ActiveUsers caption="— Active leads" statistic="30M"></ActiveUsers>
        </div>
      </section>
      <Testimonals />
      <FAQ />
      {/* <Carousel /> */}
      {/* <Marquee /> */}
      {/* <FeaturedProducts products={products} isLoading={isLoading} /> */}
      {/* <CollectionStrip /> */}
      {/* <MaterialsSection /> */}
    </Layout>
  );
}

export default Home;
