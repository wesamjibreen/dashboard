import {useRoute} from "vue-router";
import {getValueByLocale} from "../../../utils/helper";

export default {
    props: {
        resource: {
            required: false,
            default: null
        },
        columns: Array,
        actions: Array,
        filters: Array,
    },
    data() {
        return {
            filter: {
                search: ""
            },
            loading: true,
            mounted: false,
            rows: [],
            paginator: null
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const route = useRoute();
            if (!route.query[this.pageKey]) {
                let query = Object.assign({}, route.query);
                query[this.pageKey] = 1;
                this.$router.push({query})
            }

            this.onReload(() => {
                this.fetch();
            });

            this.initAction();
        },

        initAction() {
            this.initActionEvent('edit', (row, data = {}) => {
                this.$router.push({name: `${this.resource}.edit`, params: {id: row.id}});
            });
            this.initActionEvent('delete', (row, data = {}) => {
                this.$bus.emit('confirmation-dialog',
                    true,
                    {
                        title: this.trans("sure_to_delete"),
                        // message: this.trans("sure_to_delete_text"),
                        type: "warning",
                        callback: () => {
                            this.loading = true;
                            this.request(
                                this.$endPoint(`${this.resource}.delete`, row.id),
                                {},
                                ({data}) => {
                                    this.value = false;
                                    window.Bus.emit('confirmation-dialog', false);
                                    window.Bus.emit(`reload-table-${this.resource}`);
                                    this.successNotify(data.message);
                                },
                                (data) => {
                                    this.successNotify(data.message);
                                },
                                () => {
                                    this.loading = false;
                                }
                            )
                        }
                    },
                );
            });
        },

        addNew() {
            this.$router.push({name: `${this.resource}.create`});
        },
        fetch(page = null) {
            page = page || this.queryPage;
            this.loading = true;
            this.request(
                this.fetchEndPoint,
                {
                    params: {
                        ...this.filter,
                        page,
                    }
                },
                ({data}) => {
                    [this.rows, this.paginator] = [data.data, data.paginator];
                },
                () => {

                },
                () => {
                    this.mounted = true;
                    this.loading = false;
                }
            )
        },
        getRowValue(column, row, defaultVal = "") {
            if (column.value instanceof Function)
                return column.value(row);

            return getValueByLocale(_.get(row, column.value, defaultVal ?? ""));
        },
        initActionEvent(slug, callback = Function) {
            this.$bus.off(`${slug}-${this.resource}-action-clicked`);
            this.$bus.on(`${slug}-${this.resource}-action-clicked`, callback);
        },
        onReload(callable = Function) {
            this.$bus.off(`reload-table-${this.resource}`);
            this.$bus.on(`reload-table-${this.resource}`, callable);
        }
    },
    computed: {

        fetchEndPoint() {
            return this.defaultEndPoint;
        },
        defaultEndPoint() {
            return this.$endPoint(`${this.resource}.index`);
        },
        isEmpty() {
            return this.mounted && this.rows.length == 0;
        },
        computedColumns() {
            return _.map(JSON.parse(JSON.stringify(this.columns)), (column) => {
                column.text = this.trans(column.text);
                return column;
            });
        },
        queryPage() {
            const route = useRoute();
            return _.get(route, `query.${this.pageKey}`, 1);
        },
        pageKey() {
            return this.resource ? `${this.resource}_page` : 'page';
        },
    },

    watch: {
        queryPage: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.fetch();
            }
        },
        filter: {
            immediate: true,
            deep: true,
            handler: _.debounce(function (newVal) {
                this.$router.push({query: {...this.$route.query, ...newVal}});
                this.fetch()
                console.log('filters', newVal);
                // this.fetch();
            }, 500)
        }
    }
}