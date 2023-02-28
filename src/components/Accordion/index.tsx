import * as React from 'react';
import {Animated, Platform, Text, TouchableOpacity, View} from 'react-native';
import Icons from "@/icons";
import BoxDropShadow from "@/components/BoxDropShadow";
import {Colors} from "@/constants/theme";
import style from './style'
import {fontStyleCreator} from "@/utils/fonts";

const Accordion = ({
  children,
  bodyHeight = 200,
}:{
  children?: React.ReactNode;
  bodyHeight?: number;
}) => {
  const [accordionToggle, setAccordionToggle] = React.useState(false)
  const height = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if(accordionToggle) slideOn();
    else slideOff();
  }, [accordionToggle])

  const slideOff = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(height, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const slideOn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(height, {
      toValue: bodyHeight,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <BoxDropShadow
      color={
        Platform.OS === 'ios'
          ? Colors.Medicle.Gray.SemiLight
          : Colors.Medicle.Gray.Standard
      }
      offset={[0, 7]}
      elevation={8}
      opacity={0.95}
      radius={20}
      style={style.accordionCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {React.Children.map(children, (child) => {
          if (child.type.name === 'AccordionHeader') {
            return child;
          }
        })}
        <TouchableOpacity onPress={() => setAccordionToggle(!accordionToggle)}>
          {
            !accordionToggle
            ?
              <Icons name="arrowDown" />
            :
              <Icons name="arrowUp" />
          }
        </TouchableOpacity>
      </View>
      <Animated.View style={{ height: height }}>
        {React.Children.map(children, (child) => {
          if (child.type.name === 'AccordionBody') {
            return child;
          }
        })}
      </Animated.View>
    </BoxDropShadow>
  );
}

const AccordionHeader = ({ children }) => {
  return (
    <View>
      {children}
    </View>
  );
};
const AccordionBody = ({ children }) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
