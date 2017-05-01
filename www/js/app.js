// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
  /*.run(function ($ionicPlatform, $ionicPopup) {
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function (event) {
      if (true) { // your check here
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function (res) {
          if (res) {
            ionic.Platform.exitApp()
          }
        })
      }
    }, 100)
  })*/
  .controller('dssController', function () {
    var dssValue = this
    getData()
    dssValue.restart = function () {
      dssValue.show = false
      dssValue.destination = null
      dssValue.source = null
    }
    dssValue.showIcon = function (type) {
      var icon
      if (type == 'รถตู้') {
        icon = 'van.png'
      }
      if (type == 'บขส') {
        icon = 'bus.png'
      }
      if (type == 'รถไฟ') {
        icon = 'train.png'
      }
      return icon
    }

    dssValue.showData = function () {
      if (dssValue.source == null || dssValue.destination == null) {
        alert('กรุณาเลือก')
      } else {
        dssValue.show = true
        console.log(dssValue.data)

        dssValue.price = dssValue.dis = dssValue.time = dssValue.data[0]

        var price = parseFloat(dssValue.data[0].price)
        var dis = parseFloat(dssValue.data[0].dis)
        var time = parseFloat(dssValue.data[0].time)

        for (var i = 1; i < dssValue.data.length; i++) {
          console.log(dssValue.dis)
          if (price > parseFloat(dssValue.data[i].price) && dssValue.data[i].destination == dssValue.destination) {
            price = dssValue.data[i].price
            dssValue.price = dssValue.data[i]
          }
          if (dis > parseFloat(dssValue.data[i].dis) && dssValue.data[i].destination == dssValue.destination) {
            dis = dssValue.data[i].dis
            dssValue.dis = dssValue.data[i]
          }
          if (time > parseFloat(dssValue.data[i].time) && dssValue.data[i].destination == dssValue.destination) {
            time = dssValue.data[i].time
            dssValue.time = dssValue.data[i]
          }
        }
        dssValue.priceArray = []
        dssValue.disArray = []
        dssValue.timeArray = []

        dssValue.priceArray.push(dssValue.price)
        dssValue.disArray.push(dssValue.dis)
        dssValue.timeArray.push(dssValue.time)

        for (var i = 0; i < dssValue.data.length; i++) {
          if (dssValue.priceArray[0].price == dssValue.data[i].price && dssValue.priceArray[0].name != dssValue.data[i].name) {
            dssValue.priceArray.push(dssValue.data[i])
          }
          if (dssValue.disArray[0].dis == dssValue.data[i].dis && dssValue.disArray[0].name != dssValue.data[i].name) {
            dssValue.disArray.push(dssValue.data[i])
          }
          if (dssValue.timeArray[0].time == dssValue.data[i].time && dssValue.timeArray[0].name != dssValue.data[i].name) {
            dssValue.timeArray.push(dssValue.data[i])
          }
        }
        console.log(dssValue.priceArray)
        console.log(dssValue.disArray)
        console.log(dssValue.timeArray)
      }
    }

    function getData () {
      console.log('GO')
      var client = new XMLHttpRequest()
      var a
      client.open('GET', 'file/data2.csv')
      client.overrideMimeType('text/xml; charset=TIS-620')

      client.onreadystatechange = function () {
        dssValue.data = csvTojs(client.responseText)
      }
      client.send()
    }

    function csvTojs (csv) {
      var lines = csv.split('\n')
      var result = []
      var headers = lines[0].split(',')

      for (var i = 1; i < lines.length; i++) {
        var obj = {}

        var row = lines[i],
          queryIdx = 0,
          startValueIdx = 0,
          idx = 0

        if (row.trim() === '') { continue; }

        while (idx < row.length) {
          /* if we meet a double quote we skip until the next one */
          var c = row[idx]

          if (c === '"') {
            do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1)
          }

          if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
            /* we've got a value */
            var value = row.substr(startValueIdx, idx - startValueIdx).trim()

            /* skip first double quote */
            if (value[0] === '"') { value = value.substr(1); }
            /* skip last comma */
            if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
            /* skip last double quote */
            if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

            var key = headers[queryIdx++]
            obj[key] = value
            startValueIdx = idx + 1
          }

          ++idx
        }

        result.push(obj)
      }
      return result
    }
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  })
