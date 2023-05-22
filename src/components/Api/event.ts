import { get } from "@/utils/api"

export const getEventLists = async () => {
    const data = await get('/event');
    return data;
}