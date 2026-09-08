import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useNavigation } from '../contexts/NavigationContext'
import './PageNavigation.css'

const PageNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { canGoBack, canGoForward } = useNavigation()

  if (location.pathname === '/') return null

  const handlePrevious = () => {
    if (canGoBack) {
      navigate(-1)
    }
  }

  const handleNext = () => {
    if (canGoForward) {
      navigate(1)
    }
  }

  return (
    <section className="page-nav-section" aria-label="Page navigation">
      <div className="container page-nav-container">
        <div className="page-nav-wrapper">
          <button
            type="button"
            className="page-nav-btn page-nav-prev"
            onClick={handlePrevious}
            disabled={!canGoBack}
            aria-label="Previous page"
          >
            <FiArrowLeft className="page-nav-icon" />
            <span className="page-nav-label">Previous</span>
          </button>

          <button
            type="button"
            className="page-nav-btn page-nav-next"
            onClick={handleNext}
            disabled={!canGoForward}
            aria-label="Next page"
          >
            <span className="page-nav-label">Next</span>
            <FiArrowRight className="page-nav-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PageNavigation
