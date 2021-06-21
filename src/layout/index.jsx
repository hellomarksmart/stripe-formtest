import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import '../styles/app.css'

export default function MainLayout({ lang, children }) {
  return (
    <div className="layout-container">
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang={lang} />
      </Helmet>
      {children}
    </div>
  );
}
