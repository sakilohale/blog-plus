<template>
<div class="left">
  <div  @click="Table = true" class="mybutton"><img src="../assets/person.png" style="width:100%;height: 100%"/></div>
  <el-drawer
    title="我的主页"
    :visible.sync="Table"
    direction="ltr"
    size="14.5%"
    :modal="false">

   <div class="container">

   <div class="me">
     <div class="icon"><img src="../assets/leo.jpg" style="width: 100%;height: 100%; border-radius: 50%"/></div>
     <span style="margin-bottom: 20px;font-family: Helvetica Neue">Sakilohale</span>
   </div>

   <div class="nav" style=" border-bottom: 1px white solid;">
     <span style="justify-self: start;margin-top: 20px">导航</span>
     <router-link to="/"  class="nav_item" v-for="(item,index) in navList ":key="item.name">
       <img style="width: 25px;height:25px;display: inline-block;margin-left: 20px;margin-right: 10px" :src="item.photo"/>    {{item.name}}</router-link>
   </div>

   <div class="nav">
     <span style="justify-self: start;margin-top: 20px">分类</span>
     <router-link to="/" class="nav_item" v-for="(item,index) in navList ":key="item.name">{{item.name}}</router-link>
   </div>
   </div>

  </el-drawer>
</div>
</template>

<script>
  import navlist from "../assets/nav";
  export default {
    name:"leftbar",
    props:{
      table:{Boolean,default:false}
    },
    data(){
      return{
        navList:navlist,
        Table : this.table
      }
    }
  }
</script>

<style scoped>

.container{
  display: flex;
  flex-direction: column;
  background: #3A3F51;
  height: 100%;
}

  .me{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    border-bottom: 1px white solid;
    font-size: 18px;
    color: white;
  }
  .icon{
    width: 130px;
    height: 130px;
    margin-top:25px ;
    margin-bottom:25px;
  }
  .mybutton{
    width:50px;
    height:50px;
    cursor:pointer;
  }
  .mybutton:hover{
    opacity: 0.5;
  }
.nav {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 100%;
  height:200px;
  font-size: 12px;
  color: #d3d3d3;
}
  .nav .nav_item{
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #d3d3d3;
    font-size: 14px;
    text-decoration: none;
  }
.nav .nav_item:hover{
  background:white;
}
</style>
