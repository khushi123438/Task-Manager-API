const router = require("express").Router();
const Goal = require("../models/Goal");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {

  const goal = await Goal.findOneAndUpdate(
    { userId: req.user.id },
    { goal: req.body.goal },
    { new: true, upsert: true }
  );

  res.json(goal);
});


router.get("/", auth, async (req, res) => {

  const goal = await Goal.findOne({ userId: req.user.id });

  res.json(goal || {});
});


router.delete("/", auth, async (req, res) => {

  await Goal.findOneAndDelete({ userId: req.user.id });

  res.json({ message: "Goal deleted" });
});

module.exports = router;