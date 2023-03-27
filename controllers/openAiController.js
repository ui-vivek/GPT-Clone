const dotenv = require("dotenv");
const chalk = require("chalk");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//---------------------summary controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n ${text}`, //this is the promt req
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return res.status(404).json({
      message: error.message,
    });
  }
};
//---------------------paragraph controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Explain this in details \n ${text}`, //this is the promt req
      max_tokens: 1000,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return res.status(404).json({
      message: error.message,
    });
  }
};

//---------------------chatbot controller
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer the question based on the previous question asked and your answer \n ${text}`, //this is the promt req
      max_tokens: 300,
      temperature: 0.8,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return res.status(404).json({
      message: error.message,
    });
  }
};
//---------------------chatbot controller
exports.codehelperController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `write the code for \n ${text}`, //this is the promt req
      max_tokens: 300,
      temperature: 0.23,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(chalk.red.inverse(error));
    return res.status(404).json({
      message: error.message,
    });
  }
};
//---------------------------from Open AI
// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   max_tokens: 7,
//   temperature: 0,
// });
