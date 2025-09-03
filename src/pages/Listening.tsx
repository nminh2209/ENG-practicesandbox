import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

interface ListeningExercise {
  id: number
  title: string
  titleVietnamese: string
  level: 'beginner' | 'intermediate'
  transcript: string
  transcriptVietnamese: string
  audioText: string // Text to be spoken by speech synthesis
  questions: {
    id: number
    question: string
    questionVietnamese: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}

const listeningExercises: ListeningExercise[] = [
  {
    id: 1,
    title: 'My Daily Routine',
    titleVietnamese: 'Thói quen hàng ngày của tôi',
    level: 'beginner',
    transcript: `Hello, my name is Sarah. I want to tell you about my daily routine. I wake up at 6:30 every morning. First, I brush my teeth and wash my face. Then I have breakfast with my family. I usually eat bread and drink milk. After breakfast, I go to school at 7:30. School starts at 8:00 and finishes at 4:00. When I come home, I do my homework and help my mother with cooking dinner. In the evening, I watch TV or read books. I go to bed at 9:30.`,
    transcriptVietnamese: 'Xin chào, tên tôi là Sarah. Tôi muốn kể cho bạn nghe về thói quen hàng ngày của tôi. Tôi thức dậy lúc 6:30 sáng mỗi ngày. Đầu tiên, tôi đánh răng và rửa mặt. Sau đó tôi ăn sáng cùng gia đình. Tôi thường ăn bánh mì và uống sữa. Sau khi ăn sáng, tôi đi học lúc 7:30. Trường học bắt đầu lúc 8:00 và kết thúc lúc 4:00. Khi về nhà, tôi làm bài tập và giúp mẹ nấu bữa tối. Buổi tối, tôi xem TV hoặc đọc sách. Tôi đi ngủ lúc 9:30.',
    audioText: `Hello, my name is Sarah. I want to tell you about my daily routine. I wake up at six thirty every morning. First, I brush my teeth and wash my face. Then I have breakfast with my family. I usually eat bread and drink milk. After breakfast, I go to school at seven thirty. School starts at eight o'clock and finishes at four o'clock. When I come home, I do my homework and help my mother with cooking dinner. In the evening, I watch TV or read books. I go to bed at nine thirty.`,
    questions: [
      {
        id: 1,
        question: 'What time does Sarah wake up?',
        questionVietnamese: 'Sarah thức dậy lúc mấy giờ?',
        options: ['6:00', '6:30', '7:00', '7:30'],
        correctAnswer: 1,
        explanation: 'Sarah nói "I wake up at 6:30 every morning" - Tôi thức dậy lúc 6:30 sáng mỗi ngày.'
      },
      {
        id: 2,
        question: 'What does Sarah usually have for breakfast?',
        questionVietnamese: 'Sarah thường ăn gì vào bữa sáng?',
        options: ['Rice and fish', 'Bread and milk', 'Noodles and tea', 'Eggs and juice'],
        correctAnswer: 1,
        explanation: 'Sarah nói "I usually eat bread and drink milk" - Tôi thường ăn bánh mì và uống sữa.'
      },
      {
        id: 3,
        question: 'What time does school finish?',
        questionVietnamese: 'Trường học kết thúc lúc mấy giờ?',
        options: ['3:00', '3:30', '4:00', '4:30'],
        correctAnswer: 2,
        explanation: 'Sarah nói "School starts at 8:00 and finishes at 4:00" - Trường học bắt đầu lúc 8:00 và kết thúc lúc 4:00.'
      }
    ]
  },
  {
    id: 2,
    title: 'At the Library',
    titleVietnamese: 'Ở thư viện',
    level: 'intermediate',
    transcript: `Excuse me, I'm looking for books about animals for my school project. Can you help me? Of course! The animal books are on the second floor in the science section. You can take the elevator or use the stairs. The science books are arranged alphabetically by author's last name. You can borrow up to 5 books at a time, and you can keep them for 2 weeks. Don't forget to bring your student ID card when you check out the books. Also, please remember that the library closes at 8 PM on weekdays and 5 PM on weekends.`,
    transcriptVietnamese: 'Xin lỗi, tôi đang tìm sách về động vật cho dự án trường của mình. Bạn có thể giúp tôi không? Tất nhiên! Sách về động vật ở tầng 2 trong khu khoa học. Bạn có thể đi thang máy hoặc dùng cầu thang. Sách khoa học được sắp xếp theo thứ tự bảng chữ cái theo họ của tác giả. Bạn có thể mượn tối đa 5 cuốn sách mỗi lần, và giữ chúng trong 2 tuần. Đừng quên mang thẻ học sinh khi mượn sách. Ngoài ra, hãy nhớ rằng thư viện đóng cửa lúc 8 giờ tối các ngày trong tuần và 5 giờ chiều cuối tuần.',
    audioText: `Excuse me, I'm looking for books about animals for my school project. Can you help me? Of course! The animal books are on the second floor in the science section. You can take the elevator or use the stairs. The science books are arranged alphabetically by author's last name. You can borrow up to five books at a time, and you can keep them for two weeks. Don't forget to bring your student ID card when you check out the books. Also, please remember that the library closes at eight PM on weekdays and five PM on weekends.`,
    questions: [
      {
        id: 1,
        question: 'Where are the animal books located?',
        questionVietnamese: 'Sách về động vật được đặt ở đâu?',
        options: ['First floor', 'Second floor science section', 'Third floor', 'Basement'],
        correctAnswer: 1,
        explanation: 'Người thư viện nói "The animal books are on the second floor in the science section".'
      },
      {
        id: 2,
        question: 'How many books can you borrow at one time?',
        questionVietnamese: 'Bạn có thể mượn tối đa bao nhiêu cuốn sách mỗi lần?',
        options: ['3 books', '4 books', '5 books', '6 books'],
        correctAnswer: 2,
        explanation: 'Người thư viện nói "You can borrow up to 5 books at a time".'
      },
      {
        id: 3,
        question: 'When does the library close on weekends?',
        questionVietnamese: 'Thư viện đóng cửa lúc mấy giờ vào cuối tuần?',
        options: ['5 PM', '6 PM', '7 PM', '8 PM'],
        correctAnswer: 0,
        explanation: 'Người thư viện nói "the library closes at 8 PM on weekdays and 5 PM on weekends".'
      }
    ]
  }
]

export function Listening() {
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise>(listeningExercises[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({})
  const [showTranscript, setShowTranscript] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(selectedExercise.audioText)
      utterance.lang = 'en-US'
      utterance.rate = playbackSpeed
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (showResults[questionId]) return
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex })
  }

  const checkAnswer = (questionId: number) => {
    setShowResults({ ...showResults, [questionId]: true })
  }

  const resetExercise = () => {
    setSelectedAnswers({})
    setShowResults({})
    setCurrentQuestion(0)
    setShowTranscript(false)
    stopAudio()
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedExercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const currentQuestionData = selectedExercise.questions[currentQuestion]
  const score = Object.keys(showResults).reduce((acc, questionId) => {
    const qId = parseInt(questionId)
    const question = selectedExercise.questions.find(q => q.id === qId)
    if (question && selectedAnswers[qId] === question.correctAnswer) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <div className="slide-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
          🎧 Luyện nghe tiếng Anh
        </h1>
        <p className="text-xl mb-4" style={{ color: '#6b7280' }}>
          Cải thiện khả năng nghe hiểu qua các bài nghe thực tế
        </p>

        {/* Score */}
        {Object.keys(showResults).length > 0 && (
          <div className="card mb-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="font-semibold">
                Kết quả: {score}/{Object.keys(showResults).length} câu đúng
              </h3>
              <button 
                onClick={resetExercise} 
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                Làm lại
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercise List */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
            Bài nghe
          </h2>
          <div className="space-y-3">
            {listeningExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`card cursor-pointer ${selectedExercise.id === exercise.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedExercise(exercise)
                  resetExercise()
                }}
                style={{
                  padding: '1rem',
                  border: selectedExercise.id === exercise.id ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                }}
              >
                <h3 className="font-semibold" style={{ color: '#1f2937' }}>
                  {exercise.title}
                </h3>
                <p className="vietnamese-text" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {exercise.titleVietnamese}
                </p>
                <span className={`level-badge level-${exercise.level}`} style={{ marginTop: '0.5rem' }}>
                  {exercise.level === 'beginner' ? 'Cơ bản' : 'Trung bình'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Player */}
        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1f2937' }}>
              {selectedExercise.title}
            </h2>
            <p className="vietnamese-text mb-4" style={{ color: '#6b7280' }}>
              {selectedExercise.titleVietnamese}
            </p>

            {/* Audio Controls */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <button
                  onClick={playAudio}
                  className="btn btn-primary"
                  style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={24} style={{ marginRight: '0.5rem' }} />
                      Tạm dừng
                    </>
                  ) : (
                    <>
                      <Play size={24} style={{ marginRight: '0.5rem' }} />
                      Phát âm thanh
                    </>
                  )}
                </button>
              </div>

              {/* Speed Control */}
              <div className="mb-4">
                <label className="font-semibold mb-2" style={{ display: 'block', color: '#1f2937' }}>
                  Tốc độ phát:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[0.75, 1, 1.25].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`btn ${playbackSpeed === speed ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Transcript Toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  {showTranscript ? 'Ẩn bài đọc' : 'Xem bài đọc'}
                </button>
              </div>
            </div>

            {/* Transcript */}
            {showTranscript && (
              <div className="mb-4 p-4" style={{ background: '#f9fafb', borderRadius: '0.5rem' }}>
                <h3 className="font-semibold mb-3">Bài đọc:</h3>
                <div className="mb-4">
                  <p style={{ color: '#1f2937', lineHeight: '1.6', marginBottom: '1rem' }}>
                    {selectedExercise.transcript}
                  </p>
                  <p className="vietnamese-text" style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <strong>Bản dịch:</strong> {selectedExercise.transcriptVietnamese}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions */}
        <div>
          <div className="card">
            <div className="mb-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="text-xl font-bold" style={{ color: '#1f2937' }}>
                  Câu hỏi
                </h2>
                <span style={{ color: '#6b7280' }}>
                  {currentQuestion + 1}/{selectedExercise.questions.length}
                </span>
              </div>
              <div className="progress-bar mb-4">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / selectedExercise.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#1f2937' }}>
                {currentQuestionData.question}
              </h3>
              <p className="vietnamese-text mb-4" style={{ color: '#6b7280' }}>
                {currentQuestionData.questionVietnamese}
              </p>

              <div className="space-y-2">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    className={`quiz-option ${selectedAnswers[currentQuestionData.id] === index ? 'selected' : ''} ${
                      showResults[currentQuestionData.id] ? 
                        (index === currentQuestionData.correctAnswer ? 'correct' : 
                         selectedAnswers[currentQuestionData.id] === index ? 'incorrect' : '') : ''
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                    style={{
                      cursor: showResults[currentQuestionData.id] ? 'default' : 'pointer',
                      opacity: showResults[currentQuestionData.id] && 
                               index !== currentQuestionData.correctAnswer && 
                               selectedAnswers[currentQuestionData.id] !== index ? 0.6 : 1
                    }}
                  >
                    <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {showResults[currentQuestionData.id] && index === currentQuestionData.correctAnswer && (
                      <CheckCircle size={20} style={{ color: '#10b981', marginLeft: 'auto' }} />
                    )}
                    {showResults[currentQuestionData.id] && 
                     selectedAnswers[currentQuestionData.id] === index && 
                     index !== currentQuestionData.correctAnswer && (
                      <XCircle size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {showResults[currentQuestionData.id] && (
              <div className="mb-6 p-4" style={{ 
                background: selectedAnswers[currentQuestionData.id] === currentQuestionData.correctAnswer ? '#ecfdf5' : '#fef2f2',
                borderRadius: '0.5rem',
                border: `1px solid ${selectedAnswers[currentQuestionData.id] === currentQuestionData.correctAnswer ? '#10b981' : '#ef4444'}`
              }}>
                <h4 className="font-semibold mb-2">
                  {selectedAnswers[currentQuestionData.id] === currentQuestionData.correctAnswer ? '🎉 Chính xác!' : '❌ Không chính xác'}
                </h4>
                <p style={{ color: '#374151' }}>
                  {currentQuestionData.explanation}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="btn btn-secondary"
                style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
              >
                ← Trước
              </button>
              
              {!showResults[currentQuestionData.id] ? (
                <button
                  onClick={() => checkAnswer(currentQuestionData.id)}
                  disabled={selectedAnswers[currentQuestionData.id] === undefined}
                  className="btn btn-primary"
                  style={{ 
                    flex: 1,
                    opacity: selectedAnswers[currentQuestionData.id] === undefined ? 0.5 : 1
                  }}
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === selectedExercise.questions.length - 1}
                  className="btn btn-primary"
                  style={{ 
                    flex: 1,
                    opacity: currentQuestion === selectedExercise.questions.length - 1 ? 0.5 : 1
                  }}
                >
                  Tiếp theo →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
