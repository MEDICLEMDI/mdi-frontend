import category1 from "../../assets/images/ic_category1.png";
import category2 from "../../assets/images/ic_category2.png";
import category3 from "../../assets/images/ic_category3.png";
import category4 from "../../assets/images/ic_category4.png";
import category5 from "../../assets/images/ic_category5.png";
import category6 from "../../assets/images/ic_category6.png";
import category7 from "../../assets/images/ic_category7.png";
import category8 from "../../assets/images/ic_category8.png";
import category9 from "../../assets/images/ic_category9.png";

import category10 from "../../assets/images/ic_category10.png";
import category11 from "../../assets/images/ic_category11.png";
import category12 from "../../assets/images/ic_category12.png";
import category13 from "../../assets/images/ic_category13.png";
import category14 from "../../assets/images/ic_category14.png";
import category15 from "../../assets/images/ic_category15.png";
import category16 from "../../assets/images/ic_category16.png";
import category17 from "../../assets/images/ic_category17.png";
import category18 from "../../assets/images/ic_category18.png";
import category19 from "../../assets/images/ic_category19.png";
import category20 from "../../assets/images/ic_category20.png";
import category21 from "../../assets/images/ic_category21.png";
import category22 from "../../assets/images/ic_category22.png";
import category23 from "../../assets/images/ic_category23.png";

const dentist = (t) => {
    return [
        {icon: category1, name: t('category.implant')},
        {icon: category2, name: t('category.crown')},
        {icon: category3, name: t('category.cavity')},
        {icon: category4, name: t('category.scaling')},
        {icon: category5, name: t('category.denture')},
        {icon: category6, name: t('category.tmj')},
        {icon: category7, name: t('category.whitening')},
        {icon: category8, name: t('category.braces')},
        {icon: category9, name: t('category.laminate')},
    ]
}

const dermatology = (t) => {
    return [
        {icon: category10, name: t('category.skin')},
        {icon: category11, name: t('category.face')},
        {icon: category12, name: t('category.eyes')},
        {icon: category13, name: t('category.nose')},
        {icon: category14, name: t('category.lip')},
        {icon: category15, name: t('category.forehead')},
        {icon: category16, name: t('category.chest')},
        {icon: category17, name: t('category.bodyline')},
        {icon: category18, name: t('category.hair1')},
        {icon: category19, name: t('category.hair2')},
        {icon: category20, name: t('category.teeth')},
        {icon: category21, name: t('category.ear')},
        {icon: category22, name: t('category.yzone')},
        {icon: category23, name: t('category.etc')},
        {icon: '', name: ''},
    ]
}

export default { dentist, dermatology };

