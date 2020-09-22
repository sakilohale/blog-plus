<template>
<div class="header">
  <leftbar class="left" ></leftbar>
  <div class="chart_button">
    <div class="mybutton" @click=" table = true"><img src="../assets/day.png" style="width:100%;height: 100%"/></div>
  <el-drawer
    :visible.sync="table"
    direction="ttb"
    title="Sakilohale的一些可公开情报"
    size="70%"
    :modal="false"
  style="z-index: 1">
    <chart :content="chartcontent[0]"></chart>
    <chart :content="chartcontent[1]"></chart>
    <div class="meizi"><img src="../assets/meizi.jpg" style="width: 100%;height: 100%" /></div>
  </el-drawer>
  </div>


  <VueAudio class="Audio" :theUrl="audios.musicUrl" :theControlList="audios.controlList"></VueAudio>
</div>
</template>

<script>
import chart from './chart'
import chartcontent from '../assets/chart'
import VueAudio from './music'
import musicurl from "../assets/music";
import leftbar from "./left-bar";

  export default {
    name:"myheader",
    data(){
      return{


        audios:{
          controlList:
            "false true true false false false",
          musicUrl:musicurl,
        },

        table:false,

      chartcontent:chartcontent

      }
      },


  components:{
      chart:chart,
    VueAudio:VueAudio,
    leftbar:leftbar,
  }

  }
</script>

<style scoped>

.header{
  display: flex;
  justify-items: center;
  align-items: center;
  background: #232526;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}
.left{
  height: 50px;
  width: 50px;
  margin-left:250px ;
}

.mybutton{
  width:50px;
  height:50px;
  cursor:pointer;
}
.mybutton:hover{
  opacity: 0.5;
}

.chart_button{
margin-left: 20px;
}

.Audio{
  height: 100%;
  margin-left: 700px;
  color: white;
}
  .meizi{
    display: inline-block;
    width: 300px;
    height:400px;
  }
</style>
