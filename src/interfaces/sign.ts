export interface ISignUpData {
    reg_type?: string;
    password?: string;
    name?: string;
    registrationNumber1?: string;
    registrationNumber2?: string;
    phone?: string;
    email?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    post_number?: string;
    referral_code?: string;
    is_marketing_agree?: string;
    [key: string]: string | undefined;
  }

  export interface FormError {
    phone?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    smsCode?: string;
    mailCode?: string;
    registrationNumber1?: string;
    registrationNumber2?: string;
    [key: string]: string | undefined;
  }

  export interface agreeList {
    service: boolean;
    privacy: boolean;
    provision: boolean;
    financial: boolean;
    fourteen: boolean;
    location: boolean;
  }

  export interface termsList {
    service?: string;
    privacy?: string;
    provision?: string;
    financial?: string;
    location?: string;
  }