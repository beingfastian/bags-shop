import { config } from '../config/index.js';
import { sendMail } from './mail.js';

export const sendPaymentConfirmation = async ({
    email,
    amount,
    status,
    dashboardUrl,
    supportUrl,
}) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    let badgeColor = '';
    let statusText = '';
    let icon = '';

    switch (status) {
        case 'completed':
            badgeColor = '#22C55E';
            statusText = 'Completed';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'pending':
            badgeColor = '#EAB308';
            statusText = 'Pending';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'failed':
            badgeColor = '#EF4444';
            statusText = 'Failed';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        default:
            badgeColor = '#CBD5E1';
            statusText = 'Unknown Status';
            icon = '';
            break;
    }

    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Payment Confirmation</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #F9FAFB;
                color: #1F2937;
                line-height: 1.5;
            }
            
            .wrapper {
                max-width: 640px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .container {
                background: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #1E40AF, #3B82F6);
                padding: 48px 0;
                text-align: center;
            }
            
            .logo {
                margin-bottom: 24px;
            }
            
            .content {
                padding: 32px;
            }
            
            .title {
                color: #111827;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 16px;
            }
            
            .subtitle {
                color: #6B7280;
                text-align: center;
                margin-bottom: 32px;
            }
            
            .info-box {
                background: #F9FAFB;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                padding: 24px;
                margin-bottom: 32px;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1px 1fr;
                gap: 24px;
                margin-bottom: 24px;
            }
            
            .divider {
                background: #E5E7EB;
            }
            
            .info-label {
                color: #6B7280;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .info-value {
                color: #111827;
                font-size: 20px;
                font-weight: 600;
            }
            
            .badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: ${badgeColor};
                color: white;
                padding: 8px 16px;
                border-radius: 9999px;
                font-size: 14px;
                font-weight: 500;
            }
            
            .button {
                display: inline-block;
                background: #2563EB;
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                text-align: center;
                transition: all 0.2s;
            }
            
            .button:hover {
                background: #1D4ED8;
            }
            
            .footer {
                background: #F9FAFB;
                border-top: 1px solid #E5E7EB;
                padding: 24px;
                text-align: center;
            }
            
            .footer-text {
                color: #6B7280;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .footer-link {
                color: #2563EB;
                text-decoration: none;
            }
            
            .copyright {
                color: #9CA3AF;
                font-size: 12px;
            }
            
            @media (max-width: 640px) {
                .wrapper {
                    padding: 12px;
                }
                
                .content {
                    padding: 24px;
                }
                
                .info-grid {
                    grid-template-columns: 1fr;
                }
                
                .divider {
                    display: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <div class="logo">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                </div>
                
                <div class="content">
                    <h1 class="title">Payment Status: ${statusText}</h1>
                    <p class="subtitle">Thank you for your payment. Your transaction is ${statusText.toLowerCase()}.</p>
                    
                    <div class="info-box">
                        <div class="info-grid">
                            <div>
                                <div class="info-label">Amount Paid</div>
                                <div class="info-value">$${amount}</div>
                            </div>
                            <div class="divider"></div>
                            <div>
                                <div class="info-label">Date & Time</div>
                                <div class="info-value">${date}</div>
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <span class="badge">
                                ${icon}
                                ${statusText}
                            </span>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${dashboardUrl}" class="button">View Payment Details</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p class="footer-text">
                        Need help? <a href="${supportUrl}" class="footer-link">Contact our support team</a>
                    </p>
                    <p class="copyright">© ${year} Your Brand. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

    try {
        await sendMail({
            to: email,
            subject: `Payment Confirmation for ${email}`,
            html: emailContent,
        });
    } catch (err) {
        console.log(err, 'mail error');
    }
};

// export const sendOrderStatusUpdate = async ({
//   email,
//   orderId,
//   status,
//   orderDetails,
//   shippingInfo,
//   dashboardUrl,
//   supportUrl,
// }) => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const date = currentDate.toLocaleDateString();
//   const time = currentDate.toLocaleTimeString();

//   let badgeColor = '';
//   let statusText = '';
//   let icon = '';

//   switch (status) {
//     case 'pending':
//       badgeColor = '#EAB308';
//       statusText = 'Pending';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     case 'confirmed':
//       badgeColor = '#22C55E';
//       statusText = 'Confirmed';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     case 'inprogress':
//       badgeColor = '#3B82F6';
//       statusText = 'In Progress';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     case 'delivered':
//       badgeColor = '#22C55E';
//       statusText = 'Delivered';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     case 'ontheway':
//       badgeColor = '#3B82F6';
//       statusText = 'On the Way';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     case 'cancelled':
//       badgeColor = '#EF4444';
//       statusText = 'Cancelled';
//       icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
//       break;
//     default:
//       badgeColor = '#CBD5E1';
//       statusText = 'Unknown Status';
//       icon = '';
//       break;
//   }

//   const emailContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <title>Order Status Update</title>
//         <style>
//             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//             }

//             body {
//                 font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                 background-color: #F9FAFB;
//                 color: #1F2937;
//                 line-height: 1.5;
//             }

//             .wrapper {
//                 max-width: 640px;
//                 margin: 0 auto;
//                 padding: 20px;
//             }

//             .container {
//                 background: white;
//                 border-radius: 8px;
//                 box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//                 overflow: hidden;
//             }

//             .header {
//                 background: linear-gradient(135deg, #1E40AF, #3B82F6);
//                 padding: 48px 0;
//                 text-align: center;
//             }

//             .logo {
//                 margin-bottom: 24px;
//             }

//             .content {
//                 padding: 32px;
//             }

//             .title {
//                 color: #111827;
//                 font-size: 24px;
//                 font-weight: 600;
//                 text-align: center;
//                 margin-bottom: 16px;
//             }

//             .subtitle {
//                 color: #6B7280;
//                 texttext-align: center;
//                 margin-bottom: 32px;
//             }

//             .info-box {
//                 background: #F9FAFB;
//                 border: 1px solid #E5E7EB;
//                 border-radius: 8px;
//                 padding: 24px;
//                 margin-bottom: 32px;
//             }

//             .info-grid {
//                 display: grid;
//                 grid-template-columns: 1fr;
//                 gap: 24px;
//                 margin-bottom: 24px;
//             }

//             .info-item {
//                 text-align: center;
//                 padding: 16px;
//                 background: white;
//                 border-radius: 6px;
//                 border: 1px solid #E5E7EB;
//             }

//             .info-label {
//                 color: #6B7280;
//                 font-size: 14px;
//                 margin-bottom: 8px;
//             }

//             .info-value {
//                 color: #111827;
//                 font-size: 20px;
//                 font-weight: 600;
//             }

//             .badge {
//                 display: inline-flex;
//                 align-items: center;
//                 gap: 8px;
//                 background: ${badgeColor};
//                 color: white;
//                 padding: 8px 16px;
//                 border-radius: 9999px;
//                 font-size: 14px;
//                 font-weight: 500;
//             }

//             .button {
//                 display: inline-block;
//                 background: #2563EB;
//                 color: white;
//                 text-decoration: none;
//                 padding: 12px 24px;
//                 border-radius: 6px;
//                 font-weight: 500;
//                 text-align: center;
//                 transition: all 0.2s;
//             }

//             .button:hover {
//                 background: #1D4ED8;
//             }

//             .footer {
//                 background: #F9FAFB;
//                 border-top: 1px solid #E5E7EB;
//                 padding: 24px;
//                 text-align: center;
//             }

//             .footer-text {
//                 color: #6B7280;
//                 font-size: 14px;
//                 margin-bottom: 8px;
//             }

//             .footer-link {
//                 color: #2563EB;
//                 text-decoration: none;
//             }

//             .copyright {
//                 color: #9CA3AF;
//                 font-size: 12px;
//             }

//             @media (max-width: 640px) {
//                 .wrapper {
//                     padding: 12px;
//                 }

//                 .content {
//                     padding: 24px;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="wrapper">
//             <div class="container">
//                 <div class="header">
//                     <div class="logo">
//                         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                             <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
//                             <line x1="3" y1="6" x2="21" y2="6"/>
//                             <path d="M16 10a4 4 0 01-8 0"/>
//                         </svg>
//                     </div>
//                      <h1 class="title">Order Status: ${statusText}</h1>
//                 </div>

//                 <div class="content">

//                     <p class="subtitle">Your order #${orderId} is now ${statusText.toLowerCase()}.</p>

//                     <div class="info-box">
//                         <div class="info-grid">
//                             <div class="info-item">
//                                 <div class="info-label">Order Payment</div>
//                                 <div class="info-value">Rs. ${orderDetails}</div>
//                             </div>

//                             <div class="info-item">
//                                 <div class="info-label">Shipping Information</div>
//                                 <div class="info-value" style="font-size: 16px;">${shippingInfo}</div>
//                             </div>

//                             <div class="info-item">
//                                 <div class="info-label">Status</div>
//                                 <div style="text-align: center;">
//                                     <span class="badge">
//                                         ${icon}
//                                         ${statusText}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div style="text-align: center;">
//                           <a href="${config?.web?.WEBSITE_URL + '/order-history/' + orderId}" class="button">Track Your Order</a>
//                       </div>
//                   </div>

//                   <div class="footer">
//                       <p class="footer-text">
//                           Need help? <a href="${config?.web?.WEBSITE_URL + '/contact'}" class="footer-link">Contact our support team</a>
//                       </p>
//                       <p class="copyright">© ${year} Your Brand. All rights reserved.</p>
//                   </div>
//             </div>
//         </div>
//     </body>
//     </html>
//   `;

//   try {
//     await sendMail({
//       to: email,
//       subject: `Order Status Update for Order #${orderId}`,
//       html: emailContent,
//     });

//     await sendMail({
//       to: config.mail.SMTP_USER,
//       subject: `Order Status Update for Order #${orderId}`,
//       html: emailContent,
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };




export const sendOrderStatusUpdate = async ({ email, orderId, status, orderDetails, shippingInfo, dashboardUrl, supportUrl, name = "" }) => {
    console.log("user..... ", name)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    let badgeColor = '';
    let statusText = '';
    let icon = '';
    switch (status) {
        case 'pending':
            badgeColor = '#EAB308';
            statusText = 'Pending';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'confirmed':
            badgeColor = '#22C55E';
            statusText = 'Confirmed';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'inprogress':
            badgeColor = '#3B82F6';
            statusText = 'In Progress';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'delivered':
            badgeColor = '#22C55E';
            statusText = 'Delivered';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'ontheway':
            badgeColor = '#3B82F6';
            statusText = 'On the Way';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        case 'cancelled':
            badgeColor = '#EF4444';
            statusText = 'Cancelled';
            icon = `<svg viewBox="0 0 24 24" fill="none" class="w-5 h-5"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            break;
        default:
            badgeColor = '#CBD5E1';
            statusText = 'Unknown Status';
            icon = '';
            break;
    }

    let emailContent


    if (statusText === 'Delivered') {
        emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Order Delivered</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background-color: #F9FAFB;
                    color: #1F2937;
                    line-height: 1.5;
                }
                
                .wrapper {
                    max-width: 640px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .container {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                
                .header {
                    background: linear-gradient(135deg, #047857, #10B981);
                    padding: 48px 0;
                    text-align: center;
                    color: white;
                }
                
                .logo {
                    margin-bottom: 24px;
                }
                
                .header-title {
                    font-size: 28px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                
                .header-subtitle {
                    font-size: 16px;
                    opacity: 0.9;
                }
                
                .content {
                    padding: 32px;
                }
                
                .message-box {
                    background: #F0FDF4;
                    border-left: 4px solid #10B981;
                    padding: 16px;
                    margin-bottom: 24px;
                    border-radius: 4px;
                }
                
                .title {
                    color: #111827;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }
                
                .info-box {
                    background: #F9FAFB;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    padding: 24px;
                    margin-bottom: 28px;
                }
                
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
                
                .info-item {
                    padding: 16px;
                    background: white;
                    border-radius: 6px;
                    border: 1px solid #E5E7EB;
                }
                
                .info-label {
                    color: #6B7280;
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                
                .info-value {
                    color: #111827;
                    font-size: 16px;
                    font-weight: 500;
                }
                
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #22C55E;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 9999px;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .button {
                    display: inline-block;
                    background: #10B981;
                    color: white;
                    text-decoration: none;
                    padding: 12px 32px;
                    border-radius: 6px;
                    font-weight: 500;
                    text-align: center;
                    transition: all 0.2s;
                }
                
                .button:hover {
                    background: #059669;
                }
                
                .footer {
                    background: #F9FAFB;
                    border-top: 1px solid #E5E7EB;
                    padding: 24px;
                    text-align: center;
                }
                
                .footer-text {
                    color: #6B7280;
                    font-size: 14px;
                    margin-bottom: 12px;
                }
                
                .footer-link {
                    color: #10B981;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .copyright {
                    color: #9CA3AF;
                    font-size: 12px;
                    margin-top: 16px;
                }
                
                @media (max-width: 640px) {
                    .wrapper {
                        padding: 12px;
                    }
                    
                    .content {
                        padding: 24px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <div class="logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                        <h1 class="header-title">Your Order Has Been Delivered!</h1>
                        <p class="header-subtitle">Thank you for shopping with us</p>
                    </div>
                    
                    <div class="content">
                        <div class="message-box">
                            <p>Dear ${name || 'Customer'},</p>
                            <p>We are pleased to inform you that your order #${orderId}  has been successfully delivered. Thank you for shopping with us. We look forward to serving you again.

                         Best regards,
                         MAAOZ Official Store.</p>
                        </div>
                        
                        <h2 class="title">Order Summary</h2>
                        
                        <div class="info-box">
                            <div class="info-grid">
                                <div class="info-item">
                                    <div class="info-label">Order ID</div>
                                    <div class="info-value">#${orderId}</div>
                                </div>
                                
                                <div class="info-item">
                                    <div class="info-label">Order Total</div>
                                    <div class="info-value">Rs. ${orderDetails}</div>
                                </div>
                                
                                <div class="info-item">
                                    <div class="info-label">Delivery Address</div>
                                    <div class="info-value">${shippingInfo}</div>
                                </div>
                                
                                <div class="info-item">
                                    <div class="info-label">Delivery Date</div>
                                    <div class="info-value">${date} at ${time}</div>
                                </div>
                                
                                <div class="info-item">
                                    <div class="info-label">Status</div>
                                    <div style="text-align: center; margin-top: 8px;">
                                        <span class="badge">
                                            <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" width="20" height="20">
                                                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Delivered
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                      
                    </div>
                    
                    <div class="footer">
                        <p class="footer-text">
                            We hope you love your purchase! If you have any questions about your order, please don't hesitate to reach out.
                        </p>
                         <p class="footer-text">
                          Need help? <a href="${config?.web?.WEBSITE_URL + '/contact'}" class="footer-link">Contact our support team</a>
                      </p>
                        <p class="copyright">© ${year} MAAOZ Official Store. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    else {
        emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Order Status Update</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #F9FAFB;
                color: #1F2937;
                line-height: 1.5;
            }
            
            .wrapper {
                max-width: 640px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .container {
                background: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #1E40AF, #3B82F6);
                padding: 48px 0;
                text-align: center;
            }
            
            .logo {
                margin-bottom: 24px;
            }
            
            .content {
                padding: 32px;
            }
            
            .title {
                color: #111827;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 16px;
            }
            
            .subtitle {
                color: #6B7280;
                texttext-align: center;
                margin-bottom: 32px;
            }
            
            .info-box {
                background: #F9FAFB;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                padding: 24px;
                margin-bottom: 32px;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 24px;
                margin-bottom: 24px;
            }
            
            .info-item {
                text-align: center;
                padding: 16px;
                background: white;
                border-radius: 6px;
                border: 1px solid #E5E7EB;
            }
            
            .info-label {
                color: #6B7280;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .info-value {
                color: #111827;
                font-size: 20px;
                font-weight: 600;
            }
            
            .badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: ${badgeColor};
                color: white;
                padding: 8px 16px;
                border-radius: 9999px;
                font-size: 14px;
                font-weight: 500;
            }
            
            .button {
                display: inline-block;
                background: #2563EB;
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                text-align: center;
                transition: all 0.2s;
            }
            
            .button:hover {
                background: #1D4ED8;
            }
            
            .footer {
                background: #F9FAFB;
                border-top: 1px solid #E5E7EB;
                padding: 24px;
                text-align: center;
            }
            
            .footer-text {
                color: #6B7280;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .footer-link {
                color: #2563EB;
                text-decoration: none;
            }
            
            .copyright {
                color: #9CA3AF;
                font-size: 12px;
            }
            
            @media (max-width: 640px) {
                .wrapper {
                    padding: 12px;
                }
                
                .content {
                    padding: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <div class="logo">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                    </div>
                     <h1 class="title">Order Status: ${statusText}</h1>
                </div>
                
                <div class="content">
                   
<p class="subtitle">
  ${statusText == "pending"
                ? `Dear ${name},
        Thank you for your order #${orderId}. Your order has been successfully placed and will be shipped soon. Our team will contact you shortly to confirm the order via call.`
                : `Dear ${name},
        Your order #${orderId} is now ${statusText.toLowerCase()}.`
            }
</p>
                    <div class="info-box">
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label"> Order Payment</div>
                                <div class="info-value">   Rs.    ${orderDetails}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Shipping Information</div>
                                <div class="info-value" style="font-size: 16px;">${shippingInfo}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-label">Status</div>
                                <div style="text-align: center;">
                                    <span class="badge">
                                        ${icon}
                                        ${statusText}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                          <a href="${config?.web?.WEBSITE_URL + '/order-history/' + orderId}" class="button">Track Your Order</a>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <p class="footer-text">
                          Need help? <a href="${config?.web?.WEBSITE_URL + '/contact'}" class="footer-link">Contact our support team</a>
                      </p>
                      <p class="copyright">© ${year} Your Brand. All rights reserved.</p>
                  </div>
            </div>
        </div>
    </body>
    </html>
  `;
    }
    try {


        //  console.log("email content",emailContent)
        await sendMail({
            to: email,
            subject: `Order Status Update for Order #${orderId}`,
            html: emailContent,
        });
        await sendMail({
            to: config.mail.SMTP_USER,

            subject: `Order Status Update for Order #${orderId}`,
            html: emailContent,
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
export const sendNewOrderEmail = async ({
    email,
    orderId,
    customerName,
    orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
}) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const orderDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Order Confirmation</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background-color: #F9FAFB;
                  color: #1F2937;
                  line-height: 1.5;
              }
              
              .wrapper {
                  max-width: 640px;
                  margin: 0 auto;
                  padding: 20px;
              }
              
              .container {
                  background: white;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              
              .header {
                  background: linear-gradient(135deg, #1E40AF, #3B82F6);
                  padding: 48px 0;
                  text-align: center;
                  color: white;
              }
              
              .logo {
                  margin-bottom: 24px;
              }
              
              .content {
                  padding: 32px;
              }
              
              .title {
                  color: #111827;
                  font-size: 24px;
                  font-weight: 600;
                  text-align: center;
                  margin-bottom: 16px;
              }
              
              .subtitle {
                  color: #6B7280;
                  text-align: center;
                  margin-bottom: 32px;
              }
              
              .section {
                  margin-bottom: 32px;
              }
              
              .section-title {
                  color: #111827;
                  font-size: 16px;
                  font-weight: 600;
                  margin-bottom: 16px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #E5E7EB;
              }
              
              .order-summary {
                  background: #F9FAFB;
                  border: 1px solid #E5E7EB;
                  border-radius: 8px;
                  padding: 24px;
                  margin-bottom: 32px;
              }
              
              .order-item {
                  display: flex;
                  justify-content: space-between;
                  padding: 12px 0;
                  border-bottom: 1px solid #E5E7EB;
              }
              
              .order-item:last-child {
                  border-bottom: none;
              }
              
              .item-details {
                  flex: 1;
              }
              
              .item-price {
                  color: #111827;
                  font-weight: 500;
              }
              
              .total-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 16px 0;
                  border-top: 2px solid #E5E7EB;
                  font-weight: 600;
                  color: #111827;
              }
              
              .info-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 24px;
              }
              
              .info-box {
                  background: #F9FAFB;
                  border: 1px solid #E5E7EB;
                  border-radius: 8px;
                  padding: 16px;
              }
              
              .info-label {
                  color: #6B7280;
                  font-size: 14px;
                  margin-bottom: 4px;
              }
              
              .info-value {
                  color: #111827;
                  font-weight: 500;
              }
              
              .button {
                  display: inline-block;
                  background: #2563EB;
                  color: white;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  font-weight: 500;
                  text-align: center;
                  transition: all 0.2s;
              }
              
              .button:hover {
                  background: #1D4ED8;
              }
              
              .footer {
                  background: #F9FAFB;
                  border-top: 1px solid #E5E7EB;
                  padding: 24px;
                  text-align: center;
              }
              
              .footer-text {
                  color: #6B7280;
                  font-size: 14px;
                  margin-bottom: 8px;
              }
              
              .footer-link {
                  color: #2563EB;
                  text-decoration: none;
              }
              
              .copyright {
                  color: #9CA3AF;
                  font-size: 12px;
              }
              
              @media (max-width: 640px) {
                  .wrapper {
                      padding: 12px;
                  }
                  
                  .content {
                      padding: 24px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="wrapper">
              <div class="container">
                  <div class="header">
                      <div class="logo">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                              <line x1="3" y1="6" x2="21" y2="6"/>
                              <path d="M16 10a4 4 0 01-8 0"/>
                          </svg>
                      </div>
                      <h1 style="font-size: 28px; margin-bottom: 8px;">Order Pending!</h1>
                      <p style="opacity: 0.9;">Thank you for shopping with us.</p>
                  </div>
                  
                  <div class="content">
                      <p class="subtitle">
                          Dear ${customerName || 'Customer'},<br>
                          Thank you for your order #${orderId}. Your order has been successfully placed and will be shipped soon. Our team will contact you shortly to confirm the order via call.
                      </p>
                      
                      <div class="section">
                          <h2 class="section-title">Order Summary</h2>
                          <div class="order-summary">
                              ${orderItems
            .map(
                (item) => `
                                <div class="order-item">
    <div class="item-details">
        <div style="font-weight: 500;">
            Product: ${item.name}
        </div>
        <div style="color: #6B7280; font-size: 14px;">
            Quantity: ${item.quantity}
        </div>
       
    </div>
</div>
                              `
            )
            .join('')}
                              
                              <div class="total-row">
                                  <span>Total Amount  :     </span>
                                  <span>    Rs. ${totalAmount}</span>
                              </div>
                          </div>
                      </div>
                      
                      <div class="section">
                          <h2 class="section-title">Order Details</h2>
                          <div class="info-grid">
                              <div class="info-box">
                                  <div class="info-label">Order Date</div>
                                  <div class="info-value">${orderDate}</div>
                              </div>
                              
                              <div class="info-box">
                                  <div class="info-label">Payment Method</div>
                                  <div class="info-value">${paymentMethod}</div>
                              </div>
                              
                              <div class="info-box">
                                  <div class="info-label">Shipping Address</div>
                                  <div class="info-value">${shippingAddress}</div>
                              </div>
                              
                          </div>
                      </div>
                      
                      <div style="text-align: center;">
                          <a href="${config?.web?.WEBSITE_URL + '/order-history/' + orderId}" class="button">Track Your Order</a>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <p class="footer-text">
                          Need help? <a href="${config?.web?.WEBSITE_URL + '/contact'}" class="footer-link">Contact our support team</a>
                      </p>
                      <p class="copyright">© ${year} Your Brand. All rights reserved.</p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;

    try {
        // Send email to customer
        await sendMail({
            to: email,
            subject: `Order Confirmation - #${orderId}`,
            html: emailContent,
        });

        // Send email to admin
        await sendMail({
            to: config.mail.SMTP_USER,
            subject: `New Order Received - #${orderId}`,
            html: emailContent,
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendOTPEmail = async ({
    email,
    otp,
    userName,
    validityMinutes = 10,
}) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Your OTP Code - MaaozOfficialStore</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #F3F4F6;
                  color: #1F2937;
                  line-height: 1.5;
              }
              
              .wrapper {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              
              .container {
                  background: white;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                             0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              
              .header {
                  background: linear-gradient(135deg, #4F46E5, #7C3AED);
                  padding: 40px 0;
                  text-align: center;
                  color: white;
              }
              
              .store-logo {
                  margin-bottom: 20px;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: 1px;
              }
              
              .content {
                  padding: 40px;
                  text-align: center;
              }
              
              .welcome-text {
                  color: #4F46E5;
                  font-size: 24px;
                  font-weight: 600;
                  margin-bottom: 16px;
              }
              
              .description {
                  color: #6B7280;
                  margin-bottom: 32px;
                  font-size: 15px;
              }
              
              .otp-container {
                  background: linear-gradient(to right, #F9FAFB, #F3F4F6);
                  border: 2px dashed #E5E7EB;
                  border-radius: 12px;
                  padding: 24px;
                  margin-bottom: 32px;
              }
              
              .otp-code {
                  font-size: 36px;
                  font-weight: 700;
                  letter-spacing: 8px;
                  color: #4F46E5;
                  background: white;
                  padding: 12px 24px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  display: inline-block;
                  margin-bottom: 16px;
              }
              
              .validity {
                  color: #EF4444;
                  font-size: 14px;
                  font-weight: 500;
              }
              
              .notice {
                  background: #EEF2FF;
                  border-radius: 8px;
                  padding: 16px;
                  margin-bottom: 32px;
                  text-align: left;
              }
              
              .notice-title {
                  color: #4F46E5;
                  font-weight: 600;
                  margin-bottom: 8px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
              }
              
              .divider {
                  height: 1px;
                  background: #E5E7EB;
                  margin: 32px 0;
              }
              
              .footer {
                  background: #F9FAFB;
                  padding: 24px;
                  text-align: center;
                  border-top: 1px solid #E5E7EB;
              }
              
              .social-links {
                  margin-bottom: 20px;
              }
              
              .social-link {
                  display: inline-block;
                  margin: 0 8px;
                  color: #4F46E5;
                  text-decoration: none;
              }
              
              .footer-text {
                  color: #6B7280;
                  font-size: 14px;
                  margin-bottom: 8px;
              }
              
              .address {
                  color: #9CA3AF;
                  font-size: 12px;
                  line-height: 1.6;
              }
              
              @media (max-width: 640px) {
                  .wrapper {
                      padding: 12px;
                  }
                  
                  .content {
                      padding: 24px;
                  }
                  
                  .otp-code {
                      font-size: 28px;
                      letter-spacing: 6px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="wrapper">
              <div class="container">
                  <div class="header">
                      <div class="store-logo">
                          ✨ Maaoz Official Store ✨
                      </div>
                      <p style="opacity: 0.9;">Your Fashion Destination</p>
                  </div>
                  
                  <div class="content">
                      <h1 class="welcome-text">Hi ${userName || 'Valued Customer'}! 👋</h1>
                      <p class="description">
                          Thank you for choosing MaaozOfficialStore. Please use the following OTP code to verify your account.
                      </p>
                      
                      <div class="otp-container">
                          <div class="otp-code">${otp}</div>
                          <p class="validity">Valid for ${validityMinutes} minutes only</p>
                      </div>
                      
                      <div class="notice">
                          <div class="notice-title">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="12" y1="8" x2="12" y2="12"/>
                                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                              </svg>
                              Important Notice
                          </div>
                          <ul style="color: #6B7280; font-size: 14px; padding-left: 20px;">
                              <li>Never share this OTP with anyone</li>
                              <li>Our team will never ask for your OTP</li>
                              <li>This OTP is valid for one-time use only</li>
                          </ul>
                      </div>
                      
                      <div class="divider"></div>
                      
                      <div style="color: #6B7280; font-size: 14px;">
                          <p>Didn't request this OTP?</p>
                          <p>Please ignore this email or contact our support team if you have concerns.</p>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <div class="social-links">
                          <a href="#" class="social-link">Facebook</a>
                          <a href="#" class="social-link">Instagram</a>
                          <a href="#" class="social-link">Twitter</a>
                      </div>
                      
                      <p class="footer-text">
                          © ${year} MaaozOfficialStore. All rights reserved.
                      </p>
                      
                      <div class="address">
                          MaaozOfficialStore
                      </div>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;

    try {
        await sendMail({
            to: email,
            subject: 'Your OTP Code - MaaozOfficialStore',
            html: emailContent,
        });
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

// Example usage:
// sendOTPEmail({
//   email: 'user@example.com',
//   otp: '123456',
//   userName: 'John Doe',
//   validityMinutes: 10
// });
