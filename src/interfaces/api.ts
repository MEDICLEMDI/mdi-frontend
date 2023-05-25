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
};

type Company = {
  name: string;
  phone: string;
  owner: string;
  address: string;
  trader_number: string;
};

export type ResponseDTO<T> = {
  result: boolean;
  status?: number;
  message: string;
  data?: T;
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

export interface IEventProduct {
  event_id: string;
  event_banner: string;
  item: IProductItem[];
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

export interface IAppointmentItem {
  id: string;
  status: number;
  company_id: string;
  product_id: string;
  user_id: string;
  hospital_name: string;
  hospital_address: string;
  product_name: string;
  price: string;
  date: string;
}

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

export interface IQaItem {
  id: string;
  status: string;
  company_id: string;
  product_id: string;
  user_id: string;
  hospital_name: string;
  hospital_address: string;
  product_name: string;
  price: string;
  date: string;
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

export interface ICompanyDetail {
  cg_type_id: string;
  ci_address: string;
  ci_address2: string;
  ci_code: string;
  ci_email_tax: string;
  ci_fee: number;
  ci_image_main: string;
  ci_image_sub1: string;
  ci_image_sub2: string;
  ci_image_sub3: string;
  ci_latitude: number;
  ci_longitude: number;
  ci_owner_name: string;
  ci_phone: string;
  ci_phone2: string;
  ci_piccharge_name: string;
  ci_picharge_email: string;
  ci_picharge_phone: string;
  ci_trader_image: string;
  ci_trader_number: string;
  created_at: string;
  deleted: number;
  id: string;
  name: string;
  timetable: ICompanyTimeTable[];
  updated_at: string;
}

export interface ICompanyTimeTable {
  ct_break_end: string;
  ct_break_start: string;
  ct_day: number;
  ct_holiday: number;
  ct_work_end: string;
  ct_work_start: string;
}

export interface INotice {
  id: string;
  title: string;
  content: string;
  main_image: string;
  date: string;
}

export interface LoginInfo {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface IKakao {
  social_id: string;
  email: string;
}

export interface INaver {
  id: string;
  email: string;
}

export interface IExtLink {
  id: string;
  event_id: string;
  type: string;
  name: string;
  link: string;
  is_display: string;
}

export interface IHomeMenu {
  companyGroup: ICompanyGroup[];
  productGroup: IProductGroup[];
}

export interface ICompanyGroup {
  id: string;
  name: string;
}

export interface IProductGroup {
  id: string;
  pg_company_type: string;
  pg_name: string;
}

export interface IEvent {
  id: string;
  event_id: string;
  main_image: string;
}

export interface IPaymnetProduct {
  id: string;
  user_id: string;
  status: string;
  price: string;
  product_name: string;
  hospital_name: string;
  main_image: string;
  sub_image: string;
  date: string;
}

export interface IReceiptCount {
  status_count: string;
  up_status: number;
}

export interface IPointHistory {
  id: string;
  type: string;
  point: string;
  date: string;
}

export interface IReview {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  date: string;
}

export interface ITerm {
  id: string;
  tm_ext_link: string;
  tm_type: string;
}

export interface IWallet {
  id: string;
  eth: string;
  mdi: string;
}

export interface ITxId {
  tx_id: string;
}

export interface ITxHistory {
  id: string;
  txid: string;
  from: string;
  to: string;
  amount: string;
  type: string;
  status: string;
  date: string;
}
