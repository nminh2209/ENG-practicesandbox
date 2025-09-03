import { useState, useEffect } from 'react'
import { Volume2, RotateCcw, CheckCircle, Circle } from 'lucide-react'

interface VocabWord {
  id: number
  english: string
  vietnamese: string
  pronunciation: string
  example: string
  exampleVietnamese: string
  level: 'beginner' | 'intermediate'
  category: string
}

const vocabularyData: VocabWord[] = [
  // Academic & Education
  {
    id: 1,
    english: 'Achievement',
    vietnamese: 'Thành tựu, thành tích',
    pronunciation: '/əˈtʃiːvmənt/',
    example: 'Getting into university was a great achievement for her.',
    exampleVietnamese: 'Vào được đại học là một thành tựu lớn đối với cô ấy.',
    level: 'intermediate',
    category: 'Academic'
  },
  {
    id: 2,
    english: 'Knowledge',
    vietnamese: 'Kiến thức',
    pronunciation: '/ˈnɒlɪdʒ/',
    example: 'She has extensive knowledge of computer science.',
    exampleVietnamese: 'Cô ấy có kiến thức sâu rộng về khoa học máy tính.',
    level: 'beginner',
    category: 'Academic'
  },
  {
    id: 3,
    english: 'Research',
    vietnamese: 'Nghiên cứu',
    pronunciation: '/rɪˈsɜːtʃ/',
    example: 'The research showed interesting results about climate change.',
    exampleVietnamese: 'Nghiên cứu cho thấy kết quả thú vị về biến đổi khí hậu.',
    level: 'intermediate',
    category: 'Academic'
  },
  {
    id: 4,
    english: 'Analysis',
    vietnamese: 'Phân tích',
    pronunciation: '/əˈnæləsɪs/',
    example: 'His analysis of the data was very thorough.',
    exampleVietnamese: 'Phân tích dữ liệu của anh ấy rất kỹ lưỡng.',
    level: 'intermediate',
    category: 'Academic'
  },

  // Environment & Nature
  {
    id: 5,
    english: 'Environment',
    vietnamese: 'Môi trường',
    pronunciation: '/ɪnˈvaɪrənmənt/',
    example: 'We need to protect our environment from pollution.',
    exampleVietnamese: 'Chúng ta cần bảo vệ môi trường khỏi ô nhiễm.',
    level: 'intermediate',
    category: 'Environment'
  },
  {
    id: 6,
    english: 'Sustainable',
    vietnamese: 'Bền vững',
    pronunciation: '/səˈsteɪnəbl/',
    example: 'We need to find sustainable solutions to climate change.',
    exampleVietnamese: 'Chúng ta cần tìm các giải pháp bền vững cho biến đổi khí hậu.',
    level: 'intermediate',
    category: 'Environment'
  },
  {
    id: 7,
    english: 'Renewable',
    vietnamese: 'Có thể tái tạo',
    pronunciation: '/rɪˈnjuːəbl/',
    example: 'Solar energy is a renewable source of power.',
    exampleVietnamese: 'Năng lượng mặt trời là nguồn năng lượng có thể tái tạo.',
    level: 'intermediate',
    category: 'Environment'
  },
  {
    id: 8,
    english: 'Conservation',
    vietnamese: 'Bảo tồn',
    pronunciation: '/ˌkɒnsəˈveɪʃn/',
    example: 'Wildlife conservation is important for our planet.',
    exampleVietnamese: 'Bảo tồn động vật hoang dã rất quan trọng cho hành tinh chúng ta.',
    level: 'intermediate',
    category: 'Environment'
  },

  // Technology & Innovation
  {
    id: 9,
    english: 'Technology',
    vietnamese: 'Công nghệ',
    pronunciation: '/tekˈnɒlədʒi/',
    example: 'Modern technology has changed our daily lives.',
    exampleVietnamese: 'Công nghệ hiện đại đã thay đổi cuộc sống hàng ngày của chúng ta.',
    level: 'intermediate',
    category: 'Technology'
  },
  {
    id: 10,
    english: 'Innovation',
    vietnamese: 'Sự đổi mới, cải tiến',
    pronunciation: '/ˌɪnəˈveɪʃn/',
    example: 'Innovation in healthcare has saved millions of lives.',
    exampleVietnamese: 'Sự đổi mới trong chăm sóc sức khỏe đã cứu sống hàng triệu người.',
    level: 'intermediate',
    category: 'Technology'
  },
  {
    id: 11,
    english: 'Digital',
    vietnamese: 'Kỹ thuật số',
    pronunciation: '/ˈdɪdʒɪtl/',
    example: 'The digital age has transformed how we communicate.',
    exampleVietnamese: 'Kỷ nguyên kỹ thuật số đã thay đổi cách chúng ta giao tiếp.',
    level: 'beginner',
    category: 'Technology'
  },
  {
    id: 12,
    english: 'Artificial Intelligence',
    vietnamese: 'Trí tuệ nhân tạo',
    pronunciation: '/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/',
    example: 'Artificial intelligence is becoming more common in everyday life.',
    exampleVietnamese: 'Trí tuệ nhân tạo đang trở nên phổ biến hơn trong cuộc sống hàng ngày.',
    level: 'intermediate',
    category: 'Technology'
  },

  // Career & Business
  {
    id: 13,
    english: 'Opportunity',
    vietnamese: 'Cơ hội',
    pronunciation: '/ˌɒpəˈtjuːnəti/',
    example: 'This job offers many opportunities for career development.',
    exampleVietnamese: 'Công việc này mang lại nhiều cơ hội phát triển nghề nghiệp.',
    level: 'intermediate',
    category: 'Career'
  },
  {
    id: 14,
    english: 'Professional',
    vietnamese: 'Chuyên nghiệp',
    pronunciation: '/prəˈfeʃənl/',
    example: 'She maintains a professional attitude at work.',
    exampleVietnamese: 'Cô ấy duy trì thái độ chuyên nghiệp trong công việc.',
    level: 'intermediate',
    category: 'Career'
  },
  {
    id: 15,
    english: 'Management',
    vietnamese: 'Quản lý',
    pronunciation: '/ˈmænɪdʒmənt/',
    example: 'Good management is essential for business success.',
    exampleVietnamese: 'Quản lý tốt là điều cần thiết cho thành công trong kinh doanh.',
    level: 'intermediate',
    category: 'Career'
  },
  {
    id: 16,
    english: 'Leadership',
    vietnamese: 'Lãnh đạo',
    pronunciation: '/ˈliːdəʃɪp/',
    example: 'Strong leadership skills are valued in most industries.',
    exampleVietnamese: 'Kỹ năng lãnh đạo mạnh được đánh giá cao trong hầu hết các ngành.',
    level: 'intermediate',
    category: 'Career'
  },

  // Communication & Skills
  {
    id: 17,
    english: 'Communication',
    vietnamese: 'Giao tiếp',
    pronunciation: '/kəˌmjuːnɪˈkeɪʃn/',
    example: 'Good communication skills are essential in business.',
    exampleVietnamese: 'Kỹ năng giao tiếp tốt là rất cần thiết trong kinh doanh.',
    level: 'intermediate',
    category: 'Skills'
  },
  {
    id: 18,
    english: 'Teamwork',
    vietnamese: 'Làm việc nhóm',
    pronunciation: '/ˈtiːmwɜːk/',
    example: 'Effective teamwork leads to better results.',
    exampleVietnamese: 'Làm việc nhóm hiệu quả dẫn đến kết quả tốt hơn.',
    level: 'beginner',
    category: 'Skills'
  },
  {
    id: 19,
    english: 'Problem-solving',
    vietnamese: 'Giải quyết vấn đề',
    pronunciation: '/ˈprɒbləm ˌsɒlvɪŋ/',
    example: 'Problem-solving skills are crucial in engineering.',
    exampleVietnamese: 'Kỹ năng giải quyết vấn đề rất quan trọng trong kỹ thuật.',
    level: 'intermediate',
    category: 'Skills'
  },
  {
    id: 20,
    english: 'Creativity',
    vietnamese: 'Sáng tạo',
    pronunciation: '/ˌkriːeɪˈtɪvəti/',
    example: 'Creativity is important in marketing and design.',
    exampleVietnamese: 'Sáng tạo rất quan trọng trong marketing và thiết kế.',
    level: 'intermediate',
    category: 'Skills'
  },

  // Society & Culture
  {
    id: 21,
    english: 'Society',
    vietnamese: 'Xã hội',
    pronunciation: '/səˈsaɪəti/',
    example: 'Technology has a great impact on modern society.',
    exampleVietnamese: 'Công nghệ có tác động lớn đến xã hội hiện đại.',
    level: 'beginner',
    category: 'Society'
  },
  {
    id: 22,
    english: 'Culture',
    vietnamese: 'Văn hóa',
    pronunciation: '/ˈkʌltʃə/',
    example: 'Learning about different cultures broadens your perspective.',
    exampleVietnamese: 'Học về các nền văn hóa khác nhau mở rộng tầm nhìn của bạn.',
    level: 'beginner',
    category: 'Society'
  },
  {
    id: 23,
    english: 'Diversity',
    vietnamese: 'Đa dạng',
    pronunciation: '/daɪˈvɜːsəti/',
    example: 'Cultural diversity makes our society more interesting.',
    exampleVietnamese: 'Đa dạng văn hóa làm cho xã hội chúng ta thú vị hơn.',
    level: 'intermediate',
    category: 'Society'
  },
  {
    id: 24,
    english: 'Community',
    vietnamese: 'Cộng đồng',
    pronunciation: '/kəˈmjuːnəti/',
    example: 'The local community organized a charity event.',
    exampleVietnamese: 'Cộng đồng địa phương tổ chức một sự kiện từ thiện.',
    level: 'beginner',
    category: 'Society'
  },

  // Health & Lifestyle
  {
    id: 25,
    english: 'Health',
    vietnamese: 'Sức khỏe',
    pronunciation: '/helθ/',
    example: 'Regular exercise is important for good health.',
    exampleVietnamese: 'Tập thể dục thường xuyên rất quan trọng cho sức khỏe tốt.',
    level: 'beginner',
    category: 'Health'
  },
  {
    id: 26,
    english: 'Nutrition',
    vietnamese: 'Dinh dưỡng',
    pronunciation: '/njuˈtrɪʃn/',
    example: 'Good nutrition is the foundation of a healthy lifestyle.',
    exampleVietnamese: 'Dinh dưỡng tốt là nền tảng của lối sống lành mạnh.',
    level: 'intermediate',
    category: 'Health'
  },
  {
    id: 27,
    english: 'Fitness',
    vietnamese: 'Thể lực, sự cân đối',
    pronunciation: '/ˈfɪtnəs/',
    example: 'Physical fitness helps prevent many diseases.',
    exampleVietnamese: 'Thể lực tốt giúp phòng ngừa nhiều bệnh tật.',
    level: 'beginner',
    category: 'Health'
  },
  {
    id: 28,
    english: 'Wellness',
    vietnamese: 'Sự khỏe mạnh, thịnh vượng',
    pronunciation: '/ˈwelnəs/',
    example: 'Mental wellness is just as important as physical health.',
    exampleVietnamese: 'Sức khỏe tinh thần cũng quan trọng như sức khỏe thể chất.',
    level: 'intermediate',
    category: 'Health'
  },

  // Travel & Transportation
  {
    id: 29,
    english: 'Transportation',
    vietnamese: 'Giao thông vận tải',
    pronunciation: '/ˌtrænspɔːˈteɪʃn/',
    example: 'Public transportation is becoming more environmentally friendly.',
    exampleVietnamese: 'Giao thông công cộng đang trở nên thân thiện với môi trường hơn.',
    level: 'intermediate',
    category: 'Travel'
  },
  {
    id: 30,
    english: 'Adventure',
    vietnamese: 'Cuộc phiêu lưu',
    pronunciation: '/ədˈventʃə/',
    example: 'Traveling to new places is always an adventure.',
    exampleVietnamese: 'Du lịch đến những nơi mới luôn là một cuộc phiêu lưu.',
    level: 'beginner',
    category: 'Travel'
  },
  {
    id: 31,
    english: 'Destination',
    vietnamese: 'Điểm đến',
    pronunciation: '/ˌdestɪˈneɪʃn/',
    example: 'Japan is a popular destination for tourists.',
    exampleVietnamese: 'Nhật Bản là điểm đến phổ biến cho khách du lịch.',
    level: 'intermediate',
    category: 'Travel'
  },
  {
    id: 32,
    english: 'Experience',
    vietnamese: 'Trải nghiệm',
    pronunciation: '/ɪkˈspɪəriəns/',
    example: 'Studying abroad was an amazing experience.',
    exampleVietnamese: 'Du học là một trải nghiệm tuyệt vời.',
    level: 'beginner',
    category: 'Travel'
  },

  // Additional Essential Words
  {
    id: 33,
    english: 'Challenge',
    vietnamese: 'Thử thách',
    pronunciation: '/ˈtʃælɪndʒ/',
    example: 'Learning English can be a challenge, but it\'s very rewarding.',
    exampleVietnamese: 'Học tiếng Anh có thể là một thử thách, nhưng rất bổ ích.',
    level: 'beginner',
    category: 'Learning'
  },
  {
    id: 34,
    english: 'Influence',
    vietnamese: 'Ảnh hưởng',
    pronunciation: '/ˈɪnfluəns/',
    example: 'Social media has a strong influence on young people.',
    exampleVietnamese: 'Mạng xã hội có ảnh hưởng mạnh đến giới trẻ.',
    level: 'intermediate',
    category: 'Society'
  },
  {
    id: 35,
    english: 'Responsibility',
    vietnamese: 'Trách nhiệm',
    pronunciation: '/rɪˌspɒnsəˈbɪləti/',
    example: 'As adults, we have the responsibility to protect children.',
    exampleVietnamese: 'Là người lớn, chúng ta có trách nhiệm bảo vệ trẻ em.',
    level: 'intermediate',
    category: 'Society'
  },
  {
    id: 36,
    english: 'Efficient',
    vietnamese: 'Hiệu quả',
    pronunciation: '/ɪˈfɪʃnt/',
    example: 'Electric cars are more efficient than gasoline cars.',
    exampleVietnamese: 'Xe điện hiệu quả hơn xe chạy xăng.',
    level: 'intermediate',
    category: 'Technology'
  }
]

export function Vocabulary() {
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null)
  const [studiedWords, setStudiedWords] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const categories = ['all', ...Array.from(new Set(vocabularyData.map(word => word.category)))]
  
  const filteredWords = selectedCategory === 'all' 
    ? vocabularyData 
    : vocabularyData.filter(word => word.category === selectedCategory)

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const markAsStudied = (wordId: number) => {
    if (!studiedWords.includes(wordId)) {
      setStudiedWords([...studiedWords, wordId])
    }
  }

  const resetProgress = () => {
    setStudiedWords([])
  }

  const nextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setSelectedWord(filteredWords[currentWordIndex + 1])
    }
  }

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
      setSelectedWord(filteredWords[currentWordIndex - 1])
    }
  }

  useEffect(() => {
    if (filteredWords.length > 0) {
      setCurrentWordIndex(0)
      setSelectedWord(filteredWords[0])
    }
  }, [selectedCategory])

  return (
    <div className="slide-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1f2937' }}>
          📚 Học từ vựng tiếng Anh
        </h1>
        <p className="text-xl mb-4" style={{ color: '#6b7280' }}>
          Học từ vựng IELTS cho mục tiêu 6.0 với phát âm và ví dụ thực tế
        </p>
        
        {/* Progress */}
        <div className="card mb-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="font-semibold">Tiến độ học tập</h3>
            <button 
              onClick={resetProgress} 
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
              Reset
            </button>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(studiedWords.length / vocabularyData.length) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2" style={{ color: '#6b7280' }}>
            Đã học: {studiedWords.length}/{vocabularyData.length} từ
          </p>
        </div>

        {/* Category Filter */}
        <div className="card mb-6">
          <h3 className="font-semibold mb-4">Chọn chủ đề:</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                {category === 'all' ? 'Tất cả' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Word Cards */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>
            Danh sách từ vựng
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredWords.map((word) => (
              <div
                key={word.id}
                className={`word-card ${selectedWord?.id === word.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedWord(word)
                  setCurrentWordIndex(filteredWords.indexOf(word))
                }}
                style={{
                  border: selectedWord?.id === word.id ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div className="word-english">{word.english}</div>
                    <div className="word-vietnamese vietnamese-text">{word.vietnamese}</div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      {word.pronunciation}
                    </div>
                    <span className={`level-badge level-${word.level}`}>
                      {word.level === 'beginner' ? 'Cơ bản' : 'Trung bình'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        speakWord(word.english)
                      }}
                      className="btn"
                      style={{ 
                        padding: '0.5rem', 
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <Volume2 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsStudied(word.id)
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {studiedWords.includes(word.id) ? 
                        <CheckCircle size={20} style={{ color: '#10b981' }} /> : 
                        <Circle size={20} style={{ color: '#d1d5db' }} />
                      }
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Word Detail */}
        <div>
          {selectedWord && (
            <div className="card" style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="text-2xl font-semibold" style={{ color: '#1f2937' }}>
                  Chi tiết từ vựng
                </h2>
                <span className={`level-badge level-${selectedWord.level}`}>
                  {selectedWord.level === 'beginner' ? 'Cơ bản' : 'Trung bình'}
                </span>
              </div>
              
              <div className="mb-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <h3 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                    {selectedWord.english}
                  </h3>
                  <button
                    onClick={() => speakWord(selectedWord.english)}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    <Volume2 size={18} style={{ marginRight: '0.5rem' }} />
                    Nghe
                  </button>
                </div>
                
                <p className="text-xl vietnamese-text mb-2">
                  {selectedWord.vietnamese}
                </p>
                
                <p className="mb-4" style={{ color: '#6b7280' }}>
                  Phát âm: {selectedWord.pronunciation}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#1f2937' }}>
                    Ví dụ:
                  </h4>
                  <p className="mb-2" style={{ fontStyle: 'italic', color: '#374151' }}>
                    "{selectedWord.example}"
                  </p>
                  <p className="vietnamese-text" style={{ color: '#6b7280' }}>
                    {selectedWord.exampleVietnamese}
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    onClick={prevWord}
                    disabled={currentWordIndex === 0}
                    className="btn btn-secondary"
                    style={{ opacity: currentWordIndex === 0 ? 0.5 : 1 }}
                  >
                    ← Trước
                  </button>
                  <button
                    onClick={nextWord}
                    disabled={currentWordIndex === filteredWords.length - 1}
                    className="btn btn-secondary"
                    style={{ opacity: currentWordIndex === filteredWords.length - 1 ? 0.5 : 1 }}
                  >
                    Sau →
                  </button>
                  <button
                    onClick={() => markAsStudied(selectedWord.id)}
                    className={`btn ${studiedWords.includes(selectedWord.id) ? 'btn-success' : 'btn-primary'}`}
                  >
                    {studiedWords.includes(selectedWord.id) ? 'Đã học ✓' : 'Đánh dấu đã học'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
