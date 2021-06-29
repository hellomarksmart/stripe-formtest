import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import InvoiceForm from '../components/InvoiceForm/InvoiceForm';

function TestProduct2() {
  return (
    <Layout lang="en">
      <div className="form-container">
        <Helmet title={`Test Service 2 | ${config.siteTitle}`} />
        <InvoiceForm />
      </div>
    </Layout>
  );
}

export default TestProduct2;
