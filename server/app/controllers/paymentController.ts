import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { updatePaymentStatusService } from '../services/paymentService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    // merchant_id = process.env.PAYFAST_MERCHANT_ID,
    // secured_key = process.env.PAYFAST_SECURED_KEY,
    merchant_id = 102,
    secured_key = 'zWHjBp2AlttNu1sK',
    basket_id,
    trans_amount,
    currency_code,
  } = req.body;

  try {
    // Generate access token
    const tokenApiUrl =
      'https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken';

    const response = await axios.post(
      tokenApiUrl,
      new URLSearchParams({
        MERCHANT_ID: merchant_id,
        SECURED_KEY: secured_key,
        BASKET_ID: basket_id,
        TXNAMT: trans_amount,
        CURRENCY_CODE: currency_code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).json({ token: response.data.ACCESS_TOKEN });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
}

export const updatePaymentStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = (req as any)?.params;
    const { status } = req.body as any;
    const updatedPayment = await updatePaymentStatusService(id, status);
    res.status(200).json(updatedPayment);
  } catch (error) {
    next(error);
  }
};
