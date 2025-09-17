import Header from "./components/Header";
import Footer from "./components/Footer";
import clsx from "clsx";
import Header3 from "./components/Header3";

function Layout({ children, className }) {
  return (
    <>
      <div className={clsx("font-[Manrope] ", className && className)}>
        <Header3 />
        {children}
        <Footer />
      </div>
    </>
  );
}
/*      className="absolute inset-0 w-full h-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }} */
export default Layout;
