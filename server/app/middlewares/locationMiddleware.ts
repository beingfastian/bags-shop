import { Request, Response, NextFunction } from 'express';
import ipware = require('ipware');
import geoip = require('geoip-lite');

const { get_ip: getIP } = ipware();

declare global {
  namespace Express {
    interface Request {
      location?: geoip.Lookup | null;
      ipAddress?: string | null;
    }
  }
}

export const LocationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const ipInfo = getIP(req);
    const ipAddress = ipInfo.clientIp || req.socket.remoteAddress;

    if (!ipAddress) {
      return next(new Error('Could not determine IP address'));
    }

    const location = geoip.lookup(ipAddress);
    req.location = location;
    req.ipAddress = ipAddress;
    next();
  } catch (error) {
    next(error);
  }
};
