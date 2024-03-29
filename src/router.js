import {createRouter, createWebHistory} from "vue-router";
import NProgress from 'nprogress'
import {BaseLayout} from "../modules";
import {useStorage} from "@vueuse/core";
import {getTokenKey} from "./utils/storage";
const initRouter = function (routes, base = "/", config = {}) {
    routes = [
        {
            path: "",
            beforeEnter: checkAuth(base, config),
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
                {
                    // path: config.app.notifications.route,
                    path: '/notifications/all',
                    name: "notifications",
                    component: () => import('./pages/dashboard/Notifications.vue'),
                },

                ...routes,
            ]
        },
        {
            path: "/404",
            name: "error.404",
            component: () => import('./pages/error/page-1'),
        },
        {
            path: "/401",
            name: "error.401",
            component: () => import('./pages/error/401'),
        },
        {
            path: "/500",
            name: "error.500",
            component: () => import('./pages/error/401'),
        },
    ];
    const router = createRouter({
        base: `/${base}`,
        history: createWebHistory(`/${base}`),
        routes, // short for `routes: routes`
    });
    /**
     * Handle NProgress display on page changes
     */
    router.beforeEach((to, from) => {
        if (to.name === 'notifications' && !config.app.notifications.display) {
            router.push({name: 'dashboard'});
        }

        let hasPermissions = _.get(config, 'app.permissions.enabled', false);
        let toName = to.name ?? "";

        if (
            hasPermissions &&
            !toName.includes("error") &&
            !['login', 'dashboard'].includes(toName)
        ) {
            let $auth = useStorage(`${base}_user`, {});
            let policies = $auth.value?.policies ? atob($auth.value?.policies).split(",") : [];

            if (!policies.includes(toName) &&
                !policies.includes(toName.replace("all", "show").replaceAll("_", "-")) &&
                !policies.includes(`others.${toName}`)
            )
                return {
                    name: 'error.401'
                };
        }
        NProgress.start();
    });

    router.afterEach((to, from) => {
        NProgress.done();
    });
    return router;
};


const generateRoutes = (
    {resource, config = {}, folderName = null, path},
    routes = []
) => {
    folderName = folderName || _.camelCase(resource);
    return {
        path: `${resource}`,
        name: resource,
        redirect: `${resource}/all`,
        component: () => import(`./pages/resource/Index.vue`),
        children: [
            {
                path: "all",
                name: `${resource}.all`,
                props: config,
                component: () => import(`./pages/resource/List.vue`),
            },
            {
                path: "create",
                name: `${resource}.create`,
                props: config,
                component: () => import(`./pages/resource/Create.vue`),
            },
            {
                path: ":id/edit",
                name: `${resource}.edit`,
                props: config,
                component: () => import(`./pages/resource/Create.vue`),
            },
            ...routes
        ]
    };
};
const checkAuth = (base, config = {}) => {
    return (to, from, next) => {
        let isAuthenticated = useStorage(getTokenKey(base), null).value;
        switch (true) {
            case !isAuthenticated:
                if (to.name === "login")
                    next();
                else
                    next({name: "login"});
                return;

            case !to.name || to.name === "login":
                next({name: 'dashboard'});
                return;

            default:
                next();
        }
    }
};
export {
    initRouter,
    generateRoutes
};
