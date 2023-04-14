import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  status: {
    marginTop: 10,
    marginBottom: 20,
  },
  justifyTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDate: {
    marginBottom: 20,
  },
  infoWrap: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Medicle.Gray.Light,
  },
  priceWrap: {
    marginBottom: 20,
  },
  button: {
    height: 35,
    borderRadius: 10,
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 20,
    marginRight: 15,
  },

  // detail page
  itemBox: {
    marginBottom: 20,
  },
  detailHeader: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  detailWrap: {
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailText: {
    textAlign: 'left',
  },
  detailTextLabel: {
    flex: 1,
  },
  dentalTextContent: {
    flex: 2,
  },

  // modal 
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Medicle.ModalBackground,
    flex: 1,
  },
  modalContainer: {
    backgroundColor: Colors.Medicle.White,
    width: 320,
    height: 150,
    borderRadius: 15,
    paddingTop: 20,
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
  modalCloseButton: {
    width: 15,
    height: 15,
  },
  modalContent: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: Colors.Medicle.Font.Red,
    fontWeight: '700',
    fontSize: 16,
  },
  modalCancelButton: {
    flex: 1,
    borderBottomStartRadius: 15,
    height: 50,
    backgroundColor: Colors.Medicle.Font.Gray.Standard,
  },
  modalCheckButton: {
    flex: 1,
    borderBottomEndRadius: 15,
    height: 50,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.Medicle.Font.White,
  },

  modalText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.Medicle.Font.Brown.Dark,
  },
});
