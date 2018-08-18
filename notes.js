console.log('starting notes.js...');

let fs = require('fs')

module.exports = {
  notes: [],
  printNotes() {
    console.log(this.notes);
  },
  noteNotFound(title) {
    console.log(`the note "${title}" not found`);
  },
  noteIndex(title) {
    return this.notes.findIndex(note => note.title === title)
  },
  fetchNotes() {
    try {
      let notesString = fs.readFileSync('notes-data.json');
      this.notes = JSON.parse(notesString);
    } catch (e) {}
  },
  saveNotes() {
    fs.writeFileSync('notes-data.json', JSON.stringify(this.notes));
  },
  addNote(title, body) {
    this.fetchNotes();
    ({
      [true]: () => {
        this.notes.push({
          title, body
        });
        this.saveNotes();
        this.printNotes();
      },
      [false]: () => {
        console.log(`the note "${title}" already exist`)
      }
    })[this.noteIndex(title) === -1]();
  },
  getAllNotes() {
    this.fetchNotes();
    this.printNotes();
  },
  removeNote(title) {
    this.fetchNotes();
    ({
      [true]: () => {
        this.notes.splice(this.noteIndex(title), 1);
        this.saveNotes();
        this.printNotes();
      },
      [false]: () => {
        this.noteNotFound(title);
      }
    })[this.noteIndex(title) !== -1]();
  },
  getNote(title) {
    this.fetchNotes();
    ({
      [true]: () => {
        console.log(this.notes[this.noteIndex(title)])
      },
      [false]: () => {
        this.noteNotFound(title);
      }
    })[this.noteIndex(title) !== -1]();
  }
}
