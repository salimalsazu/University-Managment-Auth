import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../../../interface/error'

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

if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
}

  res.status().json({
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
