const express = require('express');
const router = express.Router();

const googleTrends = require('google-trends-api');
const axios = require('axios')

module.exports = {

  addTerm (req, res, next)  {
    let { keyword } = req.body

    googleTrends.autoComplete({keyword})
      .then(function(results) {
        let data = JSON.parse(results)
        let topics = data.default.topics
        // console.log(data);
        // console.log(Object.getOwnPropertyNames(data));
        // console.log(topics);
  
        res.status(200).json({
          message: 'Google API autoComplete successful',
          topics
        })
      })
      .catch(function(err) {
        console.error('ERROR: autoComplete ==>', err);
      })
  
  },

  interestTime (req, res, ext) {
    let { keyword } = req.body
    let now = new Date(Date.now())
    let now_year = now.getFullYear()
    let now_month = now.getMonth() + 1
    let now_day = now.getDate()
    let last_year_date = `${now_year-1}-${now_month}-${now_day}`
    // console.log(last_year_date)
  
    googleTrends.interestOverTime({
      keyword,
      startTime: new Date(last_year_date),
      endTime: now,
      geo: 'ID'
    })
      .then(function(results){
        let data = JSON.parse(results)
        let timelineData = data.default.timelineData
        console.log(timelineData.length);
  
        let objData = {}
        objData['id'] = keyword
        objData['color'] = 'blue'
        objData['data'] = []
        
        let result = []
        timelineData.map((data, index) => {
          let x = data.formattedAxisTime
          let y = data.value[0]
          objData.data.push({
            x,
            y
          })
        })
        result.push(objData)
  
        res.status(200).json({
          message: 'Google API interestOverTime successful',
          result
        })
      })
      .catch(function(err){
        console.error('ERROR: interestOverTime ==>', err);
      });
  },

  monthlyInterestTime (req, res, next) {
    let { keyword } = req.body
    let now = new Date(Date.now())
    let now_year = now.getFullYear()
    let now_month = now.getMonth() + 1
    let now_day = now.getDate()
    let last_year_date = `${now_year-1}-${now_month}-${now_day}`
    // console.log(now.getDate(), now.getMonth(), now.getFullYear())
    // console.log(new Date(last_year_date).getDate(), new Date(last_year_date).getMonth(), new Date(last_year_date).getFullYear())
  
    googleTrends.interestOverTime({
      keyword,
      startTime: new Date(last_year_date),
      endTime: now,
      geo: 'ID'
    })
      .then(function(results){
        let data = JSON.parse(results)
        let timelineData = data.default.timelineData
        console.log(timelineData.length);
        
        timelineData.map((data, index) => {
          let dataValue = data.value[0]
          let dataDate = new Date(data.formattedAxisTime)
          let dataMonth = dataDate.getMonth()
          let dataYear = dataDate.getFullYear()
          data['month'] = dataMonth
          data['year'] = dataYear
        })
  
        let resultByMonth = []
  
        let dateMin = {
          month: timelineData[0].month,
          year: timelineData[0].year,
        }
  
        let dateMax = {
          month: timelineData[timelineData.length-1].month,
          year: timelineData[timelineData.length-1].year
        }
  
        let months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'  ]
  
        for (let i = dateMin.month; i < 12; i++) {
          let obj = {
            month: i,
            monthName: months[i],
            year: dateMin.year,
            values: []
          }
          resultByMonth.push(obj)
        }
  
        for (let i = 0; i < dateMax.month + 1; i++) {
          let obj = {
            month: i,
            monthName: months[i],
            year: dateMax.year,
            values: []
          }
          resultByMonth.push(obj)
        }
        // console.log('==>',resultByMonth)
        
        timelineData.map((data, index) => {
          resultByMonth.map((monthlyData, index) => {
            if (data.month == monthlyData.month && data.year == monthlyData.year) {
              monthlyData.values.push(data.value[0])
            }
          })
        })
        // console.log('==>?',resultByMonth)
  
        resultByMonth.map((data, index) => {
          data['max'] = Math.max(...data.values)
          data['min'] = Math.min(...data.values)
          data['total'] = 0
          // console.log(data)
          data.values.map((count, index) => {
            data.total += Number(count)
          })
          data['average'] = data.total / data.values.length
        })
        // console.log('???>',resultByMonth)
  
        let finalResult = []
  
        let objData = {}
        objData['id'] = keyword
        objData['data'] = []
  
        resultByMonth.map((data, index) => {
          // console.log(data)
          let obj = {
            x: `${data.monthName} ${data.year}`,
            y: data.average
          }
          objData.data.push(obj)
        })
  
        finalResult.push(objData)
  
        res.status(200).json({
          message: 'Google API interestOverTime successful',
          finalResult
        })
      })
      .catch(function(err){
        console.error('ERROR: interestOverTime ==>', err);
      });
  },

  interestByRegion (req, res, next) {
    let { keyword, geocode } = req.body
    let now = new Date(Date.now())
    let now_year = now.getFullYear()
    let now_month = now.getMonth() + 1
    let now_day = now.getDate()
    let last_year_date = `${now_year-1}-${now_month}-${now_day}`
  
    googleTrends.interestByRegion({
      keyword, 
      startTime: new Date(last_year_date), 
      endTime: now, 
      geo: geocode || 'ID'
    })
    .then(async (results) => {
      let data = JSON.parse(results)
      let geoMapData = data.default.geoMapData
      console.log(geoMapData.length);
      let regionData = []

      // // GEOCODE VERSION
      // let geoRules = await Promise.all(geoMapData.map(async (geocode, index) => {
      //   let geoName = geocode.geoName.replace(/ /g, '%20')
      //   let key = process.env.KEY

      //   const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${geoName}&key=${key}`)
      //   let obj = {
      //     name: geoData.data.results[0].address_components[0].short_name,
      //     coordinates: [ geoData.data.results[0].geometry.location.lng, geoData.data.results[0].geometry.location.lat ],
      //     population: geocode.value[0]
      //   }
      //   regionData.push(obj)
      // }))

      // GEO API VERSION
      geoMapData.map((geocode, index) => {
        let geoDataEach = []
        geoDataEach.push(geocode.geoName)
        geoDataEach.push(geocode.value[0])
        regionData.push(geoDataEach)
      })

      res.status(200).json({
        message: 'Google API interestByRegion successful',
        regionData
      })
  
    })
    .catch((err) => {
      console.log('ERROR: interestByRegion ==>', err);
    })
  },

  interestByQueries (req, res, next) {
    let { keyword, geocode } = req.body
    let now = new Date(Date.now())
    let now_year = now.getFullYear()
    let now_month = now.getMonth() + 1
    let now_day = now.getDate()
    let last_year_date = `${now_year-1}-${now_month}-${now_day}`
  
    googleTrends.relatedQueries({
      keyword, 
      startTime: new Date(last_year_date), 
      endTime: now, 
      geo: geocode || 'ID'
    })
    .then((results) => {
      let data = JSON.parse(results)
      let rankedList = data.default.rankedList
      let topList = rankedList[0].rankedKeyword
      let risingList = rankedList[1].rankedKeyword
      let breakOutList = []
  
      risingList.map((item, index) => {
        if (item.formattedValue == "Breakout") {
          breakOutList.push(item)
        }
      })
  
      let result = {
        topList,
        risingList,
        breakOutList
      }
  
      console.log('top:', topList.length)
      console.log('rising', risingList.length)
  
      res.status(200).json({
        message: 'Google API relatedQueries successful',
        result
      })
  
    })
    .catch((err) => {
      console.log('ERROR: relatedQueries ==>', err);
    })
  },

  interestByTopics (req, res, next) {
    let { keyword, geocode } = req.body
    let now = new Date(Date.now())
    let now_year = now.getFullYear()
    let now_month = now.getMonth() + 1
    let now_day = now.getDate()
    let last_year_date = `${now_year-1}-${now_month}-${now_day}`
    
    googleTrends.relatedTopics({
      keyword, 
      startTime: new Date(last_year_date), 
      endTime: now, 
      geo: geocode || 'ID'
    })
    .then((results) => {
      let data = JSON.parse(results)
      let rankedList = data.default.rankedList
      let topList = rankedList[0].rankedKeyword
      let risingList = rankedList[1].rankedKeyword
      let breakOutList = []
  
      risingList.map((item, index) => {
        if (item.formattedValue == "Breakout") {
          breakOutList.push(item)
        }
      })
  
      let result = {
        topList,
        risingList,
        breakOutList
      }
  
      console.log('top:', topList.length)
      console.log('rising', risingList.length)
  
      res.status(200).json({
        message: 'Google API relatedTopics successful',
        result
      })
  
    })
    .catch((err) => {
      console.log('ERROR: relatedTopics ==>', err);
    })
  }

}

