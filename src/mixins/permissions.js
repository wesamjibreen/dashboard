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
    }
}