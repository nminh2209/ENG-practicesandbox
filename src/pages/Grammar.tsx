import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, BookOpen, Award } from 'lucide-react'

interface GrammarRule {
  id: number
  title: string
  titleVietnamese: string
  explanation: string
  examples: { english: string; vietnamese: string }[]
  level: 'beginner' | 'intermediate'
}

interface Exercise {
  id: number
  ruleId: number
  question: string
  questionVietnamese: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const grammarRules: GrammarRule[] = [
  {
    id: 1,
    title: 'Present Simple',
    titleVietnamese: 'Thì hiện tại đơn',
    explanation: 'Present Simple được dùng để diễn tả những hành động thường xuyên, thói quen, hay sự thật hiển nhiên.',
    examples: [
      { english: 'I go to school every day.', vietnamese: 'Tôi đi học mỗi ngày.' },
      { english: 'She likes reading books.', vietnamese: 'Cô ấy thích đọc sách.' },
      { english: 'The sun rises in the east.', vietnamese: 'Mặt trời mọc ở phía đông.' }
    ],
    level: 'beginner'
  },
  {
    id: 2,
    title: 'Articles (a, an, the)',
    titleVietnamese: 'Mạo từ (a, an, the)',
    explanation: 'Mạo từ được dùng trước danh từ. "A" dùng trước phụ âm, "an" trước nguyên âm, "the" dùng cho danh từ xác định.',
    examples: [
      { english: 'I have a cat.', vietnamese: 'Tôi có một con mèo.' },
      { english: 'She is an engineer.', vietnamese: 'Cô ấy là một kỹ sư.' },
      { english: 'The book is on the table.', vietnamese: 'Cuốn sách ở trên bàn.' }
    ],
    level: 'beginner'
  },
  {
    id: 3,
    title: 'Present Continuous',
    titleVietnamese: 'Thì hiện tại tiếp diễn',
    explanation: 'Present Continuous dùng để diễn tả hành động đang xảy ra tại thời điểm nói.',
    examples: [
      { english: 'I am reading a book now.', vietnamese: 'Bây giờ tôi đang đọc sách.' },
      { english: 'They are playing football.', vietnamese: 'Họ đang chơi bóng đá.' },
      { english: 'She is cooking dinner.', vietnamese: 'Cô ấy đang nấu bữa tối.' }
    ],
    level: 'intermediate'
  }
]

const exercises: Exercise[] = [
  {
    id: 1,
    ruleId: 1,
    question: 'I _____ to school every day.',
    questionVietnamese: 'Tôi _____ đến trường mỗi ngày.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 0,
    explanation: 'Với chủ ngữ "I" trong thì hiện tại đơn, động từ giữ nguyên dạng gốc "go".'
  },
  {
    id: 2,
    ruleId: 1,
    question: 'She _____ very well.',
    questionVietnamese: 'Cô ấy hát rất hay.',
    options: ['sing', 'sings', 'singing', 'sung'],
    correctAnswer: 1,
    explanation: 'Với chủ ngữ ngôi thứ 3 số ít "She" trong thì hiện tại đơn, động từ thêm "s" → "sings".'
  },
  {
    id: 3,
    ruleId: 2,
    question: 'I want to buy _____ apple.',
    questionVietnamese: 'Tôi muốn mua một quả táo.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 1,
    explanation: 'Dùng "an" trước từ "apple" vì "apple" bắt đầu bằng nguyên âm "a".'
  },
  {
    id: 4,
    ruleId: 2,
    question: 'Please close _____ door.',
    questionVietnamese: 'Làm ơn đóng cánh cửa lại.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 2,
    explanation: 'Dùng "the" vì "door" là danh từ xác định (cánh cửa cụ thể mà cả người nói và người nghe đều biết).'
  },
  {
    id: 5,
    ruleId: 3,
    question: 'Look! It _____ heavily.',
    questionVietnamese: 'Nhìn kìa! Trời đang mưa to.',
    options: ['rain', 'rains', 'is raining', 'rained'],
    correctAnswer: 2,
    explanation: 'Dùng Present Continuous "is raining" vì hành động đang xảy ra tại thời điểm nói (Look!).'
  }
]

export function Grammar() {
  const [selectedRule, setSelectedRule] = useState<GrammarRule | null>(grammarRules[0])
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  const currentRuleExercises = selectedRule ? exercises.filter(ex => ex.ruleId === selectedRule.id) : []

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) return
    
    setShowResult(true)
    const exercise = currentRuleExercises[currentExercise]
    
    if (selectedAnswer === exercise.correctAnswer) {
      setScore(score + 1)
      if (!completedExercises.includes(exercise.id)) {
        setCompletedExercises([...completedExercises, exercise.id])
      }
    }
  }

  const nextExercise = () => {
    if (currentExercise < currentRuleExercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Move to next grammar rule
      const currentRuleIndex = grammarRules.findIndex(rule => rule.id === selectedRule?.id)
      if (currentRuleIndex < grammarRules.length - 1) {
        setSelectedRule(grammarRules[currentRuleIndex + 1])
        setCurrentExercise(0)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }
  }

  const resetExercises = () => {
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompletedExercises([])
  }

  const currentExerciseData = currentRuleExercises[currentExercise]

  return (
    <div className="slide-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
          📖 Ngữ pháp tiếng Anh
        </h1>
        <p className="text-xl mb-4" style={{ color: '#6b7280' }}>
          Học ngữ pháp cơ bản qua các bài tập thực hành
        </p>

        {/* Progress */}
        <div className="card mb-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="font-semibold">
              <Award size={20} style={{ display: 'inline', marginRight: '0.5rem', color: '#f59e0b' }} />
              Thành tích
            </h3>
            <button 
              onClick={resetExercises} 
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
              Làm lại
            </button>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{score}</div>
              <div style={{ color: '#6b7280' }}>Điểm số</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{completedExercises.length}</div>
              <div style={{ color: '#6b7280' }}>Bài hoàn thành</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ width: '100%' }}>
        {/* Grammar Rules List */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
            <BookOpen size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Chủ đề ngữ pháp
          </h2>
          <div className="space-y-3">
            {grammarRules.map((rule) => (
              <div
                key={rule.id}
                className={`card cursor-pointer ${selectedRule?.id === rule.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedRule(rule)
                  setCurrentExercise(0)
                  setSelectedAnswer(null)
                  setShowResult(false)
                }}
                style={{
                  padding: '1rem',
                  border: selectedRule?.id === rule.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  transition: 'all 0.2s'
                }}
              >
                <h3 className="font-semibold" style={{ color: '#1f2937' }}>
                  {rule.title}
                </h3>
                <p className="vietnamese-text" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {rule.titleVietnamese}
                </p>
                <span className={`level-badge level-${rule.level}`} style={{ marginTop: '0.5rem' }}>
                  {rule.level === 'beginner' ? 'Cơ bản' : 'Trung bình'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grammar Rule Details */}
        <div>
          {selectedRule && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1f2937' }}>
                {selectedRule.title}
              </h2>
              <p className="vietnamese-text text-lg mb-4" style={{ color: '#6b7280' }}>
                {selectedRule.titleVietnamese}
              </p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Giải thích:</h3>
                <p style={{ color: '#374151', lineHeight: '1.6' }}>
                  {selectedRule.explanation}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Ví dụ:</h3>
                <div className="space-y-3">
                  {selectedRule.examples.map((example, index) => (
                    <div key={index} className="p-3" style={{ background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <p className="mb-1" style={{ color: '#1f2937' }}>
                        "{example.english}"
                      </p>
                      <p className="vietnamese-text" style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        {example.vietnamese}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercises */}
        <div>
          {currentRuleExercises.length > 0 && currentExerciseData && (
            <div className="card">
              <div className="mb-4">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 className="text-xl font-bold" style={{ color: '#1f2937' }}>
                    Bài tập
                  </h2>
                  <span style={{ color: '#6b7280' }}>
                    {currentExercise + 1}/{currentRuleExercises.length}
                  </span>
                </div>
                <div className="progress-bar mb-4">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((currentExercise + 1) / currentRuleExercises.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1f2937' }}>
                  {currentExerciseData.question}
                </h3>
                <p className="vietnamese-text mb-4" style={{ color: '#6b7280' }}>
                  {currentExerciseData.questionVietnamese}
                </p>

                <div className="space-y-2">
                  {currentExerciseData.options.map((option, index) => (
                    <div
                      key={index}
                      className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} ${
                        showResult ? 
                          (index === currentExerciseData.correctAnswer ? 'correct' : 
                           selectedAnswer === index ? 'incorrect' : '') : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      style={{
                        cursor: showResult ? 'default' : 'pointer',
                        opacity: showResult && index !== currentExerciseData.correctAnswer && selectedAnswer !== index ? 0.6 : 1
                      }}
                    >
                      <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                      {showResult && index === currentExerciseData.correctAnswer && (
                        <CheckCircle size={20} style={{ color: '#10b981', marginLeft: 'auto' }} />
                      )}
                      {showResult && selectedAnswer === index && index !== currentExerciseData.correctAnswer && (
                        <XCircle size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mb-6 p-4" style={{ 
                  background: selectedAnswer === currentExerciseData.correctAnswer ? '#ecfdf5' : '#fef2f2',
                  borderRadius: '0.5rem',
                  border: `1px solid ${selectedAnswer === currentExerciseData.correctAnswer ? '#10b981' : '#ef4444'}`
                }}>
                  <h4 className="font-semibold mb-2">
                    {selectedAnswer === currentExerciseData.correctAnswer ? '🎉 Chính xác!' : '❌ Không chính xác'}
                  </h4>
                  <p style={{ color: '#374151' }}>
                    {currentExerciseData.explanation}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                {!showResult ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="btn btn-primary"
                    style={{ 
                      flex: 1,
                      opacity: selectedAnswer === null ? 0.5 : 1
                    }}
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    onClick={nextExercise}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    {currentExercise < currentRuleExercises.length - 1 ? 'Bài tiếp theo' : 'Chủ đề tiếp theo'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
