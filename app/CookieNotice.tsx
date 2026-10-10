'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import styles from './CookieNotice.module.css'

// An acknowledgement only; this does not grant consent to optional tracking.
const STORAGE_KEY = 'stackd-studio-cookie-notice-v1'
const MAX_AGE = 180 * 24 * 60 * 60 * 1000

function readAcknowledgement() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    return saved?.version === 1 && typeof saved.expiresAt === 'number' && saved.expiresAt > Date.now()
      ? 'acknowledged'
      : 'unseen'
  } catch {
    return 'unseen'
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

export default function CookieNotice() {
  const saved = useSyncExternalStore(subscribe, readAcknowledgement, () => null)
  const [dismissed, setDismissed] = useState(false)
  const [reopened, setReopened] = useState(false)

  const reopenRef = useRef<HTMLButtonElement>(null)
  const acknowledgeRef = useRef<HTMLButtonElement>(null)

  function acknowledge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        expiresAt: Date.now() + MAX_AGE,
      }))
    } catch {
      // Still dismiss for this visit when browser storage is unavailable.
    }
    setDismissed(true)
    setReopened(false)
    requestAnimationFrame(() => reopenRef.current?.focus({ preventScroll: true }))
  }

  if (saved === null) return null

  if (!reopened && (dismissed || saved === 'acknowledged')) {
    return (
      <button type="button" ref={reopenRef} className={styles.reopen} onClick={() => {
        setReopened(true)
        requestAnimationFrame(() => acknowledgeRef.current?.focus({ preventScroll: true }))
      }}>
        Cookie notice
      </button>
    )
  }

  return (
    <section className={styles.notice} aria-label="Cookies and privacy">
      <strong className={styles.title}>Cookies &amp; privacy</strong>
      <p className={styles.copy}>Your cart and site preferences use browser storage. We also save your acknowledgement of this notice on this device.</p>
      <details className={styles.details}>
        <summary>About this notice</summary>
        <p>
          “Got it” remembers this notice for 180 days. It does not opt you into
          advertising or analytics. You can reopen this notice using “Cookie notice”
          and clear stored information in your browser settings.
        </p>
      </details>
      <div className={styles.actions}>
        <a href="/privacy">Privacy policy</a>
        <button ref={acknowledgeRef} type="button" onClick={acknowledge}>Got it</button>
      </div>
    </section>
  )
}

