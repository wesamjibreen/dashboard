import {createApp as createClientApp, h, resolveDynamicComponent, Transition} from "vue";
import {RouterView} from "vue-router";
import CKEditor from '@mayasabha/ckeditor4-vue3';

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


