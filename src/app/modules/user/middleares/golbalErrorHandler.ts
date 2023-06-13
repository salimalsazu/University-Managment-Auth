/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../../../interface/error';
import handleValidationError from '../../../../errors/handleValidationError';
import config from '../../../../config';
import ApiError from '../../../../errors/ApiError';
// import { errorlogger } from '../../../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../../../errors/handleZodError';
import handleCastError from '../../../../errors/handleCastError';

//Global error handling

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // config.env === 'development'
  //   ? console.log('globalErrorHandler', error)
  //   : errorlogger.error('globalErrorHandler', error);

  let statusCode = 500;
  let message = 'Something Went Wrong !';
  let errorMesages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    res.status(200).json({ error });
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMesages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMesages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMesages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;

//path:
//message
