# 项目组件

## VIEWS

## COMPONENTS

### chart.vue

**用途：通过echart来绘制chart**

**结构：**

**1.一个带有ref属性的根元素**

```javascript
<template>
  <div ref="myChart" style="width: 500px;height:400px;" class="chart"></div>
</template>
```

**2.接收父传入的chart—options**

```javascript
  props:{
      "content": {}
      },
  data(){
      return{
        content:this.content
      }
```

**3.基于准备好的dom，初始化echarts实例**

```javascript
 drawLine(){
     // 基于准备好的dom，初始化echarts实例
let myChart = this.$echarts.init(this.$refs.myChart)
        // 绘制图表
        myChart.setOption(this.content);
      }
```

**4.content要求要根据echarts文档来修改，但元素必须是对象**

**5.整体代码**

```javascript
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

```

**最后使用示例**

```javascript
 <chart :content="chartcontent[0]"></chart>
```





### music.vue

**用途： 微型音乐播放器**

**结构**

**1.核心标签audio**

```javascript
 <audio ref="audio" class="dn"
           :src="url" :preload="audio.preload"
           @play="onPlay"
           @error="onError"
           @waiting="onWaiting"
           @pause="onPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           autoplay="autoplay"
    ></audio>
```

**结合这个标签的众多事件和属性来触发自定义的事件，接下来一个个列举一下**。

- **ref属性：是为了再后面的函数中能通过$refs属性引用**

- **src属性：获得歌曲的src才能播放**

- **preload属性： 歌曲是否预加载**

- **autoplay属性：歌曲是否自动播放**

- **@play：play事件触发时触发onPlay函数**

- **一下的同第四点。这些被触发的函数都是为了设置audio的状态**

  ```javascript
  audio: {
            currentTime: 0,
            maxTime: 0,
            playing: false,
            muted: false,
            speed: 1,
            waiting: true,
            preload: true,
            index:0
          },
  ```

  

**完整代码如下**

```javascript
<template>
  <div class="main-wrap" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio ref="audio" class="dn"
           :src="url" :preload="audio.preload"
           @play="onPlay"
           @error="onError"
           @waiting="onWaiting"
           @pause="onPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           autoplay="autoplay"
    ></audio>

<!--      <el-button type="text" @click="startPlayOrPause">-->
<!--        {{audio.playing | transPlayPause}}-->
<!--        {{audio.playing}}-->
<!--      </el-button>-->
    <div class="first">
    <div class="songinfo">
      <div class="picture"><img :src="urllist[index].photo"/></div>


      <span>{{this.urllist[this.index].name}}</span>
      <div class="playornot">
      <div @click="playbef()" class="play-paluse"><img src="../assets/back.png"/></div>
     <div @click="startPlayOrPause" class="play-paluse">
      <img src="../assets/play.png" alt="" v-if="!audio.playing">
      <img src="../assets/Pause.png" alt="" v-if="audio.playing">
     </div>
    </div>

      <div @click="playNext()" class="play-paluse"><img src="../assets/next.png"/></div>
    </div>

      <!--快进功能-->
<!--      <el-button v-show="!controlList.noSpeed" type="text" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>-->

    <div class="play">
   <el-slider  v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>

      <span style="color:slategrey;font-size: 10px;margin-right: 20px">{{ audio.currentTime | formatSecond}}/<span style="color:slategrey;font-size: 10px">{{ audio.maxTime | formatSecond }}</span></span>

<!--      <el-button style="width: 20px;height: 20px;border-radius: 50%;font-size: 10px;text-align: center" v-show="!controlList.noMuted" type="warning" @click="startMutedOrNot">{{audio.muted | transMutedOrNot}}</el-button>-->

      <!--调节音量-->
      <el-dropdown>
    <img style="width: 20px;height: 20px" src="../assets/sound.png"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><el-slider v-show="!controlList.noVolume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider"></el-slider>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <!--下载-->
      <a :href="url" v-show="!controlList.noDownload" target="_blank" class="download" download><img style="width: 20px;height: 20px" src="../assets/download.png"/></a>
    </div>
    </div>




    </div>

</template>

<script>
  function realFormatSecond(second) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60
      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }
  export default {
    props: {
      theUrl: {
        type: Array,
        required: true,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      theControlList: {
        type: String,
        default: ''
      }
    },
    name: 'VueAudio',
    data() {
      return {
        url: this.theUrl[0].url,
        urllist:this.theUrl,
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: true,
          index:0
        },
        sliderTime: 0,
        volume: 100,
        speeds: this.theSpeeds,
        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        },
       index:0
      }
    },
    methods: {
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 切换下一首
      playNext(){
        if(this.index<this.urllist.length-1) {
          this.index++;
          this.url = this.urllist[this.index].url;
          this.startPlay();
        }
      },
      // 返回上一首
      playbef(){
        if(this.index>0){
          this.index--;
          this.url=this.urllist[this.index].url;
          this.startPlay();

        }
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res);
        this.playNext();
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false
        if(!this.controlList.onlyOnePlaying){
          return
        }
        let target = res.target
        let audios = document.getElementsByTagName('audio');
        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        // console.log(res)

        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)

      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    created() {
      this.setControlList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-wrap{
    padding: 10px 15px;
    display: flex;
  }
  .first{
    display: flex;
    flex-direction: column;
  }
  .songinfo{
    display: flex;
    justify-items: center;
    align-items: center;
    width: 400px;
    height: 100%;
  }
.playornot{
  display: flex;

}
  .picture{
    width: 45px;
    height: 45px;
    border-radius: 50% !important;
    margin-right: 20px;
  }
  .picture img{
    width: 100%;
    height: 100%;
    border-radius: 50% !important;
  }
  .play{
  display: flex;
    height: 40px;
    justify-items: center;
    align-items: center;
  }

  .slider {
    display: block;
   width: 100px;
    margin-right: 20px;
  }

  .download {
    color: #409EFF;
    margin-left: 15px;
  }
  .dn{
    display: none;
  }
  .play-paluse{
    width:15px;
    height:15px;
    margin-left: 15px;
  }
  .play-paluse img{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
```



**使用示例**

```javascript
<VueAudio class="Audio" :theUrl="audios.musicUrl" :theControlList="audios.controlList"></VueAudio>
```

```javascript
  audios:{
          controlList:
            "false true true false false false",
          musicUrl:musicurl,
        },
```

```javascript
var musicurl = [
  {url:longing,name:'longing -- Gin',photo:gin},
  {url:northline,name:'northline -- Gin',photo:gin},
  {url:lovesong,name:'love song -- 小松原俊',photo:ls },
  {url:lastsurprise,name:'Last Surprise -- lyn',photo:p5},
  {url:wggt,name:'Wake Up, Get Up, Get Out There -- lyn',photo:p5}
  ]

```





### **left-bar.vue**

**用途：点击按钮可从左边弹出抽屉（个人信息）**

**主要通过element-ui的el-drawer来实现**

**主要代码**

```javascript
 <div  @click="Table = true" class="mybutton"><img src="../assets/person.png" style="width:100%;height: 100%"/></div>
```

**该div点击后Table属性设置为true**



```javascript
<el-drawer
    title="我的主页"
    :visible.sync="Table"
    direction="ltr"
    size="14.5%"
    :modal="false">
        
        
        。。。。。。


</el-drawer>
```

**该抽屉的visible.sync属性决定了是否显现抽屉。这样就由上述的div进行控制了**

**完整代码**

```javascript
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

```

**使用示例**

```javascript
<leftbar class="left" ></leftbar>
```

