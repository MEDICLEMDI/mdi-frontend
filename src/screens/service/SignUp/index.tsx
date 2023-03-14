import * as React from 'react';
import {ScrollView, View, Text, SafeAreaView, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import axios from "axios";

import Header from "@/components/Header";
import {MedicleInput} from "@/components/inputs";
import MedicleButton from "@/buttons/MedicleButton";

import style from './style'
import API from "@/utils/api";

interface ISignUpData {
  reg_type: string;
  user_id: string;
  password: string;
  name: string;
  registration_number: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  address3: string;
  post_code: string;
  referral_code: string;
}

const SignUp = () => {

  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    reg_type: 'normal',
    user_id: 'test00s1',
    password: '1q2w3e4r!',
    name: 'honggisldong',
    registration_number: '9704101011111',
    phone: '01012374567',
    email: 'tesst@test.com',
    address1: 'address1',
    address2: 'address2',
    address3: 'address3',
    post_code: '00523',
    referral_code: 'refcode',
  });

  const onChange = (value:string, name: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    })
  }


  const register = async () => {
    await API.post('/register', signUpData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => console.log('end second'));
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <ScrollView style={style.content}>
        <MedicleInput
          label={<Text>성함</Text>}
          value={signUpData?.name}
          onChangeText={(text) => onChange(text, 'name')}
        />
        <View>
          <Text>주소</Text>
          <MedicleInput
            value={signUpData?.address1}
            onChangeText={(text) => onChange(text, 'address1')}
            direction='row'
            inputButtonNode={
              <MedicleButton
                buttonStyle={style.button}
                text='주소 찾기'
              />
            }
          />
          <MedicleInput value={signUpData?.address2} onChangeText={(text) => onChange(text, 'address2')}/>
          <MedicleInput value={signUpData?.address3} onChangeText={(text) => onChange(text, 'address3')}/>
        </View>
        <MedicleInput
          label={<Text>휴대폰 번호</Text>}
          value={signUpData?.phone}
          onChangeText={(text) => onChange(text, 'phone')}
        />
        <MedicleInput
          label={<Text>이메일</Text>}
          value={signUpData?.email}
          onChangeText={(text) => onChange(text, 'email')}
        />
        <MedicleInput
          label={<Text>비밀번호</Text>}
          value={signUpData?.password}
          onChangeText={(text) => onChange(text, 'password')}
        />
        <MedicleInput
          label={<Text>추천인 코드</Text>}
          value={signUpData?.referral_code}
          onChangeText={(text) => onChange(text, 'referral_code')}
        />
        <View>

        </View>
      </ScrollView>
      <MedicleButton
        // disabled={true}
        text='동의하고 회원가입'
        buttonStyle={style.signUpButton}
        onPress={() => register()}
      />
    </SafeAreaView>
  )
};

export default SignUp;
