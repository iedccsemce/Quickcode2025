import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import { motion } from 'framer-motion'
import EvaluationResults from './components/EvaluationResults';

function App() {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerPaper, setAnswerPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);

  const handleQuestionPaperUpload = (file) => {
    setQuestionPaper(file);
    setError(null);
  };

  const handleAnswerPaperUpload = (file) => {
    setAnswerPaper(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!questionPaper) {
      setError('Please upload a question paper');
      return;
    }

    setLoading(true);
    setError(null);
    setEvaluation(null);

    const formData = new FormData();
    formData.append('questionPaper', questionPaper);
    if (answerPaper) {
      formData.append('answerPaper', answerPaper);
    }

    try {
      const response = await fetch('http://localhost:5000/api/papers/evaluate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Evaluation failed');
      }

      setEvaluation(data.evaluation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="w-full py-8"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI-Powered Paper Evaluation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get instant feedback on question papers with our advanced AI system. Upload your papers and receive detailed evaluations within seconds.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          >
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-blue-600">📝</div>
              <h3 className="text-lg font-semibold mb-2">Upload Papers</h3>
              <p className="text-gray-600">Submit your question paper and optionally your answer paper for evaluation</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-purple-600">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes the papers and generates correct answers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-green-600">✅</div>
              <h3 className="text-lg font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">Receive detailed feedback and correct/wrong markings for your answers</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full"
            >
              <FileUpload
                label="Upload Question Paper"
                onChange={handleQuestionPaperUpload}
                required={true}
              />
              <p className="mt-2 text-sm text-gray-500">Required - The AI will analyze this to generate correct answers</p>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full"
            >
              <FileUpload
                label="Upload Answer Paper"
                onChange={handleAnswerPaperUpload}
                required={false}
              />
              <p className="mt-2 text-sm text-gray-500">Optional - Upload to compare your answers with AI-generated correct answers</p>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="md:col-span-2 flex flex-col items-center mt-8"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-3 rounded-lg font-semibold
                         transform transition-all duration-300 hover:from-blue-700 hover:to-purple-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSubmit}
                disabled={!questionPaper || loading}
              >
                {loading ? 'Analyzing...' : 'Analyze Papers'}
              </motion.button>
              {error && (
                <p className="mt-4 text-sm text-red-500 text-center max-w-md">{error}</p>
              )}
              {!error && (
                <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
                  {!questionPaper 
                    ? "Please upload a question paper to proceed"
                    : "Click to start AI analysis and get your results"}
                </p>
              )}
            </motion.div>

            {evaluation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 mt-8"
              >
                <EvaluationResults evaluation={evaluation} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
