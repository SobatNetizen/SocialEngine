const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');

// autoComplete: Returns the results from the "Add a search term" input box 
// in the google trends UI. 
router.post('/', (req, res, next) => {
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
})


// interestOverTime: Numbers represent search interest relative 
// to the highest point on the chart for the given region and time. 
// A value of 100 is the peak popularity for the term. 
// A value of 50 means that the term is half as popular. 
// Likewise a score of 0 means the term was less than 1% as popular as the peak
router.post('/time', (req, res, next) => {
  let { keyword } = req.body
  let now = new Date(Date.now())
  let now_year = now.getFullYear()
  let now_month = now.getMonth()
  let now_day = now.getDate()
  let last_year_date = `${now_year-1}-${now_month}-1`
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

      res.status(200).json({
        message: 'Google API interestOverTime successful',
        timelineData
      })
    })
    .catch(function(err){
      console.error('ERROR: interestOverTime ==>', err);
    });
})


// interestByRegion: See in which location your term was most popular during the specified time frame
// Values are calculated on a scale from 0 to 100, 
// where 100 is the location with the most popularity as a fraction of 
// total searches in that location, 
// a value of 50 indicates a location which is half as popular, 
// and a value of 0 indicates a location where the term was less 
// than 1% as popular as the peak.
router.post('/region', (req, res, next) => {
  let { keyword, geocode } = req.body
  let now = new Date(Date.now())
  let now_year = now.getFullYear()
  let now_month = now.getMonth()
  let now_day = now.getDate()
  let last_year_date = `${now_year-1}-${now_month}-1`

  googleTrends.interestByRegion({
    keyword, 
    startTime: new Date(last_year_date), 
    endTime: now, 
    geo: geocode || 'ID'
  })
  .then((results) => {
    let data = JSON.parse(results)
    let geoMapData = data.default.geoMapData
    console.log(geoMapData.length);

    res.status(200).json({
      message: 'Google API interestByRegion successful',
      geoMapData
    })

  })
  .catch((err) => {
    console.log('ERROR: interestByRegion ==>', err);
  })
})


// relatedQueries: Users searching for your term also searched for these queries
// Top - The most popular search queries. Scoring is on a relative scale 
// where a value of 100 is the most commonly searched query, 50 is a query searched 
// half as often, and a value of 0 is a query searched for less than 1% as often as 
// the most popular query.
// Rising - Queries with the biggest increase in search frequency since the last time period. 
// Results marked "Breakout" had a tremendous increase, probably because these queries are new and had few (if any) prior searches.
router.post('/queries', (req, res, next) => {
  let { keyword, geocode } = req.body
  let now = new Date(Date.now())
  let now_year = now.getFullYear()
  let now_month = now.getMonth()
  let now_day = now.getDate()
  let last_year_date = `${now_year-1}-${now_month}-1`

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
})


// relatedTopics: Users searching for your term also searched for these topics.
// result will be the smae with relatedQueries
router.post('/topics', (req, res, next) => {
  let { keyword, geocode } = req.body
  let now = new Date(Date.now())
  let now_year = now.getFullYear()
  let now_month = now.getMonth()
  let now_day = now.getDate()
  let last_year_date = `${now_year-1}-${now_month}-1`

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
})



module.exports = router;

