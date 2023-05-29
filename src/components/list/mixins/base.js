import {useRoute} from "vue-router";
// import {getValueByLocale} from "../../../utils/helper";
import exporting from "./export";
import ImageHolder from "../partials/ImageHolder";
import EditableInput from "../partials/EditableInput";
import SwitchStatus from "../partials/SwitchStatus";
import SortableView from "../partials/SortableView";
import StatusLabel from "../partials/StatusLabel";
import Action from "../partials/Action";
import Cancel from "../partials/Cancel";
import ActionGroup from "../partials/ActionGroup";
import CheckboxField from "../../formBuilder/fields/CheckboxField";
import Export from "../partials/Export";
import TableView from "../partials/TableView";

export default {
    mixins: [exporting],
    components: {
        TableView,
        SortableView,
        Export,
        CheckboxField,
        StatusLabel,
        SwitchStatus,
        EditableInput,
        ImageHolder,
        ActionGroup,
        Action,
        Cancel
    },
    props: {
        resource: {
            required: false,
            default: null
        },
        columns: Array,
        actions: Array,
        filters: Array,
        config: Object,
        importing: Object,
        actionGroups: {
            default: [],
            type: Array
        },
        customFetchEndPoint: {
            required: false,
            default: {}
        },
        actionButtons: {
            required: false,
            type: Array,
            default: []
        }
    },
    data() {
        return {
            filter: {
                search: ""
            },
            loading: true,
            mounted: false,
            rows: [],
            paginator: null,
            isAllSelected: null,
            excelLoading: false,
            selected: [],
            perPage: 10
        }
    },
    created() {
        this.init();
        this.onEmptyCheckbox();
    },
    methods: {
        onPerPageCountChange(perPage) {
            this.perPage = perPage
            this.fetch();
        },

        onEmptyCheckbox() {
            this.$bus.off("empty-checkbox");
            this.$bus.on("empty-checkbox", () => this.selected = [])
        },

        onActionGroupClick(actionGroup) {

        },


        onSelect(selectedValues) {
            this.selected = selectedValues;
            this.$emit("update:selected", selectedValues);

        },

        init() {
            this.onReload(() => {
                this.fetch();
            });

            this.initAction();
            this.initActionGroup();

            this.fetch();
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
            this.initActionEvent("cancel", (row, data = {}) => {
                this.$bus.emit('Popconfirmation-dialog',
                    true,
                    {
                        title: this.trans("sure_to_cancel"),
                        type: "warning",
                        callback: () => {
                            this.loading = true;
                            this.request(
                                this.$endPoint(`${this.resource}.cancel`, row.id),
                                {},
                                ({data}) => {
                                    this.value = false;
                                    window.Bus.emit('Popconfirmation-dialog', false);
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
                        },
                    },
                );
            });
            this.initActionEvent('show', (row, data = {}) => {
                this.$router.push({name: `${this.resource}.show`, params: {id: row.id}});
            });
            // this.initActionEvent('delete', (row, data = {}) => {
            //     this.$router.push({ name: `${this.resource}.show`, params: { id: row.id } });
            // });
        },

        initActionGroup() {
            this.initActionGroupEvent('delete', (row, data = {}) => {
                this.$bus.emit('confirmation-dialog',
                    true,
                    {
                        title: this.trans("sure_to_delete"),
                        type: "warning",
                        callback: () => {
                            this.loading = true;
                            this.request(
                                this.$endPoint(`${this.resource}.multi_delete`),
                                {selected: this.selected},
                                ({data}) => {
                                    this.value = false;
                                    window.Bus.emit('confirmation-dialog', false);
                                    window.Bus.emit(`reload-table-${this.resource}`);
                                    this.selected = [];
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
        fetch(page = null, queryParams = {}) {
            page = page || this.queryPage;
            this.loading = true;
            let params = {...this.filter, page: page ?? this.queryPage, perPage: this.perPage, ...queryParams};
            if (this.isSortable)
                params = {...params, no_pagination: true, order_by: "ordered", sort_by: "asc"};


            this.request(
                this.fetchEndPoint,
                {
                    params
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

            return this.getValueByLocale(_.get(row, column.value, defaultVal ?? ""));
        },
        initActionEvent(slug, callback = Function) {
            this.$bus.off(`${slug}-${this.resource}-action-clicked`);
            this.$bus.on(`${slug}-${this.resource}-action-clicked`, callback);
        },
        initActionGroupEvent(slug, callback = Function) {
            this.$bus.off(`${slug}-${this.resource}-action-group-clicked`);
            this.$bus.on(`${slug}-${this.resource}-action-group-clicked`, callback);
        },
        onReload(callable = Function) {
            this.$bus.off(`reload-table-${this.resource}`);
            this.$bus.on(`reload-table-${this.resource}`, callable);

            this.$bus.on('on-country-change', callable)
            this.$bus.on('on-determinant-change', callable)
        }
    },
    computed: {
        selectableCallback() {
            return _.get(this, 'config.selectableCallback', null);
        },
        isSortable() {
            return _.get(this, 'config.sortable', false);
        },
        hasToolbar() {
            return _.get(this, 'config.showToolbar', true);
        },
        hasSelect() {
            return _.get(this, 'config.selectable', false);
        },
        hasCreateBtn() {
            return _.get(this, 'config.createBtn', true);
        },
        hasImportBtn() {
            return _.get(this, 'config.importBtn', true);
        },
        hasActionGroups() {
            return (this.actionGroups ?? []).length > 0;
        },
        pageTitle() {
            return this.trans(`${this.resource}.all`);
        },
        fetchEndPoint() {
            return Object.keys(this.customFetchEndPoint).length ? this.customFetchEndPoint : this.defaultEndPoint;
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
        rowsValue() {
            return _.map(this.rows, (row) => {
                return row.id;
            })
        },
        viewComponent() {
            if (this.isSortable)
                return "SortableView";
            return "TableView";
        }
    },

    watch: {
        // queryPage: {
        //     immediate: true,
        //     deep: true,
        //     handler(newVal) {
        //         this.fetch();
        //     }
        // },
        filter: {
            // immediate: true,
            deep: true,
            handler: _.debounce(function (newVal) {
                let query = {...this.$route.query, ...newVal};
                query[this.pageKey] = 1;
                this.$router.push({query});
                this.fetch();
            }, 500)
        }
    }
}
