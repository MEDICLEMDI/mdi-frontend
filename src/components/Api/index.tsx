import { getAppointmentDetail, getUserAppointment } from './appointment';
import { autoSignIn, signIn, signOut, tokenChecker } from './auth';
import { getHospital, getHospitalDetail } from './company';
import { getUserLoginId, getUserPassword } from './guest';
import {
  editAddress,
  editPassword,
  editPhone,
  getMyPage,
  userWithdraw,
} from './mypage';
import {
  getEventProducts,
  getNewestProducts,
  getProductGroupItems,
  getProductGroups,
  getReviewRankLists,
  productPayment,
} from './product';
import { getProductInfo, getQaDetail, getQAList, insertProductQA } from './qa';
import { insertReview } from './reviews';

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
  getUserLoginId
};
