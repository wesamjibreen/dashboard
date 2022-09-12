import JwtService from "../../utils/jwt";
import { useStorage } from "@vueuse/core";
import { computed } from 'vue';
import useNotyf from "../../composable/useNotyf";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";

export default function (base) {
    const notify = useNotyf();
    const user = useStorage(
        `${base}_user`,
        null,
        undefined,
        {
            serializer: {
                read: (v) => v ? JSON.parse(v) : null,
                write: (v) => JSON.stringify(v),
            }
        }
    );

    const token = useStorage(`${base}_token`, null);

    const isAuthenticated = computed(() => {
        return !!token.value;
    });

    const state = {
        errors: null,
        isAuthenticated: isAuthenticated.value,
        user: user.value,
        token: token.value,
    };


    const getters = {
        currentUser(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        }
    };
    const actions = {
        [LOGIN]({ commit }, { credentials, ref }) {
            return ref.request(
                ref.$endPoint('auth.login'),
                credentials,
                ({ data }) => {
                    notify.success(data.message);
                    ref.$router.push({ name: "dashboard" }).then(() => {
                        commit(SET_AUTH, data);
                        ref.$bus.emit('authenticated', data);
                        // ref.$router.go();
                    });
                },
                (xhr) => {
                    let message = _.get(xhr, 'data.message', '');
                    notify.error(message);
                }
            );
        },
        [LOGOUT](context) {
            context.commit(PURGE_AUTH);
        },
        [REGISTER](context, credentials) {
            return new Promise(resolve => {
                ApiService.post("login", credentials)
                    .then(({ data }) => {
                        context.commit(SET_AUTH, data);
                        resolve(data);
                    })
                    .catch(({ response }) => {
                        context.commit(SET_ERROR, response.data.errors);
                    });
            });
        },
        [VERIFY_AUTH](context) {
            if (JwtService.getToken()) {
                ApiService.setHeader();
                ApiService.get("verify")
                    .then(({ data }) => {
                        context.commit(SET_AUTH, data);
                    })
                    .catch(({ response }) => {
                        // context.commit(SET_ERROR, response.data.errors);
                    });
            } else {
                context.commit(PURGE_AUTH);
            }
        },
        [UPDATE_PASSWORD](context, payload) {
            const password = payload;

            return ApiService.put("password", password).then(({ data }) => {
                context.commit(SET_PASSWORD, data);
                return data;
            });
        }
    };

    const mutations = {
        [SET_ERROR](state, error) {
            state.errors = error;
        },
        [SET_AUTH](state, response) {
            let data = response.data;
            state.user = user.value = data.auth;
            state.token = token.value = data.access_token;
            state.errors = {};
            state.isAuthenticated = true;
        },
        [PURGE_AUTH](state, module) {
            state.isAuthenticated = false;
            state.user = user.value = {};
            state.errors = {};
            state.token = token.value = null;
        }
    };

    return {
        state,
        actions,
        mutations,
        getters
    };

};