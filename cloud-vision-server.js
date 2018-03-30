// NOTE: MUST INSTALL
// npm install node-cloud-vision-api --save
// npm install @google/maps --save
// npm install tedious --save 

//////////////////
// Dependencies //
//////////////////
const vision = require('node-cloud-vision-api'); // Node-Cloud-Vision API Key 
vision.init({auth: 'AIzaSyB8sAy4-cHcVb0MZoWdnEli7fUoeP-quzs'}); // Init node-cloud-vision-api
const googleMapsClientKey = 'AIzaSyBhGfxxUvFuqP-o-SMez1E580NQp1F2MeY'; // Node.js Client API Key 
const googleMapsClient = require('@google/maps').createClient({
  key: googleMapsClientKey,
  Promise: Promise
}); // Node.js Client for Google Maps Service
var Connection = require('tedious').Connection; // Azure Database Connection object
var Request = require('tedious').Request; // Azure Database Request object
var db_conn_info = { 
  userName: 'snapmapadmin', 
  password: 'Password1!', 
  server: 'snapmap.database.windows.net',
  options: {
    database: 'SnapMap Database', 
    encrypt: true,
    rowCollectionOnRequestCompletion: true
  }
}; // Set database connection info details

// Global vars 
var visionRequest = '';
var filePath = '';

// Location Object
function locationObject(desc, score, lat, lng) {
  this.description = desc;
  this.score = score;
  this.lat = lat;
  this.lng = lng; 
}

// Only function that is exposed to server
function retrieveResults(queryStr) {
  queryStr = "SELECT * FROM dbo.SampleTest WHERE ID = 2";
  connectToDb(queryStr);
}

// TODO: Remove, just for test 
retrieveResults("Hey");

// Function that connects to the Azure database 
function connectToDb(queryStr) {
  // Connect to a database
  var connection = new Connection(db_conn_info);
  connection.on('connect', function(err) {
      if (err) {
        console.log(err)
      } else {
        queryRecords(queryStr,connection);
      }
  });
}
 
// execute input query and iterate through the results set
function queryRecords(input,connection) { 
  var visionRequests = [];

  // setup a query request
  var request = new Request(input, function(err, rowCount, rows) {
      console.log(rowCount + ' row(s) returned');
      rows.forEach(function(row) {
        row.forEach(function(column) {
          if (column.metadata.colName == 'FilePath' && column.value != "") {
            visionRequests.push(createFileLandmarkRequest(column.value));   
          } else if (column.metadata.colName == 'Url' && column.value != "") {
            visionRequests.push(createUrlLandmarkRequest(column.value));
          }
        });          
      });
      visionRequests.forEach(function(request){
        annotateRequest(request);
        console.log('');
      });    
      //process.exit();    
    }
  );

  // run the query request
  connection.execSql(request);
}

  // Create Requests for Local Files 
function createFileLandmarkRequest(filePath) {
    var req = new vision.Request({
        image: new vision.Image(filePath),
        features: [
            new vision.Feature('LANDMARK_DETECTION', 5),
            new vision.Feature('WEB_DETECTION', 5)
        ]
      });
      console.log(req);
    return req;
}

// Create Request for URL's
function createUrlLandmarkRequest(urlPath) {
  var req = new vision.Request({
    image: new vision.Image({
      url: urlPath
    }),
    features: [
          new vision.Feature('LANDMARK_DETECTION', 5),
          new vision.Feature('WEB_DETECTION', 5)
      ]
    });
    console.log(req);
  return req;
}

// Annotate Request, send request to Cloud Vision API 
function annotateRequest(req) {
vision.annotate(req)
  .then((res) => {    
      res.responses.forEach(function(response) {
        var landmark = response.landmarkAnnotations;
        var webDetection = response.webDetection.webEntities;

        console.log("Landmarks: ");
        console.log(JSON.stringify(landmark));
        console.log('');
        console.log("Web Detections: ");
        webDetection.forEach(function(label) {
          console.log(JSON.stringify(label));
        });

        // Process results into format to return to SnapMapServer and Client 
        formatResults(webDetection);
      });
  }, (e) => {
    console.log('Error: ', e)
  });    
}

function formatResults(webEntities) {
  var results = [];

  // for each Web Entity, must find a lat/lng 
  webEntities.forEach(function(label) {
    if (label.description) {
      googleMapsClient.geocode({
        address: label.description
      })
      .asPromise()
      .then((response) => {
        var location = response.json.results[0].geometry.location;
        var lat = location.lat;
        var lng = location.lng;
        result = new locationObject(label.description, label.score, lat, lng);
        results.push(result);
      })
      .catch((err) => {
        console.log(err);
      }); 
    }
  });

  console.log(results);
}