import { Link } from 'react-router-dom'
import { BookOpen, FileText, Headphones, Book, Target, Award, Clock } from 'lucide-react'

export function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Từ vựng',
      description: 'Học từ vựng IELTS cơ bản với hình ảnh và ví dụ sinh động',
      path: '/vocabulary',
      color: '#3b82f6'
    },
    {
      icon: FileText,
      title: 'Ngữ pháp',
      description: 'Nắm vững ngữ pháp tiếng Anh qua các bài tập thực hành',
      path: '/grammar',
      color: '#10b981'
    },
    {
      icon: Headphones,
      title: 'Luyện nghe',
      description: 'Cải thiện khả năng nghe hiểu với các bài nghe đa dạng',
      path: '/listening',
      color: '#f59e0b'
    },
    {
      icon: Book,
      title: 'Luyện đọc',
      description: 'Phát triển kỹ năng đọc hiểu với các văn bản phù hợp',
      path: '/reading',
      color: '#ef4444'
    }
  ]

  const stats = [
    { icon: Target, label: 'Mục tiêu', value: 'IELTS 6.0+' },
    { icon: Award, label: 'Bài học', value: '100+' },
    { icon: Clock, label: 'Thời gian', value: '15 phút/ngày' }
  ]

  return (
    <div className="slide-in">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#1f2937' }}>
          Chào mừng đến với English Learning! 🎉
        </h1>
        <p className="text-xl mb-6" style={{ color: '#6b7280' }}>
          Học tiếng Anh hiệu quả cho người mục tiêu IELTS 6.0 trở xuống
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card text-center">
              <Icon size={32} style={{ color: '#3b82f6', margin: '0 auto 0.5rem' }} />
              <div className="font-semibold text-2xl mb-2">{value}</div>
              <div style={{ color: '#6b7280' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map(({ icon: Icon, title, description, path, color }) => (
          <Link key={path} to={path} style={{ textDecoration: 'none' }}>
            <div 
              className="card" 
              style={{ 
                height: '100%', 
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div 
                  style={{
                    background: color,
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    marginRight: '1rem'
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#1f2937' }}>{title}</h3>
              </div>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{description}</p>
              <div className="mt-4">
                <span className="btn btn-primary">Bắt đầu học →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Tips Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>
          💡 Mẹo học tiếng Anh hiệu quả
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#3b82f6' }}>Học đều đặn</h3>
            <p style={{ color: '#6b7280' }}>Dành 15-30 phút mỗi ngày để học từ vựng và ngữ pháp mới.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#10b981' }}>Thực hành nghe</h3>
            <p style={{ color: '#6b7280' }}>Nghe nhạc tiếng Anh, xem phim có phụ đề để cải thiện khả năng nghe.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#f59e0b' }}>Ghi chú từ mới</h3>
            <p style={{ color: '#6b7280' }}>Tạo sổ tay từ vựng để ghi lại những từ mới học được.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#ef4444' }}>Đọc nhiều</h3>
            <p style={{ color: '#6b7280' }}>Đọc truyện ngắn, tin tức đơn giản bằng tiếng Anh mỗi ngày.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
