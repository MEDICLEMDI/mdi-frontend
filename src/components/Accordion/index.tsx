import * as React from 'react';
import {Animated, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icons from "@/icons";
import {useEffect} from "react";

const Accordion = ({
  children,
  isOpen = false,
  style,
}:{
  children?: React.ReactNode;
  isOpen?: boolean;
  style?: ViewStyle | ViewStyle[];
}) => {
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    if(isOpen) setExpanded(true);
  }, [])

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={style}>
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
          <Animated.View style={{ maxHeight: 200 }}>
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
    </View>
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
