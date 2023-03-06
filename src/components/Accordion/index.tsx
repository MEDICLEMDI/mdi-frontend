import * as React from 'react';
import {Animated, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
  const [expanded, setExpanded] = React.useState(false);
  const [animation, setAnimation] = React.useState(new Animated.Value(bodyHeight));

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
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
      <TouchableOpacity onPress={() => toggleAccordion()}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {React.Children.map(children, (child) => {
          if (child.type.name === 'AccordionHeader') {
            return child;
          }
        })}
        <View>
          {
            expanded
            ?
            <Icons name="arrowUp" />
            :
            <Icons name="arrowDown" />
          }
        </View>
      </View>
      </TouchableOpacity>
      <View style={{ overflow: 'hidden' }}>
        {expanded && (
          <Animated.View style={{ height: animation }}>
            <View style={{ marginTop: 10 }}>
              <ScrollView horizontal={false}>
                {React.Children.map(children, (child) => {
                  if (child.type.name === 'AccordionBody') {
                    return child;
                  }
                })}
              </ScrollView>
            </View>
          </Animated.View>
        )}
      </View>
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
      {children}
    </View>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
