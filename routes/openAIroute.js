const express = require("express");
const { summaryController ,paragraphController,chatbotController} = require("../controllers/openAiController");

const router = express.Router();

router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
module.exports = router;
