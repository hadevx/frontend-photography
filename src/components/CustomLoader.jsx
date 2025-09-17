import { useEffect } from "react";
import "./customLoader.css";

const CustomLoader = () => {
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black z-50 relative inset-0 ">
      <div className="loader flex items-center flex-col md:flex-row">
        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
          <defs className="s-xJBuHA073rTt" xmlns="http://www.w3.org/2000/svg">
            <linearGradient
              className="s-xJBuHA073rTt"
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="b">
              <stop className="s-xJBuHA073rTt" stopColor="#973BED"></stop>
              <stop className="s-xJBuHA073rTt" stopColor="#007CFF" offset="1"></stop>
            </linearGradient>
            <linearGradient
              className="s-xJBuHA073rTt"
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="0"
              y1="64"
              x1="0"
              id="c">
              <stop className="s-xJBuHA073rTt" stopColor="#FFC800"></stop>
              <stop className="s-xJBuHA073rTt" stopColor="#F0F" offset="1"></stop>
              <animateTransform
                repeatCount="indefinite"
                keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                dur="8s"
                values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                type="rotate"
                attributeName="gradientTransform"></animateTransform>
            </linearGradient>
            <linearGradient
              className="s-xJBuHA073rTt"
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="d">
              <stop className="s-xJBuHA073rTt" stopColor="#00E0ED"></stop>
              <stop className="s-xJBuHA073rTt" stopColor="#00DA72" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>

        {/* First shape */}
        {/* W */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#c)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M8 8 L16 56 L32 24 L48 56 L56 8"
          />
        </svg>

        {/* E */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#c)" // <-- change to any gradient id defined in <defs>
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M52 8 H12 V56 H52 M12 32 H40"
          />
        </svg>

        {/* B */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#c)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M12 8 V56 H36 C48 56 48 40 36 40 H12 M36 40 C48 40 48 24 36 24 H12"
          />
        </svg>

        {/* S */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M48 12 C40 8 24 8 16 16 C8 24 24 28 32 32 C40 36 56 40 48 48 C40 56 24 56 16 52"
          />
        </svg>

        {/* C */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M52 16 C40 0 16 8 16 32 C16 56 40 64 52 48"
          />
        </svg>

        {/* H */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M12 8 V56 M52 8 V56 M12 32 H52"
          />
        </svg>

        {/* E */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M52 8 H12 V56 H52 M12 32 H40"
          />
        </svg>

        {/* M */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M12 56 V8 L32 32 L52 8 V56"
          />
        </svg>

        {/* A */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            stroke="url(#b)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dash"
            pathLength="360"
            d="M32 8 L12 56 H52 L32 8 M20 36 H44"
          />
        </svg>
      </div>

      {/* 🔹 Webschema text */}
    </div>
  );
};

export default CustomLoader;
