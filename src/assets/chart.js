var chartseries=[{
  series:[

    {title:'sakilohale的一天',
      name:'sakilohale的一天',
      type:'pie',    // 设置图表类型为饼图
      radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
      data:[          // 数据数组，name 为数据项名称，value 为数据项值
        {value:80, name:'吃饭'},
        {value:400, name:'睡觉'},
        {value:100, name:'打游戏'},
        {value:200, name:'学习'},
        {value:100, name:'踢球'},
        {value:120,name:'看动漫'}]
    }

  ]
},

  {
    series: {
      type: 'sunburst',
      data: [{
        name: '主机游戏',
        value: 10,
        children: [{
          value: 3,
          name: 'MHW',
          children:[
            {
              name:'太刀侠',
              value:1.5,
            },
            {
              name:'滑步弓',
              value:1,
            },
            {
              name:'修脚趾',
              value: 0.5
            }
          ]
        }, {
          value: 5,
          name: 'P5',
          children:[
            {
              name:'听音乐',
              value:2,
            },
            {
              name:'撩妹子',
              value:1,
            },
            {
              name:'闲逛',
              value: 2
            }
          ]
        },
          {
            value: 2,
            name:'塞尔达',
            children: [
              {name:'迷路',
              value: 2}
            ]
          }

        ]
      }, {
        name: 'pc游戏',
        value: 10,
        children: [{
          name: 'Dota2',
          value: 7,
          children: [
            {name:'st king',
             value: 3,},
            {
              name:'独行侠',
              value: 3,
            },
            {
              name:'上瘾',
              value: 1
            }
          ]
        }, {
          name: 'Dont starve',
          value: 3,
          children: [
            {name:'友人联机',
            value: 3}
          ]
        }]
      }, {
        name: '手游',
        value: 3,
        children: [
          {name:'开罗' ,
            value: 3
          }
        ]
      }]
    }
  }






]


export default chartseries
