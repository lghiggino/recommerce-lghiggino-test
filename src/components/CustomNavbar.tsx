import { useState } from 'react'
import styles from './CustomNavbar.module.scss'

// Simple SVG icons
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TriangleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 3L34.5 31.5H1.5L18 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="16" y="26" fontSize="16" fontWeight="bold">
      R
    </text>
  </svg>
)

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CustomNavbar = () => {
  const [cartItems, setCartItems] = useState(2)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <div className={styles.triangleLogo}>
            <TriangleIcon />
          </div>
        </div>

        <div className={styles.brandSection}>
          <span className={styles.brandText}>RE</span>
          <span className={styles.separator}>-</span>
          <span className={styles.brandText}>COMMERCE</span>
        </div>

        <div className={styles.mobileControls}>
          <a href="/cart" className={styles.mobileCartLink}>
            <span className={styles.cartIcon}>
              <CartIcon />
            </span>
            {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
          </a>
          <button
            className={styles.menuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav
          className={`${styles.navigation} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink} onClick={closeMobileMenu}>
                HOME
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/purpose" className={styles.navLink} onClick={closeMobileMenu}>
                OUR PURPOSE
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/suppliers" className={styles.navLink} onClick={closeMobileMenu}>
                OUR SUPPLIERS
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/media" className={styles.navLink} onClick={closeMobileMenu}>
                MEDIA
              </a>
            </li>
            <li className={styles.desktopCartItem}>
              <a href="/cart" className={styles.cartLink}>
                <span className={styles.cartIcon}>
                  <CartIcon />
                </span>
                {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}
    </header>
  )
}

export default CustomNavbar
