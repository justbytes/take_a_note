const notesRouter = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notesRouter.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notesRouter.post('/', (req, res) => {
  console.info(`${req.method} Note recieved!`);
  console.log(req.body);

  const { title, text, id } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding a note');
  }
});

module.exports = notesRouter;


