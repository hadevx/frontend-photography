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

function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategoryList />
      <Marquee />
      {/* <FeaturedProducts products={products} isLoading={isLoading} /> */}
      {/* <CollectionStrip /> */}
      {/* <MaterialsSection /> */}
    </Layout>
  );
}

export default Home;
