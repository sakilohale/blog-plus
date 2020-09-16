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
