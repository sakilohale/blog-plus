<template>
  <div class="blog" @click="gettitles()">

    <!--这是elementui的返回顶部组件-->
    <el-backtop :visibility-height="60">
      <i class="el-icon-caret-top"></i>
    </el-backtop>

    <!--这是一个目录索引组件，position设置为fixed-->
    <div class="indexBoxItem">

    </div>



  <div class="container">

 <div class="space"></div>

    <!--blog内容区，由大标题，标签，内容三大部分组成-->
    <div class="bigtitle">
      <div class="mytitle">
      <h2>这是我的大标题</h2>
      </div>
      <div class="tag">
        <span style="display:block;width: 150px">阅读时间: {{tag.time}}</span>
        <span style="display:block;width: 150px">类型: {{tag.field}}</span>
        <span style="display:block;width: 150px">作者: {{tag.author}}</span>
      </div>
    </div>



    <div class="content">
     <h3>我的1标题</h3>
      <span>我的正文</span>

      <h3>我的2标题</h3>
      <span>我的正文</span>

      <h3>我的3标题</h3>
      <span>我的正文</span>

      <h3>我的4标题</h3>
      <span>我的正文</span>

      <h3>我的5标题</h3>
      <span>我的正文</span>
    </div>

    <div class="gcs-footer">
      <div class="footer-top">
        <a href="#">百度网</a> |
        <a href="#">新浪网</a> |
        <a href="#">腾迅房产</a> |
        <a href="#">找货网</a> |
        <a href="#">北极绒</a> |
        <a href="#">阿里巴巴</a> |
      </div>
      <p>
        ©Copyright 2020 刘俊言版权所有 | 19823319810@163.com
      </p>
    </div>


  </div>
  </div>
</template>

<script>
  import router from '../router/index'
  import $ from 'jquery'

  export default {
    data() {
      return {
        router: router,
        id: router.history.current.query.id,
        tag:{time:'xx mins',field:'front end',author:'sakilohale'},
        content:"这是我的内容，这是我的内容，这是我的内容，这是我的内容，这是我的内容，这是我的内容，这是我的内容，这是我的内容，这是我的内容"
      }
    },

    methods:{
        gettitles:function () {
       var titles = document.querySelectorAll('h3');
       var indexBoxItem = document.getElementsByClassName('indexBoxItem')[0]

       titles.forEach((element,index)=>{

         var linkItem = document.createElement("a");
         linkItem.innerHTML = element.innerHTML;
         linkItem.setAttribute('id', 'anchor_'+index);
         linkItem.setAttribute('class', 'link-index');
         linkItem.setAttribute('offset_top', element.offsetTop);
         linkItem.href = 'javascript:void(0)';
         $(document).on("click", ".indexBoxItem a", function(){
           var item = this;
           $(document).scrollTop(item.getAttribute('offset_top'));
         });
         indexBoxItem.append(linkItem);
       })
        },
    },

    mounted() {

    }


  }





</script>

<style scoped>
  .blog{
    width: 100%;
    min-height:100vh;
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .space{
    width: 100%;
    height: 80px;
  }
.container{
  width: 80%;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  align-items: center;
  justify-items: center;
}
 .bigtitle{
   display: flex;
   align-items: center;
   justify-items: center;
   flex-direction: column;
   width:60%;
   height: 200px;

 }
 .indexBoxItem{
 width: 150px;
   height: 200px;
   position: fixed;
   right:200px;
   top:300px;
   background: rosybrown;
 }

.link-index{
  font-size: 15px;
  color: #232526;
}
 .mytitle{
   height: 100px;
   line-height: 100px;
   color: black;
   text-align: start;
   font-size: 30px;
 }
.tag{
  display: flex;
  align-items: center;
  justify-items: center;
  height:50px;
  width: 100%;
  font-size: 15px;
  color: black;
}



.content{
  width: 65%;
  min-height: 500px;
  font-size: 24px;
  line-height: 200%;
}
.content span{
  text-indent: 2em;
}

  .gcs-footer{
    margin-top: 20px;
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    width: 100%;
    height: 165px;
    text-align: center;
    color: white;

  }
  .gcs-footer .footer-top{

    margin-top: 50px;

  }

  .gcs-footer a{
    color: #f0f1f1;
    text-decoration: none;
    padding: 0 10px;
    vertical-align:middle;
  }
  .gcs-footer a:hover{
    color: red;
    text-decoration: underline;
  }

  .gcs-footer p{
    height: 15px;
    color: #888888;
    margin-top: 30px;
  }
</style>
