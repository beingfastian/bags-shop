import { Request, Response, NextFunction } from 'express';

export const validate =
  (schemas: { body?: any; query?: any; params?: any }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) schemas.body.parse(req.body);
      if (schemas.query) schemas.query.parse(req.query);
      if (schemas.params) schemas.params.parse(req.params);
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors || error.message });
    }
  };

export const validateOrder =
  (schemas: { authSchema: any; unauthSchema: any }) =>
  (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.payload && req.payload.id) {
        schemas.authSchema.parse(req.body);
      } else {
        schemas.unauthSchema.parse(req.body);
      }

      next();
    } catch (error) {
      console.error('Validation error:', error);
      res.status(400).json({
        error: error.errors ? error.errors : error.message,
      });
    }
  };
