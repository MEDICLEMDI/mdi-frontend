import Api from "@/components/Api";
import { responseDTO } from "@/interfaces/api"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageData } from "./localStorage";

export const userRefresh = async () => {
    const response: responseDTO = await Api.userRefresh();
    if (response.result) {
        await AsyncStorage.setItem('@User', JSON.stringify(response.data));
    }
    return await getStorageData('@User');
};