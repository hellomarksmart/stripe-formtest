import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

function TestService2() {
	return (
		<Layout lang="es">
			<div className="about-container">
				<Helmet title={`Test Service 2 | ${config.siteTitle}`} />
			</div>
		</Layout>
	);
}

export default TestService2;
