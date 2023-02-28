import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  amountLayer: {
    marginTop: 20,
    // backgroundColor: 'red',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#443927',
  },
  sendLayer: {
    // backgroundColor: 'green',
    marginTop: 20,
  },
  sendLayerMiddle: {
    // flexDirection: 'row',
    // height: 100,
    marginTop: 20,
  },
  sendLayerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333333',
    // marginTop: 10,
    // marginLeft: 10,
  },
  sendInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#989898',
  },
  sendInputText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: 277,
    height: 256,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#443927',
  },
  modalCloseButton: {
    width: 15,
    height: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  modalHeaderRight: {
    position: 'absolute',
    right: 0,
  },
});
