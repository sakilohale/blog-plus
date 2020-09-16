<template>
 <div id="app">

   <!--内容栏-->
   <div class="content">
     <!--顶部固定栏-->
     <myheader class="header"></myheader>
       <router-view></router-view>
   </div>
 </div>
</template>

<script>
  import rightbar from './components/right-bar'
  import myheader from './components/my-header'


export default {
  name: 'app',
  components: {
    rightbar:rightbar,
    myheader:myheader,

  },
  data(){
    return{
      table : false
    }
  }
}
</script>

<style scoped>

  #app{
    width: 100%;
    display: flex;
    margin: 0;
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .content{
    display: flex;
    flex-direction: column;
    width:100%;

  }

  .header{
    width: 100%;
    height: 80px;
    position: fixed;
  }

</style>
