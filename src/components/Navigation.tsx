import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, FileText, Headphones, Book } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Navigation() {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  
  const navItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/vocabulary', label: 'Từ vựng', icon: BookOpen },
    { path: '/grammar', label: 'Ngữ pháp', icon: FileText },
    { path: '/listening', label: 'Nghe', icon: Headphones },
    { path: '/reading', label: 'Đọc', icon: Book },
  ]

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <nav className="nav">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/" className="text-2xl font-bold" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              🇻🇳 English Learning
            </Link>
          </div>
          <ul className="nav-links">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Icon size={18} />
                  {!isMobile && label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
