import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import ActionActivityIcon from './svg/ActivityAction.svg';
import BurnActivityIcon from './svg/ActivityBurn.svg';
import MintActivityIcon from './svg/ActivityMint.svg';
import ActivityReceiveIcon from './svg/ActivityReceive.svg';
import ActivitySendIcon from './svg/ActivitySend.svg';
import ArrowDownRoundedIcon from './svg/ArrowDownRounded.svg';
import ArrowRightIcon from './svg/ArrowRight.svg';
import ChevronIcon from './svg/Chevron.svg';
import ConnectDefaultIcon from './svg/ConnectDefault.svg';
import CopyIcon from './svg/Copy.svg';
import Error from './svg/Error.svg';
import EyeIcon from './svg/Eye.svg';
import EyeSlashIcon from './svg/EyeSlash.svg';
import FaceIdIcon from './svg/FaceId.svg';
import GearIcon from './svg/Gear.svg';
import ICPIcon from './svg/ICP.svg';
import IncognitoIcon from './svg/Incognito.svg';
import InfoIcon from './svg/Info.svg';
import MDIIcon from './svg/MDI.svg';
import PlusIcon from './svg/Plus.svg';
import RedirectArrowIcon from './svg/RedirectArrow.svg';
import SwapArrowsIcon from './svg/SwapArrows.svg';
import TabNftsIcon from './svg/TabNfts.svg';
import TabProfileIcon from './svg/TabProfile.svg';
import TabTokensIcon from './svg/TabTokens.svg';
import ThreeDotsIcon from './svg/ThreeDots.svg';
import TransactionError from './svg/TransactionError.svg';
import TransactionSuccess from './svg/TransactionSuccess.svg';
import WICPIcon from './svg/WICP.svg';
import XTCIcon from './svg/XTC.svg';

import MdiLogoIcon from './svg/MdiLogoHorizontal.svg';
import ArrowLeftIcon from './svg/ArrowLeft.svg';
import AlarmIcon from './svg/Alarm.svg';
import SearchIcon from './svg/Search.svg';
import RefreshIcon from './svg/Refresh.svg';
import MdiLogoSmallIcon from './svg/MdiLogoSmall.svg'

import ImplantIcon from './svg/Implant.svg';
import CrownIcon from './svg/Crown.svg';
import CavityIcon from './svg/Cavity.svg';
import DentureIcon from './svg/Denture.svg';
import TMJIcon from './svg/TMJ.svg';
import WhiteningIcon from './svg/Whitening.svg';
import ScalingIcon from './svg/Scaling.svg';
import BracesIcon from './svg/Braces.svg';
import LaminateIcon from './svg/Laminate.svg';

import SkinIcon from './svg/Skin.svg';
import FaceIcon from './svg/Face.svg';
import EyesIcon from './svg/Eyes.svg';
import NoseIcon from './svg/Nose.svg';
import MouseIcon from './svg/Mouse.svg';
import ForheadIcon from './svg/Forhead.svg';
import ChestIcon from './svg/Chest.svg';
import BackIcon from './svg/Back.svg';
import WaxingIcon from './svg/Waxing.svg';
import HairIcon from './svg/Hair.svg';
import ToothIcon from './svg/Tooth.svg';
import EarIcon from './svg/Ear.svg';
import YZoneIcon from './svg/YZone.svg';
import ETCIcon from './svg/ETC.svg';

import CoinIcon from './svg/Coin.svg';
import BookIcon from './svg/Book.svg';
import HeartIcon from './svg/Heart.svg';
import NotePlusIcon from './svg/NotePlus.svg';
import HospitalIcon from './svg/Hospital.svg';
import HeadPhoneIcon from './svg/HeadPhone.svg';
import ExchangeIcon from './svg/Exchange.svg';
import CommunityIcon from './svg/Community.svg';
import SettingsIcon from './svg/Settings.svg';

import WalletIcon from './svg/Wallet.svg';
import HomeIcon from './svg/Home.svg';
import GiftIcon from './svg/Gift.svg';
import UserIcon from './svg/User.svg';
import Hospital_BIcon from './svg/Hospita_B.svg';

export const IconTypes = (type: string) =>
  ({
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
    arrowDown: ArrowDownRoundedIcon,
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
    alarm: AlarmIcon,
    search: SearchIcon,
    refresh: RefreshIcon,
    mdiIcon: MdiLogoSmallIcon,

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
  height?: number;
}

const Icon = ({ name, color, ...props }: Props) => {
  const IconElement = IconTypes(name) as React.FunctionComponent<any>;
  return <IconElement {...props} name={name} color={color} fill={color} />;
};

export default Icon;
