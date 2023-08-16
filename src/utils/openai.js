require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// openai configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
async function chat(message, history, onData) {
  const oldHistory = [...history, { role: "user", content: message }];
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: oldHistory
  });
  onData([...oldHistory, completion.data.choices[0].message]);
}

module.exports = {
  chat
};
