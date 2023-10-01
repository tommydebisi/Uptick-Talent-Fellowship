const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  // get username from request body
  console.log(req.body);
  const { username } = req.body;

  // check if user already exists
  if (await User.exists({ username })) {
    return res.status(400).send('User already exists');
  }

  try {
    const user = new User({ username });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(`Could not create user err: ${error}`);
  }
};
