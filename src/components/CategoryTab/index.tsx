import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import GridList from '../GridList';
import style from './style';

const CategoryTab = ({ tabs, onPress, itemStyle, type }: any) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    initialize();
  }, [tabs]);

  // Tab category data initialize
  const initialize = () => {
    setTabIndex(0);
    if (tabs.length > 0) {
      setCategory(tabs[0].data);
    }
  };

  const tabChangeHandler = (tab: any, index: number) => {
    setTabIndex(index);
    setCategory(tab.data);
  };

  const TabList = tabs.map((tab, key) => (
    <TouchableOpacity
      key={key}
      disabled={key === tabIndex}
      onPress={() => tabChangeHandler(tab, key)}>
      <View style={key === tabIndex ? style.activeBorder : null}>
        <Text style={[style.tabButton, key === tabIndex ? style.active : null]}>
          {tab.name}
        </Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <View>
      <View style={style.tabButtonWrap}>{TabList}</View>
      <GridList
        data={category}
        onPress={onPress}
        type={type}
        itemStyle={itemStyle}
      />
    </View>
  );
};

export default CategoryTab;
