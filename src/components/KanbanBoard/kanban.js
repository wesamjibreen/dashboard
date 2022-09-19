export default {
    props: ['data', 'model'],
    methods :{
        $get(...args){
            return _.get(...args);
        },
        isIconify(icon) {
            return icon && icon.indexOf(':') !== -1;
        }
    },
    computed: {
        model$() {
            return this.model;
        },
        data$() {
            return this.data;
        },
        textKey() {
            return _.get(this.model$, 'text', 'text');
        },
        iconKey() {
            return _.get(this.model$, 'icon', 'icon');
        },
        valueKey() {
            return _.get(this.model$, 'value', 'value');
        }
    }
}
