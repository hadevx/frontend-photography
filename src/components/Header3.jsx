import {
  ShoppingCart,
  Menu,
  X,
  Search as SearchIcon,
  User as UserIconSvg,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useGetCategoriesTreeQuery, useGetProductsQuery } from "../redux/queries/productApi";
import { useGetStoreStatusQuery } from "../redux/queries/maintenanceApi";

export default function Header({ onSearch }) {
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noProductFound, setNoProductFound] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);
  const { data: products = [] } = useGetProductsQuery();
  const { data: categoryTree } = useGetCategoriesTreeQuery();
  const { data: storeStatus } = useGetStoreStatusQuery();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  const menuRef = useRef();

  const handleClick = () => setClicked(!clicked);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClicked(false);
        setExpandedCategoryId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (clicked) document.body.classList.add("no-scroll");
    else {
      document.body.classList.remove("no-scroll");
      setNoProductFound(false);
      setExpandedCategoryId(null);
    }
  }, [clicked]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setNoProductFound(false);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const matchedProduct = products.find((product) =>
        product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      if (matchedProduct) {
        navigate(`/products/${matchedProduct._id}`);
        setClicked(false);
        setNoProductFound(false);
      } else setNoProductFound(true);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Recursive function to render nested categories (desktop)
  const renderCategoryTree = (categories) =>
    categories.map((cat) => (
      <div key={cat._id}>
        <Link
          to={`/category/${cat._id}`}
          onClick={() => setExpandedCategoryId(null)}
          className="block font-semibold text-gray-800 hover:text-rose-600">
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </Link>
        {cat.children?.length > 0 && (
          <ul className="mt-2 space-y-1 pl-4">{renderCategoryTree(cat.children)}</ul>
        )}
      </div>
    ));

  // Recursive function to render nested categories (mobile)
  const renderMobileCategoryTree = (categories) =>
    categories.map((cat) => (
      <div key={cat._id}>
        <Link
          to={`/category/${cat._id}`}
          onClick={() => setClicked(false)}
          className="block py-1 hover:text-rose-400">
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </Link>
        {cat.children?.length > 0 && (
          <ul className="pl-4 text-sm space-y-1">{renderMobileCategoryTree(cat.children)}</ul>
        )}
      </div>
    ));

  return (
    <>
      <motion.header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 p-2 md:p-0 border-b border-white/[0.02] transition-all duration-300",
          pathname === "/"
            ? isScrolled
              ? "bg-white/[0.02] text-black backdrop-blur-md"
              : "bg-white/[0.02] text-white "
            : "backdrop-blur-md ",
          pathname.startsWith("category") ? "text-white" : ""
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}>
        {storeStatus?.[0]?.banner?.trim() && (
          <div className="backdrop-blur-lg bg-rose-500 text-white text-center py-2 px-4 text-sm lg:text-base font-semibold break-words">
            {storeStatus[0].banner}
          </div>
        )}

        <div className="container-custom flex items-center justify-between h-12 lg:h-16 relative">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Link to="/" className="text-xl lg:text-2xl font-bold tracking-tight">
              WebSchema
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 w-[40%] justify-center relative">
            <Link to="/" className="text-sm font-medium hover:opacity-50">
              Home
            </Link>

            {/* Categories mega menu */}
            <div className="relative">
              <button
                onClick={() => setExpandedCategoryId((prev) => (prev === "all" ? null : "all"))}
                className="text-sm font-medium cursor-pointer hover:opacity-50 flex items-center space-x-1">
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedCategoryId === "all" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedCategoryId === "all" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-3 left-0 w-[700px] bg-white shadow-2xl rounded-lg border border-gray-200 p-6 grid grid-cols-3 gap-6 z-20">
                    {categoryTree && renderCategoryTree(categoryTree)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/about"
              className={clsx(
                "text-sm font-medium hover:opacity-50",
                pathname === "/about" && "text-rose-600"
              )}>
              About
            </Link>
            <Link
              to="/contact"
              className={clsx(
                "text-sm font-medium hover:opacity-50",
                pathname === "/contact" && "text-rose-600"
              )}>
              Contact
            </Link>
          </nav>

          {/* User & Cart */}
          <div className="hidden md:flex items-center space-x-6 justify-end">
            {userInfo ? (
              <Link to="/profile" className="flex items-center space-x-1 hover:opacity-50">
                <UserIconSvg className="h-5 w-5" /> {userInfo.name}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 bg-rose-500 shadow-[0_5px_10px_rgba(244,63,94,0.7)]  text-white py-2 hover:opacity-80 transition-all duration-300 rounded-lg">
                Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* User & Cart */}
            <div className="flex items-center space-x-6 justify-end">
              {userInfo ? (
                <Link to="/profile" className="flex items-center space-x-1 hover:opacity-50">
                  <UserIconSvg className="h-5 w-5" /> {userInfo.name}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-2 py-1  bg-rose-500 shadow-[0_0_10px_rgb(244,63,94)]  text-white  transition-all hover:opacity-80 rounded-lg">
                  Login
                </Link>
              )}
            </div>
            <button onClick={handleClick} className="p-2 rounded-md z-50">
              {clicked ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {clicked && (
              <motion.nav
                ref={menuRef}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gradient-to-tr min-h-screen from-zinc-900 to-zinc-700 fixed inset-0 z-40 text-zinc-50 py-24 px-6 text-lg flex flex-col gap-6">
                <Link
                  to="/"
                  onClick={() => setClicked(false)}
                  className="py-2 border-b border-rose-600">
                  Home
                </Link>

                {/* Mobile categories */}
                <div>
                  <button
                    onClick={() => setExpandedMobileCat((prev) => (prev === "all" ? null : "all"))}
                    className="flex items-center hover:opacity-50 gap-2">
                    Categories
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedMobileCat === "all" ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMobileCat === "all" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 flex flex-col gap-2">
                        {categoryTree && renderMobileCategoryTree(categoryTree)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/about"
                  onClick={() => setClicked(false)}
                  className="py-2 hover:opacity-50">
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setClicked(false)}
                  className="py-2 hover:opacity-50">
                  Contact
                </Link>

                <div className="mt-auto text-xs text-zinc-400 text-center">
                  <p>
                    Designed by <span className="font-bold">WebSchema</span>
                  </p>
                  <p>&copy; {new Date().getFullYear()} IPSUM Store. All rights reserved.</p>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
