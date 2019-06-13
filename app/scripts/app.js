



var app = new Vue({
    el: '#app',
    data: {
        noteBeforeEdit : {},
        editedNote : {},
        showNewNote : false,
        notes: JSON.parse(localStorage.getItem('notes')) != undefined ? JSON.parse(localStorage.getItem('notes')) :  [
            { id : 1, name: 'Note A', content: 'Content A' , edit : false},
            { id : 2, name: 'Note B', content: 'Content B' , edit : false},
            { id : 3, name: 'Note C', content: 'Content C' , edit : false},
            { id : 4, name: 'Note D', content: 'Content D' , edit : false},
            { id : 5, name: 'Note E', content: 'Content E' , edit : false},
            { id : 6, name: 'Note F', content: 'Content F' , edit : false},
            { id : 7, name: 'Note G', content: 'Content G' , edit : false},
            { id : 8, name: 'Note H', content: 'Content H' , edit : false}
        ],
        newNote : {
            name : "",
            edit: false
        }
    },
    methods: {
        newNoteShow: function(){
            this.newNote = {
                name : "",
                id : ++this.notes[this.notes.length -1].id,
                edit: false
            };
            this.showNewNote = true;
        },
        addNote: function(){
            if(this.newNote.name.trim() == ""){
                alert('Note Name cannot be empty.');
            }
            else {
                Vue.set(this.newNote, 'id', this.notes[this.notes.length - 1].id + 1);
                this.notes.push(this.newNote);
                this.showNewNote = false;
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        },
        cancelAdd: function(){
            this.newNote = {
                name : "",
                id : ++this.notes[this.notes.length -1].id,
                edit: false
            };
            this.showNewNote = false;
        },
        saveEdit: function (nodeToEdit) {
            if(this.editedNote.name.trim() == ""){
                alert('Note Name cannot be empty.');
            }
            else{
                var index = this.notes.findIndex(note => note.id == nodeToEdit.id);
                this.$set(this.notes, index, this.editedNote);
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        },
        cancelEdit : function (nodeToEdit) {
            if(this.editedNote.name.trim() == ""){
                alert('Note Name cannot be empty.');
            }
            else {
                var index = this.notes.findIndex(note => note.id == nodeToEdit.id);
                this.$set(this.notes, index, this.noteBeforeEdit);
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        },
        editNote: function (note){
            this.noteBeforeEdit = Object.assign({}, note);
            this.editedNote = Object.assign({}, note);
            for(var i=0; i< this.notes.length; i++){
                this.notes[i].edit = this.notes[i].id == note.id ? true : false;
            }
        },
        deleteNote :  function (noteToDelete) {
            if (confirm("Are you sure you want to delete this note?")) {
                var index = this.notes.findIndex(note => note.id == noteToDelete.id);
                this.notes.splice(index,1);
            }
        }
    }
})