const state = () => ({
    isSubmitted : false,
    validator : {}
});
export const BUSY_FIELDS = "busyFields";

export const UPDATE_VALIDATOR = "updateValidator";
// mutation types
export const SET_SUBMITTED = "setSubmitted";
export const SET_INPUT = "setInput";
export const SET_FORM = "setForm";
export const SET_ERRORS = "setErrors";
export const EMPTY_FORM = "emptyForm";
export const SET_BUSY_FIELDS = "setBusyFields";

// getters types
export const GET_INPUT = "getInput";
export const GET_FORM = "getForm";
export const GET_REPEATER = "getRepeater";

// actions types
export const SUBMIT_FORM = "submitForm";

const getters = {
    [GET_FORM](state) {
        return state;
    },
    //   [GET_BUSY_FIELDS](state) {
    //       console.log('get busy state', state[busyFields]);
    //     return state[busyFields];
    //   }
    [GET_REPEATER]: state => model => {
        return state[model];
    }
};

const actions = {
    [SUBMIT_FORM](context, {formContext, endPoint, data}) {
        return new Promise((resolve, reject) => {
            formContext.request(
                endPoint,
                data,
                function ({data}) {
                    resolve(data);
                },
                function (response) {
                    reject(response);
                }
            );
        });
    }
    // [FETCH_OPTIONS](context , paylod)
};

const mutations = {
    [SET_INPUT](state, {model, value, locale}) {
        if (locale) {
            if (!state[model])
                state[model] = {};
            state[model][locale] = value;
        } else
            state[model] = value;
    },

    [SET_FORM](state, form) {
        Object.assign(state, form);
    },

    [SET_ERRORS](state, errors) {
        state.errors = errors ?? {};
    },

    [UPDATE_VALIDATOR](state, validator) {
        state.validator = validator ?? [];
    },
    [SET_SUBMITTED](state, newVal) {
        state.isSubmitted = !!newVal;
    },

    [EMPTY_FORM](state, _this) {
        Object.assign(
            state,
            _.transform(
                state,
                function (result, value, key) {
                    if (typeof value === "number") result[key] = 0;
                    else result[key] = null;
                },
                {}
            )
        );
        Bus.emit("form-data-emptied", _this.formModule);
    },
    [SET_BUSY_FIELDS](state, value) {
        window.$vm.$set(state, BUSY_FIELDS, value);
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true // making our module reusable
};
