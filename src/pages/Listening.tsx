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
  },
  {
    id: 3,
    title: 'Shopping for Clothes',
    titleVietnamese: 'Mua sắm quần áo',
    level: 'beginner',
    transcript: `Good morning! Welcome to our clothing store. What can I help you find today? Hi, I'm looking for a birthday gift for my sister. She likes colorful dresses. Great choice! We have many beautiful dresses on sale this week. What size does she wear? She wears size medium. And what colors does she prefer? She loves blue and green. Perfect! Let me show you some options. This blue dress is very popular, and it's 30% off today. The original price is $80, so it's now $56. We also have this green dress for $45. Both dresses are made of cotton and are very comfortable. Would you like to see them?`,
    transcriptVietnamese: 'Chào buổi sáng! Chào mừng đến cửa hàng quần áo của chúng tôi. Tôi có thể giúp bạn tìm gì hôm nay? Xin chào, tôi đang tìm quà sinh nhật cho chị gái tôi. Chị ấy thích váy nhiều màu. Lựa chọn tuyệt vời! Chúng tôi có nhiều chiếc váy đẹp đang giảm giá tuần này. Chị ấy mặc size nào? Chị ấy mặc size trung bình. Và chị ấy thích màu gì? Chị ấy thích màu xanh dương và xanh lá. Hoàn hảo! Để tôi cho bạn xem một số lựa chọn. Chiếc váy xanh dương này rất được ưa chuộng, và hôm nay giảm 30%. Giá gốc là $80, nên bây giờ là $56. Chúng tôi cũng có chiếc váy xanh lá này với giá $45. Cả hai chiếc váy đều được làm từ cotton và rất thoải mái. Bạn có muốn xem không?',
    audioText: `Good morning! Welcome to our clothing store. What can I help you find today? Hi, I'm looking for a birthday gift for my sister. She likes colorful dresses. Great choice! We have many beautiful dresses on sale this week. What size does she wear? She wears size medium. And what colors does she prefer? She loves blue and green. Perfect! Let me show you some options. This blue dress is very popular, and it's thirty percent off today. The original price is eighty dollars, so it's now fifty six dollars. We also have this green dress for forty five dollars. Both dresses are made of cotton and are very comfortable. Would you like to see them?`,
    questions: [
      {
        id: 1,
        question: 'What is the customer looking for?',
        questionVietnamese: 'Khách hàng đang tìm gì?',
        options: ['A gift for her mother', 'A birthday gift for her sister', 'Clothes for herself', 'A wedding dress'],
        correctAnswer: 1,
        explanation: 'Khách hàng nói "I\'m looking for a birthday gift for my sister".'
      },
      {
        id: 2,
        question: 'What size does her sister wear?',
        questionVietnamese: 'Chị gái cô ấy mặc size nào?',
        options: ['Small', 'Medium', 'Large', 'Extra large'],
        correctAnswer: 1,
        explanation: 'Khách hàng nói "She wears size medium".'
      },
      {
        id: 3,
        question: 'What is the sale price of the blue dress?',
        questionVietnamese: 'Giá khuyến mãi của chiếc váy xanh dương là bao nhiêu?',
        options: ['$45', '$56', '$70', '$80'],
        correctAnswer: 1,
        explanation: 'Nhân viên nói "The original price is $80, so it\'s now $56" (giảm 30%).'
      }
    ]
  },
  {
    id: 4,
    title: 'Weather Forecast',
    titleVietnamese: 'Dự báo thời tiết',
    level: 'intermediate',
    transcript: `Good evening, and welcome to your local weather forecast. This is meteorologist Jennifer Smith with your weekend weather update. Tomorrow, Saturday, will start cloudy in the morning with temperatures around 18 degrees Celsius. By afternoon, the clouds will clear and we'll see plenty of sunshine with highs reaching 25 degrees. It's a perfect day for outdoor activities! Sunday will be quite different. We're expecting heavy rain throughout the day, starting around 6 AM and continuing until evening. Temperatures will drop to between 15 and 20 degrees. I recommend bringing an umbrella if you're planning to go out. Looking ahead to next week, Monday and Tuesday will be partly sunny with mild temperatures around 22 degrees. Wednesday might bring some light showers, but Thursday and Friday look beautiful with clear skies and warm weather up to 27 degrees. That's your weekend forecast. Have a great evening!`,
    transcriptVietnamese: 'Chào buổi tối, và chào mừng đến với dự báo thời tiết địa phương của bạn. Tôi là chuyên gia thời tiết Jennifer Smith với bản cập nhật thời tiết cuối tuần. Ngày mai, thứ Bảy, sẽ bắt đầu có mây vào buổi sáng với nhiệt độ khoảng 18 độ C. Đến chiều, mây sẽ tan và chúng ta sẽ thấy nhiều nắng với nhiệt độ cao nhất đạt 25 độ. Đó là một ngày hoàn hảo cho các hoạt động ngoài trời! Chủ nhật sẽ khá khác. Chúng tôi dự báo mưa lớn cả ngày, bắt đầu khoảng 6 giờ sáng và kéo dài đến tối. Nhiệt độ sẽ giảm xuống khoảng 15 đến 20 độ. Tôi khuyên bạn nên mang ô nếu dự định ra ngoài. Nhìn về tuần tới, thứ Hai và thứ Ba sẽ có nắng một phần với nhiệt độ ôn hòa khoảng 22 độ. Thứ Tư có thể có mưa phùn nhẹ, nhưng thứ Năm và thứ Sáu trông đẹp với bầu trời trong và thời tiết ấm lên đến 27 độ. Đó là dự báo cuối tuần của bạn. Chúc bạn buổi tối tốt lành!',
    audioText: `Good evening, and welcome to your local weather forecast. This is meteorologist Jennifer Smith with your weekend weather update. Tomorrow, Saturday, will start cloudy in the morning with temperatures around eighteen degrees Celsius. By afternoon, the clouds will clear and we'll see plenty of sunshine with highs reaching twenty five degrees. It's a perfect day for outdoor activities! Sunday will be quite different. We're expecting heavy rain throughout the day, starting around six AM and continuing until evening. Temperatures will drop to between fifteen and twenty degrees. I recommend bringing an umbrella if you're planning to go out. Looking ahead to next week, Monday and Tuesday will be partly sunny with mild temperatures around twenty two degrees. Wednesday might bring some light showers, but Thursday and Friday look beautiful with clear skies and warm weather up to twenty seven degrees. That's your weekend forecast. Have a great evening!`,
    questions: [
      {
        id: 1,
        question: 'What will the weather be like on Saturday afternoon?',
        questionVietnamese: 'Thời tiết chiều thứ Bảy sẽ như thế nào?',
        options: ['Cloudy and cold', 'Sunny with high temperature', 'Rainy and windy', 'Foggy and cool'],
        correctAnswer: 1,
        explanation: 'Dự báo nói "By afternoon, the clouds will clear and we\'ll see plenty of sunshine with highs reaching 25 degrees".'
      },
      {
        id: 2,
        question: 'When will it start raining on Sunday?',
        questionVietnamese: 'Khi nào sẽ bắt đầu mưa vào Chủ nhật?',
        options: ['3 AM', '6 AM', '9 AM', '12 PM'],
        correctAnswer: 1,
        explanation: 'Dự báo nói "We\'re expecting heavy rain throughout the day, starting around 6 AM".'
      },
      {
        id: 3,
        question: 'What will the temperature be like next Wednesday?',
        questionVietnamese: 'Nhiệt độ thứ Tư tuần sau sẽ như thế nào?',
        options: ['27 degrees with clear skies', 'Light showers', '22 degrees and mild', 'Heavy rain and cold'],
        correctAnswer: 1,
        explanation: 'Dự báo nói "Wednesday might bring some light showers" - có thể có mưa phùn nhẹ.'
      }
    ]
  },
  {
    id: 5,
    title: 'Job Interview',
    titleVietnamese: 'Phỏng vấn xin việc',
    level: 'intermediate',
    transcript: `Good morning, Ms. Johnson. Please have a seat. Thank you for coming in today. Thank you for having me, Mr. Davis. I'm excited about this opportunity. Great! Let's start with some basic questions. Can you tell me a little about yourself and your work experience? Of course. I graduated from State University with a degree in Business Administration three years ago. Since then, I've been working at Green Marketing Company as a junior marketing coordinator. I've been responsible for social media campaigns, customer research, and helping with event planning. That sounds impressive. What made you interested in applying for this position with our company? Well, I've always admired your company's innovative approach to digital marketing. I believe my skills in social media and customer analysis would be valuable here. Also, I'm looking for new challenges and opportunities to grow professionally. I see you have experience with social media. Can you give me an example of a successful campaign you worked on? Sure! Last year, I developed a campaign for a new product launch that increased our social media engagement by 40% and generated 200 new leads within one month. We used creative videos and interactive posts to engage our target audience. Excellent! Do you have any questions for me about the position or our company?`,
    transcriptVietnamese: 'Chào buổi sáng, cô Johnson. Mời cô ngồi. Cảm ơn cô đã đến hôm nay. Cảm ơn anh đã mời tôi, anh Davis. Tôi rất hào hứng về cơ hội này. Tuyệt! Hãy bắt đầu với một số câu hỏi cơ bản. Cô có thể kể tôi nghe một chút về bản thân và kinh nghiệm làm việc của cô không? Tất nhiên. Tôi đã tốt nghiệp Đại học Bang với bằng Quản trị Kinh doanh ba năm trước. Kể từ đó, tôi đã làm việc tại Công ty Marketing Green với tư cách là điều phối viên marketing junior. Tôi đã chịu trách nhiệm cho các chiến dịch truyền thông xã hội, nghiên cứu khách hàng và giúp đỡ lập kế hoạch sự kiện. Nghe có vẻ ấn tượng. Điều gì khiến cô quan tâm đến việc ứng tuyển vị trí này tại công ty chúng tôi? Tôi luôn ngưỡng mộ cách tiếp cận sáng tạo của công ty anh trong marketing kỹ thuật số. Tôi tin rằng kỹ năng của tôi về truyền thông xã hội và phân tích khách hàng sẽ có giá trị ở đây. Ngoài ra, tôi đang tìm kiếm những thử thách mới và cơ hội phát triển chuyên nghiệp. Tôi thấy cô có kinh nghiệm về truyền thông xã hội. Cô có thể cho tôi một ví dụ về chiến dịch thành công mà cô đã thực hiện không? Chắc chắn! Năm ngoái, tôi đã phát triển một chiến dịch cho việc ra mắt sản phẩm mới đã tăng tương tác truyền thông xã hội của chúng tôi lên 40% và tạo ra 200 khách hàng tiềm năng mới trong vòng một tháng. Chúng tôi đã sử dụng video sáng tạo và bài viết tương tác để thu hút đối tượng mục tiêu. Xuất sắc! Cô có câu hỏi nào cho tôi về vị trí này hoặc công ty chúng tôi không?',
    audioText: `Good morning, Ms. Johnson. Please have a seat. Thank you for coming in today. Thank you for having me, Mr. Davis. I'm excited about this opportunity. Great! Let's start with some basic questions. Can you tell me a little about yourself and your work experience? Of course. I graduated from State University with a degree in Business Administration three years ago. Since then, I've been working at Green Marketing Company as a junior marketing coordinator. I've been responsible for social media campaigns, customer research, and helping with event planning. That sounds impressive. What made you interested in applying for this position with our company? Well, I've always admired your company's innovative approach to digital marketing. I believe my skills in social media and customer analysis would be valuable here. Also, I'm looking for new challenges and opportunities to grow professionally. I see you have experience with social media. Can you give me an example of a successful campaign you worked on? Sure! Last year, I developed a campaign for a new product launch that increased our social media engagement by forty percent and generated two hundred new leads within one month. We used creative videos and interactive posts to engage our target audience. Excellent! Do you have any questions for me about the position or our company?`,
    questions: [
      {
        id: 1,
        question: 'How long has Ms. Johnson been working at Green Marketing Company?',
        questionVietnamese: 'Cô Johnson đã làm việc tại Công ty Green Marketing bao lâu?',
        options: ['2 years', '3 years', 'Since graduating 3 years ago', '4 years'],
        correctAnswer: 2,
        explanation: 'Cô Johnson nói "I graduated from State University... three years ago. Since then, I\'ve been working at Green Marketing Company".'
      },
      {
        id: 2,
        question: 'What was the result of her successful social media campaign?',
        questionVietnamese: 'Kết quả của chiến dịch truyền thông xã hội thành công của cô ấy là gì?',
        options: ['30% increase and 150 leads', '40% increase and 200 leads', '50% increase and 250 leads', '35% increase and 180 leads'],
        correctAnswer: 1,
        explanation: 'Cô Johnson nói chiến dịch "increased our social media engagement by 40% and generated 200 new leads".'
      },
      {
        id: 3,
        question: 'What degree did Ms. Johnson graduate with?',
        questionVietnamese: 'Cô Johnson tốt nghiệp bằng gì?',
        options: ['Marketing', 'Business Administration', 'Communications', 'Computer Science'],
        correctAnswer: 1,
        explanation: 'Cô Johnson nói "I graduated from State University with a degree in Business Administration".'
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
