console.log('starting app.js...');

const fs = require('fs');
const os = require('os');
const yargs = require('yargs');

const notes = require('./notes.js');
const yArgv = yargs.argv;
const actions = ['add', 'remove', 'list', 'read'];
const pCom = process.argv[2];

console.log(yArgv);

class Commands {
  constructor (env) {
    this.command = env.pCom;
    this.commands = env.actions;
    this.yArgv = env.yArgv;
    this.notes = env.notes;
  }
  get isArgCommand() {
    return this.commands.includes(this.command);
  }
  add() {
    this.notes.addNote(this.yArgv.title, this.yArgv.body);
  }
  remove() {
    this.notes.removeNote(this.yArgv.title);
  }
  list() {
    this.notes.getAllNotes();
  }
  read() {
    this.notes.getNote(this.yArgv.title);
  }
  null() {
    console.log(`command ${this.command} not recognized`);
  }
}

let appCommands = new Commands({
  yArgv,
  notes,
  actions,
  pCom
});
  appCommands[appCommands.isArgCommand ? appCommands.command : null]();
