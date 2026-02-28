const router = require("express").Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {

  const note = await Note.findOneAndUpdate(
    { userId: req.user.id },
    { content: req.body.content },
    { new: true, upsert: true }
  );

  res.json(note);
});


router.get("/", auth, async (req, res) => {

  const note = await Note.findOne({ userId: req.user.id });

  res.json(note || {});
});

router.delete("/", auth, async (req, res) => {

  await Note.findOneAndDelete({ userId: req.user.id });

  res.json({ message: "Note deleted" });
});

module.exports = router;