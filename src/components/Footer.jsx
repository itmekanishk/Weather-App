import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-white/20 py-4 text-center text-white/70 text-sm">
      © {new Date().getFullYear()} Weather Pro. All Rights Reserved to @itmekanishk
    </div>
  );
};

export default Footer;
