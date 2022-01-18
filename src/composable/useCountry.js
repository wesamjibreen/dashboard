import {computed, inject, ref, watch} from 'vue'
import {useStorage} from '@vueuse/core'
import {useStore} from 'vuex'
import {SET_CURRENT_COUNTRY} from "../store/modules/setting.module";

export default function useCountry() {
    const base = inject('$base');
    const config = inject('$config');

   const defaultCountryConfig =  _.get(config,'app.countries.default',null);
    const country = ref();
    const defaultCountry = useStorage(`${base}_country`, defaultCountryConfig);
    const store = useStore();

    /**
     * We use the same storage key as we use in the /src/i18n.ts file
     * so if user reload the page, the selected language will be the same
     */

    const countries = computed(() => {
        return _.get(store, 'state.setting.countries', []);
    });

    const countryObject = computed(() => {
        return _.get(store, 'state.setting.currentCountry', {});
    });

    const flagUrl = computed(() => {
        return countryObject.value.icon_url ?? `https://country-tools.com/flags/cercle/512x512/${defaultCountry.value?.toLowerCase()}.png`
    });


    store.commit(`setting/${SET_CURRENT_COUNTRY}`, _.find(countries.value, {value: defaultCountry.value}) ?? {});

    /**
     * Each time we change the locale, we persit it in the storage
     */
    watch(country, () => {
        defaultCountry.value = country.value;
        store.commit(`setting/${SET_CURRENT_COUNTRY}`, _.find(countries.value, {value: defaultCountry.value}) ?? {})
    });

    return {
        countries,
        defaultCountry,
        base,
        countryObject,
        flagUrl,
        country
    }
}