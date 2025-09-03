import { useState, useEffect } from 'react'
import { Clock, BookOpen, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react'

interface ReadingPassage {
  id: number
  title: string
  titleVietnamese: string
  level: 'beginner' | 'intermediate'
  passage: string
  questions: {
    id: number
    question: string
    questionVietnamese: string
    type: 'multiple-choice' | 'true-false'
    options?: string[]
    correctAnswer: number | boolean
    explanation: string
  }[]
  vocabulary: {
    word: string
    meaning: string
    vietnamese: string
  }[]
}

const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    title: 'My School',
    titleVietnamese: 'Trường học của tôi',
    level: 'beginner',
    passage: `My name is Tom and I am 12 years old. I go to Green Valley Primary School. My school is very big and beautiful. It has three floors and many classrooms. 

There are about 500 students in my school. We have a big playground where we play football and basketball during break time. My school also has a library with many interesting books. I love reading story books there.

My favorite subject is English because my teacher, Mrs. Johnson, is very kind and funny. She always makes our lessons interesting with games and songs. I also like Math and Science.

Our school day starts at 8:00 AM and ends at 3:00 PM. We have lunch at 12:00 PM in the school cafeteria. The food is delicious! After school, I often stay to play with my friends or do homework in the library.

I love my school very much because I have many good friends here and all the teachers are very nice to us.`,
    questions: [
      {
        id: 1,
        question: 'How old is Tom?',
        questionVietnamese: 'Tom bao nhiêu tuổi?',
        type: 'multiple-choice',
        options: ['10 years old', '11 years old', '12 years old', '13 years old'],
        correctAnswer: 2,
        explanation: 'Trong đoạn văn có câu "My name is Tom and I am 12 years old."'
      },
      {
        id: 2,
        question: 'Tom\'s school has a library.',
        questionVietnamese: 'Trường của Tom có thư viện.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn có câu "My school also has a library with many interesting books."'
      },
      {
        id: 3,
        question: 'What is Tom\'s favorite subject?',
        questionVietnamese: 'Môn học yêu thích của Tom là gì?',
        type: 'multiple-choice',
        options: ['Math', 'Science', 'English', 'History'],
        correctAnswer: 2,
        explanation: 'Tom nói "My favorite subject is English because my teacher, Mrs. Johnson, is very kind and funny."'
      },
      {
        id: 4,
        question: 'School starts at 9:00 AM.',
        questionVietnamese: 'Trường học bắt đầu lúc 9:00 sáng.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'Đoạn văn nói "Our school day starts at 8:00 AM" - bắt đầu lúc 8:00 sáng, không phải 9:00.'
      }
    ],
    vocabulary: [
      { word: 'primary', meaning: 'elementary, basic level', vietnamese: 'tiểu học, cấp cơ bản' },
      { word: 'playground', meaning: 'an area for children to play', vietnamese: 'sân chơi' },
      { word: 'cafeteria', meaning: 'a restaurant in a school or workplace', vietnamese: 'nhà ăn, căng tin' },
      { word: 'delicious', meaning: 'very tasty', vietnamese: 'ngon' },
      { word: 'interesting', meaning: 'exciting, engaging', vietnamese: 'thú vị, hấp dẫn' }
    ]
  },
  {
    id: 2,
    title: 'The Weather Today',
    titleVietnamese: 'Thời tiết hôm nay',
    level: 'beginner',
    passage: `Today is a beautiful sunny day. The sky is blue and there are no clouds. The temperature is 25 degrees Celsius, which is perfect for outdoor activities.

Many people are outside enjoying the nice weather. In the park, children are playing on the swings and slides. Some families are having picnics on the grass. Young people are playing sports like volleyball and tennis.

The weather forecast says it will be sunny for the next three days. However, it might rain on Thursday and Friday. The temperature will drop to about 20 degrees when it rains.

I love sunny days because I can wear my favorite t-shirt and shorts. I also like to go swimming or ride my bicycle with friends. Sunny weather always makes me feel happy and energetic.

Tomorrow I plan to go to the beach with my family. We will build sandcastles, swim in the ocean, and have a barbecue. I hope the weather will stay nice!`,
    questions: [
      {
        id: 1,
        question: 'What is the temperature today?',
        questionVietnamese: 'Nhiệt độ hôm nay là bao nhiêu?',
        type: 'multiple-choice',
        options: ['20°C', '23°C', '25°C', '28°C'],
        correctAnswer: 2,
        explanation: 'Đoạn văn nói "The temperature is 25 degrees Celsius".'
      },
      {
        id: 2,
        question: 'There are clouds in the sky today.',
        questionVietnamese: 'Hôm nay trời có mây.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'Đoạn văn nói "The sky is blue and there are no clouds" - trời xanh và không có mây.'
      },
      {
        id: 3,
        question: 'When might it rain?',
        questionVietnamese: 'Khi nào có thể sẽ mưa?',
        type: 'multiple-choice',
        options: ['Monday and Tuesday', 'Wednesday and Thursday', 'Thursday and Friday', 'Saturday and Sunday'],
        correctAnswer: 2,
        explanation: 'Đoạn văn nói "However, it might rain on Thursday and Friday."'
      },
      {
        id: 4,
        question: 'The author likes sunny weather.',
        questionVietnamese: 'Tác giả thích thời tiết nắng.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Tác giả nói "I love sunny days" và "Sunny weather always makes me feel happy and energetic."'
      }
    ],
    vocabulary: [
      { word: 'forecast', meaning: 'prediction of future weather', vietnamese: 'dự báo' },
      { word: 'temperature', meaning: 'how hot or cold something is', vietnamese: 'nhiệt độ' },
      { word: 'outdoor', meaning: 'outside, not inside a building', vietnamese: 'ngoài trời' },
      { word: 'energetic', meaning: 'full of energy and enthusiasm', vietnamese: 'tràn đầy năng lượng' },
      { word: 'barbecue', meaning: 'outdoor cooking, usually grilling meat', vietnamese: 'tiệc nướng ngoài trời' }
    ]
  },
  {
    id: 3,
    title: 'Healthy Living',
    titleVietnamese: 'Sống khỏe mạnh',
    level: 'intermediate',
    passage: `Living a healthy lifestyle is important for everyone. There are many simple ways to improve your health and feel better every day.

First, eating nutritious food is essential. You should eat plenty of fruits and vegetables, which provide vitamins and minerals your body needs. Try to limit processed foods, sugary drinks, and fast food. Instead, choose whole grains, lean proteins like fish and chicken, and drink lots of water. A balanced diet gives you energy and helps prevent diseases.

Second, regular exercise is crucial for maintaining good health. You don't need to spend hours at the gym every day. Even 30 minutes of walking, swimming, or cycling can make a big difference. Exercise strengthens your muscles, improves your heart health, and helps you maintain a healthy weight. It also reduces stress and improves your mood.

Third, getting enough sleep is vital. Most adults need 7-8 hours of sleep each night. Good sleep helps your body repair itself and gives you energy for the next day. Poor sleep can lead to problems with concentration, memory, and overall health.

Finally, managing stress is important for both physical and mental health. You can reduce stress through meditation, deep breathing exercises, or hobbies you enjoy. Spending time with family and friends also helps reduce stress levels.

Remember, small changes in your daily habits can lead to big improvements in your health over time.`,
    questions: [
      {
        id: 1,
        question: 'How many hours of sleep do most adults need?',
        questionVietnamese: 'Hầu hết người lớn cần ngủ bao nhiêu tiếng?',
        type: 'multiple-choice',
        options: ['5-6 hours', '6-7 hours', '7-8 hours', '8-9 hours'],
        correctAnswer: 2,
        explanation: 'Đoạn văn nói "Most adults need 7-8 hours of sleep each night."'
      },
      {
        id: 2,
        question: 'Exercise should be done for hours every day.',
        questionVietnamese: 'Tập thể dục nên được thực hiện hàng giờ mỗi ngày.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'Đoạn văn nói "You don\'t need to spend hours at the gym every day. Even 30 minutes... can make a big difference."'
      },
      {
        id: 3,
        question: 'Which foods should you limit in a healthy diet?',
        questionVietnamese: 'Bạn nên hạn chế loại thực phẩm nào trong chế độ ăn lành mạnh?',
        type: 'multiple-choice',
        options: ['Fruits and vegetables', 'Whole grains', 'Processed foods and sugary drinks', 'Fish and chicken'],
        correctAnswer: 2,
        explanation: 'Đoạn văn nói "Try to limit processed foods, sugary drinks, and fast food."'
      },
      {
        id: 4,
        question: 'Spending time with family and friends helps reduce stress.',
        questionVietnamese: 'Dành thời gian với gia đình và bạn bè giúp giảm stress.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn nói "Spending time with family and friends also helps reduce stress levels."'
      }
    ],
    vocabulary: [
      { word: 'nutritious', meaning: 'containing nutrients that are good for health', vietnamese: 'bổ dưỡng' },
      { word: 'processed', meaning: 'treated or prepared by a special method', vietnamese: 'chế biến sẵn' },
      { word: 'crucial', meaning: 'extremely important', vietnamese: 'rất quan trọng' },
      { word: 'vital', meaning: 'absolutely necessary', vietnamese: 'thiết yếu' },
      { word: 'meditation', meaning: 'practice of focusing the mind for relaxation', vietnamese: 'thiền định' }
    ]
  },
  {
    id: 4,
    title: 'Technology in Education',
    titleVietnamese: 'Công nghệ trong giáo dục',
    level: 'intermediate',
    passage: `Technology has revolutionized education in the 21st century. From traditional blackboards to interactive smart boards, from textbooks to tablets, the way students learn has changed dramatically.

One of the biggest advantages of technology in education is accessibility. Students can now access educational materials anytime, anywhere. Online courses, educational videos, and digital libraries have made learning more flexible. Students who live in remote areas or have physical disabilities can now participate in quality education programs that were previously unavailable to them.

Interactive learning tools have made education more engaging and effective. Educational software, virtual reality experiences, and gamification techniques help students understand complex concepts more easily. For example, students can take virtual field trips to ancient Rome or explore the human body in 3D, making abstract concepts more concrete and memorable.

Technology also enables personalized learning. Adaptive learning systems can adjust the difficulty level and pace according to each student's abilities and learning style. This means that advanced students can move ahead quickly, while others can take more time to master the basics.

However, technology in education also presents some challenges. Not all students have equal access to devices and internet connectivity, creating a digital divide. Additionally, excessive screen time can affect students' health and social skills. Teachers need proper training to effectively integrate technology into their lessons.

Despite these challenges, the benefits of educational technology far outweigh the drawbacks. As technology continues to evolve, it will undoubtedly play an even more significant role in shaping the future of education.`,
    questions: [
      {
        id: 1,
        question: 'What is one major advantage of technology in education mentioned?',
        questionVietnamese: 'Một lợi thế chính của công nghệ trong giáo dục được đề cập là gì?',
        type: 'multiple-choice',
        options: ['Lower costs', 'Accessibility', 'Less homework', 'Shorter school days'],
        correctAnswer: 1,
        explanation: 'Đoạn văn nói "One of the biggest advantages of technology in education is accessibility."'
      },
      {
        id: 2,
        question: 'Virtual reality can help make abstract concepts more concrete.',
        questionVietnamese: 'Thực tế ảo có thể giúp làm cho các khái niệm trừu tượng trở nên cụ thể hơn.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn nói students can "explore the human body in 3D, making abstract concepts more concrete and memorable."'
      },
      {
        id: 3,
        question: 'What challenge does the digital divide refer to?',
        questionVietnamese: 'Khoảng cách kỹ thuật số đề cập đến thách thức gì?',
        type: 'multiple-choice',
        options: ['Too much technology', 'Unequal access to devices and internet', 'Teacher training problems', 'Health issues from screens'],
        correctAnswer: 1,
        explanation: 'Đoạn văn nói "Not all students have equal access to devices and internet connectivity, creating a digital divide."'
      },
      {
        id: 4,
        question: 'The author believes technology\'s benefits outweigh its drawbacks.',
        questionVietnamese: 'Tác giả tin rằng lợi ích của công nghệ vượt trội hơn những nhược điểm của nó.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn kết luận "the benefits of educational technology far outweigh the drawbacks."'
      }
    ],
    vocabulary: [
      { word: 'revolutionized', meaning: 'completely changed', vietnamese: 'cách mạng hóa' },
      { word: 'accessibility', meaning: 'the quality of being easily reached or used', vietnamese: 'khả năng tiếp cận' },
      { word: 'gamification', meaning: 'applying game elements to non-game contexts', vietnamese: 'trò chơi hóa' },
      { word: 'adaptive', meaning: 'able to adjust to new conditions', vietnamese: 'thích ứng' },
      { word: 'integrate', meaning: 'combine or bring together', vietnamese: 'tích hợp' }
    ]
  },
  {
    id: 5,
    title: 'Environmental Protection',
    titleVietnamese: 'Bảo vệ môi trường',
    level: 'intermediate',
    passage: `Environmental protection has become one of the most critical issues of our time. Climate change, pollution, and biodiversity loss are threatening the future of our planet, making it essential for everyone to take action.

The main causes of environmental problems include industrial activities, transportation, deforestation, and unsustainable consumption patterns. Factories release harmful chemicals into the air and water, while cars and planes burn fossil fuels that contribute to greenhouse gas emissions. Large-scale agriculture and urban development have led to the destruction of natural habitats.

However, there are many ways individuals and communities can help protect the environment. At home, we can reduce energy consumption by using energy-efficient appliances, turning off lights when not needed, and improving insulation. We can also reduce waste by recycling, composting organic materials, and avoiding single-use plastics.

Transportation choices make a significant impact too. Walking, cycling, using public transportation, or carpooling can dramatically reduce our carbon footprint. For longer distances, choosing trains over planes when possible helps reduce emissions.

Supporting sustainable businesses is another effective strategy. Companies that use renewable energy, eco-friendly materials, and sustainable production methods deserve our support. By buying from these businesses, consumers can influence market demand for environmentally responsible practices.

Education and awareness are crucial for environmental protection. Schools, communities, and media should promote environmental education to help people understand the importance of conservation. When people understand how their actions affect the environment, they are more likely to make sustainable choices.

Governments also play a vital role by creating and enforcing environmental regulations, investing in renewable energy, and supporting research into clean technologies. International cooperation is necessary to address global environmental challenges effectively.

Everyone has a responsibility to protect our planet for future generations. Small actions, when multiplied by millions of people, can create significant positive change.`,
    questions: [
      {
        id: 1,
        question: 'What are the main causes of environmental problems mentioned?',
        questionVietnamese: 'Nguyên nhân chính của các vấn đề môi trường được đề cập là gì?',
        type: 'multiple-choice',
        options: ['Only industrial activities', 'Industrial activities, transportation, deforestation, and consumption', 'Only transportation and cars', 'Only deforestation'],
        correctAnswer: 1,
        explanation: 'Đoạn văn liệt kê "industrial activities, transportation, deforestation, and unsustainable consumption patterns."'
      },
      {
        id: 2,
        question: 'Using energy-efficient appliances can help reduce environmental impact.',
        questionVietnamese: 'Sử dụng thiết bị tiết kiệm năng lượng có thể giúp giảm tác động môi trường.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn nói "we can reduce energy consumption by using energy-efficient appliances."'
      },
      {
        id: 3,
        question: 'Which transportation method helps reduce carbon footprint the most?',
        questionVietnamese: 'Phương tiện giao thông nào giúp giảm lượng khí thải carbon nhiều nhất?',
        type: 'multiple-choice',
        options: ['Flying planes', 'Driving alone', 'Walking, cycling, and public transport', 'Using motorcycles'],
        correctAnswer: 2,
        explanation: 'Đoạn văn nói "Walking, cycling, using public transportation, or carpooling can dramatically reduce our carbon footprint."'
      },
      {
        id: 4,
        question: 'Environmental protection requires international cooperation.',
        questionVietnamese: 'Bảo vệ môi trường đòi hỏi sự hợp tác quốc tế.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'Đoạn văn nói "International cooperation is necessary to address global environmental challenges effectively."'
      }
    ],
    vocabulary: [
      { word: 'biodiversity', meaning: 'variety of plant and animal life', vietnamese: 'đa dạng sinh học' },
      { word: 'deforestation', meaning: 'clearing of forests', vietnamese: 'phá rừng' },
      { word: 'emissions', meaning: 'discharge of gas, heat, light, etc.', vietnamese: 'khí thải' },
      { word: 'sustainable', meaning: 'able to be maintained without harming the environment', vietnamese: 'bền vững' },
      { word: 'conservation', meaning: 'protection and preservation of the environment', vietnamese: 'bảo tồn' }
    ]
  }
]

export function Reading() {
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage>(readingPassages[0])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | boolean }>({})
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({})
  const [showVocabulary, setShowVocabulary] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isReading, setIsReading] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isReading) {
      interval = setInterval(() => {
        setTimeSpent(time => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isReading])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionId: number, answer: number | boolean) => {
    if (showResults[questionId]) return
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer })
  }

  const checkAnswer = (questionId: number) => {
    setShowResults({ ...showResults, [questionId]: true })
  }

  const resetExercise = () => {
    setSelectedAnswers({})
    setShowResults({})
    setCurrentQuestion(0)
    setTimeSpent(0)
    setIsReading(false)
    setShowVocabulary(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedPassage.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const startReading = () => {
    setIsReading(true)
    setTimeSpent(0)
  }

  const finishReading = () => {
    setIsReading(false)
  }

  const currentQuestionData = selectedPassage.questions[currentQuestion]
  const score = Object.keys(showResults).reduce((acc, questionId) => {
    const qId = parseInt(questionId)
    const question = selectedPassage.questions.find(q => q.id === qId)
    if (question && selectedAnswers[qId] === question.correctAnswer) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <div className="slide-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
          📖 Luyện đọc tiếng Anh
        </h1>
        <p className="text-xl mb-4" style={{ color: '#6b7280' }}>
          Phát triển kỹ năng đọc hiểu với các văn bản phù hợp
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <Clock size={24} style={{ color: '#3b82f6', margin: '0 auto 0.5rem' }} />
            <div className="font-semibold text-xl">{formatTime(timeSpent)}</div>
            <div style={{ color: '#6b7280' }}>Thời gian đọc</div>
          </div>
          
          {Object.keys(showResults).length > 0 && (
            <>
              <div className="card text-center">
                <Award size={24} style={{ color: '#10b981', margin: '0 auto 0.5rem' }} />
                <div className="font-semibold text-xl">{score}/{Object.keys(showResults).length}</div>
                <div style={{ color: '#6b7280' }}>Câu trả lời đúng</div>
              </div>
              <div className="card text-center">
                <div className="font-semibold text-xl" style={{ color: '#f59e0b' }}>
                  {Math.round((score / Object.keys(showResults).length) * 100)}%
                </div>
                <div style={{ color: '#6b7280' }}>Độ chính xác</div>
                <button 
                  onClick={resetExercise} 
                  className="btn btn-secondary mt-2"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                  Làm lại
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Passage List */}
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
            Bài đọc
          </h2>
          <div className="space-y-3">
            {readingPassages.map((passage) => (
              <div
                key={passage.id}
                className={`card cursor-pointer ${selectedPassage.id === passage.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedPassage(passage)
                  resetExercise()
                }}
                style={{
                  padding: '1rem',
                  border: selectedPassage.id === passage.id ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                }}
              >
                <h3 className="font-semibold" style={{ color: '#1f2937' }}>
                  {passage.title}
                </h3>
                <p className="vietnamese-text" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {passage.titleVietnamese}
                </p>
                <span className={`level-badge level-${passage.level}`} style={{ marginTop: '0.5rem' }}>
                  {passage.level === 'beginner' ? 'Cơ bản' : 'Trung bình'}
                </span>
              </div>
            ))}
          </div>

          {/* Vocabulary Section */}
          <div className="mt-6">
            <button
              onClick={() => setShowVocabulary(!showVocabulary)}
              className="btn btn-secondary w-full mb-4"
            >
              <BookOpen size={16} style={{ marginRight: '0.5rem' }} />
              {showVocabulary ? 'Ẩn từ vựng' : 'Xem từ vựng'}
            </button>
            
            {showVocabulary && (
              <div className="card">
                <h3 className="font-semibold mb-3" style={{ color: '#1f2937' }}>
                  Từ vựng quan trọng
                </h3>
                <div className="space-y-3">
                  {selectedPassage.vocabulary.map((item, index) => (
                    <div key={index} className="p-3" style={{ background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <div className="font-semibold" style={{ color: '#1f2937' }}>
                        {item.word}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        {item.meaning}
                      </div>
                      <div className="vietnamese-text" style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        {item.vietnamese}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reading Passage */}
        <div className="lg:col-span-2">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="text-xl font-bold" style={{ color: '#1f2937' }}>
                {selectedPassage.title}
              </h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#6b7280' }}>
                  <Clock size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  {formatTime(timeSpent)}
                </span>
                {!isReading ? (
                  <button onClick={startReading} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    Bắt đầu đọc
                  </button>
                ) : (
                  <button onClick={finishReading} className="btn btn-success" style={{ padding: '0.5rem 1rem' }}>
                    Hoàn thành
                  </button>
                )}
              </div>
            </div>
            
            <p className="vietnamese-text mb-4" style={{ color: '#6b7280' }}>
              {selectedPassage.titleVietnamese}
            </p>

            <div 
              style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: '#1f2937',
                textAlign: 'justify'
              }}
            >
              {selectedPassage.passage.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
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
                  {currentQuestion + 1}/{selectedPassage.questions.length}
                </span>
              </div>
              <div className="progress-bar mb-4">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / selectedPassage.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2" style={{ color: '#1f2937' }}>
                {currentQuestionData.question}
              </h3>
              <p className="vietnamese-text mb-4" style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {currentQuestionData.questionVietnamese}
              </p>

              {currentQuestionData.type === 'multiple-choice' ? (
                <div className="space-y-2">
                  {currentQuestionData.options?.map((option, index) => (
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
              ) : (
                <div className="space-y-2">
                  {[true, false].map((answer) => (
                    <div
                      key={answer.toString()}
                      className={`quiz-option ${selectedAnswers[currentQuestionData.id] === answer ? 'selected' : ''} ${
                        showResults[currentQuestionData.id] ? 
                          (answer === currentQuestionData.correctAnswer ? 'correct' : 
                           selectedAnswers[currentQuestionData.id] === answer ? 'incorrect' : '') : ''
                      }`}
                      onClick={() => handleAnswerSelect(currentQuestionData.id, answer)}
                      style={{
                        cursor: showResults[currentQuestionData.id] ? 'default' : 'pointer',
                        opacity: showResults[currentQuestionData.id] && 
                                 answer !== currentQuestionData.correctAnswer && 
                                 selectedAnswers[currentQuestionData.id] !== answer ? 0.6 : 1
                      }}
                    >
                      {answer ? 'Đúng (True)' : 'Sai (False)'}
                      {showResults[currentQuestionData.id] && answer === currentQuestionData.correctAnswer && (
                        <CheckCircle size={20} style={{ color: '#10b981', marginLeft: 'auto' }} />
                      )}
                      {showResults[currentQuestionData.id] && 
                       selectedAnswers[currentQuestionData.id] === answer && 
                       answer !== currentQuestionData.correctAnswer && (
                        <XCircle size={20} style={{ color: '#ef4444', marginLeft: 'auto' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
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

            <div style={{ display: 'flex', gap: '0.5rem' }}>
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
                  disabled={currentQuestion === selectedPassage.questions.length - 1}
                  className="btn btn-primary"
                  style={{ 
                    flex: 1,
                    opacity: currentQuestion === selectedPassage.questions.length - 1 ? 0.5 : 1
                  }}
                >
                  Tiếp →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
