import Accordion from '@/components/Accordion';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import MedicleButton from '@/components/buttons/MedicleButton';
import { Row } from '@/components/layout';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityIndicator,
	Linking,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import style from './style';
import Spacing from '@/components/Spacing';
import { Colors, DARK_GRAY_BOLD_14, DARK_GRAY_BOLD_16, DARK_GRAY_BOLD_18, LIGHT_GRAY_12, STANDARD_GRAY_14 } from '@/constants/theme';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '@/components/forms/SearchHeader';
import { DatePicker } from '@/components/Modals';
import { dateSetup } from '@/utils/dates';
import api from '@/components/Api';
import { getStorageData } from '@/utils/localStorage';
import { formatDate } from '@/utils/dates';
import { textEllipsis } from '@/utils/strings';
import { ITxHistory } from '@/interfaces/api';

export default () => {
	const { t } = useTranslation();
	const isFocus = useIsFocused();
	const tab = [{ id: 1, label: '입금 내역' }, { id: 2, label: '출금 내역' }]; // 입금내역,출금내역 상단 탭
	const withdrawStatus = ['출금', '출금 실패'] // 출금시에는 성공,실패 2가지가 존재함
	const tokenTypes = ['ETH', 'MDI']

	const [isLoading, setLoading] = useState(true)
	const [isRefreshing, setRefresh] = useState(true)
	const [visible, setVisible] = useState(false);
	const [date, setDate] = useState({ from: '', to: '' });
	const [tabIndex, setTabIndex] = useState(1) // 입금내역,출금내역 상단 탭 인덱스

	const [histories, setHistories] = useState<ITxHistory[]>([]);
	const [isMore, setMore] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		initialize();
	}, [tabIndex]);

	/**
	 * 페이지 초기화
	 */
	const initialize = () => {
		setHistories([]);
		setPage(1);
		setMore(true);
		handleTabIndexChange(tabIndex, 1);
	}

	/**
	 * 탭 변경에 이벤트 리스너
	 * @param _tabIndex 
	 * @param _page 
	 * @returns 
	 */
	const handleTabIndexChange = async (_tabIndex: number, _page: number) => {
		switch (_tabIndex) {
			case 1:
				return await getDepositHistory(_page);
			case 2:
				return await getWithdawHistory(_page);
		}
	}

	/**
	 * 입금 받은 트랜잭션 내역 가져오기
	 * @param _page 
	 */
	const getDepositHistory = async (_page: number) => {
		setLoading(true);
		try {
			const user = await getStorageData('@User');
			const response = await api.getDepositHistory(user.id, user.mdi.mw_wallet_address, _page);
			setMore(response.message === 'isMore');
			setPage(_page);
			
			if(!response.result) throw response.message;

			const { data } = response;
			if (_page === 1) {
				setHistories(data!)
			} else {
				const arr = histories.concat(data!);
				setHistories(arr)
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	/**
	 * 출금한 트랜잭션 내역 가져오기
	 * @param _page 
	 */
	const getWithdawHistory = async (_page: number) => {
		setLoading(true);
		try {
			const user = await getStorageData('@User');
			const response = await api.getWithdawHistory(user.id, user.mdi.mw_wallet_address, _page);
			setMore(response.message === 'isMore');
			setPage(_page);
	
			if(!response.result) throw response.message;

			const { data } = response;
			if (_page === 1) {
				setHistories(data!)
			} else {
				const arr = histories.concat(data!);
				setHistories(arr)
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<SafeAreaView style={style.containerWrap}>
			<Header goBack={true} title="히스토리" />
			<Row justify="space-around">
				{tab.map((data) => (
				<TouchableOpacity
				key={data.id} 
				onPress={() => setTabIndex(data.id)}
				style={ [tabIndex === data.id && { borderBottomWidth: 3, borderBottomColor: Colors.Medicle.Brown.Standard,}, style.tabButton]}>
				<Text style={ tabIndex === data.id ? DARK_GRAY_BOLD_14 : STANDARD_GRAY_14 }>{data.label}</Text>
				</TouchableOpacity>
				))}
			</Row>
			{/* <View style={style.containerOffset}>
				<SearchBar
					onPress={() => setVisible(true)}
					title="전체"
					period=""
				/>
				<DatePicker
					name="dataPicker"
					modalDirection="flex-end"
					visible={visible}
					onRequestClose={() => setVisible(false)}
					animationType="slide"
					dateResponse={setDate}
					submitEvent={() => console.log(date)}
					resetEvent={() => dateSetup(1, 'week')}
				/>
			</View> */}
			{
				histories.length > 0
				?
				<FlatList
				scrollsToTop={true}
				keyExtractor={(item, key) => item.id}
				onEndReached={ isMore && !isLoading ? () => handleTabIndexChange(tabIndex, page + 1) : null }
				onEndReachedThreshold={0.1}
				ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
				data={histories}
				renderItem={({ item }: any) => (
					<BoxDropShadow style={style.elementOffset}>
						<TouchableOpacity>
							<Row justify="space-between">
								<Text style={[LIGHT_GRAY_12]}>{formatDate(item.data, 'YYYY-MM-DD H:m:s')}</Text>
								{ tabIndex == 2 && <Text style={[LIGHT_GRAY_12]}>{withdrawStatus[item.status - 1]}</Text> }
							</Row>
							<Text style={[style.transactionHash]}>{textEllipsis(item.txid, 14, 14)}</Text>
							<Text style={[DARK_GRAY_BOLD_18, style.transactionBalance]}>{item.amount} {tokenTypes[item.type]}</Text>
						</TouchableOpacity>
					</BoxDropShadow>
				)} />
				:
				<View style={style.historyWrap}>
					{
						isLoading
						? <ActivityIndicator size="large" />
						: <Text>트랜잭션 정보가 없습니다.</Text>
					}
				</View>
			}
		</SafeAreaView>
	);
};
