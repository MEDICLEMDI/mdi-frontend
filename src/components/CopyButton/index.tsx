import * as React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Beige from '@/assets/images/copy_beige.png';
import Gray from '@/assets/images/copy_gray.png';
import Icon from '../icons';
interface CopyButtonProps {
  color: string;
  imgHeight: number;
  imgWidth: number;
}

const CopyButton = ({ color, imgHeight, imgWidth }: CopyButtonProps) => {
  return (
    <TouchableOpacity>
      <Icon name={'copy'} color={color} style={{ stroke: '#000' }}/>
    </TouchableOpacity>
  );
};

export default CopyButton;
