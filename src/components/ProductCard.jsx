import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log(product);
  return (
    <Link to={`/category/${product._id}`}>
      <motion.div
        className="group relative  overflow-hidden cursor-pointer"
        style={{ borderRadius: "24px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 50px" }}
        layout>
        {/* Badges */}

        {/* Product Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <img
              src={product?.image || "/placeholder.svg"}
              alt={product?.name}
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-sm lg:text-xl font-semibold text-white mb-1">{product?.name}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
