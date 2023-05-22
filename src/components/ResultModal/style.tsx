import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
  },
  modal: {
    width: 277,
    height: 210,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalPaddingLayer: {
    paddingHorizontal: 20,
    marginTop: 24,
    flex: 1,
  },
  deleteButton: {
    marginTop: 'auto',
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalContent: {
    // backgroundColor: 'red',
    flex: 1,
  },
  image: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'center',
  },
});
