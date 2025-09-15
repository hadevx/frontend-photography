import { motion } from "framer-motion";
import { Star } from "lucide-react"; // ⭐ import star icon
import Reveal from "./Reveal";

const reviews = [
  { name: "سارة م.", text: "تجربة رائعة! المصور جعلنا نشعر بالراحة التامة.", rating: 5 },
  { name: "خالد ر.", text: "الصور كانت مذهلة. أنصح بشدة بالتعامل معهم!", rating: 5 },
  { name: "ليلى أ.", text: "احترافية وإبداع. صور زفافي كانت مثالية.", rating: 4 },
  { name: "محمد ك.", text: "سهولة في الحجز وخدمة ممتازة من البداية للنهاية.", rating: 5 },
  { name: "أمل س.", text: "التقطوا لحظاتنا بشكل جميل جدًا. شكراً لكم!", rating: 5 },
];

export default function ReviewsMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      {/* Title */}
      <Reveal>
        <div className="text-center flex flex-col justify-center mb-16 px-3">
          <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
            Reviews of our <span className="italic font-light">Customers</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Join the tens of customers who enjoyed the experince
          </p>
        </div>
      </Reveal>

      {/* First row */}
      <motion.div
        className="flex gap-6 whitespace-nowrap mb-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}>
        {[...reviews, ...reviews].map((review, idx) => (
          <div
            key={`row1-${idx}`}
            className="lg:min-w-[320px] min-w-[260px] bg-white border border-gray-200 shadow-md rounded-2xl px-6 py-5 flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
            {/* Stars */}
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed italic">“{review.text}”</p>
            <span className="block mt-4 text-sm font-bold text-gray-900 text-right">
              – {review.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Second row (reverse direction) */}
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}>
        {[...reviews, ...reviews].map((review, idx) => (
          <div
            key={`row2-${idx}`}
            className="lg:min-w-[320px] min-w-[260px] bg-white border border-gray-200 shadow-md rounded-2xl px-6 py-5 flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
            {/* Stars */}
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed italic">“{review.text}”</p>
            <span className="block mt-4 text-sm font-bold text-gray-900 text-right">
              – {review.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
