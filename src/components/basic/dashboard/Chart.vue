<template>
    <div class="card">
        <div>
            <h3 class="pt-3 px-5 mb-2 title-chart">{{ title$ }}</h3>
        </div>
        <div class="card-body p-5">
            <canvas id="myChart"  height="180"></canvas>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import common from "../../../mixins/common";

export default {
    name: 'Chart',
    mixins: [common],
    props: {
        type: String,
        data: {},
        options: {},
        title: {},
    },
    mounted() {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options,
        });
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
