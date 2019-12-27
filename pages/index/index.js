//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    weather: {
      wendu: 18,
      ganmao: '昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。',
      yesterday: {
        date: '25日星期三',
        type: '阴',
        fx: '南风',
        fl: '微风级',
        low: '低温 8℃',
        high: '高温 16℃'
      },
      forecast: [
        {
          date: '26日星期四',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '26日星期四',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '26日星期四',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '26日星期四',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '26日星期四',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }
      ]
    },
    today: '2019-12-26',
    city: '东莞',    //城市名称
    inputCity: '', //输入查询的城市名称
  },
  onLoad: function (options) {
    this.setData({
      today: util.formatTime(new Date()).split(' ')[0]  //更新当前日期
    });
    var self = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        self.searchWeather('南京'); return;
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=ASAT5N3tnHIa4APW0SNPeXN5&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=0',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'Content-Type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            var city = res.data.result.addressComponent.city.replace('市', '');//城市名称
            self.searchWeather(city);  //查询指定城市的天气信息
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },
  searchWeather: function (cityName) {
    console.log(cityName);
    var self = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + cityName,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.result == 1002) {
          wx.showModal({
            title: '提示',
            content: '输入的城市名称有误，请重新输入！',
            showCancel: false,
            success: function (res) {
              self.setData({
                inputCity: ''
              });
            }
          });
        } else {
          var weather = res.data.data;  //获取天气数据
          for (var i = 0; i < weather.forecast.length; i++) {
            var d = weather.forecast[i].date;
            //处理日期信息，添加空格
            weather.forecast[i].date = '　' + d.replace('星期', '　星期');
          }
          self.setData({
            city: cityName,      //更新显示城市名称
            weather: weather,    //更新天气信息
            inputCity: ''        //清空查询输入框
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  // 输入事件
  inputing: function (e) {
    this.setData({
      inputCity: e.detail.value
    });
  },
  // 搜索事件
  bindSearch: function () {
    this.searchWeather(this.data.inputCity);
  }
})
