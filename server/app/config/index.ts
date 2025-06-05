// src/config/index.ts
interface PaymentGatewayConfig {
  merchantId: string;
  securedKey: string;
  apiBaseUrl: string;
  successUrl: string;
  failureUrl: string;
}
interface MailConfig {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  FROM_EMAIL: string;
}
interface WEB {
  WEBSITE_URL: string;
}

export const config = {
  paymentGateway: {
    //TESTING
    // merchantId: process.env.PAYFAST_MERCHANT_ID || "24726",
    // securedKey: process.env.PAYFAST_SECURED_KEY || 'Z81Za-25pbJG28_EjDyaaKd',
    // PRODUCTION
    merchantId: process.env.PAYFAST_MERCHANT_ID || '24961',
    securedKey: process.env.PAYFAST_SECURED_KEY || 'vkia96BGsZukYFenT6FCdtAy',
    apiBaseUrl:
      process.env.PAYFAST_API_BASE_URL ||
      'https://ipg1.apps.net.pk/Ecommerce/api',
    successUrl:
      process.env.PAYFAST_SUCCESS_URL || 'http://localhost:3000/success',
    failureUrl:
      process.env.PAYFAST_FAILURE_URL || 'http://localhost:3000/failure',
  } as PaymentGatewayConfig,
  mail: {
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || 'maaozofficialstorehelp@gmail.com',
    SMTP_PASS: process.env.SMTP_PASS || 'rcxc tuas sspx hvuv',
    FROM_EMAIL: process.env.FROM_EMAIL || 'maaozofficialstorehelp@gmail.com',
  } as MailConfig,
  web: {
    WEBSITE_URL: process.env.WEBSITE_URL || 'https://maaozofficialstore.shop',
  } as WEB,
};
