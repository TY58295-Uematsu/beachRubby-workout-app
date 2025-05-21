const express = require('express');
const router = express.Router();
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_REGION,
});


const model = vertexAI.getGenerativeModel({
    model: 'gemini-pro', 
    // model: 'gemini-1.5-flash', 
    // models/gemini-2.0-flash
  });
  
  router.post('/ask', async (req, res) => {
    console.log('geminiに質問が来た');
    console.log(req.body);
    
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ error: '質問がありません。' });
    }
  
    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: question }] }],
      });
  
      const response = result.response;
      const answer = response.candidates[0].content.parts[0].text;
      res.json({ answer });
    } catch (error) {
      console.error('Gemini APIエラー:', error);
      res.status(500).json({ error: 'AIによる回答の生成に失敗しました。' });
    }
  });
  
  module.exports = router;
  