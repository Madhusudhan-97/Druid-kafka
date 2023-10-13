const request1 = require('request');
const express = require('express');
const app = express();
const port = 2025;
const druidUrl = 'http://localhost:8888/druid/indexer/v1/supervisor';
const sqlqueryUrl = 'http://localhost:8888/druid/v2/sql';
const nativequeryUrl = 'http://localhost:8888/druid/v2/?pretty';

app.use(express.json());


  
app.post('/createdatasource', (req, res) => {
  const ingestionSpec = req.body;
  request1.post({
    url: druidUrl,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(ingestionSpec)
  }, (error, response) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    if (response.statusCode !== 200) {
      res.status(400).send(response);
      return;
    }
    res.status(200).send(response);
  });
});



app.post('/query', (req, res) => {
  const query = req.body;
  request1.post({
    url: sqlqueryUrl,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(query)
  }, (error, response) => {
    try{
      const parsedBody = JSON.parse(response.body);
    res.status(200).send(parsedBody);
    }
    catch{
      res.status(500).send(error)
    }
    
  }
  )

});


app.post('/nativequery', (req, res) => {
    const nquery = req.body;
    request1.post({
      url: nativequeryUrl,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(nquery)
    }, (error, response) => {
      try{
        const parsedBody = JSON.parse(response.body);
      res.status(200).send(parsedBody);
      }
      catch{
        res.status(500).send(error)
      }
      
    }
    )

});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = { app, request1 };
