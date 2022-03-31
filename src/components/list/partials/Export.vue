<template>
    <div class="invoice">

        <div class="invoice-body">
            <table class="invoice-table">
                <thead>
                <tr>
                    <td v-for="column in columns">  {{ trans(column.text) }}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data">
                    <td v-for="column in columns">  {{ rowValue(column,item) }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Export",
        props: {
            columns: {
                default: []
            },
            data: {
                default: []
            }
        },
        methods: {
            rowValue(column, row) {
                let field = column.value ?? column.field;
                return (field instanceof Function) ? field(row, column) : row[field];
            }
        }
    }
</script>


<style>
    /** {*/
    /*box-sizing: border-box;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*outline: none !important;*/
    /*}*/

    /*body {*/
    /*font-family: 'Cairo', sans-serif;*/
    /*font-size: 13px;*/
    /*line-height: 20px;*/
    /*direction: rtl;*/
    /*text-align: right;*/
    /*background-color: #f7f7f7;*/
    /*padding: 30px 40px;*/
    /*}*/

    .invoice {
        background-color: #FFF;
    }

    .invoice-header {
        padding: 20px 0px;
        display: table;
        width: 100%;
    }

    .header-right,
    .header-center,
    .header-left {
        width: 33%;
        display: table-cell;
        vertical-align: middle;
    }

    .header-center {
        text-align: center
    }

    .logo {
        width: 80px;
        height: 80px;
    }

    .header-left {
        text-align: left
    }

    .invoice-table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
        border: 1px solid #55aaff;
        border-collapse: collapse;
        font-size: 12px;
    }

    .invoice-table thead {
        background-color: #2A80BB
    }

    .invoice-table td, .invoice-table th {
        padding: 0.75rem;
        vertical-align: middle;
        border: 1px solid #dee2e6;
    }

    .invoice-table thead td {
        color: #fff;
    }

    .invoice-table tbody tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0, .05);
    }
</style>
