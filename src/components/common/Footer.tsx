import { Link } from "@tanstack/react-router";
import GradientText from "./GradientText";

const Footer = () => {
  return (
    <footer className="w-full bg-black-1000 overflow-hidden">
      <div className="lg:p-10 lg:pt-10 pt-7 lg:pb-0">
        <div className="w-full max-w-[1440px] lg:px-5 mx-auto">
          <div className="w-full lg:flex items-center gap-10 xl:gap-[95px] lg:pb-6">
            <div className="lg:block flex items-center justify-between px-4 pb-7 lg:w-auto w-full">
              <img
                src="/fox-logo.png"
                className="xl:w-[98px] w-[68px]"
                alt="logo"
              />
              <Link
                to="."
                className="text-base font-inter lg:hidden block font-light text-white hover:underline transition duration-300"
              >
                Follow us on X
              </Link>
            </div>
            <ul className="flex-1 lg:flex items-center justify-between">
              <li className="lg:pb-0 pb-6 lg:border-0 border-b border-solid border-gray-1100/6 lg:text-left text-center">
                <Link
                  to="."
                  className="text-base font-inter font-light text-white hover:underline transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="lg:py-0 py-6 lg:border-0 border-b border-solid border-gray-1100/6 lg:text-left text-center">
                <Link
                  to="."
                  className="text-base font-inter font-light text-white hover:underline transition duration-300"
                >
                  Support
                </Link>
              </li>
              <li className="lg:py-0 py-6 lg:border-0 border-b border-solid border-gray-1100/6 lg:text-left text-center">
                <Link
                  to="."
                  className="text-base font-inter font-light text-white hover:underline transition duration-300"
                >
                  Follow us on X
                </Link>
              </li>
              <li className="lg:py-0 py-6 lg:border-0 border-b border-solid border-gray-1100/6 lg:text-left text-center">
                <Link
                  to="."
                  className="text-base font-inter font-light text-white hover:underline transition duration-300"
                >
                  Join our Discord
                </Link>
              </li>
            </ul>
            <div>
              <p className="text-base font-inter lg:pt-0 pt-6 font-light text-white lg:text-left text-center">
                All rights reserved. © 2025 Fox9
              </p>
            </div>
          </div>
        </div>
      </div>
      <GradientText
        title="Fox9 Crypto Fox"
        className="opacity-6 2xl:text-[180px] text-[45px] xs:text-[50px] md:text-8xl lg:text-[120px] xl:text-[150px] leading-[100%]"
      />
    </footer>
  );
};

export default Footer;
