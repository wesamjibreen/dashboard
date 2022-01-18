export default {
    props: {
        desktopOpened: {
            default: false,
        },
        activeSubSidebar: {
            default: null
        }
    },
    computed: {
        title() {
            return this.trans(_.get(this, 'activeMenu.label', ''));
        },
        items() {
            return _.get(this, 'activeMenu.children', []);
        },
        activeMenu() {
            return _.find(this.menu, (item) => {
                return item.key == this.activeSubSidebar;
            })
        },
        menu() {
            return _.get(this.$instance, 'config.menu', [])
        },
    }
}
