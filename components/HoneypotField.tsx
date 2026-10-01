'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HONEYPOT_NAME } from '@/lib/spam-guard'

// Hidden from people, screen readers and keyboard users. Bots fill every field.
// See lib/spam-guard.ts for why the name and label are meaningless.
export function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ display: 'none' }}>
      <label htmlFor={HONEYPOT_NAME}>Leave this blank</label>
      <input
        id={HONEYPOT_NAME}
        name={HONEYPOT_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

/** Form state for spam screening. Spread `fields()` into the request body. */
export function useSpamGuard() {
  const openedAt = useRef(0)
  useEffect(() => {
    openedAt.current = Date.now()
  }, [])
  const [hp, setHp] = useState('')
  const fields = useCallback(
    () => ({ [HONEYPOT_NAME]: hp, elapsedMs: Date.now() - openedAt.current }),
    [hp],
  )
  const reset = useCallback(() => {
    openedAt.current = Date.now()
    setHp('')
  }, [])
  return { hp, setHp, fields, reset }
}
