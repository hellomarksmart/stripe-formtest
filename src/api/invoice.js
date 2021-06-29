import Stripe from 'stripe';
import { URL } from 'url';
import { toPascalCase } from '../services/tools';
import { getItem, putItem } from '../services/dynamo';

const stripe = new Stripe('sk_test_cSz6TMemJ9AZYnTAFjQOgFoE');
const TableName = 'CustomerStripe-Test';

const producePrice = {
  TestProduct1: 'price_1J2ND7IMN232eyijdJHa3T08',
  TestProduct2: 'price_1J2NFdIMN232eyijiW7XetCT',
};

const getCustomer = async (email) => {
  try {
    const customer = await getItem(TableName, { email });
    if (!customer) return undefined;
    return customer.stripe_id;
  } catch (error) {
    throw new Error(error);
  }
};

const createCustomer = async (request, lang) => {
  const customer = await stripe.customers.create({
    name: `${request.firstName} ${request.lastName}`,
    email: request.email,
    preferred_locales: [lang],
    phone: request.phone,
  });
  await putItem(TableName, {
    email: request.email,
    stripe_id: customer.id,
  });
  return customer.id;
};

export default async function invoiceHandler(req, res) {
  try {
    const urlOrigin = req.headers.referer;
    if (!urlOrigin) {
      return res.status(422).json({ error: 'Failed to process your request' });
    }
    const url = (new URL(urlOrigin).pathname).substring(1);
    const [lang, path] = url.split('/');

    const productKey = toPascalCase(path);

    let customer = await getCustomer(req.body.email);

    console.log('Customer 1', customer);
    if (!customer) {
      customer = await createCustomer(req.body, lang);
    }

    await stripe.invoiceItems.create({
      price: producePrice[productKey],
      customer,
    });

    const invoice = await stripe.invoices.create({
      customer,
      collection_method: 'send_invoice',
      days_until_due: 30,
    });

    await stripe.invoices.sendInvoice(invoice.id);

    return res.json(invoice);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: 'Failed to process your request' });
  }
}
