import {defineAsyncComponent} from 'vue'


const resolveComponents = function (components) {
    let resolvedComponents = {};
    Object.entries(components).forEach((component) => {
        resolvedComponents[component[0]] = defineAsyncComponent(() =>
            import(`${component[1]}`)
        );
    });
    return resolvedComponents;
};

export  {
    resolveComponents
}