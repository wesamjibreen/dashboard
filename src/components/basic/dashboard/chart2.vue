<template>
    <div class="card">
        <div id ="chart"></div> 
    </div>
</template>
<script>
import bb , { area , bar , donut , gauge , line , pie , radar , spline , step } from "billboard.js"


export default {
    name: 'chart2',
    // mixins: [common],
    // data(){
    //     var chart = bb.generate({
    //     data: {
    //         columns: [
    //         ["data1", 30, 200, 100, 400, 150, 250],
    //         ["data2", 130, 100, 140, 200, 150, 50]
    //         ],
    //         type: "bar", // for ESM specify as: bar()
    //     },
    //     bar: {
    //         width: {
    //         ratio: 0.5
    //         }
    //     },
    //     bindto: "#barChart_1"
    //     });
    // },
    mounted(){
        this.data = bb.generate({
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 100, 140, 200, 150, 50],
                    ['data3', 130, -150, 200, 300, -200, 100]
                ],
                type: "bar",
                colors: {
                    data1: "red" ,
                    data2: "green" ,
                    data3: "blue" ,
                },
                bindto: "#chart"
            },
            bar: {
                width: {
                ratio: 0.5,
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: 'Bar Chart',
                position: 'left',
                padding: {
                bottom: 20,
                right: 20,
                top: 0,
                left: 20,
                },
            },
            legend: {
                position: 'inset',
            },
        })
    },
    props: {
        value: { 
            type: Object,
            default: undefined
        },
    },
    data(){
        return{
            data: undefined ,
            types : { 
                area: area(),
                bar: bar() ,
                donut: donut() ,
                gauge : gauge() ,
                line : line() ,
                pie : pie() ,
            }
        }
    },
    methods:{
        addData(){
            console.log("aaaaaa")
        }
    }
    // mounted() {
    //     const ctx = document.getElementById('myChart');
    //     const myChart = new Chart(ctx, {
    //         type: this.type,
    //         data: this.data,
    //         options: this.options,
    //     });
    // },
    // computed: {
    //     title$() {
    //         // console.log('title',this.title)
    //         return this.title ? this.getValueByLocale(this.title) : null;
    //     }
    // },
   
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

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
