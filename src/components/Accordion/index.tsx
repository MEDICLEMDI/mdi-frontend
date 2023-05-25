import * as React from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '@/icons';
import { useEffect } from 'react';


/**
 * Accordion
 * @param {boolean} isOpen default false
 * @param {StyleProp<ViewStyle>} style 아코디언 스타일 (내부 헤더 또는 바디는 자식요소에 직접 스타일을 적용)
 * @comment Accordion.Header과 Accordion.Body를 내부에 선언하여 사용합니다. 헤더에는 아코디언을 열고 닫을 수 있는 화살표가 존재하고 내부에 <Text>컴포넌트를 자식으로 포함하면 헤더가 적용됩니다.
 * 바디에는 내용을 포함하고 있는 컴포넌트를 포함하며, isOpen을 사용하여 기본 상태를 열려있거나 닫혀있는 상태로 설정 할 수 있습니다.
 */
const Accordion = ({
  children,
  isOpen = false,
  style,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setExpanded(true);
    }
  }, []);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => toggleAccordion()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {React.Children.map(children, (child: any) => {
            if (child.type === AccordionHeader) {
              return child;
            }
          })}
          <View>
            {expanded ? <Icon name="arrowUp" /> : <Icon name="arrowDown" />}
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ overflow: 'hidden' }}>
        {expanded && (
          <Animated.View
            style={{ maxHeight: Dimensions.get('screen').height - 300 }}>
            <View style={{ marginTop: 10 }}>
              <ScrollView horizontal={false}>
                {React.Children.map(children, (child: any) => {
                  if (child.type === AccordionBody) {
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
};

const AccordionHeader = ({ children }: { children: React.ReactNode}) => {
  return <View>{children}</View>;
};
const AccordionBody = ({ children }: { children: React.ReactNode}) => {
  return <View>{children}</View>;
};

Accordion.Header = AccordionHeader; // 자식 컴포넌트 맵핑
Accordion.Body = AccordionBody; // 자식 컴포넌트 맵핑

export default Accordion;
