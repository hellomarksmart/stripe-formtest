import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

function TestService1() {
	return (
		<Layout lang="es">
			<div className="about-container">
				<Helmet title={`Test Service 1 | ${config.siteTitle}`} />
			</div>
		</Layout>
	);
}

export default TestService1;
