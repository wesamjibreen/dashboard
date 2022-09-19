<template>
    <div class="card">
      <div>
            <h3 class="pt-3 px-5 mb-2 title-chart">{{ title$ }}</h3>
      </div>
      <div class="card-body p-5">
          <canvas id="myChart2" height="250"></canvas>
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
      title: {},

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
          ctx.font = 'bolder 50px Arial';
          ctx.fillStyle = 'rgba(255, 99, 132, 1)';
          ctx.textAlign = 'center' ;
          ctx.fillText( dataPoints[0]+'%' , width/2 + left , height/2.3);
          ctx.restore();

          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = 'rgba(255, 99, 132, 1)';
          ctx.textAlign = 'center' ;
          ctx.fillText(co , width/2 + left , height/1.8);
          ctx.restore();

          ctx.font = 'bolder 50px Arial';
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


    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

//   dd;
//       console.log("mounted")
    }
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
.hello{
  width: 400px ;
  margin :auto ;
}
</style>

