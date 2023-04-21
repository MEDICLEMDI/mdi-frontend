import {
  cancelAppointment,
  getAppointmentDetail,
  getUserAppointment,
} from './appointment';
import { autoSignIn, signIn, signOut, tokenChecker } from './auth';
import { getHospital, getHospitalDetail, getTimetable } from './company';
import {
  checkEmailAuthCode,
  checkPhoneAuthCode,
  getEmailAuthCode,
  getPhoneAuthCode,
  getUserLoginId,
  getUserPassword,
  signUp,
} from './guest';
import {
  getLikeCompanys,
  getLikeProducts,
  setLikeCompanys,
  setLikeProducts,
} from './likes';
import {
  editAddress,
  editPassword,
  editPhone,
  getMyPage,
  userWithdraw,
} from './mypage';
import { getPaymentHistory, getInfoCount, productPayment } from './payment';
import { getPointHistory } from './point';
import {
  getEventProducts,
  getNewestProducts,
  getProductGroupItems,
  getProductGroups,
  getProductInfo,
  getReviewRankLists,
} from './product';
import { cancelQa, getQaDetail, getQAList, insertProductQA } from './qa';
import { insertReview, getReviews } from './reviews';

export default {
  autoSignIn,
  signIn,
  tokenChecker,
  signOut,
  getProductGroups,
  getProductGroupItems,
  getEventProducts,
  getNewestProducts,
  getReviewRankLists,
  getProductInfo,
  insertProductQA,
  getQaDetail,
  getQAList,
  getHospital,
  getHospitalDetail,
  insertReview,
  getAppointmentDetail,
  getUserAppointment,
  userWithdraw,
  editAddress,
  editPassword,
  editPhone,
  getMyPage,
  productPayment,
  getUserPassword,
  getUserLoginId,
  checkEmailAuthCode,
  checkPhoneAuthCode,
  getPhoneAuthCode,
  getEmailAuthCode,
  signUp,
  getLikeProducts,
  setLikeProducts,
  setLikeCompanys,
  cancelAppointment,
  cancelQa,
  getPaymentHistory,
  getInfoCount,
  getLikeCompanys,
  getPointHistory,
  getTimetable,
  getReviews,
};
