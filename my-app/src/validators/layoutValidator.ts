import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateLayout = [
  body('userId').isUUID().withMessage('Invalid user ID'),
  body('name').isString().withMessage('Name must be a string'),
  body('layoutData').isObject().withMessage('Layout data must be an object'),
  body('isDefault').isBoolean().withMessage('isDefault must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
