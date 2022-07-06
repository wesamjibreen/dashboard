import { computed, inject, reactive, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useStore } from 'vuex'
import { SET_CURRENT_DETERMINANT } from "../store/modules/setting.module";
import useRequest from "./useRequest";

export default function useDeterminant() {
    const base = inject('$base');
    const config = inject('$config');

    const endpoint = _.get(config, 'app.determinants.endpoint', null);
    const providerConfig = _.get(config, 'app.determinants', null);
    const model = ref();
    const component = ref();
    const determinants = ref([]);
    const storedDet = useStorage(`${base}_determinant`, null)
    const determinantKey = useStorage(`${base}_determinant_key`, null)
    const determinant = ref();
    const store = useStore();

    const isChecked = function (detKey) {
        return determinant?.value?.key === detKey
    };

    determinant.value = storedDet.value ? JSON.parse(storedDet.value) : null;
    store.commit(`setting/${SET_CURRENT_DETERMINANT}`, determinant.value)

    // fetch determinants
    let { request } = useRequest();
    request(
        endpoint,
        { params: {} },
        {
            success: ({ data }) => {
                model.value = data.data.model
                component.value = data.data.component
                determinants.value = data.data.determinants
                determinantKey.value = data.data.key

                // set default determinant
                if (!determinant.value && !!determinants.value) {
                    onDeterminantChange(determinants.value[0])
                }
            },
            error: (err) => { },
        }
    );


    const onDeterminantChange = function (det) {
        store.commit(`setting/${SET_CURRENT_DETERMINANT}`, det)
        storedDet.value = JSON.stringify(det);
        determinant.value = JSON.parse(storedDet.value)

        window.Bus.emit('on-determinant-change', det);
    };

    return {
        onDeterminantChange,
        determinants,
        determinant,
        model,
        component,
        providerConfig,
        base,
        isChecked,
        determinantKey,
    }
}
