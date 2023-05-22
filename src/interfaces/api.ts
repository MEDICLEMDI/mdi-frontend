export type User = {
  address: string;
  address2: string;
  email: string;
  id: string;
  is_marketing_agree: string;
  mdi: mdi; 
  name: string;
  phone: string;
  post_number: string;
  referral_code: string;
  reg_type: string;
  social_type: string;
  user_id: string;
  updated_at: string;
  created_at: string;
};

export type mdi = {
  mw_mdi_point: number;
  mw_wallet_address: string;
}

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
  product_group?: string;
  price: string;
  discount: string;
  review_count: number;
  like: boolean;
  company: Company;
  hospital_name: string;
  hospital_address: string;
}

export interface IProductDetail {
  main_image: string;
  product_id: string;
  company_id: string;
  price: string;
  discount_price: string;
  discount: string;
  product_name: string;
  product_group: string;
  hospital_name: string;
  doctor_name: string;
  trader_number: string;
  hospital_address: string;
  hospital_phone: string;
  like: boolean;
}

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
  status: number;
  reply_content: string;
}

export interface ICompanyItem {
  id: string;
  name: string;
  ci_address: string;
  like: boolean;
  review_count: string;
  ci_image_main: string;
  cg_type_id: string;
}

export interface ICompanyDetail {}

export interface INotice {
  id: String;
  title: String;
  content: String;
  main_image: String;
}