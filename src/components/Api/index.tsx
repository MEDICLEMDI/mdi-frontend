import {
  cancelAppointment,
  getAppointmentDetail,
  getUserAppointment,
} from './appointment';
import { autoSignIn, signIn, signOut, socialSignIn, tokenChecker, userRefresh } from './auth';
import { getHospital, getHospitalDetail, getTimetable } from './company';
import { getCommunityList, getExchangeList, getMenus } from './config';
import { getEventLists } from './event';
import {
  checkEmailAuthCode,
  checkPhoneAuthCode,
  getEmailAuthCode,
  getPhoneAuthCode,
  getUserLoginId,
  getUserPassword,
  normalSignUp,
  socialGoogle,
  socialKakao,
  socialNaver,
  socialSignUp,
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
  normalUserWithdraw,
  socialUserWithdraw,
} from './mypage';
import { getNotices } from './notice';
import { partnershipQA } from './partnership';
import { getPaymentHistory, getInfoCount, productPayment, setPaymentPrepare } from './payment';
import { getPointHistory } from './point';
import {
  getAllEventProducts,
  getEventProducts,
  getNewestProducts,
  getProductGroupItems,
  getProductGroups,
  getProductInfo,
  getReviewRankLists,
} from './product';
import { cancelQa, getQaDetail, getQAList, insertProductQA } from './qa';
import { insertReview, getReviews } from './reviews';
import { getTerms } from './terms';
import { updateMarketingFlag } from './user';
import { getBalance, getDepositHistory, getWithdawHistory, transfer } from './wallet';

export default {
  autoSignIn,
  signIn,
  tokenChecker,
  signOut,
  getProductGroups,
  getProductGroupItems,
  getAllEventProducts,
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
  editAddress,
  editPassword,
  editPhone,
  getMyPage,
  productPayment,
  setPaymentPrepare,
  getUserPassword,
  getUserLoginId,
  checkEmailAuthCode,
  checkPhoneAuthCode,
  getPhoneAuthCode,
  getEmailAuthCode,
  normalSignUp,
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
  socialGoogle,
  socialNaver,
  socialKakao,
  getEventLists,
  socialSignUp,
  socialSignIn,
  updateMarketingFlag,
  normalUserWithdraw,
  socialUserWithdraw,
  getTerms,
  getExchangeList,
  getCommunityList,
  getNotices,
  userRefresh,
  partnershipQA,
  getMenus,
  getBalance,
  getDepositHistory,
  getWithdawHistory,
  transfer,
};
