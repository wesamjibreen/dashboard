import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            form: function (state) {
                /**
                 * computed property returns object form from vuex form module
                 *
                 * @author WeSSaM
                 */
                return _.get(state, this.formModule$, {});
            },


            dialogForm: function (state) {
                /**
                 * computed property returns object form from vuex form module
                 *
                 * @author WeSSaM
                 */
                return _.get(state, this.dialogFormModule, {});
            },

            /**
             * binding  setting state object with computed property
             * @returns {Object}
             * @author WeSSaM
             */
            setting: state => state.setting,

            /**
             * Check if page has full screen dialog
             * @returns {boolean}
             */
            hasDialog: state => state.dialog.displayed,
        })
    }
}