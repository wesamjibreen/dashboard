import {createRouter, createWebHistory} from "vue-router";
import NProgress from 'nprogress'
import {BaseLayout} from "../modules";
import {useStorage} from "@vueuse/core";
import {getTokenKey} from "./utils/storage";

const initRouter = function (routes, base = "/") {
    routes = [
        {
            path: "",
            beforeEnter: checkAuth(base),
            component: BaseLayout,
            children: [
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: () => import('./pages/dashboard/Index'),
                },
                {
                    path: "/login",
                    name: "login",
                    component: () => import('./pages/auth/Login'),
                },
                {
                    path: "/setting",
                    name: "setting",
                    component: () => import('./pages/setting/Index.vue'),
                },
                // {
                //     path: "/form",
                //     redirect: "/form/all",
                //     component: () => import('./pages/form/Index.vue'),
                //     children: [
                //         {
                //             path: "create",
                //             name: "form.create",
                //             component: () => import('./pages/form/Create.vue'),
                //         },
                //         {
                //             path: "all",
                //             name: "form.all",
                //             component: () => import('./pages/form/List.vue'),
                //         },
                //         {
                //             path: ":id/edit",
                //             name: "form.edit",
                //             component: () => import('./pages/form/Create.vue'),
                //         },
                //
                //     ]
                // },
                // {
                //     path: "/country",
                //     redirect: "/country/all",
                //     component: () => import('./pages/country/Index.vue'),
                //     children: [
                //         {
                //             path: "create",
                //             name: "country.create",
                //             component: () => import('./pages/country/Create.vue'),
                //         },
                //         {
                //             path: "all",
                //             name: "country.all",
                //             component: () => import('./pages/country/List.vue'),
                //         },
                //         {
                //             path: ":id/edit",
                //             name: "country.edit",
                //             component: () => import('./pages/country/Create.vue'),
                //         },
                //
                //     ]
                // },
                ...routes,
            ]
        },
    ];
    console.log('routes', routes);
    const router = createRouter({
        base: `/${base}`,
        history: createWebHistory(`/${base}`),
        routes, // short for `routes: routes`
    });
    /**
     * Handle NProgress display on page changes
     */

    router.beforeEach((to, from) => {
        NProgress.start();

    });
    router.afterEach((to, from) => {
        NProgress.done();

    });
    return router;
};


const generateRoutes = ({resource, folderName = null, path}, routes = []) => {
    folderName = folderName || _.camelCase(resource);
    console.log('path', path);
    // console.log('path',path.resolve(`/pages/${folderName}/Index.vue`));

    return {
        path: `${resource}`,
        name: resource,
        redirect: `${resource}/all`,
        // component :  import(path.resolve(`/pages/${folderName}/Index.vue`)),
        component: () => import(`./pages/${folderName}/Index.vue`),
        children: [
            {
                path: "all",
                name: `${resource}.all`,
                component: () => import(`./pages/${folderName}/List.vue`),
            },
            {
                path: "create",
                name: `${resource}.create`,
                component: () => import(`./pages/${folderName}/Create.vue`),
                // component : () => import(path.resolve(`/pages/${folderName}/Create.vue`)),
            },
            {
                path: ":id/edit",
                name: `${resource}.edit`,
                // component : () => import(path.resolve(`/pages/${folderName}/Create.vue`)),
                component: () => import(`./pages/${folderName}/Create.vue`),
            },
            ...routes
        ]
    };
};


// const importViewModule = function (folderName, viewName, module = "") {
//     return import(`${module}/${folderName}/${viewName}`);
// };


const checkAuth = (base) => {
    return (to, from, next) => {
        let isAuthenticated = useStorage(getTokenKey(base), null).value;
        switch (true) {
            case !isAuthenticated :
                if (to.name === "login")
                    next();
                else
                    next({name: "login"});
                return;

            case   !to.name || to.name === "login":
                next({name: 'dashboard'});
                return;

            default :
                next();
        }
    }
};
export {
    initRouter,
    generateRoutes
};
