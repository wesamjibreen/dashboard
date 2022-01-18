import {useStorage} from "@vueuse/core";
import {getTokenKey} from "./storage";


const saveToken = (module, data) => {
    let token = useStorage(getTokenKey(module), null);
    token.value = data;
};

const forgetToken = () => {

};


const saveUser = () => {

};


export default {
    saveToken,
    forgetToken,
    saveUser
}