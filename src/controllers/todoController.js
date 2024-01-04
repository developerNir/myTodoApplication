const todoModel = require('../models/todoModel');
const noteTodo = require('../models/noteModel');


// create Todo 

exports.create = async (req, res) => {
  try {
    const { title, description, priority, setTime } = req.body;

    switch (true) {
      case !title: 
        return res.json({ error: "Title is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !priority:
        return res.json({ error: "Priority is required" });
      case !setTime:
        return res.json({ error: "SetTime is required" });
    }

    const todo = await new todoModel({
      title,
      description,
      priority,
      user: req.user._id,
      setTime,
    }).save();


    res.json({
      "massage": "success",
      data: todo,
    })

  } catch (error) {
    res.json({ error: "todo Create Failed and error: "+error})
  }
}

// todo Update


exports.updateTodo = async (req, res) => {
  try {
    const { id, title, description, priority, setTime } = req.body;

    if (!id) {
      return res.json({ "error": "id is required" });
    }

    const todoExists = await todoModel.findOne({ _id: id });

    if (!todoExists) { 
      return res.json({"error": "todo does not exist"})
    }

    const update = await todoModel.findByIdAndUpdate(
      id,
      {
        title: title || todoExists.title,
        description: description || todoExists.description,
        priority: priority || todoExists.priority,
        setTime: setTime || todoExists.setTime,

    }, {
      new: true,
    })


    res.json({
      update,
      "massage": "update successful",
    })


  } catch (error) {
    res.json({
      error: "todo Update Failed and error: " + error
    })
  }
}





// todo Delete 
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
// note delete this todo 
    const beNoteDelete = await noteTodo.deleteMany({ todoId: id });
// todo delete
    const todo = await todoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "do not exist todo"})
    }

    res.json({
      "massage": "successful delete",
      data: todo,
      "notes": beNoteDelete
    })

  } catch (error) {
    res.json({ error: "todo Delete Failed and error: "+error})
  }
}


exports.allToDos = async (req, res) => {
  try {
    
    const allTodo = await todoModel.find({ user: req.user._id });

    res.json({
      "massage": true,
      data: {
        allTodo,
      }
    })



  } catch (error) {
    res.json({ error: "request failed and error: " + error });
  }
} 

