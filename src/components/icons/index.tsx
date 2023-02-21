import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import ActionActivityIcon from './svg/ActivityAction.svg';
import BurnActivityIcon from './svg/ActivityBurn.svg';
import MintActivityIcon from './svg/ActivityMint.svg';
import ActivityReceiveIcon from './svg/ActivityReceive.svg';
import ActivitySendIcon from './svg/ActivitySend.svg';
import AlarmIcon from './svg/Alarm.svg';
import ArrowDownIcon from './svg/ArrowDown.svg';
import ArrowDownRoundedIcon from './svg/ArrowDownRounded.svg';
import ArrowLeftIcon from './svg/ArrowLeft.svg';
import ArrowRightIcon from './svg/ArrowRight.svg';
import BackIcon from './svg/Back.svg';
import BookIcon from './svg/Book.svg';
import BracesIcon from './svg/Braces.svg';
import CalendarIcon from './svg/Calendar.svg';
import CavityIcon from './svg/Cavity.svg';
import ChestIcon from './svg/Chest.svg';
import ChevronIcon from './svg/Chevron.svg';
import ClockIcon from './svg/Clock.svg';
import CloseIcon from './svg/Close.svg';
import CoinIcon from './svg/Coin.svg';
import CommunityIcon from './svg/Community.svg';
import ConnectDefaultIcon from './svg/ConnectDefault.svg';
import CopyIcon from './svg/Copy.svg';
import CrownIcon from './svg/Crown.svg';
import DentureIcon from './svg/Denture.svg';
import EarIcon from './svg/Ear.svg';
import Error from './svg/Error.svg';
import ETCIcon from './svg/ETC.svg';
import ExchangeIcon from './svg/Exchange.svg';
import EyeIcon from './svg/Eye.svg';
import EyesIcon from './svg/Eyes.svg';
import EyeSlashIcon from './svg/EyeSlash.svg';
import FaceIcon from './svg/Face.svg';
import FacebookIcon from './svg/Facebook.svg';
import FaceIdIcon from './svg/FaceId.svg';
import ForheadIcon from './svg/Forhead.svg';
import GearIcon from './svg/Gear.svg';
import GiftIcon from './svg/Gift.svg';
import GithubIcon from './svg/Github.svg';
import HairIcon from './svg/Hair.svg';
import HeadPhoneIcon from './svg/HeadPhone.svg';
import HeartIcon from './svg/Heart.svg';
import HomeIcon from './svg/Home.svg';
import Hospital_BIcon from './svg/Hospita_B.svg';
import HospitalIcon from './svg/Hospital.svg';
import ICPIcon from './svg/ICP.svg';
import ImplantIcon from './svg/Implant.svg';
import IncognitoIcon from './svg/Incognito.svg';
import InfoIcon from './svg/Info.svg';
import InstagramIcon from './svg/Instagram.svg';
import LaminateIcon from './svg/Laminate.svg';
import MDIIcon from './svg/MDI.svg';
import MdiLogoIcon from './svg/MdiLogoHorizontal.svg';
import MdiLogoSmallIcon from './svg/MdiLogoSmall.svg';
import MenuIcon from './svg/Menu.svg';
import MouseIcon from './svg/Mouse.svg';
import NoseIcon from './svg/Nose.svg';
import NotePlusIcon from './svg/NotePlus.svg';
import PlusIcon from './svg/Plus.svg';
import RedirectArrowIcon from './svg/RedirectArrow.svg';
import RefreshIcon from './svg/Refresh.svg';
import RefreshSmallIcon from './svg/Refresh_small.svg';
import ScalingIcon from './svg/Scaling.svg';
import SearchIcon from './svg/Search.svg';
import SettingsIcon from './svg/Settings.svg';
import SkinIcon from './svg/Skin.svg';
import SwapArrowsIcon from './svg/SwapArrows.svg';
import TabNftsIcon from './svg/TabNfts.svg';
import TabProfileIcon from './svg/TabProfile.svg';
import TabTokensIcon from './svg/TabTokens.svg';
import TelegramIcon from './svg/Telegram.svg';
import ThreeDotsIcon from './svg/ThreeDots.svg';
import TMJIcon from './svg/TMJ.svg';
import ToothIcon from './svg/Tooth.svg';
import TransactionError from './svg/TransactionError.svg';
import TransactionSuccess from './svg/TransactionSuccess.svg';
import TwitterIcon from './svg/Twitter.svg';
import UserIcon from './svg/User.svg';
import UserCircleIcon from './svg/UserCircle.svg';
import WalletIcon from './svg/Wallet.svg';
import WaxingIcon from './svg/Waxing.svg';
import WhiteningIcon from './svg/Whitening.svg';
import WICPIcon from './svg/WICP.svg';
import XTCIcon from './svg/XTC.svg';
import YZoneIcon from './svg/YZone.svg';

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
    gear: GearIcon,
    plus: PlusIcon,
    dfinity: ICPIcon,
    profile: TabProfileIcon,
    tokens: TabTokensIcon,
    nfts: TabNftsIcon,
    error: Error,
    info: InfoIcon,
    transactionSuccess: TransactionSuccess,
    transactionError: TransactionError,
    faceIdIcon: FaceIdIcon,
    arrowRight: ArrowRightIcon,
    // arrowDown: ArrowDownRoundedIcon,
    threeDots: ThreeDotsIcon,
    swapArrows: SwapArrowsIcon,
    activitySend: ActivitySendIcon,
    burnActivity: BurnActivityIcon,
    chevron: ChevronIcon,
    mintActivity: MintActivityIcon,
    connectIcon: ConnectDefaultIcon,
    redirectArrow: RedirectArrowIcon,
    activityReceive: ActivityReceiveIcon,
    actionActivity: ActionActivityIcon,
    eye: EyeIcon,
    eyeSlash: EyeSlashIcon,
    unknown: IncognitoIcon,

    mdiHorizontal: MdiLogoIcon,
    arrowLeft: ArrowLeftIcon,
    arrowDown: ArrowDownIcon,
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
  }[type]);

interface Props {
  name: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  // height?: number;
}

const Icon = ({ name, color, ...props }: Props) => {
  const IconElement = IconTypes(name) as React.FunctionComponent<any>;
  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
