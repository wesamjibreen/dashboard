export default {
    props: ['data', 'model'],
    methods: {
        $get(...args) {
            return _.get(...args);
        },
        isIconify(icon) {
            return icon && icon.indexOf(':') !== -1;
        },
        getClass(item) {
            return _.get(item, "class", "info");
        },
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
        },
        cols() {
            if (this.data$.length >= 4)
                return 3;
            if (this.data$.length === 3)
                return 4;
            if (this.data$.length === 2)
                return 6;
            return 12;
        }
    }
}
