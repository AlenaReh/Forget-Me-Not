const {
  writeToFile,
} = require("../helpers/fsUtils");

const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    //Reading datafro mJSON file using Fs module readFile()
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        //parsing data in JSON object to display on the HTML , in case of no values assign a blank array
        let storeNotes = JSON.parse(data) || [];
        //returning the parsed object to the HTML page
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

        // console.log("New Note", req.body);
        storeNotes.push(req.body);
        // console.log("Combined Notes", storeNotes);
        //updating the JSON file with new combined Notes
        writeToFile("./db/db.json", storeNotes, (err) => {
          if (err) throw err;
        });
        //return JSON object to the display HTML.
        res.json(storeNotes);
      }
    });
  });

  //to delete notes
  app.delete("/api/notes/:id", (req, res) => {
    //converting params into an integer
    let deletedNote = parseInt(req.params.id);
    let newStoredNotes = [];

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      //Refresh values
      storeNotes = [].concat(JSON.parse(data));

      for (let i = 0; i < storeNotes.length; i++) {
        //Filtering out the delted note from the Note  list
        if (deletedNote !== storeNotes[i].id) {
          newStoredNotes.push(storeNotes[i]);
        }
      }
      //   console.log("Delete", newStoredNotes);
      //Updating the JSON file with the filtered Data
      writeToFile("./db/db.json", newStoredNotes, (err) => {
        if (err) throw err;
      });
      //   console.log("Deleted successfully!!", deletedNote);
      //returning the updated JSON object tot hTML page
      res.json(newStoredNotes);
    });
  });
};
