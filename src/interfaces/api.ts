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
  status?: number;
  message?: string;
  data?: any;
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
  hospital_name?: string;
  hospital_address?: string;
}

export interface IProductDetail {}

export interface IAppointmentItem {}

export interface IAppointmentDetail {
  id: string;
  status: number;
  is_review: boolean;
  appointment_id: string;
  user_id: string;
  product_id: string;
  company_id: string;
  hospital_name: string;
  doctor_name: string;
  patient: string;
  symptom: string;
  appointment_data: string;
  end_date: string;
  price: string;
  create_date: string;
}

export interface IQaDetail {
  address: string;
  content: string;
  date: string;
  email: string;
  hospital_doctor: string;
  hospital_name: string;
  hospital_phone: string;
  id: string;
  name: string;
  phone: string;
  trader_number: string;
  user_id: string;
}

export interface ICompanyItem {
  id: string;
  name: string;
  ci_address: string;
  like: boolean;
  review_count: string;
  ci_image_main: string;
}

export interface ICompanyDetail {}
