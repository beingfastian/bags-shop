interface Payfast {
  PYAMENT_URL: string;
}

export const config = {
  payfast: {
    PYAMENT_URL:
      process.env.PAYFAST_PAYMENT_URL ||
      'https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction',
  } as Payfast,
};
