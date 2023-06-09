import { IGenericErrorMessage } from './error';

export type IGenericErrrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
