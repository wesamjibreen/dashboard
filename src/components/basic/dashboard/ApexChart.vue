<template>
    <div class="card">

        <div class="card-body">
            <div>
                <h3 class="pt-3 px-5 mb-2 title-chart">{{ title$ }}</h3>
            </div>
            <div>
                <apexchart
                    :height="customersChartOptions.chart.height"
                    :type="customersChartOptions.chart.type"
                    :options="customersChartOptions"
                    :series="customersChartOptions.series">
                </apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import dashboard from "./dashboard";
import VueApexCharts from "vue3-apexcharts";

export default {
    name: 'ApexChart',
    mixins: [dashboard],
    props: {
        customersChartOptions : {} ,
        title: {},
    },
    components:{
        apexchart: VueApexCharts
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
