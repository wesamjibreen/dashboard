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
            let endpointName = 'excelEndPoint'
            switch (type) {
                case 'excel':
                    endpointName = 'excelEndPoint'
                    break;
                case 'pdf':
                    endpointName = 'pdfEndPoint'
                    break;
            }
            const customExportingEndpoint = _.get(this, `exporting.${endpointName}`, {});
            return Object.keys(customExportingEndpoint).length ? customExportingEndpoint : this.defaultEndPoint;
        },
        exportTo(type = "Excel") {
            console.log('export', type);
            if (this.exportingSource === BACK_SOURCE) {
                this.fetchExporting(type, (data) => {
                    window.open(data.file_url);
                });
            } else
                this[`exportTo${type}`]();

        },
        parseToExport(data, columns = null) {
            let exportedColumns = columns || this.exportingColumns;
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
            let columns = _.map(this.exportingColumns, (column) => {
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
                console.log('this.parseToExport(data.data,columns)', this.parseToExport(data.data, columns));
                saveExcel({
                    data: this.parseToExport(data.data, columns),
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
                this.exportedData = data.data;
                this.$nextTick(() => {
                    console.log('fetchExporting', this.exportingColumns);
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
    },
    computed: {
        exportingSource() {
            return _.get(this, 'exporting.source', FRONT_SOURCE);
        },
        exportingColumns() {
            if ((this.exporting?.columns ?? []).length > 0)
                return this.exporting?.columns;

            if ((this.columns ?? []).length > 0)
                return this.columns;
            // console.log('exportingColumns', this.exportedData, this.getResourceColumns(this.exportedData) ?? [])
            return this.getResourceColumns(this.exportedData) ?? [];
        },
        hasExcel() {
            return _.get(this, 'config.excelBtn', true);
        },
        hasPDF() {
            return _.get(this, 'config.pdfBtn', true);
        },
        // import
        importingColumns() {
            return _.get(this, 'importing.columns', this.exportingColumns);
        },
    }
}