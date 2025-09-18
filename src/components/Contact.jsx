import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ArrowRight, Mail, MapPin, Github, Twitter, Youtube } from "lucide-react";

export default function RevealBento() {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
      {/* <Logo /> */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4">
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
      </motion.div>
      <Footer />
    </div>
  );
}

const Block = ({ className, ...rest }) => (
  <motion.div
    variants={{
      initial: { scale: 0.5, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
    className={twMerge("col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6", className)}
    {...rest}
  />
);

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, We're WebSchema. <span className="text-zinc-400">We Make Iamges Part of Life</span>
    </h1>
    <a href="#" className="flex items-center gap-1 text-red-300 hover:underline">
      Contact me <ArrowRight size={20} />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-red-500 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-white">
        <Youtube size={32} />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-green-600 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-white">
        <Github size={32} />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 bg-zinc-50 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-black">
        <Mail size={32} />
      </a>
    </Block>
    <Block
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 bg-blue-500 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-white">
        <Twitter size={32} />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is Photography .{" "}
      <span className="text-zinc-400">
        I build primarily with modern photography techniques and digital tools. I love capturing
        moments so much that I even created a portfolio website to showcase my work. I've shared
        hundreds of tips, tutorials, and behind-the-scenes insights across Instagram, YouTube, and
        TikTok.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-full">
    <MapPin size={32} />
    <p className="text-center text-lg text-zinc-400">Kuwait</p>
  </Block>
);

const Logo = () => (
  <svg
    width="40"
    height="auto"
    viewBox="0 0 50 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto mb-12 fill-zinc-50">
    <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor="#000000"></path>
    <path
      d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
      stopColor="#000000"></path>
  </svg>
);

const Footer = () => (
  <footer className="mt-12">
    <p className="text-center text-zinc-400">Made with ❤️ </p>
  </footer>
);
