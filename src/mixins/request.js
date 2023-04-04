import Constants from "../utils/constants";
import {Exception} from "sass";


export default {
    data() {
        return {
            header: {
                'Content-type': 'application/json'
            }
        }
    },
    methods: {
        request: function (end_point, data = {}, success_callback = undefined, error_callback = undefined, finally_callback = undefined, is_loader_displayed = true) {
            let _this = this;
            success_callback = success_callback || _this.onSuccess;
            error_callback = error_callback || _this.onError;
            if (!end_point.method || !end_point.url) return console.error("EndPoint not found")
            let method = (end_point.method) ? end_point.method.toLowerCase() : 'get';
            let header = this.getRequestHeader();
            if (method === 'get' || method === 'GET') {
                let query = _this.$route && _this.$route.query ? _this.$route.query : {};
                data.params = {
                    ...query,
                    ...data.params,
                };
            }
            return this.$axiosInstance[method](end_point.url, data, header).then(function (response) {
                switch (response.data.status) {
                    case Constants.SUCCESS_RESPONSE:
                        return success_callback(response); // success handler
                    case Constants.ERROR_RESPONSE :
                        return error_callback(response); // error handler
                }
            }).catch(error_callback).finally(finally_callback || this.onFinally);
        },
        getRequestHeader() {
            let _this = this;
            return {
                headers: _this.header
            }
        },
        onSuccess: function (response) {
            // called if success callback not exists
        },
        onError(xhr) {
            // called if error callback not exists

        },
        onFinally(data) {
            //called if finally callback not exists
        },
    }
}
