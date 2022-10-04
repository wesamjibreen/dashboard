import html2pdf from "html2pdf.js";
import { saveExcel } from "@progress/kendo-vue-excel-export";

const FRONT_SOURCE = 'frontend';
const BACK_SOURCE = 'backend';
export default {
    props: {
        exporting: Object
    },
    data: () => ({
        loadingPdf: false,
        loadingExcel: false,
        exportedData: []
    }),
    methods: {
        exportingEndPoint(type) {
            type = type.toLowerCase()
            if (this.exportingSource(type) === FRONT_SOURCE)
                return this.defaultEndPoint;

            const typeExportingEndpoint = _.get(this, `exporting.${type}.endPoint`, {});
            console.log("test typeExportingEndpoint" , typeExportingEndpoint)
            return Object.keys(typeExportingEndpoint).length ? typeExportingEndpoint : this.defaultEndPoint;
        },
        exportTo(type = "Excel") {
            console.log('export', type);
            if (this.exportingSource(type) === BACK_SOURCE) {
                this.fetchExporting(type, (data) => {
                    window.open(`/admin/reports/${data.data.filename}`, '_blank')
                });
            } else
                this[`exportTo${type}`]();
        },
        parseToExport(data, type, columns = null) {
            let exportedColumns = columns || this.exportingColumns(type);
            if (exportedColumns)
                return _.map(data, (row) => {
                    let result = {};
                    _.forEach(exportedColumns, (column) => {
                        let field = column.value ?? column.field;
                        result[(field instanceof Function ? column.field : column.text) ?? column.field] = this.rowValue(column, row);
                    });
                    return result;
                });

            return data;
        },
        rowValue(column, row) {
            let field = column.value ?? column.field;
            console.log('rowValue', field, column)
            return (field instanceof Function) ? field(row, column) : row[field];
        },
        getResourceColumns(rows, originalCols = []) {
            if (originalCols.length > 0)
                return originalCols;

            let row = _.get(rows, 0, {});

            let columns = [];
            Object.entries(row).forEach(([key, value]) => {
                columns.push({
                    field: key,
                    title: this.trans(key)
                });
            });
            return columns;
        },
        exportToExcel() {
            this.loadingExcel = true;
            let columns = _.map(this.exportingColumns('excel'), (column) => {
                let field = column.value ?? column.field;
                return {
                    field: field instanceof Function ? column.field : column.text,
                    title: this.trans(column.text)
                }
            });

            this.fetchExporting('excel', (data) => {
                if (columns.length === 0)
                    columns = this.getResourceColumns(data.data);
                console.log('this.parseToExport(data.data,columns) columns', columns);
                console.log('this.parseToExport(data.data,columns) data', data.data);
                console.log('this.parseToExport(data.data,columns)', this.parseToExport(data.data, 'excel', columns));
                saveExcel({
                    data: this.parseToExport(data.data, 'excel', columns),
                    fileName: `${this.resource}-excel.xlsx`,
                    columns: columns
                });
                this.loadingExcel = false;
            });
        },
        exportToPdf() {
            // var element = document.getElementById('body');
            this.loadingPdf = true;
            var opt = {
                pagebreak: { mode: ['avoid-all'] },
                margin: 0.5,
                filename: `${this.resource}-${new Date().getTime()}.pdf`,
                image: { type: 'jpeg', quality: 0.9 },
                html2canvas: { scale: 3 },
                jsPDF: {
                    orientation: 'landscape',
                    unit: 'in',
                    format: 'a4',
                    putOnlyUsedFonts: true,
                    floatPrecision: 16
                }
            };
            // unit: 'in', format: 'letter', orientation: 'landscape'
            this.fetchExporting('pdf', (data) => {
                this.exportedData = [...data.data];
                this.$nextTick(() => {
                    console.log('fetchExporting', this.exportingColumns('pdf'));
                    console.log('this.$refs.exporting', this.$refs, this.$refs.exporting.$el);
                    console.log('exportedData ', this.exportedData);
                    // alert('ok');
                    html2pdf().set(opt).from(this.$refs.exporting.$el).toPdf().
                        //     .output().then((...args) => {
                        //     console.log('html2pdf' ,...args);
                        // }).
                        save().then(() => {
                            this.loadingPdf = false;
                        });
                })

            });
        },

        fetchExporting(type, callback = Function) {
            this.loadingExcel = true;
            this.request(
                this.exportingEndPoint(type),
                {
                    params: {
                        no_pagination: true,
                        ...this.filter
                    }
                },
                ({ data }) => {
                    callback(data);
                },
                null,
                () => {
                    this.excelLoading = false;
                    this.loadingExcel = false;

                }
            );
        },
        validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(str);
        },
        // import functions
        openImportDialog() {
            this.$refs.importDialog.openDialog()
        },
        downloadImportSample() {
            // prepare columns
            const columns = []
            this.importingColumns.forEach(function (column) {
                columns.push({ field: column.text });
            })
            // create & save excel file
            saveExcel({
                data: {},
                fileName: `${this.resource}-sample-excel.xlsx`,
                columns: columns
            });
        },
        exportingSource(type) {
            type = type.toLowerCase();
            return _.get(this, `exporting.${type}.source`, FRONT_SOURCE);
        },
        exportingColumns(type) {
            type = type.toLowerCase();
            const typeExportingColumns = _.get(this, `exporting.${type}.columns`, []);
            if (typeExportingColumns.length > 0)
                return typeExportingColumns;

            if ((this.columns ?? []).length > 0)
                return this.columns;
            // console.log('exportingColumns', this.exportedData, this.getResourceColumns(this.exportedData) ?? [])
            return this.getResourceColumns(this.exportedData) ?? [];
        },
    },
    computed: {
        hasExcel() {
            return _.get(this, 'config.excelBtn', true);
        },
        hasPDF() {
            return _.get(this, 'config.pdfBtn', true);
        },
        // import
        importingColumns() {
            return _.get(this, 'importing.columns', this.exportingColumns('excel'));
        },
    }
}
