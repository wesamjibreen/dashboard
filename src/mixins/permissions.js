export default {
    data: () => ({
        hashedPolicies: "",
    }),
    mounted() {
        this.$bus.off("app-init");
        this.$bus.on("app-init", (data) => {
            this.hashedPolicies = data?.data?.auth?.policies;
        });
    },
    computed: {
        permissionsEnabled() {
            return _.get(this, "$config.app.permissions.enabled", false);
        },
        policies() {
            return this.getAuthPermissions();
        },
    },
    methods: {
        getAuthPermissions() {
            let $auth = JSON.parse(localStorage.getItem(`${this.$base}_user`, {}));
            let policies = this.hashedPolicies ? this.hashedPolicies : $auth?.policies;
            return policies ? atob(policies).split(",") : [];
        },
        hasPermission(policy) {
            let policyKey = policy.replaceAll("_", "-");
            return this.permissionsEnabled ? this.policies.includes(policyKey) : true;
        },
        hasActionsPermissions(resource, actions) {
            if (!actions) return false;
            if (!this.permissionsEnabled) return actions.length

            let hasPermissions = false;
            actions.forEach(
                function (action) {
                    if (this.hasPermission(`${resource}.${action.slug}`)) {
                        hasPermissions = true;
                    }
                }.bind(this)
            );
            return hasPermissions;
        },
    }
}
