/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const fetch = require('node-fetch');
const express = require('express')
const { json } = require('body-parser')
const { eventContext } = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(json())
app.use(eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/nhlapi', function(req, res) {
  // Add your code here
  res.json({success: 'get call test!', url: req.url, body: "test"});
});

app.get('/nhlapi/standings', async function(req, res) {
  try {
  const response = await fetch("https://api-web.nhle.com/v1/standings/now")
  const data = await response.json();
  res.json({success: 'standings!', url: req.url, body: data});
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

app.get('/nhlapi/team/:teamId', async function(req, res) {
  try {
  const teamId = req.params.teamId;
  const response = await fetch(`https://api-web.nhle.com/v1/club-stats/${teamId}/now`)
  const data = await response.json();
  res.json({success: 'players!', url: req.url, body: data});
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

/****************************
* Example post method *
****************************/

app.post('/nhlapi', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/nhlapi/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/nhlapi', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/nhlapi/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/nhlapi', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/nhlapi/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
