import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import AlarmIcon from './svg/Alarm.svg';
import ArrowDownIcon from './svg/ArrowDown.svg';
import ArrowLeftIcon from './svg/ArrowLeft.svg';
import ArrowRightIcon from './svg/ArrowRight.svg';
import ArrowUpIcon from './svg/ArrowUp.svg';
import BackIcon from './svg/Back.svg';
import BookIcon from './svg/Book.svg';
import BracesIcon from './svg/Braces.svg';
import CalendarIcon from './svg/Calendar.svg';
import CavityIcon from './svg/Cavity.svg';
import ChestIcon from './svg/Chest.svg';
import ClockIcon from './svg/Clock.svg';
import CloseIcon from './svg/Close.svg';
import CoinIcon from './svg/Coin.svg';
import CommunityIcon from './svg/Community.svg';
import CopyIcon from './svg/Copy.svg';
import CrownIcon from './svg/Crown.svg';
import DentureIcon from './svg/Denture.svg';
import EarIcon from './svg/Ear.svg';
import EmailIcon from './svg/Email.svg';
import Error from './svg/Error.svg';
import ETCIcon from './svg/ETC.svg';
import ExchangeIcon from './svg/Exchange.svg';
import EyesIcon from './svg/Eyes.svg';
import FaceIcon from './svg/Face.svg';
import FacebookIcon from './svg/Facebook.svg';
import FaceIdIcon from './svg/FaceId.svg';
import ForheadIcon from './svg/Forhead.svg';
import GiftIcon from './svg/Gift.svg';
import GithubIcon from './svg/Github.svg';
import GoogleIcon from './svg/Google.svg';
import HairIcon from './svg/Hair.svg';
import HeadPhoneIcon from './svg/HeadPhone.svg';
import HeartIcon from './svg/Heart.svg';
import HomeIcon from './svg/Home.svg';
import Hospital_BIcon from './svg/Hospita_B.svg';
import HospitalIcon from './svg/Hospital.svg';
import ImplantIcon from './svg/Implant.svg';
import InfoIcon from './svg/Info.svg';
import InstagramIcon from './svg/Instagram.svg';
import KakaoIcon from './svg/Kakao.svg';
import KakaoPayIcon from './svg/KakaoPay.svg';
import LaminateIcon from './svg/Laminate.svg';
import MDIIcon from './svg/MDI.svg';
import MdiLogoIcon from './svg/MdiLogoHorizontal.svg';
import MdiLogoSmallIcon from './svg/MdiLogoSmall.svg';
import MenuIcon from './svg/Menu.svg';
import MouseIcon from './svg/Mouse.svg';
import NaverIcon from './svg/Naver.svg';
import NoseIcon from './svg/Nose.svg';
import NotePlusIcon from './svg/NotePlus.svg';
import RefreshIcon from './svg/Refresh.svg';
import RefreshSmallIcon from './svg/Refresh_small.svg';
import ScalingIcon from './svg/Scaling.svg';
import SearchIcon from './svg/Search.svg';
import SettingsIcon from './svg/Settings.svg';
import SkinIcon from './svg/Skin.svg';
import TelegramIcon from './svg/Telegram.svg';
import TMJIcon from './svg/TMJ.svg';
import ToothIcon from './svg/Tooth.svg';
import TossIcon from './svg/Toss.svg';
import TwitterIcon from './svg/Twitter.svg';
import UserIcon from './svg/User.svg';
import UserCircleIcon from './svg/UserCircle.svg';
import WalletIcon from './svg/Wallet.svg';
import WaxingIcon from './svg/Waxing.svg';
import WhiteningIcon from './svg/Whitening.svg';
import WICPIcon from './svg/WICP.svg';
import XTCIcon from './svg/XTC.svg';
import YZoneIcon from './svg/YZone.svg';
import BinanceIcon from './svg/Binance.svg';
import EthereumIcon from './svg/Ethereum.svg';

export const IconTypes = (type: string) =>
  ({
    close: CloseIcon,
    calendar: CalendarIcon,
    clock: ClockIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    github: GithubIcon,
    twitter: TwitterIcon,
    telegram: TelegramIcon,
    menu: MenuIcon,
    mdi: MDIIcon,
    xtc: XTCIcon,
    wicp: WICPIcon,
    copy: CopyIcon,
    error: Error,
    info: InfoIcon,
    faceIdIcon: FaceIdIcon,
    arrowRight: ArrowRightIcon,

    mdiHorizontal: MdiLogoIcon,
    arrowLeft: ArrowLeftIcon,
    arrowDown: ArrowDownIcon,
    arrowUp: ArrowUpIcon,
    alarm: AlarmIcon,
    search: SearchIcon,
    refresh: RefreshIcon,
    refresh_s: RefreshSmallIcon,
    mdiIcon: MdiLogoSmallIcon,
    userCircle: UserCircleIcon,

    implant: ImplantIcon,
    crown: CrownIcon,
    cavity: CavityIcon,
    scaling: ScalingIcon,
    denture: DentureIcon,
    tmj: TMJIcon,
    whitening: WhiteningIcon,
    braces: BracesIcon,
    laminate: LaminateIcon,

    skin: SkinIcon,
    face: FaceIcon,
    eyes: EyesIcon,
    nose: NoseIcon,
    mouse: MouseIcon,
    forehead: ForheadIcon,
    chest: ChestIcon,
    back: BackIcon,
    waxing: WaxingIcon,
    hair: HairIcon,
    tooth: ToothIcon,
    ear: EarIcon,
    yzone: YZoneIcon,
    etc: ETCIcon,

    coin: CoinIcon,
    book: BookIcon,
    heart: HeartIcon,
    notePlus: NotePlusIcon,
    hospital: HospitalIcon,
    faq: HeadPhoneIcon,
    exchange: ExchangeIcon,
    community: CommunityIcon,
    settings: SettingsIcon,

    home: HomeIcon,
    gift: GiftIcon,
    wallet: WalletIcon,
    user: UserIcon,
    hospital_b: Hospital_BIcon,

    google: GoogleIcon,
    naver: NaverIcon,
    kakao: KakaoIcon,
    email: EmailIcon,
    kakaoPay: KakaoPayIcon,
    toss: TossIcon,

    binance: BinanceIcon,
    eth: EthereumIcon,
  }[type]);

interface Props {
  name: string;
  size?: number;
  stroke?: string;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Icon
 * @param {string} name
 * @comment import해온 아이콘을 name을 기준으로 화면에 렌더링
 */
const Icon = ({
  name,
  fill = 'none',
  stroke = 'none',
  style,
  ...props
}: Props) => {
  const IconElement = IconTypes(name) as React.FunctionComponent<any>;
  return (
    <IconElement
      {...props}
      name={name}
      fill={fill}
      stroke={stroke}
      style={style}
    />
  );
};

export default Icon;
