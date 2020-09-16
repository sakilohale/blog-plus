<template>
  <div ref="myChart" style="width: 500px;height:400px;" class="chart"></div>
</template>

<script>
  export default {
    name:"chart",
    props:{
      "content": {}
    },
    data(){
      return{
        content:this.content
      }

    },
    mounted(){
      this.$nextTick(this.drawLine())

    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myChart)
        // 绘制图表
      console.log(this.content)
        myChart.setOption(this.content);
      }
    }
  }
</script>

<style scoped>
.chart{
  display: inline-block;
  text-align: center;
  color: #d3d3d3;
}
</style>
