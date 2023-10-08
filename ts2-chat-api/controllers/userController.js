const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  // get username from request body
  const { username } = req.body;

  // check if user already exists
  if (await User.exists({ username })) {
    return res.status(400).json({ msg: 'Username already exists' });
  }

  try {
    const user = new User({ username });
    await user.save();
    res.status(201).json({ msg: 'User creation success' });
  } catch (error) {
    res.status(400).send(`Could not create user err: ${error}`);
  }
};
