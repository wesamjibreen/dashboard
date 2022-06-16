export default {
    computed: {
        permissionsEnabled() {
            return _.get(this, "$config.app.permissions.enabled", false);
        },
        policies() {
            let $auth = JSON.parse(localStorage.getItem(`${this.$base}_user`, {}));
            let policies = $auth?.policies;
            return policies ? atob(policies).split(",") : [];
        },
    },
    methods: {
        hasPermission(policy) {
            let policyKey = policy.replace("_", "-");
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