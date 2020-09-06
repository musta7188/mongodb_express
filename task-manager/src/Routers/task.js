const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.get('/testtask', (req, resp) =>{
  resp.send("test task")
})

module.exports = router


router.get("/tasks", async (req, resp) => {
  try {
    const tasks = await Task.find({});
    resp.status(201).send(tasks);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, resp) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return resp.status(404).send("task not found");
    }

    resp.status(201).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.post("/tasks", async (req, resp) => {
  const task = new Task(req.body);

  try {
    await task.save(task);
    resp.status(201).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, resp) => {
  const updates = Object.keys(req.body);
  const updatesAllowed = ["description", "completed"];
  const isAllowed = updates.every((update) => updatesAllowed.includes(update));

  if (!isAllowed) {
    return resp.status(400).send({ error: "update not allowed" });
  }
  try {
    const task = await Task.findById(req.params.id)

    updates.forEach((update) => task[update] = req.body[update])

    await task.save()


    if (!task) {
      return resp.status(404).send({ error: "task not found" });
    }

    resp.status(200).send(task);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, resp) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return resp.status(404).send({ error: "task not found" });
    }

    resp.status(200).send(task);
  } catch (e) {
    resp.send({ error: e });
  }
});