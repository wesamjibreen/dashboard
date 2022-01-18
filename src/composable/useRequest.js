// import instance from "../plugins/axios";
import {inject} from "vue";

export default function useRequest() {

    const instance = inject('$axiosInstance');
    const endPoint = inject('$endPoint');

    // console.log('endPoint',endPoint,  endPoint('auth.login'))

    const request = function ({method, url, header}, data, callbacks = {}) {
        return instance[method.toLowerCase()](url, data, header)
            .then((response) => {
                if (response.data.status)
                    fireCallback(callbacks, 'success', response);
                else
                    fireCallback(callbacks, 'error', response);

            })
            .catch((xhr) => {
                fireCallback(callbacks, 'error', xhr);
            }).finally(fireCallback(callbacks, 'finally'));
    };

    const fireCallback = function (callbacks, callbackName, ...args) {
        let callback = callbacks?.[callbackName];
        if (callback instanceof Function)
            return callback(...args);
        return callback;
    };

    // let _this = this;
    // success_callback = success_callback || _this.onSuccess;
    // error_callback = error_callback || _this.onError;
    // let method = (end_point.method) ? end_point.method.toLowerCase() : 'get';
    // let header = this.getRequestHeader();
    // if (method === 'get' || method === 'GET') {
    //     let query = _this.$route && _this.$route.query ? _this.$route.query : {};
    //     data.params = {
    //         ...query,
    //         ...data.params,
    //     };
    // }
    // return instance[method](end_point.url, data, header).then(function (response) {
    //     switch (response.data.status) {
    //         case Constants.SUCCESS_RESPONSE:
    //             return success_callback(response); // success handler
    //         case Constants.ERROR_RESPONSE :
    //             return error_callback(response); // error handler
    //     }
    // }).catch(error_callback).finally(finally_callback || this.onFinally);
    return {
        request,
        endPoint
    };
}