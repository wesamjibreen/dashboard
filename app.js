import {createApp as createClientApp, h, resolveDynamicComponent, Transition} from "vue";
import {RouterView} from "vue-router";
import CKEditor from '@mayasabha/ckeditor4-vue3';
import useNotify from "../Modules/Supervisor/Resources/js/composable/useNotify";

// const hPath = require('path');

export async function asyncRegisterComponent(path, app) {
    // const requireComponent = await require.context(
    //     // The relative path of the components folder
    //     path,
    //     // Whether or not to look in subfolders
    //     true,
    //     // The regular expression used to match base component filenames
    //     /[A-Z]\w+\.(vue|js)$/
    //     , 'lazy'
    // );
    // console.log('requireComponent',requireComponent.keys());

    // requireComponent.keys().forEach(async fileName => {
    //     const componentName = _.upperFirst(
    //         _.camelCase(
    //             fileName.split('/').pop().replace(/\.\w+$/, '')
    //         )
    //     );
    //     // Get component config
    //     const componentConfig = await requireComponent(fileName)
    //     // Get PascalCase name of component
    //
    //     app.component(componentName, componentConfig.default || componentConfig)
    //
    //     // Register component globally
    //     // Vue.component(
    //     //     componentName,
    //     //     // Look for the component options on `.default`, which will
    //     //     // exist if the component was exported with `export default`,
    //     //     // otherwise fall back to module's root.
    //     //     componentConfig.default || componentConfig
    //     // )
    // })

}

export async function createApp({enhanceApp, modules}) {
    const app = createClientApp({
        setup() {
            return () => {
                const defaultSlot = ({Component: _Component}) => {
                    const Component = resolveDynamicComponent(_Component);
                    return [
                        h(
                            Transition,
                            {name: 'fade-slow', mode: 'out-in'},
                            {
                                default: () => [h(Component)],
                            }
                        ),
                    ]
                };

                return [
                    h(RouterView, null, {
                        default: defaultSlot,
                    })
                ]
            }
        },
    });
    let router = modules[1];

    // router.beforeEach((to, from) => {
    //     if (true) {
    //         let query = {};
    //         if (to.fullPath !== "/") {
    //             const notif = useNotify();
    //             notif.error({
    //                 message: 'لقد إنتهت الجلسة الخاصة بك, يرجى تسجيل الدخول',
    //                 duration: 7000,
    //             });
    //             query = {redirect: to.fullPath};
    //         }
    //
    //         return {
    //             name: 'login',
    //             query
    //         }
    //     }
    // });

    // app.use(head);
    app.use(router);
    app.use(CKEditor);

    if (enhanceApp) {
        await enhanceApp(app)
    }

    return {
        app,
        router,
        // head
    }
}


