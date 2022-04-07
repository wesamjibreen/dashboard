import { computed, inject, ref, watch } from 'vue'
import useRequest from "./useRequest";

export default function useNotifications() {
    const appConfig = inject('$config');
    const config = _.get(appConfig, 'app.notifications', null);


    let { endPoint, request } = useRequest();
    const fetchNotifications = (callback, showLatest = false) => {
        const url = showLatest ? `/api/admin/notification?latest=${config.displayLatest}` : "/api/admin/notification"
        request(
            { method: "GET", url },
            { params: {} },
            {
                success: ({ data }) => {
                    callback(data.data)
                },
                error: (err) => { },
            }
        );
    };


    return {
        config,
        fetchNotifications,
    }
}