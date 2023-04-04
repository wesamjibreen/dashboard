import {saveExcel} from "@progress/kendo-vue-excel-export";

export default {
    props: {
        excel: Object
    },
    methods: {
        exportTOExcel() {
            this.excelLoading = true;
            this.request(
                this.excelEndPoint,
                {
                    params: {
                        no_pagination: true,
                        ...this.filter
                    }
                },
                ({data}) => {
                    saveExcel({
                        data: this.parseToExcel(data.data),
                        fileName: `${this.resource}-excel`,
                        columns: this.excelColumns
                    });
                },
                null,
                () => {
                    this.excelLoading = false;
                }
            );
        },
        parseToExcel(data) {
            if (this.excelConfig?.columns) {
                return _.map(data, (row) => {
                    let result = {};
                    _.forEach(this.excelColumns, (column) => {
                        let rowValue = row[column.field];
                        result[column.field] = (rowValue instanceof Function) ? rowValue(row, column) : rowValue;
                    });
                    return row;
                });
            }
            return data;
        },
    },
    computed: {
        excelConfig() {
            return this.excel;
        },
        excelColumns() {
            return _.get(this, 'excelConfig.columns', this.computedColumns.filter((column) => {
                return !column.component
            }).map((column) => {
                return {
                    field: column.value,
                    title: column.text
                }
            }))
        },
        excelEndPoint() {
            return this.defaultEndPoint;
        }
    }
}
