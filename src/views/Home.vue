<template>
  <div class="home">
    <el-backtop :visibility-height="60">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
  <div class="passage">
    <div class="item1"></div>
    <router-link :to="{ name:'Blog',query:{ id : index} }" class="item" v-for="(item,index) in itemlist[currentPage-1]">
      <span><h1>{{item.title}}</h1></span>
      <span><p>{{item.content}}</p></span>
      <span>{{item.time}}</span>
      <img src="../assets/maomeizi.jpg" style="width: 80px;height:80px;float: right"/>
    </router-link>

    <el-pagination
      class="pagination"
      background
      :page-sizes="[5]"
      :page-size="5"
      layout="sizes,prev, pager, next"
      :current-page="currentPage"
      hide-on-single-page
      @size-change="sizePageChange"
      @current-change="currentChange"
      @prev-click="pre"
      @next-click="next"
      :total="num"
    >
    </el-pagination>
  </div>
  <rightbar class="right"></rightbar>

  </div>
</template>

<script>
  import rightbar from '../components/right-bar'
  import itemlist from "../assets/item";



export default {
  name: 'Home',
  components: {
rightbar:rightbar
  },
  data(){

    return {
      itemlist:itemlist,
      num:itemlist.length*5,
      currentPage:1
    }
  },
  methods:{
    sizePageChange(curSize){
      console.log(curSize)
    },
    currentChange(cpage){
      this.currentPage=cpage;
      console.log(this.currentPage)
    },
    pre(cpage){
      console.log(cpage)
    },
    next(cpage){
      console.log(cpage)
    }

  }
}
</script>

<style scoped>
  .home{
    display: flex;
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .passage{
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    flex:3;


  }
  .item1{
    height: 110px;

  }
  .item{
    margin: auto;
    margin-bottom: 25px;
    margin-top: 25px;
    width: 80%;
    min-height: 200px;
    background:white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-decoration: none;
    color:#d3d3d3
  }
  .pagination{
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    color: white;
  }
  .right{
    margin: 0;
    flex: 1;

  }

</style>
