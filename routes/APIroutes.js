const {
  writeToFile,
} = require("../helpers/fsUtils");

const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    //Reading data from JSON file using Fs module readFile()
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        //Parsing data in JSON object to display on the HTML, in case of no values - assign a blank array
        let storeNotes = JSON.parse(data) || [];
        //Returning the parsed object to the HTML page
        res.json(storeNotes);
      }
    });
  });

  app.post("/api/notes", (req, res) => {
    //Reading data from JSON file using Fs module readFile()
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        let storeNotes = JSON.parse(data) || [];
        storeNotes.push(req.body);
        //Updating the JSON file with new combined Notes
        writeToFile("./db/db.json", storeNotes, (err) => {
          if (err) throw err;
        });
        //Return JSON object to the display HTML.
        res.json(storeNotes);
      }
    });
  });

  //To delete notes
  app.delete("/api/notes/:id", (req, res) => {
    //Converting params into an integer
    let deletedNote = parseInt(req.params.id);
    let newStoredNotes = [];
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      //Refreshing values
      storeNotes = [].concat(JSON.parse(data));
      for (let i = 0; i < storeNotes.length; i++) {
        //Filtering out the delted note from the Note  list
        if (deletedNote !== storeNotes[i].id) {
          newStoredNotes.push(storeNotes[i]);
        }
      }
      //Updating the JSON file with the filtered Data
      writeToFile("./db/db.json", newStoredNotes, (err) => {
        if (err) throw err;
      });
      //Returning the updated JSON object to hTML page
      res.json(newStoredNotes);
    });
  });
};
