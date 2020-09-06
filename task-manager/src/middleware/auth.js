const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {

  try {
    ///get the auth from the header delete the Barer word and get the token
    const token =  req.header('Authorization').replace("Bearer ", '')
    const decoded =  jwt.verify(token, "SecretWord");

    ///find the user with the correct id that has that token stored in the array of tokens
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    ///store the user in the req
    req.user = user;
    next();
  } catch (e) {


    res.status(401).send({ error: e });


  }
};

module.exports = auth;
