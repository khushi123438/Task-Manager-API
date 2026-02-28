const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const task = new Task({
    userId: req.user.id,
    text: req.body.text,
    completed: false
  });

  await task.save();
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});


router.put("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  await task.save();

  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  res.json({ message: "Task deleted" });
});

module.exports = router;