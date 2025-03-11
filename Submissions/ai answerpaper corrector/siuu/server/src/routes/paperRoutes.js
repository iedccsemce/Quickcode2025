import express from 'express';
import multer from 'multer';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { Ocr } from 'node-ts-ocr';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and PDF files are allowed'));
    }
  }
});

// Helper function to process OCR
async function processOCR(filePath) {
  try {
    return await Ocr.extractText(filePath);
  } catch (error) {
    throw new Error(`OCR processing failed: ${error.message}`);
  }
}

// Helper function to evaluate answers using OpenRouter API
async function evaluateAnswers(questionText, answerText = null) {
  try {
    const prompt = answerText
      ? `Question Paper Content:\n${questionText}\n\nAnswer Paper Content:\n${answerText}\n\nPlease analyze the question paper and provide the answers in the following JSON format:\n{\n  \"questions\": [\n    {\n      \"number\": 1,\n      \"text\": \"<question text>\",\n      \"correctAnswer\": \"<correct answer>\",\n      \"submittedAnswer\": \"<submitted answer>\",\n      \"isCorrect\": true/false,\n      \"explanation\": \"<explanation of correctness/incorrectness>\"\n    }\n  ],\n  \"summary\": {\n    \"totalQuestions\": <number>,\n    \"correctAnswers\": <number>,\n    \"score\": <percentage>\n  }\n}`
      : `Question Paper Content:\n${questionText}\n\nPlease analyze the question paper and provide the answers in the following JSON format:\n{\n  \"questions\": [\n    {\n      \"number\": 1,\n      \"text\": \"<question text>\",\n      \"correctAnswer\": \"<correct answer>\",\n      \"explanation\": \"<explanation of the answer>\"\n    }\n  ],\n  \"summary\": {\n    \"totalQuestions\": <number>\n  }\n}`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-r1-zero:free',
      messages: [{
        role: 'user',
        content: prompt
      }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`AI evaluation failed: ${error.message}`);
  }
}

// Route to handle paper upload and evaluation
router.post('/evaluate', upload.fields([
  { name: 'questionPaper', maxCount: 1 },
  { name: 'answerPaper', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files['questionPaper']) {
      return res.status(400).json({ error: 'Question paper is required' });
    }

    const questionPaperPath = req.files['questionPaper'][0].path;
    const answerPaperPath = req.files['answerPaper']?.[0]?.path;

    // Process OCR for question paper
    const questionText = await processOCR(questionPaperPath);
    
    // Process OCR for answer paper if provided
    let answerText = null;
    if (answerPaperPath) {
      answerText = await processOCR(answerPaperPath);
    }

    // Get AI evaluation
    const evaluation = await evaluateAnswers(questionText, answerText);

    // Clean up uploaded files
    await fs.unlink(questionPaperPath);
    if (answerPaperPath) {
      await fs.unlink(answerPaperPath);
    }

    res.json({
      success: true,
      evaluation
    });
  } catch (error) {
    // Clean up files in case of error
    try {
      if (req.files['questionPaper']) {
        await fs.unlink(req.files['questionPaper'][0].path);
      }
      if (req.files['answerPaper']) {
        await fs.unlink(req.files['answerPaper'][0].path);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }

    res.status(500).json({
      error: 'Evaluation failed',
      message: error.message
    });
  }
});

export default router;