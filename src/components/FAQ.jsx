import React, { useState } from "react";

const faqs = [
  {
    q: "What is sit amet, consectetur adipiscing elit, sed do?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Why is dolore magna aliqua excepteur sint?",
    a: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    q: "Is excepteur sint occaecat cupidatat non proident?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Who quasi architecto beatae vitae dicta sunt explicabo?",
    a: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
  },
  {
    q: "Is minim veniam quis nostrud exercitation ullamco laboris nisi?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="home-faq py-30">
      <div className="home-heading5 text-center mb-6">
        <h2 className="text-3xl lg:text-5xl font-black">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-5">Everything you need to know, all in one place.</p>
      </div>

      <div className="home-accordion max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`accordionContainer  rounded-lg  cursor-pointer transition `}
            onClick={() => toggleAccordion(index)}>
            <div className="home-header6 flex justify-between items-center">
              <span className="home-text213">— {faq.q}</span>
              <svg
                viewBox="0 0 1024 1024"
                className={`accordionIcon w-5 h-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}>
                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
              </svg>
            </div>
            {openIndex === index && (
              <div className="accordionContent mt-2 text-gray-600">
                <span className="home-text214">{faq.a}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
