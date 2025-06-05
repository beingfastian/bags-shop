import { OAuth2Client } from 'google-auth-library';

export const verifyGoogleToken = async (
  idToken: string,
  client: OAuth2Client
) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid Google ID token');
  return payload;
};
