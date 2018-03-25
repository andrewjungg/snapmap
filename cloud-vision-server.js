// Require
const vision = require('node-cloud-vision-api')

// Initialize
vision.init({auth: 'AIzaSyB8sAy4-cHcVb0MZoWdnEli7fUoeP-quzs'}); 

// Global vars 
var visionRequest = '';
var filePath = '';

// Azure Database 
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Set database connection info details
var db_conn_info = { 
    userName: 'snapmapadmin', 
    password: 'Password1!', 
    server: 'snapmap.database.windows.net',
    options: {
      database: 'SnapMap Database', 
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  };
  var connection = new Connection(db_conn_info);
  
// Connect to a database
connection.on('connect', function(err) {
    if (err) {
      console.log(err)
    } else {
      queryRecords("SELECT * FROM dbo.SampleTest");
    }
});
  
  // execute input query and iterate through the results set
  function queryRecords(input, data) { 
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
      });
  }, (e) => {
    console.log('Error: ', e)
  });    
}