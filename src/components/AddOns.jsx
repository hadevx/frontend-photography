import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

export default function CuisineSelector({ addOns }) {
  const [selected, setSelected] = useState([]);

  const toggleCuisine = (cuisineName) => {
    setSelected((prev) =>
      prev.includes(cuisineName) ? prev.filter((c) => c !== cuisineName) : [...prev, cuisineName]
    );
  };

  return (
    <div className="">
      <motion.div
        className="flex flex-wrap gap-3 overflow-visible max-w-[600px]"
        layout
        transition={transitionProps}>
        {addOns?.map(({ name, price }) => {
          const isSelected = selected.includes(name);
          return (
            <motion.button
              key={name}
              onClick={() => toggleCuisine(name)}
              layout
              initial={false}
              animate={{
                backgroundColor: isSelected ? "#1d4ed8" : "rgba(39,39,42,0.06)", // subtle gray
              }}
              transition={{
                ...transitionProps,
                backgroundColor: { duration: 0.1 },
              }}
              className={`
                inline-flex  items-center px-4 py-2 rounded-full text-base font-bold
                whitespace-nowrap overflow-hidden ring-1 ring-inset
                ${isSelected ? "text-white ring-white" : "text-black ring-zinc-300"}
              `}>
              <motion.div
                className="relative flex items-center flex-row-reverse gap-2"
                animate={{
                  width: isSelected ? "auto" : "100%",
                  paddingRight: isSelected ? "1.5rem" : "0",
                }}
                transition={{
                  ease: [0.175, 0.885, 0.32, 1.275],
                  duration: 0.3,
                }}>
                <span>{name}</span>
                <span className={` ${isSelected ? "text-white" : "text-black"}`}>
                  ({price.toFixed(3)} KD)
                </span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={transitionProps}
                      className="absolute right-0">
                      <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                        <Check className="w-3 h-3 text-blue-700 " strokeWidth={4} />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
