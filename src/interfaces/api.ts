import { ErrorCode } from '@/constants/error';

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type Company = {
  name: string;
  phone: string;
  owner: string;
  address: string;
  trader_number: string;
};

export type responseDTO = {
  result: boolean;
  status?: number;
  message: string;
  data: any;
  error_code: number;
};

export interface ErrorResponse {
  message?: string;
  type?: string;
}

export interface IProductItem {
  id: string;
  main_image: string;
  product_id: string;
  product_name: string;
  price: string;
  discount: string;
  review_count: number;
  like: boolean;
  company: Company;
}

export interface IProductDetail {}

export interface IAppointmentItem {}

export interface IAppointmentDetail {
  user: User;
  company: Company;
  appointment_date: string;
  request: string;
}

export interface ICompanyItem {}

export interface ICompanyDetail {}
