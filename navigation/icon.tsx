import { Image } from "react-native";

import ic_home_active from "../assets/images/ic_home_active.png";
import ic_home from "../assets/images/ic_home.png";

import ic_hospital_active from "../assets/images/ic_hospital_active.png";
import ic_hospital from "../assets/images/ic_hospital.png";

import ic_gift_active from "../assets/images/ic_gift_active.png";
import ic_gift from "../assets/images/ic_gift.png";

import ic_wallet_active from "../assets/images/ic_wallet_active.png";
import ic_wallet from "../assets/images/ic_wallet.png";

import ic_profile_active from "../assets/images/ic_profile_active.png";
import ic_profile from "../assets/images/ic_profile.png";

const size = 30;
const iconSize = {
    width: size,
    height: size,
}

export const HomeIcon = ({ isFocus }) => {
    return <Image source={isFocus ? ic_home_active : ic_home} style={iconSize} />
}

export const HospitalIcon = ({ isFocus }) => {
    return <Image source={isFocus ? ic_hospital_active : ic_hospital} style={iconSize} />
}

export const GiftIcon = ({ isFocus }) => {
    return <Image source={isFocus ? ic_gift_active : ic_gift} style={iconSize} />
}

export const WalletIcon = ({ isFocus }) => {
    return <Image source={isFocus ? ic_wallet_active : ic_wallet} style={iconSize} />
}

export const ProfileIcon = ({ isFocus }) => {
    return <Image source={isFocus ? ic_profile_active : ic_profile} style={iconSize} />
}