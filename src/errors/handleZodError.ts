import { ZodError, ZodIssue } from 'zod';
import { IGenericErrrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError): IGenericErrrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  //   console.log(
  //     error.issues.map(issue => issue.path),
  //     'eta zod error'
  //   );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation failed',
    errorMessages: errors,
  };
};

export default handleZodError;
