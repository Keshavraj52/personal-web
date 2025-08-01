import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
const QuizGenerator = () => {
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const topics = [
  { value: 'sql', label: 'SQL Database' },
  { value: 'python', label: 'Python Programming' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React.js' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'html-css', label: 'HTML & CSS' },
  { value: 'data-structures', label: 'Data Structures' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'git', label: 'Git & Version Control' },
  { value: 'aws', label: 'AWS Cloud' },
  { value: 'system-design', label: 'System Design' },
  { value: 'database-design', label: 'Database Design' },
  { value: 'networking', label: 'Computer Networking' },
  { value: 'os-concepts', label: 'Operating Systems' },
  { value: 'oop', label: 'Object-Oriented Programming' },
  { value: 'rest-api', label: 'RESTful APIs' },
  { value: 'testing', label: 'Unit & Integration Testing' },
  { value: 'security', label: 'Web Security & OWASP' },
  { value: 'docker', label: 'Docker & Containers' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'linux', label: 'Linux & Shell Scripting' },
  { value: 'design-patterns', label: 'Design Patterns' },
  { value: 'ci-cd', label: 'CI/CD Pipelines' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'agile', label: 'Agile & Scrum Methodologies' },
  { value: 'problem-solving', label: 'Problem Solving & Logic' },
  { value: 'quantitative-aptitude', label: 'Quantitative Aptitude' },
  { value: 'logical-reasoning', label: 'Logical Reasoning' },
  { value: 'verbal-ability', label: 'Verbal Ability' },
  { value: 'data-interpretation', label: 'Data Interpretation' },
  { value: 'numerical-ability', label: 'Numerical Ability' },
  { value: 'puzzles', label: 'Puzzles & Brain Teasers' },
  { value: 'analytical-thinking', label: 'Analytical Thinking' },
  { value: 'time-distance', label: 'Time, Speed & Distance' },
  { value: 'profit-loss', label: 'Profit & Loss' },
  { value: 'percentages', label: 'Percentages & Ratios' },
  { value: 'probability', label: 'Probability & Permutations' },
  { value: 'number-series', label: 'Number Series' }
];


  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Load saved data on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('geminiApiKey');
    const savedHistory = localStorage.getItem('quizHistory');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('geminiApiKey', apiKey.trim());
      alert('API key saved successfully!');
    } else {
      alert('Please enter a valid API key');
    }
  };

  const generateQuiz = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your Gemini API key first');
      return;
    }

    if (!topic || !difficulty || !questionCount) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsQuizComplete(false);

    try {
      const prompt = `Generate a ${difficulty} level quiz about ${topic} with exactly ${questionCount} multiple choice questions. 
      Each question should have 4 options (A, B, C, D) with only one correct answer.
      Return the response in this exact JSON format:
      {
        "quiz": {
          "topic": "${topic}",
          "difficulty": "${difficulty}",
          "questions": [
            {
              "question": "Question text here",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correct": 0,
              "explanation": "Brief explanation of the correct answer"
            }
          ]
        }
      }
      Make sure the questions are practical and test real understanding of ${topic}.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from API');
      }

      let quizData;
      try {
        quizData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        // If JSON parsing fails, try to clean the response
        const cleanedText = generatedText.replace(/```json|```/g, '').trim();
        quizData = JSON.parse(cleanedText);
      }

      if (!quizData.quiz || !quizData.quiz.questions || quizData.quiz.questions.length === 0) {
        throw new Error('Invalid quiz data structure');
      }

      setCurrentQuiz(quizData.quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert(`Error generating quiz: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const selectOption = (index) => {
    if (!showExplanation) {
      setSelectedOption(index);
    }
  };

  const submitAnswer = () => {
    if (selectedOption === null) {
      alert('Please select an answer');
      return;
    }

    const question = currentQuiz.questions[currentQuestion];
    const isCorrect = selectedOption === question.correct;

    const newAnswer = {
      question: question.question,
      selected: selectedOption,
      correct: question.correct,
      isCorrect: isCorrect
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    
    // Save to history
    const quizResult = {
      topic: currentQuiz.topic,
      difficulty: currentQuiz.difficulty,
      score: score,
      total: currentQuiz.questions.length,
      percentage: percentage,
      date: new Date().toLocaleDateString()
    };

    const newHistory = [quizResult, ...quizHistory];
    setQuizHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
    
    setIsQuizComplete(true);
  };

  const restartQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsQuizComplete(false);
    setTopic('');
    setDifficulty('');
    setQuestionCount(5);
  };

  const getOptionClass = (index) => {
    let className = 'flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:transform hover:translate-x-1';
    
    if (selectedOption === index) {
      className += ' border-blue-500 bg-blue-50';
    }
    
    if (showExplanation) {
      if (index === currentQuiz.questions[currentQuestion].correct) {
        className += ' border-green-500 bg-green-50';
      } else if (index === selectedOption && selectedOption !== currentQuiz.questions[currentQuestion].correct) {
        className += ' border-red-500 bg-red-50';
      }
    }
    
    return className;
  };

  const progress = currentQuiz ? ((currentQuestion + 1) / currentQuiz.questions.length) * 100 : 0;

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-2 sm:p-5 relative overflow-hidden top-16">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-300 rounded-full blur-3xl animate-bounce"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-300 rounded-full blur-3xl animate-ping"></div>
  </div>

  <div className="relative z-10 max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20">
    <div className="text-center mb-6 sm:mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        🧠 Quiz Generator
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium px-2">Challenge your knowledge with AI-powered quizzes</p>
    </div>
    
    {/* API Setup */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-purple-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 blur-xl"></div>
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-800">🔑 Setup Gemini API</h3>
        <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg px-2">
          Enter your Gemini API key to get started. Get your free API key from{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline font-semibold transition-colors">
            Google AI Studio
          </a>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key"
            className="flex-1 w-full sm:min-w-80 px-4 sm:px-6 py-3 sm:py-4 border-2 border-purple-300 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
          <button
            onClick={saveApiKey}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus:ring-4 focus:ring-purple-300"
          >
            Save API Key
          </button>
        </div>
      </div>
    </div>

    {/* Quiz Setup */}
    {!currentQuiz && !isLoading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-blue-300 group">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:animate-bounce">📚</div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Select Topic</h3>
          <div className="relative">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)} 
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-blue-200 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
            >
              <option value="">Select a topic...</option>
              {topics && topics.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-purple-300 group">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:animate-spin">⚙️</div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Difficulty Level</h3>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-purple-200 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          >
            <option value="">Select difficulty...</option>
            {difficulties.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-green-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-green-300 group">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:animate-pulse">🔢</div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Number of Questions</h3>
          <input
            type="number"
            min="3"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-green-200 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>

        <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-pink-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-pink-300 group">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:animate-bounce">🚀</div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Generate Quiz</h3>
          <button
            onClick={generateQuiz}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus:ring-4 focus:ring-pink-300"
          >
            Create Quiz
          </button>
        </div>
      </div>
    )}

    {/* Loading State */}
    {isLoading && (
      <div className="text-center py-12 sm:py-16">
        <div className="relative inline-block">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4 sm:mb-6"></div>
          <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin animation-delay-75"></div>
        </div>
        <p className="text-xl sm:text-2xl text-purple-700 font-bold animate-pulse">Generating your quiz...</p>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 px-4">Please wait while we create amazing questions for you</p>
      </div>
    )}

    {/* Quiz Interface */}
    {currentQuiz && !isQuizComplete && (
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl mb-6 sm:mb-8 border border-indigo-100">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-6 sm:mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 sm:h-4 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8 sm:mb-10">
          <div className="text-indigo-600 font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
            Question {currentQuestion + 1} of {currentQuiz.questions.length}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 leading-relaxed bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-2">
            {currentQuiz.questions[currentQuestion].question}
          </h3>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4">
            {currentQuiz.questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`${getOptionClass(index)} flex items-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-1`}
                onClick={() => selectOption(index)}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => selectOption(index)}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-indigo-600 mr-3 sm:mr-4 flex-shrink-0"
                  disabled={showExplanation}
                />
                <label className="flex-1 cursor-pointer text-sm sm:text-base md:text-lg font-medium">
                  <span className="inline-block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-indigo-100 text-indigo-600 rounded-full text-center text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8 font-bold mr-2 sm:mr-3 flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-l-4 ${
              userAnswers[userAnswers.length - 1]?.isCorrect 
                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500' 
                : 'bg-gradient-to-r from-red-50 to-red-100 border-red-500'
            }`}>
              <div className="flex items-center mb-3">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3 flex-shrink-0">
                  {userAnswers[userAnswers.length - 1]?.isCorrect ? '✅' : '❌'}
                </span>
                <strong className="text-lg sm:text-xl">
                  {userAnswers[userAnswers.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                </strong>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{currentQuiz.questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          {!showExplanation ? (
            <button
              onClick={submitAnswer}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus:ring-4 focus:ring-indigo-300"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className={`w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus:ring-4 ${
                currentQuestion < currentQuiz.questions.length - 1
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-indigo-300'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:ring-green-300'
              }`}
            >
              {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    )}

    {/* Quiz Results */}
    {isQuizComplete && (
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center mb-6 sm:mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">Quiz Complete!</h2>
          <div className="bg-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm">
            <p className="text-2xl sm:text-3xl font-bold mb-2">Your Score: {score}/{currentQuiz.questions.length}</p>
            <p className="text-xl sm:text-2xl mb-3 sm:mb-4">({Math.round((score / currentQuiz.questions.length) * 100)}%)</p>
            <p className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Topic: <span className="font-bold">{currentQuiz.topic.toUpperCase()}</span></p>
            <p className="text-base sm:text-lg md:text-xl">Difficulty: <span className="font-bold">{currentQuiz.difficulty.toUpperCase()}</span></p>
          </div>
          <button
            onClick={restartQuiz}
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-emerald-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl focus:ring-4 focus:ring-white/50"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    )}

    {/* Quiz History */}
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-200">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">📊 Quiz History</h3>
      {quizHistory.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-50">📈</div>
          <p className="text-gray-500 text-base sm:text-lg md:text-xl px-4">No quiz history yet. Take your first quiz!</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {quizHistory.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl sm:rounded-2xl border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 gap-3 sm:gap-0">
              <div className="flex items-center w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm sm:text-base md:text-lg">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">{item.topic.toUpperCase()}</div>
                  <div className="text-gray-600 text-xs sm:text-sm md:text-base">{item.difficulty} • {item.date}</div>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-1">
                  {item.score}/{item.total}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default QuizGenerator;