const {readAndAppend, readFromFile, readingData, writeToFile} = require("../helpers/fsUtils");
let storeNotes;
const fs = require("fs");
const { ADDRGETNETWORKPARAMS } = require("dns");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    console.log("reading data .. ", "./db/db.json");
    // const allNotes = async() =>{
    //     storeNotes = await readFile("./db/db.json");
    //     return JSON.parse(storeNotes);

    // console.log("readFromFile", storeNotes);
    // res.json(storeNotes)

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        storeNotes = JSON.parse(data);
        console.log("parsedData", storeNotes);
        res.json(storeNotes);
      }
    });
  });

  app.post("/api/notes", function (req, res) {
    // console.log("New Note", req.body);
    storeNotes.push(req.body);
    // console.log("Combined Notes", storeNotes);

    writeToFile("./db/db.json", storeNotes, err => {
        if(err) 
        throw(err);
    });
    res.json(true);
  });

    //to delete notes
    app.delete('/api/notes/:id', (req, res) => {
        const deletedNote = parseInt(req.params.id);
        let newStoreNotes = [];
        fs.readFile('./db/db.json', (data) => {
            storeNotes = JSON.parse(data);
            for (let i=0; i<storeNotes.length; i++){
                if(deletedNote !== storeNotes[i].id){
                    newStoreNotes.push(storeNotes[i])
                }
            }
            return newStoreNotes
        }).then(function(storeNotes){
            fs.writeToFile('./db/db.json', JSON.stringify(storeNotes))
            console.log('Sucsess!')
        });

    })


};

