import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="borter-t">
      <div className="container mx-auto text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>@ TODOS OS DIREITOS RESERVADOS | DANILO MATOS</p>

        <div className="flex items-center gap-4 justify-center text-2x1">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};
