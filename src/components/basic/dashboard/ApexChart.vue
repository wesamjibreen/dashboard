<template>
    <div class="card">
        <div>
            <h3 class="pt-3 px-5 mb-2 title-chart">{{ title$ }}</h3>
        </div>
        <div class="card-body p-2">
            <apexchart
                :height="customersChartOptions.chart.height"
                :type="customersChartOptions.chart.type"
                :options="customersChartOptions"
                :series="customersChartOptions.series">
            </apexchart>
        </div>
    </div>
</template>
<script>
// import Chart from 'chart.js/auto';
import dashboard from "./dashboard";
// import common from "../../../mixins/common";
// import ApexChart from 'vue3-apexcharts';
import VueApexCharts from "vue3-apexcharts";
// import { themeColors } from '/@src/utils/themeColors'
// import * as formatters from '/@src/utils/apex-formatters'

export default {
    name: 'ApexChart',
    mixins: [dashboard],
    props: {
        customersChartOptions : {} ,
        title: {},
    },
    components:{
        apexchart: VueApexCharts
        // ApexChart,
        // customersOptions,
    },
    computed: {
        title$() {
            // console.log('title',this.title)
            return this.title ? this.getValueByLocale(this.title) : null;
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.title-chart {
    font-weight: bold;
    font-size: 20px;
}
</style>
