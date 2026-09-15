import Footer from "@/components/shared/Footer";
import LenisProvider from "@/components/shared/LenisProvider";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import WhatsAppFloat from "../../components/shared/WhatsAppFloat";
import BackToTop from "../../components/shared/BackToTop";
import CampaignAnnouncement from "@/components/shared/CampaignAnnouncement";
const layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {/* lenis provider off for devlopment purpose only */}
      {/* <LenisProvider> */}
      <CampaignAnnouncement />
      {children}
      {/* </LenisProvider> */}
      <Footer></Footer>

      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
};

export default layout;
