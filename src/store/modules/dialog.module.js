export const SHOW_DIALOG = "showDialog";
export const SET_DIALOG_DISPLAYED = "setDialogDisplayed";
export const SET_DIALOG_FORM_MODULE = "setDialogFormModule";

const state = () => ({
  displayed: false,
  config: {
    color: "primary"
  },
  formModule: ""
});
// module getters
const getters = {};

// module actions
const actions = {};

// module mutations
const mutations = {
  [SHOW_DIALOG](state, config) {
    state.displayed = true;
    state.config = config;
  },
  [SET_DIALOG_DISPLAYED](state, displayed) {
    state.displayed = displayed;
  },
  [SET_DIALOG_FORM_MODULE](state, formModule) {
    state.formModule = formModule;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
