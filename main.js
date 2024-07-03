const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');
const port = 4000 || process.env.PORT;

app.get('/harvard_reviews', (req, res) => {

  var rowKey = req.query.published_date;
  var ratingKey = req.query.rating;

  let db = new sqlite3.Database('./RestfulAPISQL.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  
  //http://localhost:4000/harvard_reviews?published_date="2024-03-08T00:01:17-05:00"
  if(rowKey!= null){
    db.all(`SELECT * FROM harvard_reviews WHERE published_date =` + rowKey, [], (err, rows) => {
      if (err) {
        throw err;
      }
        res.send(rows);
    });
  }
  //http://localhost:4000/harvard_reviews?rating=4
  else if(ratingKey!= null){
    db.all(`SELECT * FROM harvard_reviews WHERE rating = ` + ratingKey, [], (err, rows) => {
      if (err) {
        throw err;
      }
      var array = []; 
      rows.forEach((row) => {
        array.push(row);
      });
      res.json(array);      

    });
  }

  //http://localhost:4000/harvard_reviews
  else{
    db.all(`SELECT * FROM harvard_reviews`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      var array = []; 
      rows.forEach((row) => {
        array.push(row);
      });
      res.json(array);      
    }); 
  }


});


app.get('/pizza_hut_reviews', (req, res) => {

  var textKey = req.query.text;
  var starKey = req.query.stars;

  let db = new sqlite3.Database('./RestfulAPISQL.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  
  //http://localhost:4000/pizza_hut_reviews?text=%22Typical%20Pizza%20Hut%20but%20very%20slow%20service%22
  if(textKey!= null){
    db.all(`SELECT * FROM pizza_hut_reviews WHERE text =` + textKey, [], (err, rows) => {
      if (err) {
        throw err;
      }
        res.send(rows);
    });
  }
  
  //http://localhost:4000/pizza_hut_reviews?stars=3
  else if(starKey!= null){
    db.all(`SELECT * FROM pizza_hut_reviews WHERE stars = ` + starKey, [], (err, rows) => {
      if (err) {
        throw err;
      }
      var array = []; 
      rows.forEach((row) => {
        array.push(row);
      });
      res.json(array);      

    });
  }

  //http://localhost:4000/pizza_hut_reviews
  else{
    db.all(`SELECT * FROM pizza_hut_reviews`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      var array = []; 
      rows.forEach((row) => {
        array.push(row);
      });
      res.json(array);      
    }); 
  }

  db.close();

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

