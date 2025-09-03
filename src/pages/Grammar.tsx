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
    explanation: 'Present Simple được dùng để diễn tả những hành động thường xuyên, thói quen, hay sự thật hiển nhiên. Công thức: S + V(s/es) + O',
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
    explanation: 'Present Continuous dùng để diễn tả hành động đang xảy ra tại thời điểm nói. Công thức: S + am/is/are + V-ing',
    examples: [
      { english: 'I am reading a book now.', vietnamese: 'Bây giờ tôi đang đọc sách.' },
      { english: 'They are playing football.', vietnamese: 'Họ đang chơi bóng đá.' },
      { english: 'She is cooking dinner.', vietnamese: 'Cô ấy đang nấu bữa tối.' }
    ],
    level: 'beginner'
  },
  {
    id: 4,
    title: 'Past Simple',
    titleVietnamese: 'Thì quá khứ đơn',
    explanation: 'Past Simple dùng để diễn tả hành động đã xảy ra và kết thúc trong quá khứ. Công thức: S + V-ed/V2 + O',
    examples: [
      { english: 'I visited my grandmother yesterday.', vietnamese: 'Tôi đã thăm bà tôi hôm qua.' },
      { english: 'She studied English for 3 years.', vietnamese: 'Cô ấy đã học tiếng Anh 3 năm.' },
      { english: 'They went to the cinema last night.', vietnamese: 'Họ đã đi xem phim tối qua.' }
    ],
    level: 'beginner'
  },
  {
    id: 5,
    title: 'Future Simple',
    titleVietnamese: 'Thì tương lai đơn',
    explanation: 'Future Simple dùng để diễn tả hành động sẽ xảy ra trong tương lai. Công thức: S + will + V + O',
    examples: [
      { english: 'I will travel to Japan next year.', vietnamese: 'Tôi sẽ du lịch Nhật Bản năm sau.' },
      { english: 'She will graduate from university.', vietnamese: 'Cô ấy sẽ tốt nghiệp đại học.' },
      { english: 'We will meet you at the airport.', vietnamese: 'Chúng tôi sẽ gặp bạn ở sân bay.' }
    ],
    level: 'beginner'
  },
  {
    id: 6,
    title: 'Present Perfect',
    titleVietnamese: 'Thì hiện tại hoàn thành',
    explanation: 'Present Perfect dùng để diễn tả hành động xảy ra trong quá khứ nhưng có liên quan đến hiện tại. Công thức: S + have/has + V3/V-ed',
    examples: [
      { english: 'I have lived here for 5 years.', vietnamese: 'Tôi đã sống ở đây 5 năm.' },
      { english: 'She has finished her homework.', vietnamese: 'Cô ấy đã hoàn thành bài tập.' },
      { english: 'We have been to London twice.', vietnamese: 'Chúng tôi đã đến London hai lần.' }
    ],
    level: 'intermediate'
  },
  {
    id: 7,
    title: 'Modal Verbs',
    titleVietnamese: 'Động từ khuyết thiếu',
    explanation: 'Modal verbs (can, could, should, must, might, may) được dùng để thể hiện khả năng, nghĩa vụ, lời khuyên. Công thức: S + modal + V',
    examples: [
      { english: 'I can speak three languages.', vietnamese: 'Tôi có thể nói ba thứ tiếng.' },
      { english: 'You should study harder.', vietnamese: 'Bạn nên học chăm chỉ hơn.' },
      { english: 'She must finish the project today.', vietnamese: 'Cô ấy phải hoàn thành dự án hôm nay.' }
    ],
    level: 'intermediate'
  },
  {
    id: 8,
    title: 'Passive Voice',
    titleVietnamese: 'Câu bị động',
    explanation: 'Câu bị động được dùng khi muốn nhấn mạnh vào hành động hơn là người thực hiện. Công thức: S + be + V3/V-ed + (by + O)',
    examples: [
      { english: 'The book was written by Shakespeare.', vietnamese: 'Cuốn sách được viết bởi Shakespeare.' },
      { english: 'English is spoken worldwide.', vietnamese: 'Tiếng Anh được nói trên toàn thế giới.' },
      { english: 'The house will be built next year.', vietnamese: 'Ngôi nhà sẽ được xây dựng năm sau.' }
    ],
    level: 'intermediate'
  },
  {
    id: 9,
    title: 'Conditional Sentences',
    titleVietnamese: 'Câu điều kiện',
    explanation: 'Câu điều kiện gồm có mệnh đề if (điều kiện) và mệnh đề chính (kết quả). Có 3 loại: Type 0 (sự thật), Type 1 (có thể xảy ra), Type 2 (không có thật).',
    examples: [
      { english: 'If it rains, I will stay home. (Type 1)', vietnamese: 'Nếu trời mưa, tôi sẽ ở nhà.' },
      { english: 'If I were rich, I would buy a car. (Type 2)', vietnamese: 'Nếu tôi giàu, tôi sẽ mua một chiếc xe.' },
      { english: 'If you heat water to 100°C, it boils. (Type 0)', vietnamese: 'Nếu bạn đun nước đến 100°C, nó sẽ sôi.' }
    ],
    level: 'intermediate'
  },
  {
    id: 10,
    title: 'Comparative and Superlative',
    titleVietnamese: 'So sánh hơn và so sánh nhất',
    explanation: 'So sánh hơn (comparative): adj + er / more + adj. So sánh nhất (superlative): the + adj + est / the most + adj.',
    examples: [
      { english: 'She is taller than her sister.', vietnamese: 'Cô ấy cao hơn chị gái.' },
      { english: 'This is the most beautiful place.', vietnamese: 'Đây là nơi đẹp nhất.' },
      { english: 'Math is more difficult than English.', vietnamese: 'Toán khó hơn tiếng Anh.' }
    ],
    level: 'beginner'
  }
]

const exercises: Exercise[] = [
  // Present Simple Exercises
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
    ruleId: 1,
    question: 'They _____ football on weekends.',
    questionVietnamese: 'Họ chơi bóng đá vào cuối tuần.',
    options: ['play', 'plays', 'playing', 'played'],
    correctAnswer: 0,
    explanation: 'Với chủ ngữ "They" trong thì hiện tại đơn, động từ giữ nguyên dạng gốc "play".'
  },

  // Articles Exercises
  {
    id: 4,
    ruleId: 2,
    question: 'I want to buy _____ apple.',
    questionVietnamese: 'Tôi muốn mua một quả táo.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 1,
    explanation: 'Dùng "an" trước từ "apple" vì "apple" bắt đầu bằng nguyên âm "a".'
  },
  {
    id: 5,
    ruleId: 2,
    question: 'Please close _____ door.',
    questionVietnamese: 'Làm ơn đóng cánh cửa lại.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 2,
    explanation: 'Dùng "the" vì "door" là danh từ xác định (cánh cửa cụ thể mà cả người nói và người nghe đều biết).'
  },
  {
    id: 6,
    ruleId: 2,
    question: 'He is _____ honest man.',
    questionVietnamese: 'Anh ấy là một người đàn ông trung thực.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 1,
    explanation: 'Dùng "an" trước từ "honest" vì âm "h" trong "honest" câm nên từ này bắt đầu bằng âm nguyên âm /ɒ/.'
  },

  // Present Continuous Exercises
  {
    id: 7,
    ruleId: 3,
    question: 'Look! It _____ heavily.',
    questionVietnamese: 'Nhìn kìa! Trời đang mưa to.',
    options: ['rain', 'rains', 'is raining', 'rained'],
    correctAnswer: 2,
    explanation: 'Dùng Present Continuous "is raining" vì hành động đang xảy ra tại thời điểm nói (Look!).'
  },
  {
    id: 8,
    ruleId: 3,
    question: 'They _____ their homework now.',
    questionVietnamese: 'Bây giờ họ đang làm bài tập về nhà.',
    options: ['do', 'does', 'are doing', 'did'],
    correctAnswer: 2,
    explanation: 'Dùng Present Continuous "are doing" vì có "now" chỉ thời điểm hiện tại.'
  },
  {
    id: 9,
    ruleId: 3,
    question: 'What _____ you _____ at the moment?',
    questionVietnamese: 'Lúc này bạn đang làm gì?',
    options: ['do / do', 'are / doing', 'did / do', 'will / do'],
    correctAnswer: 1,
    explanation: 'Câu hỏi Present Continuous: What + are + you + doing + ...? với "at the moment" chỉ thời điểm hiện tại.'
  },

  // Past Simple Exercises
  {
    id: 10,
    ruleId: 4,
    question: 'I _____ to the cinema yesterday.',
    questionVietnamese: 'Tôi đã đi xem phim hôm qua.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 2,
    explanation: 'Dùng Past Simple "went" vì có "yesterday" chỉ thời gian trong quá khứ.'
  },
  {
    id: 11,
    ruleId: 4,
    question: 'She _____ her keys last night.',
    questionVietnamese: 'Cô ấy đã mất chìa khóa tối qua.',
    options: ['lose', 'lost', 'loses', 'losing'],
    correctAnswer: 1,
    explanation: 'Dùng Past Simple "lost" (dạng quá khứ của "lose") vì có "last night".'
  },
  {
    id: 12,
    ruleId: 4,
    question: 'We _____ a great time at the party.',
    questionVietnamese: 'Chúng tôi đã có khoảng thời gian tuyệt vời ở bữa tiệc.',
    options: ['have', 'had', 'has', 'having'],
    correctAnswer: 1,
    explanation: 'Dùng Past Simple "had" để diễn tả hành động đã xảy ra và kết thúc trong quá khứ.'
  },

  // Future Simple Exercises
  {
    id: 13,
    ruleId: 5,
    question: 'I _____ you tomorrow.',
    questionVietnamese: 'Tôi sẽ gọi cho bạn ngày mai.',
    options: ['call', 'will call', 'called', 'calling'],
    correctAnswer: 1,
    explanation: 'Dùng Future Simple "will call" vì có "tomorrow" chỉ thời gian tương lai.'
  },
  {
    id: 14,
    ruleId: 5,
    question: 'She _____ be a doctor when she grows up.',
    questionVietnamese: 'Cô ấy sẽ trở thành bác sĩ khi lớn lên.',
    options: ['will', 'is', 'was', 'would'],
    correctAnswer: 0,
    explanation: 'Dùng "will" để diễn tả dự định hoặc dự đoán trong tương lai.'
  },

  // Present Perfect Exercises
  {
    id: 15,
    ruleId: 6,
    question: 'I _____ this movie before.',
    questionVietnamese: 'Tôi đã xem bộ phim này rồi.',
    options: ['see', 'saw', 'have seen', 'will see'],
    correctAnswer: 2,
    explanation: 'Dùng Present Perfect "have seen" để diễn tả kinh nghiệm đã có trong quá khứ.'
  },
  {
    id: 16,
    ruleId: 6,
    question: 'She _____ in London for 5 years.',
    questionVietnamese: 'Cô ấy đã sống ở London 5 năm.',
    options: ['lives', 'lived', 'has lived', 'is living'],
    correctAnswer: 2,
    explanation: 'Dùng Present Perfect "has lived" với "for 5 years" để chỉ thời gian kéo dài từ quá khứ đến hiện tại.'
  },

  // Modal Verbs Exercises
  {
    id: 17,
    ruleId: 7,
    question: 'You _____ drive carefully in the rain.',
    questionVietnamese: 'Bạn nên lái xe cẩn thận khi trời mưa.',
    options: ['can', 'should', 'might', 'will'],
    correctAnswer: 1,
    explanation: 'Dùng "should" để đưa ra lời khuyên.'
  },
  {
    id: 18,
    ruleId: 7,
    question: 'I _____ speak English and French.',
    questionVietnamese: 'Tôi có thể nói tiếng Anh và tiếng Pháp.',
    options: ['can', 'must', 'should', 'may'],
    correctAnswer: 0,
    explanation: 'Dùng "can" để diễn tả khả năng.'
  },

  // Passive Voice Exercises
  {
    id: 19,
    ruleId: 8,
    question: 'This house _____ in 1990.',
    questionVietnamese: 'Ngôi nhà này được xây năm 1990.',
    options: ['built', 'was built', 'is built', 'will be built'],
    correctAnswer: 1,
    explanation: 'Dùng Past Passive "was built" vì có năm 1990 chỉ thời gian quá khứ.'
  },
  {
    id: 20,
    ruleId: 8,
    question: 'English _____ all over the world.',
    questionVietnamese: 'Tiếng Anh được nói trên khắp thế giới.',
    options: ['speaks', 'is spoken', 'spoke', 'speaking'],
    correctAnswer: 1,
    explanation: 'Dùng Present Passive "is spoken" để diễn tả sự thật hiển nhiên ở hiện tại.'
  },

  // Conditional Sentences Exercises
  {
    id: 21,
    ruleId: 9,
    question: 'If it _____, I will stay home.',
    questionVietnamese: 'Nếu trời mưa, tôi sẽ ở nhà.',
    options: ['rain', 'rains', 'rained', 'will rain'],
    correctAnswer: 1,
    explanation: 'Câu điều kiện loại 1: If + S + V(s/es), S + will + V. Mệnh đề if dùng Present Simple.'
  },
  {
    id: 22,
    ruleId: 9,
    question: 'If I _____ rich, I would travel the world.',
    questionVietnamese: 'Nếu tôi giàu, tôi sẽ đi du lịch khắp thế giới.',
    options: ['am', 'was', 'were', 'will be'],
    correctAnswer: 2,
    explanation: 'Câu điều kiện loại 2: If + S + were/V-ed, S + would + V. Với "I" ta vẫn dùng "were".'
  },

  // Comparative and Superlative Exercises
  {
    id: 23,
    ruleId: 10,
    question: 'This book is _____ than that one.',
    questionVietnamese: 'Cuốn sách này thú vị hơn cuốn kia.',
    options: ['interesting', 'more interesting', 'most interesting', 'the most interesting'],
    correctAnswer: 1,
    explanation: 'Tính từ dài (3 âm tiết trở lên) dùng "more + adj" trong so sánh hơn.'
  },
  {
    id: 24,
    ruleId: 10,
    question: 'She is _____ student in the class.',
    questionVietnamese: 'Cô ấy là học sinh giỏi nhất lớp.',
    options: ['good', 'better', 'best', 'the best'],
    correctAnswer: 3,
    explanation: 'So sánh nhất của "good" là "the best".'
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
