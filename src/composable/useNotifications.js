import {computed, inject, ref, watch} from 'vue'
import useRequest from "./useRequest";

export default function useNotifications() {
    const appConfig = inject('$config');
    const config = _.get(appConfig, 'app.notifications', null);


    let {endPoint, request} = useRequest();
    const fetchNotifications = (callback, showLatest = false, page = 1) => {
        const url = showLatest ? `/api/admin/notification?page=${page}&latest=${config.displayLatest}` : `/api/admin/notification?page=${page}`
        return request(
            {method: "GET", url},
            {params: {}},
            {
                success: ({data}) => {
                    callback(data.data, data.paginator)
                },
                error: (err) => {

                },
            }
        );
    };


    return {
        config,
        fetchNotifications,
    }
}
