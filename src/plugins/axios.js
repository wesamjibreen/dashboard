import * as axios from "axios";
// import {getToken} from "@common/core/services/jwt.service";
// import {getCountry} from "@common/core/services/jwt.service";
// import {UNIQUE_RESOURCE,destroyCountry, destroyToken, destroyUser} from "@common/core/services/jwt.service";

const instance = axios.create();
instance.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/json';
    // if (config.headers) {
    //   config.headers.language = localStorage.getItem('language');
    //   config.headers.country = getCountry();
    // }
    // if (getToken())
    //   config.headers.common.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  error => Promise.reject(error)
);

// instance.interceptors.response.use(
//   response => {
//     const {status, message} = response.data;
//     if (!status) {
//       switch (response.data.error_code) {
//         case 102 :
//           break;
//         case 106 :
//           Bus.$emit('force-logout');
//           // destroyUser();
//           // destroyToken();
//           // destroyCountry();
//           // window.location.href = `/${UNIQUE_RESOURCE}/login`;
//           break;
//         default :
//           break;
//       }
//       return response;
//     }
//     return response;
//   },
//   error => {
//     console.log('error', error)
//     const {status} = error.response;
//     console.error('error.response', error.response);
//     // console.error("response", status)
//     // Show the user a 500 error
//     if (status >= 500) {
//       Brilliant.$emit('error', error.response.data.message)
//     }
//
//     // Handle Session Timeouts
//     if (status === 401) {
//       window.location.href = Brilliant.config.base
//     }
//
//     // Handle Forbidden
//     if (status === 403) {
//       router.push({name: '403'})
//     }
//
//     // Handle Token Timeouts
//     if (status === 419) {
//       Brilliant.$emit('token-expired')
//     }
//
//     return Promise.reject(error)
//   }
// );

export default instance;
