var util = require('../../utils/util.js')
Page({
  data: {
    projects: [{ name: '中国天气预报网', git: "http://www.weather.com.cn/forecast/" },
      { name: '国际天气预报网', git: "http://www.weather.com.cn/forecast/world.shtml" },
      { name: '中国天气网', git: "http://www.weather.com.cn/" },
      { name: '中国天气实况', git: "http://products.weather.com.cn/product/Index/index/procode/YB_WD_ZG24.shtml" },
      { name: '中国降水量预报', git: "http://products.weather.com.cn/product/Index/index/procode/YB_JSL_024.shtml" }
    ]
  },
  onReady: function () {
    this.clickName();
  },
  clickName: function (e) {
    var pros = this.data.projects;
    console.log("#########################################################################################################")
    console.log("##                                               其他项目                                               ##")
    console.log("##-----------------------------------------------------------------------------------------------------##")
    pros.forEach(function (item, index) {
      console.log("##        ", item.name + ":" + item.git)
    })
    console.log("##                                                                                                     ##")
    console.log("#########################################################################################################")
  }
})
