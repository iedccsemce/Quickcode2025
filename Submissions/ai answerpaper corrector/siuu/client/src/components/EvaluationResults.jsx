import { motion } from 'framer-motion';

const EvaluationResults = ({ evaluation }) => {
  // Preprocess the evaluation string to remove LaTeX markers and clean up the JSON
  const cleanEvaluation = (evalStr) => {
    try {
      // Remove LaTeX markers and any other non-JSON formatting
      let cleaned = evalStr.replace(/\\boxed\{|\\}/g, '');
      // Ensure proper JSON structure
      cleaned = cleaned.trim();
      // Parse and stringify to validate JSON structure
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing evaluation:', error);
      return {
        questions: [],
        summary: { totalQuestions: 0 }
      };
    }
  };

  const parsedEvaluation = cleanEvaluation(evaluation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full overflow-hidden bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Evaluation Results</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parsedEvaluation.questions.map((question, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {question.number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {question.text}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {typeof question.correctAnswer === 'string' && 
                    question.correctAnswer.split(',').map((item, i) => {
                      const isValid = item.trim().toLowerCase().startsWith('valid');
                      return (
                        <div 
                          key={i} 
                          className={`mb-1 px-2 py-1 rounded ${isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {item.trim()}
                        </div>
                      );
                    })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {question.explanation}
                </td>
              </tr>
            ))}n          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Summary</h3>
        <p className="text-sm text-gray-600">
          Total Questions: {parsedEvaluation.summary.totalQuestions}
        </p>
      </div>
    </motion.div>
  );
};

export default EvaluationResults;