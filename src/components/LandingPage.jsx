/* Landing page: the first screen a visitor sees. A hero built from real campus
   photographs, the product name and tagline, Login / Sign Up buttons and the
   dark / light mode toggle. Clicking Login or Sign Up opens the demo auth
   dialog. */

import { useState } from 'react'
import logo from '../assets/logo.svg'
import AuthModal from './AuthModal.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const FEATURES = [
  {
    title: 'Complaints',
    text: 'Raise campus issues and follow them until they are resolved.',
    image: '/images/hero-classroom.jpg',
  },
  {
    title: 'Campus Mart',
    text: 'Buy and sell stationery, snacks, books and college merchandise.',
    image: '/images/product-stationery.jpg',
  },
  {
    title: 'Lost and Found',
    text: 'Post lost belongings or claim an item someone else found.',
    image: '/images/lf-backpack.jpg',
  },
  {
    title: 'Campus Queues',
    text: 'Check live canteen and concession pass queues before you go.',
    image: '/images/hero-canteen.jpg',
  },
]

export default function LandingPage({ theme, onToggleTheme, onEnter }) {
  const [authMode, setAuthMode] = useState(null)

  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__brand">
          <img src={logo} alt="" />
          <span>Campus Sync</span>
        </div>
        <div className="landing__nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setAuthMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setAuthMode('signup')}
          >
            Sign Up
          </button>
        </div>
      </header>

      <section className="landing__hero">
        <div className="landing__hero-content">
          <span className="landing__eyebrow">Student portal</span>
          <h1 className="landing__title">Campus Sync</h1>
          <p className="landing__tagline">Your Campus, Simplified</p>
          <p className="landing__lead">
            Complaints, marketplace, lost and found, and live queues — every
            campus service a student needs, in one clean place.
          </p>
          <div className="landing__cta">
            <button
              type="button"
              className="btn btn--primary landing__cta-btn"
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn--secondary landing__cta-btn"
              onClick={() => setAuthMode('signup')}
            >
              Sign Up
            </button>
            <ThemeToggle
              theme={theme}
              onToggle={onToggleTheme}
              className="landing__theme"
            />
          </div>
        </div>

        <div className="landing__collage" aria-hidden="true">
          <img
            className="landing__photo landing__photo--main"
            src="/images/hero-students.jpg"
            alt=""
          />
          <img
            className="landing__photo landing__photo--a"
            src="/images/hero-classroom.jpg"
            alt=""
          />
          <img
            className="landing__photo landing__photo--b"
            src="/images/hero-canteen.jpg"
            alt=""
          />
        </div>
      </section>

      <section className="landing__features">
        <h2 className="landing__features-title">Everything in one place</h2>
        <div className="landing__feature-grid">
          {FEATURES.map((feature) => (
            <article className="landing__feature" key={feature.title}>
              <img src={feature.image} alt="" loading="lazy" />
              <div className="landing__feature-body">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing__footer">
        <p>
          Campus Sync — front-end demo. Sample data is stored only in this
          browser.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setAuthMode('login')}
        >
          Get started
        </button>
      </footer>

      <AuthModal
        mode={authMode ?? 'login'}
        isOpen={authMode !== null}
        onClose={() => setAuthMode(null)}
        onEnter={onEnter}
      />
    </div>
  )
}
