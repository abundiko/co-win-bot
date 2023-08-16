const mongoose = require("mongoose");
require("dotenv").config();
const UserModel = require("./user_schema");
const SessionModel = require("./session_schema");

const connectionString = `mongodb+srv://${process.env
  .MONGO_USER_PASSWORD}@cluster0.lavbhyj.mongodb.net/co-win?retryWrites=true&w=majority`;

/**
 * Initializes the connection to the database.
 *
 * @return {boolean} Returns true if the connection is successful, false otherwise.
 */
async function init() {
  const result = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  if (result) return true;
  else return false;
}

/**
 * Saves a new user to the "co-win" database.
 *
 * @param {Object} userData - The user data to be saved.
 * @return {boolean} True if the user was successfully saved, false otherwise.
 */
async function newUser(userData) {
  mongoose.connection.useDb("co-win");
  const userExists = await UserModel.findOne({ phone: userData.phone });
  if (userExists && userExists._doc._id) {
    const result = await userExists.updateOne({ ...userData });
    return result ? true : false;
  }
  const newUser = new UserModel(userData);
  const result = await newUser.save();
  return result ? true : false;
}

/**
 * Updates the session data in the "co-win" database.
 *
 * @param {Object} session - The new session data.
 * @return {boolean} Returns true if the session data was successfully updated, false otherwise.
 */
async function updateSession(session) {
  mongoose.connection.useDb("co-win");
  const oldSession = await SessionModel.findOne({ _id: "session" });
  if (oldSession && oldSession._doc) {
    const result = await oldSession.updateOne({ data: session });
    return result ? true : false;
  }
  const sessionData = new SessionModel({
    _id: "session",
    name: "session",
    data: session
  });
  const result = await sessionData.save();
  console.log("UPDATED:", sessionData.data);
  return result ? true : false;
}

/**
 * Retrieves the session from the "co-win" database.
 *
 * @return {Object} The session data if it exists, otherwise {}.
 */
async function getSession() {
  mongoose.connection.useDb("co-win");
  const session = await SessionModel.findOne({ _id: "session" });
  if (session) {
    if (session._doc.data) return session._doc.data;
    updateSession({});
    return {};
  } else return {};
}

module.exports = {
  init,
  newUser,
  updateSession,
  getSession
};
