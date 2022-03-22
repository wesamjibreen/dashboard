import useNotyfy from '../composable/useNotyf.js'

export default {
    data: () => ({
    }),
    methods: {
        appConfig(key, defaultVal = "") {
            /**
             *  return config key from form's config object
             *  @author WeSSaM
             */
            return _.get(this.$config, `app.${key}`, defaultVal);
        },
        trans(key) {
            return key ? _.get(this, '$i18n.global.t', (key) => key)(key) : "";
        },
        __showToast() {

        },
        showNotify(type, message) {
            this.notify?.[type](message);
        },
        successNotify(message = "") {
            this.showNotify("success", message);
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        errorNotify(message = "") {
            this.showNotify("error", message);
        },
        getValueByLocale(value, defaultVal = "") {
            if (!(value instanceof Object))
                return value;
            return _.get(value, this.$locale, _.get(Object.entries(value), '0.1', defaultVal));
        }
    },
    computed: {
        $locale() {
            return this.$i18n.global.locale?.value
        },
        notify() {
            return useNotyfy();
            // return new Notyf()
        },
        // ...mapState({
        //     locale: (state) => {
        //         console.log('currentLanguage',state);
        //         return window.currentLocale;
        //     }
        // })

    }
}