<template>
  <div class="card">
      <div>
          <h3 class="pt-3 px-5 mb-2 title-chart">{{ title$ }}</h3>
      </div>
      <div class="card-body p-5">
          <canvas id="myChart2" style="height:250px"></canvas>
      </div>
  </div>
</template>

<script>
  import Chart from 'chart.js/auto';
  import dashboard from "./dashboard";

  export default {
    name: 'ProgressCircle',
    mixins: [dashboard],
    props: {
      type : String ,
      data : [] ,
      options : {} ,
      labels : [],
      dataPointtt : [] ,
      label : String ,
      backgroundColor : [] ,
      borderColor : [],
      borderWidth : String,
      cutout : String,
      borderRadius : String,
      title : {}
    },
    computed: {
        title$() {
            // console.log('title',this.title)
            return this.title ? this.getValueByLocale(this.title) : null;
        }
    },
    mounted(){
      const centerText = {
        id:'centerText',
        afterDatasetsDraw(chart){
          const { ctx , chartArea:{left,top,width,height}} = chart ;
          ctx.save();
          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = 'rgba(255, 99, 132, 1)';
          ctx.textAlign = 'center' ;
          ctx.fillText( dataPoints[0]+'%' , width/2 + left , height/2.3);
          ctx.restore();

          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = 'rgba(255, 99, 132, 1)';
          ctx.textAlign = 'center' ;
          ctx.fillText(co , width/2 + left , height/1.8);
          ctx.restore();

          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = '	rgb(152,152,152)';
          ctx.textAlign = 'center' ;
          ctx.fillText( dataPoints[1]+'%' , width/2 + left , height/2+top*2);
          ctx.restore();

          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = '	rgb(152,152,152)';
          ctx.textAlign = 'center' ;
          ctx.fillText( col , width/2 + left , height/2+top*3);
          ctx.restore();
        }
      };
      const co = this.labels[0] ;
      const col = this.labels[1] ;
      const a = this.data[0];
      const b = 100-this.data[0] ;
      const dataPoints = [a , b] ;


      const myChart2 = new Chart(document.getElementById('myChart2'), {
          type: this.type ,
          data:{
            labels : this.labels,
            datasets : [{
              label : this.label ,
              data : dataPoints ,
              backgroundColor : this.backgroundColor ,
              borderColor : this.borderColor ,
              borderWidth :this.borderWidth,
              cutout : this.cutout ,
              borderRadius : this.borderRadius
            }]
          },
          options: this.options,
          plugins : [centerText]
      });
      myChart2;
        }
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
  .hello{
    width: 60% ;
    margin :auto ;
  }
  .title-chart{
    font-weight: bold;
    font-size: 20px;
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
#myChart2{
    height: 300px !important;
    width: 300px !important;
    margin: auto;
    max-width: 100% !important;
}
</style>
