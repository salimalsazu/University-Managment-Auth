import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../../../interface/error'
import handleValidationError from '../../../../errors/handleValidationError'
import config from '../../../../config'
import ApiError from '../../../../errors/ApiError'

//Global error handling

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ golbalError: err })

  let statusCode = 500
  let message = 'Something Went Wrong !'
  let errorMesages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMesages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMesages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMesages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMesages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler

//path:
//message
