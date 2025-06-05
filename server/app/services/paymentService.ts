// src/services/payment.service.ts
import axios from 'axios';
import crypto from 'crypto';
import { Payment } from '../models/index.js';
import { config } from '../config/index.js';
import { AppError } from '../utils/appError.js';
import { sendPaymentConfirmation } from '../utils/message.js';

// Type definitions
interface PaymentPayload {
  name?: string;
  orderId: string;
  amount: number;
  email: string;
}

interface PaymentResponse {
  payment: any;
  payload?: any;
}

interface AccessTokenResponse {
  ACCESS_TOKEN: string;
}

// Constants
const PAYFAST_API_URL = config.paymentGateway.apiBaseUrl;
const PAYFAST_ENDPOINTS = {
  getToken: `${PAYFAST_API_URL}/Transaction/GetAccessToken`,
};

// Utility functions
const computeSignature = (
  merchantId: string,
  basketId: string,
  txnAmt: number,
  currencyCode: string,
  secretKey: string
): string => {
  const stringToHash = `${merchantId}${basketId}${secretKey}${txnAmt}${currencyCode}`;
  return crypto.createHash('md5').update(stringToHash).digest('hex');
};

// Service functions
export const processPayment = async (
  method: string,
  amount: number,
  order_id: number,
  screenshot: string,
  transactionId: string,
  t: any
): Promise<PaymentResponse> => {
  try {
    const payment = (await Payment.create(
      {
        order_id,
        payment_method: method,
        amount,
        payment_status: 'pending',
        ...(screenshot ? { transfer_screenshot: screenshot } : {}),
        ...(transactionId ? { transaction_id: transactionId } : {}),
      },
      { transaction: t }
    )) as any;

    if (method === 'payfast') {
      const gatewayResponse = await getAccessToken({
        orderId: payment?.id.toString(),
        amount,
        email: 'ghayasudin999@gmail.com',
      });
      return {
        payment: payment.toJSON(),
        payload: gatewayResponse,
      };
    }
    return {
      payment: payment.toJSON(),
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error(
      `Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getAccessToken = async ({
  orderId,
  amount,
  email,
}: PaymentPayload): Promise<Record<string, any>> => {
  try {
    if (!orderId || !amount || !email) {
      throw new Error('Missing required payment parameters');
    }

    const params = new URLSearchParams({
      MERCHANT_ID: config.paymentGateway.merchantId,
      SECURED_KEY: config.paymentGateway.securedKey,
      BASKET_ID: orderId,
      TXNAMT: amount.toString(),
      CURRENCY_CODE: 'PKR',
    });

    const response = await axios.post<AccessTokenResponse>(
      PAYFAST_ENDPOINTS.getToken,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Node.js/PayFast Integration',
        },
        timeout: 10000,
      }
    );

    if (!response.data?.ACCESS_TOKEN) {
      throw new Error('Invalid response from payment gateway');
    }

    // Prepare payment payload
    // return {
    //   CURRENCY_CODE: 'PKR',
    //   MERCHANT_ID: config.paymentGateway.merchantId,
    //   MERCHANT_NAME: 'Maaoz Official Store',
    //   TOKEN: response.data.ACCESS_TOKEN,
    //   BASKET_ID: orderId,
    //   TXNAMT: amount,
    //   ORDER_DATE: new Date().toISOString(),
    //   SUCCESS_URL: config.paymentGateway.successUrl,
    //   FAILURE_URL: config.paymentGateway.failureUrl,
    //   CUSTOMER_EMAIL_ADDRESS: email,
    //   CUSTOMER_MOBILE_NO: '03320556186',
    // SIGNATURE: computeSignature(
    //   config.paymentGateway.merchantId,
    //   orderId,
    //   amount,
    //   'PKR',
    //   config.paymentGateway.securedKey
    // ),
    //   VERSION: 'MERCHANT-CART-0.1',
    //   TXNDESC: 'Item Purchased from Cart',
    //   PROCCODE: '00',
    //   TRAN_TYPE: 'ECOMM_PURCHASE',
    // };

    return {
      MERCHANT_ID: config.paymentGateway.merchantId?.toString(),
      MERCHANT_NAME: 'Maaoz Official Store',
      TOKEN: response.data.ACCESS_TOKEN,
      BASKET_ID: orderId,
      TXNAMT: amount?.toString(),
      CURRENCY_CODE: 'PKR',
      ORDER_DATE: new Date().toISOString(),
      SUCCESS_URL: 'http://localhost:3000/success',
      FAILURE_URL: 'http://localhost:3000/failure',
      CUSTOMER_EMAIL_ADDRESS: email,
      SIGNATURE: computeSignature(
        config.paymentGateway.merchantId,
        orderId,
        amount,
        'PKR',
        config.paymentGateway.securedKey
      ),
      TRAN_TYPE: 'ECOMM_PURCHASE',
      PROCCODE: '00',
    };
  } catch (error) {
    console.error('Payment gateway error:', error);
    throw new Error(
      `Payment gateway communication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const updatePaymentStatusService = async (
  id: string,
  status: string
) => {
  const payment = (await Payment.findByPk(id)) as any;
  if (!payment) throw new AppError('Payment not found', 400);
  payment.update({
    payment_status: status,
    ...(status === 'completed' ? { payment_date: new Date() } : {}),
  });

  await sendPaymentConfirmation({
    amount: payment?.amount,
    dashboardUrl: '',
    email: 'ghayasudin999@gmail.com',
    status,
    supportUrl: '',
  });

  console.log('first');
  return await payment.save();
};
