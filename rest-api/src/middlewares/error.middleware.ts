import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); 
  
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status: 'error',
    statusCode: status,
    message: message,
  });
}
