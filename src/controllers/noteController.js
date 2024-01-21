const noteTodo = require('../models/noteModel');

exports.createNote =async(req, res) => {
  try {
    const { id, note } = req.body;

    if (!note) {
      return res.json({
        "success": false,
        error: "Invalid note and note is required"
      });
    }
    if (!id) {
      return res.json({
        "success": false,
        error: "Invalid note and id is required"
      });
    }

    const myNote = await new noteTodo({
      note,
      todoId: id,

    }).save();


    res.json({
      "success": true,
      myNote,
    })


    
  } catch (error) {
    res.json({
      "success": false,
      error: "note Create failed and error: " + error
    })
  }
}

// note delete

exports.noteDelete = async (req, res) => {
  try {
    
    const {id} = req.params;
    if (!id) {
      return res.json({
        "success": false,
        error: "invalid id and must be provided note id"
      });
    }

    const findNote = await noteTodo.findByIdAndDelete({ _id: id });
    
    if (findNote === null) {
      return res.json({
        "success": false,
        error: "note not found"
      })
    }

    res.json({
      "success": true,
      "massage": "Delete successful",
      "data": findNote
    })

  } catch (error) {
    res.json({
      "success": false,
      error: "note Delete failed and error: " + error
    })
  }
}

// update note

exports.updateNote = async (req, res) => {
  try {
    const { id, note } = req.body;
    
    if (!id) {
      return res.json({
        "success": false,
        error: "invalid Id and must be provided Id"
      });
    }

    const myNoteExists = await noteTodo.findById({ _id: id });

    if (!myNoteExists) { 
      return res.json({
        "success": false,
        error: "note not found"
      });
    }

    const NoteUpdate = await noteTodo.findByIdAndUpdate(
      id,
      {
      note: note || myNoteExists.note,
      todoId: myNoteExists.todoId,
    }, {
      new: true,
    })

    res.json({
      "success": true,
      "massage": "update successful",
      "data": NoteUpdate,
      "note": myNoteExists
    })

  } catch (error) {
    res.json({
      "success": false,
      error: "note Update failed and error: "+error
    })
  }
}


// find all notes

exports.findAllNotes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        "success": false,
        error: "Todo id required"
      });
    }

    const allNotes = await noteTodo.find({ todoId: id });

    if (!allNotes) { 
      return res.json({
        "success": false,
        error: "do not create any notes eyt"
      })
    }

    res.json({
      "success": true,
      "massage": "all notes",
      "data": allNotes,
    })



  } catch (error) {
    res.json({
      "success": false,
      error: "AllNotes failed and error: " + error
    })
  }
}