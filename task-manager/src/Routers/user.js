const express = require("express");
const router = new express.Router();
const User = require("../models/user");

const auth = require('../middleware/auth')

router.get("/test", (req, resp) => {
  resp.send("test");
});

module.exports = router;

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    //anything after this will wait until the user is saved
     await user.save();
    const token = await user.generateAuthToken()

    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }

  //anything after this will wait until the user is saved
});

router.post("/users/login", async (req, resp) => {
  try {
    ///costume function
    const user = await User.findByCredentials(req.body.email,req.body.password);
    const token = await user.generateAuthToken()
    resp.send({user, token})
  } catch (e) {
    resp.status(400).send(e);
  }
});

///auth is our middleware function that run before the rest of the function run

router.get("/users/me", auth, async (req, res) => {
 
res.send(req.user)


});

///get the user profile 
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById({ _id });

    if (!user) {
      return res.status(404).send("user not found try a different id");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, resp) => {
  ////grap all the keys sent from the body
  const updates = Object.keys(req.body);

  ///create all the properties you allow to update
  const allowedUpdates = ["name", "email", "password", "age"];

  ///loop in every key sent and check if include the allowed properties
  const isValidOperation = updates.every((update) => {
    ///check if the allowed properties includes the sent one and return boolean value
    return allowedUpdates.includes(update);
  });
  ////if return false will send an error back to the clients
  if (!isValidOperation) {
    return resp.status(400).send({ error: "invalid updates" });
  }

  try {
    /// new :true : this will return the new user with the updates
    ////runValidators: true : make sure we use validator to get the format we accepted

    ///const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});

    ////the above function bypass mangoose and perform a direct operation on the data base

    const user = await User.findById(req.params.id);

    ///since we are looping thought different properties and we cannot hard coded or know the exact one we are updating
    ///this will create a dynamic way to update the filed we want to update
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    if (!user) {
      return resp.status(404).send();
    }

    resp.send(user);
  } catch (e) {
    resp.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, resp) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return resp.status(404).send({ err: "user not found" });
    }

    resp.status(200).send(user);
  } catch (e) {
    resp.status(500).send(e);
  }
});
