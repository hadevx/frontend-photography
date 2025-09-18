import { useGetAllCategoriesQuery } from "../../redux/queries/categoryApi";
import Reveal from "../../components/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
const CategoryList = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16 px-3">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Types of <span className="italic font-light">Photography</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Explore the different styles of photography we master, each capturing life, emotion,
              and story in every frame.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-3 px-3 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}>
          {categories?.map((product, index) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}>
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryList;
