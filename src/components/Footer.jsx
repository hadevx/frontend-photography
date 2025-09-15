import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-white/[0.02] p-10">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Footer Content */}

        {/* Bottom Section */}
        <motion.div
          className="pt-8 pb-4 border-t border-neutral-200 flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-500 text-center">
            <p>&copy; {currentYear} WebSchema. All rights reserved.</p>
            <div className="flex space-x-6">
              <p className="hover:text-neutral-700 transition-colors flex items-center gap-2">
                Designed by
                <a href="https://ws-opal-alpha.vercel.app/" target="_blank">
                  <motion.div
                    whileHover={{ scale: 0.95 }}
                    className="rounded-full select-none border-2 border-gray-400 hover:border-gray-900 size-9 flex justify-center items-center transition">
                    <div className="rounded-full hover:opacity-80 bg-gradient-to-r shadow-md from-zinc-600 to-zinc-800 text-white size-7 flex justify-center items-center font-semibold text-lg">
                      <img src={logo} alt="logo" width={"20px"} />
                    </div>
                  </motion.div>
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
