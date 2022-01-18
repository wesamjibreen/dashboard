import {useField} from 'vee-validate'
import {computed} from "vue";

import * as yup from "yup";

export function useInputField(props) {

    // let rules = yup.string;
    // _.forEach(props.rules, (rule, key) => {
    //     if (rule && rules[key] instanceof Function)
    //         rules = rules[key]();
    // });
    //
    // let rules = yup.object({
    //     email: yup.string().required().email(),
    //     password: yup.string().required().min(8),
    // })
    // console.log('yup rules', rules);
    //
    // console.log('_.keys(props.rules)',_.keys(props.rules));

    // console.log('useInputField', props.rules, rules);
    // alert(props.component);
    const {errorMessage, meta, value} = useField(props.model, {});
    let invalid = computed(() => {
        return errorMessage && meta.touched
    });

    return {
        errorMessage,
        meta,
        invalid,
        value
    };
}
