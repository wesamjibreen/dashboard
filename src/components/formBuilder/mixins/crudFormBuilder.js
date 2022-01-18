// import {EMPTY_FORM, GET_FORM, SET_FORM, SET_INPUT} from "../../../store/modules/form.module";
import basic from "./basic";


export default {
    mixins: [basic],
    props: {
        inputs: Array,
        columns: Array,
        dialogResource: String,
        hasActions: {
            required: false,
            default: true
        },
        addToForm: Function
    },
    data() {
        return {}
    },

    computed: {
        resource$() {
            return this.resource;
        },
        formModule$() {
            /**
             * overwritten computed property returns formModule
             * this property may overwritten with new value in other builder mixins
             *
             * @author WeSSaM
             */
            return this.crudFormModule
        },

        isEdit$() {
            /**
             * computed property returns if current state is edit
             * check if route params has resource id
             *
             * @author WeSSaM
             */
            return !!this.item;
        },


        __getId() {
            /**
             * computed property returns current resource id
             * @author WeSSaM
             */
            return _.get(this, 'item.id', 0);
        },


        submitEndPoint() {
            /**
             * computed property returns function to manipulate end point
             * if this form is edit returns update endpoint based on resource$
             * otherwise will returns create end point
             *
             * @author WeSSaM
             */
            return function () {
                // return this.isEdit$ && !this.hasDialog ? this.route$(`${this.resource$}.update`, this.__getId) : this.route$(`${this.resource$}.store`);
            }.bind(this);
        },


        findEndPoint() {
            /**
             * computed property returns find end point
             * @author WeSSaM
             */
            // return this.route$(`${this.resource$}.find`, this.__getId);
        },


        title$() {
            /**
             * computed property returns translated page title based on resource$
             * @author WeSSaM
             */
            return this.isEdit$ ? this.trans(`${this.resource$}.edit`) + this.objectTitle : this.trans(`${this.resource$}.create`);
        },

        defaultRedirectRoute() {
            /**
             * computed property returns default route for redirection after submitting form
             * @author WeSSaM
             */
            return {name: `${this.resource$.replace("_", "-")}.all`};
        },
    }
}
