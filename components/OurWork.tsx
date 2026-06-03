'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── SVG Browser Mockups (exported for use on the Work page too) ─────────────

export function MockupDanceStudio() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="80" height="220" fill="#1a1a1a"/>
      {[30, 58, 86, 114, 142].map((y, i) => (
        <rect key={i} x="12" y={y} width={i === 0 ? 56 : 44} height="10" rx="3" fill={i === 0 ? '#FFD84D' : '#333'}/>
      ))}
      <rect x="12" y="10" width="56" height="14" rx="3" fill="#FFD84D" opacity="0.15"/>
      <rect x="16" y="13" width="30" height="8" rx="2" fill="#FFD84D"/>
      <rect x="96" y="14" width="120" height="14" rx="3" fill="#2a2a2a"/>
      <rect x="300" y="12" width="68" height="18" rx="6" fill="#FFD84D"/>
      {['M','T','W','T','F','S'].map((_, i) => (
        <rect key={i} x={96 + i * 50} y="40" width="44" height="12" rx="2" fill="#222"/>
      ))}
      <rect x="96" y="58" width="44" height="32" rx="4" fill="#FFD84D" opacity="0.9"/>
      <rect x="96" y="58" width="44" height="8" rx="4" fill="#FFD84D"/>
      <rect x="96" y="66" width="44" height="24" rx="0" fill="#FFD84D" opacity="0.2"/>
      <rect x="146" y="72" width="44" height="18" rx="4" fill="#1A4A7A" opacity="0.8"/>
      <rect x="196" y="58" width="44" height="44" rx="4" fill="#FFD84D" opacity="0.5"/>
      <rect x="246" y="64" width="44" height="26" rx="4" fill="#1A4A7A" opacity="0.6"/>
      <rect x="296" y="58" width="44" height="18" rx="4" fill="#FFD84D" opacity="0.3"/>
      <rect x="96" y="104" width="44" height="22" rx="4" fill="#1A4A7A" opacity="0.5"/>
      <rect x="146" y="104" width="44" height="38" rx="4" fill="#FFD84D" opacity="0.7"/>
      <rect x="196" y="110" width="44" height="18" rx="4" fill="#333"/>
      <rect x="246" y="104" width="44" height="30" rx="4" fill="#FFD84D" opacity="0.4"/>
      <rect x="296" y="104" width="44" height="44" rx="4" fill="#1A4A7A" opacity="0.4"/>
      <rect x="96" y="165" width="88" height="42" rx="6" fill="#1a1a1a"/>
      <rect x="108" y="173" width="40" height="8" rx="2" fill="#FFD84D" opacity="0.6"/>
      <rect x="108" y="186" width="60" height="6" rx="2" fill="#333"/>
      <rect x="196" y="165" width="88" height="42" rx="6" fill="#1a1a1a"/>
      <rect x="208" y="173" width="40" height="8" rx="2" fill="#FFD84D" opacity="0.6"/>
      <rect x="208" y="186" width="60" height="6" rx="2" fill="#333"/>
      <rect x="296" y="165" width="88" height="42" rx="6" fill="#1a1a1a"/>
      <rect x="308" y="173" width="40" height="8" rx="2" fill="#FFD84D" opacity="0.6"/>
      <rect x="308" y="186" width="60" height="6" rx="2" fill="#333"/>
    </svg>
  )
}

export function MockupIntakeAgent() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect x="0" y="0" width="160" height="220" fill="#141414"/>
      <rect x="8" y="10" width="100" height="10" rx="3" fill="#333"/>
      {[32, 64, 96, 128, 160, 192].map((y, i) => (
        <g key={i}>
          <rect x="8" y={y} width="28" height="28" rx="14" fill={i % 2 === 0 ? '#FFD84D' : '#1A4A7A'} opacity="0.8"/>
          <rect x="44" y={y + 4} width="80" height="8" rx="2" fill="#2a2a2a"/>
          <rect x="44" y={y + 16} width="56" height="6" rx="2" fill="#222"/>
        </g>
      ))}
      <rect x="4" y="32" width="3" height="28" rx="2" fill="#FFD84D"/>
      <rect x="160" y="0" width="240" height="220" fill="#0f0f0f"/>
      <rect x="168" y="10" width="28" height="28" rx="14" fill="#FFD84D" opacity="0.8"/>
      <rect x="204" y="14" width="80" height="8" rx="2" fill="#2a2a2a"/>
      <rect x="204" y="26" width="50" height="6" rx="2" fill="#222"/>
      <rect x="168" y="52" width="160" height="36" rx="8" fill="#1a1a1a"/>
      <rect x="176" y="60" width="120" height="6" rx="2" fill="#444"/>
      <rect x="176" y="72" width="90" height="6" rx="2" fill="#333"/>
      <rect x="248" y="100" width="120" height="24" rx="8" fill="#FFD84D" opacity="0.15"/>
      <rect x="256" y="108" width="90" height="6" rx="2" fill="#FFD84D" opacity="0.6"/>
      <rect x="168" y="136" width="180" height="48" rx="8" fill="#1a1a1a"/>
      <rect x="176" y="144" width="140" height="6" rx="2" fill="#444"/>
      <rect x="176" y="156" width="110" height="6" rx="2" fill="#333"/>
      <rect x="176" y="168" width="80" height="6" rx="2" fill="#333"/>
      <rect x="168" y="196" width="60" height="16" rx="8" fill="#1a1a1a"/>
      <circle cx="182" cy="204" r="3" fill="#555"/>
      <circle cx="194" cy="204" r="3" fill="#666"/>
      <circle cx="206" cy="204" r="3" fill="#444"/>
    </svg>
  )
}

export function MockupFieldOS() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="36" fill="#141414"/>
      <rect x="12" y="11" width="60" height="14" rx="3" fill="#FFD84D" opacity="0.2"/>
      <rect x="16" y="14" width="36" height="8" rx="2" fill="#FFD84D"/>
      {['96','148','200','252'].map((x, i) => (
        <rect key={i} x={Number(x)} y="14" width="36" height="8" rx="2" fill={i === 0 ? '#2a2a2a' : '#1e1e1e'}/>
      ))}
      <rect x="340" y="10" width="48" height="16" rx="6" fill="#FFD84D"/>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={8 + i * 97} y="44" width="90" height="52" rx="6" fill="#141414"/>
          <rect x={16 + i * 97} y="52" width={40 + i * 4} height="6" rx="2" fill="#333"/>
          <rect x={16 + i * 97} y="64" width="50" height="14" rx="2" fill={i === 0 ? '#FFD84D' : i === 1 ? '#1A4A7A' : i === 2 ? '#22c55e' : '#f97316'} opacity={i === 0 ? 1 : 0.7}/>
          <rect x={16 + i * 97} y="84" width="60" height="6" rx="2" fill="#222"/>
        </g>
      ))}
      <rect x="8" y="104" width="250" height="108" rx="6" fill="#141414"/>
      <rect x="16" y="112" width="80" height="8" rx="2" fill="#2a2a2a"/>
      {[{ h: 40, x: 20 },{ h: 60, x: 50 },{ h: 30, x: 80 },{ h: 70, x: 110 },{ h: 50, x: 140 },{ h: 80, x: 170 },{ h: 45, x: 200 }].map((bar, i) => (
        <rect key={i} x={16 + bar.x} y={196 - bar.h} width="22" height={bar.h} rx="3"
          fill={i === 5 ? '#FFD84D' : '#1A4A7A'} opacity={i === 5 ? 0.9 : 0.4}/>
      ))}
      <line x1="16" y1="196" x2="250" y2="196" stroke="#333" strokeWidth="1"/>
      <rect x="266" y="104" width="126" height="108" rx="6" fill="#141414"/>
      <rect x="274" y="112" width="60" height="8" rx="2" fill="#2a2a2a"/>
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="274" y={128 + i * 18} width="8" height="8" rx="2" fill={i < 3 ? '#FFD84D' : '#333'} opacity={i < 3 ? 0.8 : 1}/>
          <rect x="288" y={130 + i * 18} width="80" height="6" rx="2" fill="#2a2a2a"/>
          <rect x="356" y={130 + i * 18} width="24" height="6" rx="2" fill={i < 3 ? '#22c55e' : '#333'} opacity="0.6"/>
        </g>
      ))}
    </svg>
  )
}

export function MockupClientPortal() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="40" fill="#141414"/>
      <rect x="16" y="13" width="40" height="14" rx="3" fill="#FFD84D"/>
      <rect x="300" y="12" width="32" height="16" rx="8" fill="#1a1a1a"/>
      <rect x="340" y="12" width="44" height="16" rx="8" fill="#FFD84D"/>
      <rect x="16" y="52" width="240" height="36" rx="8" fill="#1a1a1a"/>
      <rect x="28" y="62" width="80" height="8" rx="3" fill="#2a2a2a"/>
      <rect x="28" y="74" width="140" height="6" rx="2" fill="#222"/>
      <rect x="270" y="52" width="114" height="36" rx="8" fill="#1a1a1a"/>
      <rect x="280" y="62" width="50" height="6" rx="2" fill="#333"/>
      <rect x="280" y="72" width="90" height="6" rx="3" fill="#222"/>
      <rect x="280" y="72" width="54" height="6" rx="3" fill="#FFD84D" opacity="0.8"/>
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 126} y="100" width="118" height="80" rx="8" fill="#141414"/>
          <rect x={26 + i * 126} y="112" width="60" height="8" rx="3" fill="#2a2a2a"/>
          <rect x={26 + i * 126} y="126" width="90" height="5" rx="2" fill="#1e1e1e"/>
          <rect x={26 + i * 126} y="135" width="70" height="5" rx="2" fill="#1e1e1e"/>
          <rect x={26 + i * 126} y="148" width="70" height="20" rx="6" fill={i === 0 ? '#FFD84D' : '#1a1a1a'} opacity={i === 0 ? 1 : 0.8}/>
          <rect x={34 + i * 126} y="153" width="40" height="8" rx="2" fill={i === 0 ? '#0f0f0f' : '#333'}/>
        </g>
      ))}
      <rect x="268" y="100" width="118" height="80" rx="8" fill="#141414" opacity="0.5"/>
      <rect x="281" y="132" width="14" height="12" rx="3" fill="#333"/>
      <rect x="286" y="128" width="4" height="6" rx="2" fill="#333"/>
    </svg>
  )
}

export function MockupBizDashboard() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="64" height="220" fill="#141414"/>
      {[16, 44, 72, 100, 128, 156, 184].map((y, i) => (
        <rect key={i} x="12" y={y} width="40" height="20" rx="4" fill={i === 0 ? '#FFD84D' : '#1e1e1e'}/>
      ))}
      <rect x="64" y="0" width="336" height="32" fill="#1a1a1a"/>
      <rect x="76" y="10" width="100" height="12" rx="3" fill="#2a2a2a"/>
      <rect x="344" y="8" width="44" height="16" rx="8" fill="#FFD84D"/>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={72 + i * 82} y="40" width="76" height="44" rx="6" fill="#141414"/>
          <rect x={80 + i * 82} y="48" width="44" height="6" rx="2" fill="#2a2a2a"/>
          <rect x={80 + i * 82} y="58" width="36" height="12" rx="2"
            fill={i === 0 ? '#FFD84D' : i === 1 ? '#22c55e' : i === 2 ? '#1A4A7A' : '#F97316'}
            opacity="0.85"/>
          <rect x={80 + i * 82} y="74" width="52" height="5" rx="2" fill="#222"/>
        </g>
      ))}
      <rect x="72" y="92" width="196" height="120" rx="6" fill="#141414"/>
      <rect x="82" y="100" width="70" height="8" rx="3" fill="#2a2a2a"/>
      <polyline points="82,200 102,185 122,190 142,170 162,175 182,155 202,160 222,140 242,148 252,200"
        fill="#FFD84D" fillOpacity="0.12" stroke="#FFD84D" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="82" y1="200" x2="260" y2="200" stroke="#222" strokeWidth="1"/>
      <rect x="276" y="92" width="116" height="120" rx="6" fill="#141414"/>
      <rect x="284" y="100" width="60" height="8" rx="3" fill="#2a2a2a"/>
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="284" y={116 + i * 19} width="8" height="8" rx="2"
            fill={i < 3 ? '#22c55e' : '#333'} opacity={i < 3 ? 0.8 : 1}/>
          <rect x="298" y={118 + i * 19} width="80" height="5" rx="2" fill={i < 3 ? '#2a2a2a' : '#1e1e1e'}/>
        </g>
      ))}
    </svg>
  )
}

export function MockupBusinessBrain() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="44" fill="#141414"/>
      <rect x="16" y="14" width="100" height="16" rx="4" fill="#FFD84D" opacity="0.15"/>
      <rect x="20" y="17" width="56" height="10" rx="3" fill="#FFD84D"/>
      <rect x="310" y="12" width="70" height="20" rx="8" fill="#1a1a1a"/>
      <rect x="318" y="17" width="54" height="10" rx="3" fill="#333"/>
      <rect x="16" y="54" width="368" height="32" rx="8" fill="#1a1a1a"/>
      <rect x="28" y="64" width="180" height="12" rx="3" fill="#2a2a2a"/>
      <rect x="360" y="60" width="16" height="20" rx="4" fill="#FFD84D"/>
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 126} y="98" width="118" height="56" rx="8" fill="#141414"/>
          <rect x={24 + i * 126} y="108" width="16" height="16" rx="4"
            fill={i === 0 ? '#FFD84D' : i === 1 ? '#1A4A7A' : '#F97316'} opacity="0.8"/>
          <rect x={46 + i * 126} y="109" width="60" height="7" rx="2" fill="#2a2a2a"/>
          <rect x={24 + i * 126} y="130" width="96" height="5" rx="2" fill="#1e1e1e"/>
          <rect x={24 + i * 126} y="140" width="72" height="5" rx="2" fill="#1e1e1e"/>
        </g>
      ))}
      <rect x="16" y="164" width="248" height="46" rx="8" fill="#1a1a1a"/>
      <rect x="26" y="174" width="120" height="6" rx="2" fill="#333"/>
      <rect x="26" y="184" width="200" height="6" rx="2" fill="#2a2a2a"/>
      <rect x="26" y="194" width="160" height="6" rx="2" fill="#222"/>
      <rect x="274" y="164" width="110" height="46" rx="8" fill="#FFD84D" opacity="0.1"/>
      <rect x="282" y="176" width="50" height="8" rx="2" fill="#FFD84D" opacity="0.5"/>
      <rect x="282" y="190" width="30" height="14" rx="3" fill="#FFD84D" opacity="0.8"/>
    </svg>
  )
}

export function MockupSalon() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="40" fill="#141414"/>
      <rect x="16" y="12" width="48" height="16" rx="3" fill="#FFD84D"/>
      <rect x="280" y="12" width="50" height="16" rx="6" fill="#1a1a1a"/>
      <rect x="338" y="12" width="50" height="16" rx="6" fill="#FFD84D"/>
      {[0,1,2,3,4,5,6].map((i) => (
        <g key={i}>
          <rect x={8 + i * 56} y="48" width="50" height="36" rx="6" fill={i === 2 ? '#FFD84D' : '#141414'}/>
          <rect x={20 + i * 56} y="55" width="26" height="6" rx="2" fill={i === 2 ? '#0f0f0f' : '#2a2a2a'}/>
          <rect x={24 + i * 56} y="65" width="16" height="10" rx="2" fill={i === 2 ? '#0f0f0f' : '#333'} opacity={i === 2 ? 1 : 0.5}/>
        </g>
      ))}
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="8" y={94 + i * 25} width="36" height="18" rx="2" fill="#1a1a1a"/>
          <rect x="12" y={99 + i * 25} width="24" height="8" rx="2" fill="#333"/>
          <rect x="52" y={94 + i * 25} width="160" height="18" rx="6"
            fill={i === 0 ? '#FFD84D' : i === 2 ? '#1A4A7A' : '#141414'}
            opacity={i === 0 || i === 2 ? 0.85 : 1}/>
          {(i === 0 || i === 2) && (
            <rect x="62" y={99 + i * 25} width="90" height="8" rx="2"
              fill={i === 0 ? '#0f0f0f' : '#93C5FD'} opacity="0.8"/>
          )}
          <rect x="220" y={94 + i * 25} width="80" height="18" rx="6" fill="#141414"/>
          <rect x="230" y={99 + i * 25} width="50" height="8" rx="2" fill="#2a2a2a"/>
          <rect x="308" y={94 + i * 25} width="84" height="18" rx="6" fill="#141414"/>
        </g>
      ))}
    </svg>
  )
}

export function MockupGym() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="38" fill="#141414"/>
      <rect x="14" y="12" width="44" height="14" rx="3" fill="#FFD84D"/>
      <rect x="200" y="12" width="120" height="14" rx="3" fill="#1e1e1e"/>
      <rect x="336" y="10" width="52" height="18" rx="8" fill="#FFD84D"/>
      <rect x="14" y="46" width="172" height="80" rx="10" fill="#FFD84D"/>
      <rect x="24" y="56" width="60" height="8" rx="2" fill="#0f0f0f" opacity="0.5"/>
      <rect x="24" y="70" width="100" height="16" rx="3" fill="#0f0f0f" opacity="0.7"/>
      <rect x="24" y="92" width="70" height="8" rx="2" fill="#0f0f0f" opacity="0.4"/>
      <rect x="24" y="104" width="50" height="10" rx="2" fill="#0f0f0f" opacity="0.6"/>
      <rect x="154" y="56" width="20" height="20" rx="10" fill="#0f0f0f" opacity="0.15"/>
      <rect x="196" y="46" width="190" height="80" rx="10" fill="#141414"/>
      <rect x="206" y="56" width="80" height="8" rx="3" fill="#2a2a2a"/>
      {[0,1,2,3,4,5,6].map((i) => (
        <rect key={i} x={206 + i * 24} y="72" width="18" height={20 + i * 6} rx="3"
          fill={i < 5 ? '#FFD84D' : '#1e1e1e'} opacity={i < 5 ? 0.7 + i * 0.05 : 1}/>
      ))}
      <line x1="206" y1="118" x2="376" y2="118" stroke="#222" strokeWidth="1"/>
      <rect x="14" y="136" width="372" height="76" rx="10" fill="#141414"/>
      <rect x="24" y="146" width="80" height="8" rx="3" fill="#2a2a2a"/>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={24 + i * 90} y="162" width="82" height="40" rx="6"
            fill={i === 1 ? '#FFD84D' : '#1a1a1a'} opacity={i === 1 ? 0.9 : 1}/>
          <rect x={32 + i * 90} y="170" width="50" height="6" rx="2"
            fill={i === 1 ? '#0f0f0f' : '#2a2a2a'}/>
          <rect x={32 + i * 90} y="180" width="36" height="6" rx="2"
            fill={i === 1 ? '#0f0f0f' : '#222'} opacity="0.7"/>
          <rect x={32 + i * 90} y="190" width="44" height="6" rx="2"
            fill={i === 1 ? '#0f0f0f' : '#1e1e1e'} opacity="0.5"/>
        </g>
      ))}
    </svg>
  )
}

export function MockupCoaching() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="72" height="220" fill="#141414"/>
      <rect x="10" y="14" width="52" height="12" rx="3" fill="#FFD84D" opacity="0.2"/>
      <rect x="14" y="16" width="32" height="8" rx="2" fill="#FFD84D"/>
      {[40, 66, 92, 118, 144, 170].map((y, i) => (
        <rect key={i} x="10" y={y} width={i === 0 ? 52 : 40} height="18" rx="4"
          fill={i === 0 ? '#FFD84D' : '#1e1e1e'}/>
      ))}
      <rect x="82" y="10" width="200" height="14" rx="4" fill="#2a2a2a"/>
      <rect x="82" y="30" width="300" height="8" rx="3" fill="#1e1e1e"/>
      <rect x="82" y="30" width="190" height="8" rx="3" fill="#FFD84D" opacity="0.5"/>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x="82" y={50 + i * 42} width="306" height="36" rx="8" fill="#141414"/>
          <rect x="92" y={58 + i * 42} width="20" height="20" rx="6"
            fill={i < 2 ? '#FFD84D' : '#1e1e1e'} opacity={i < 2 ? 0.85 : 1}/>
          {i < 2 && (
            <path d={`M${97} ${68 + i * 42} l4 4 6 -6`} stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          <rect x="120" y={60 + i * 42} width="120" height="7" rx="2" fill="#2a2a2a"/>
          <rect x="120" y={71 + i * 42} width="80" height="5" rx="2" fill="#1e1e1e"/>
          <rect x="330" y={58 + i * 42} width="48" height="20" rx="6"
            fill={i < 2 ? '#22c55e' : i === 2 ? '#FFD84D' : '#1e1e1e'}
            opacity={i < 2 ? 0.7 : 0.9}/>
          <rect x="340" y={63 + i * 42} width="28" height="10" rx="2"
            fill={i < 2 ? '#0f0f0f' : '#333'} opacity="0.6"/>
        </g>
      ))}
      <rect x="82" y="180" width="306" height="30" rx="8" fill="#FFD84D" opacity="0.1"/>
      <rect x="92" y="190" width="100" height="10" rx="3" fill="#FFD84D" opacity="0.4"/>
      <rect x="300" y="186" width="80" height="18" rx="6" fill="#FFD84D" opacity="0.8"/>
    </svg>
  )
}

export function MockupEcommerce() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="36" fill="#141414"/>
      <rect x="14" y="11" width="48" height="14" rx="3" fill="#FFD84D"/>
      <rect x="120" y="13" width="160" height="10" rx="3" fill="#1e1e1e"/>
      <rect x="340" y="10" width="22" height="16" rx="4" fill="#1a1a1a"/>
      <rect x="370" y="10" width="18" height="16" rx="4" fill="#1a1a1a"/>
      <circle cx="381" cy="10" r="5" fill="#FFD84D"/>
      <rect x="376" y="8" width="10" height="6" rx="2" fill="#0f0f0f"/>
      {[0,1,2,3,4,5].map((i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        return (
          <g key={i}>
            <rect x={8 + col * 128} y={44 + row * 88} width="120" height="80" rx="8" fill="#141414"/>
            <rect x={8 + col * 128} y={44 + row * 88} width="120" height="46" rx="8" fill="#1a1a1a"/>
            <rect x={18 + col * 128} y={54 + row * 88} width="32" height="28" rx="4"
              fill={i % 3 === 0 ? '#FFD84D' : i % 3 === 1 ? '#1A4A7A' : '#F97316'} opacity="0.3"/>
            <rect x={10 + col * 128} y={96 + row * 88} width="70" height="6" rx="2" fill="#2a2a2a"/>
            <rect x={10 + col * 128} y={106 + row * 88} width="40" height="8" rx="2" fill="#FFD84D" opacity="0.7"/>
            <rect x={88 + col * 128} y={104 + row * 88} width="32" height="14" rx="5" fill="#FFD84D"/>
          </g>
        )
      })}
    </svg>
  )
}

export function MockupSports() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <rect width="400" height="220" fill="#0f0f0f"/>
      <rect width="400" height="40" fill="#141414"/>
      <rect x="14" y="12" width="52" height="16" rx="3" fill="#FFD84D"/>
      <rect x="120" y="14" width="80" height="12" rx="3" fill="#1e1e1e"/>
      <rect x="210" y="14" width="80" height="12" rx="3" fill="#1e1e1e"/>
      <rect x="316" y="10" width="70" height="20" rx="8" fill="#FFD84D"/>
      <rect x="14" y="48" width="372" height="32" rx="8" fill="#1A4A7A" opacity="0.4"/>
      <rect x="24" y="58" width="100" height="8" rx="3" fill="#93C5FD" opacity="0.6"/>
      <rect x="320" y="54" width="56" height="20" rx="6" fill="#FFD84D"/>
      <rect x="14" y="90" width="180" height="122" rx="8" fill="#141414"/>
      <rect x="22" y="100" width="70" height="8" rx="3" fill="#2a2a2a"/>
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="22" y={116 + i * 19} width="16" height="16" rx="8"
            fill={['#FFD84D','#1A4A7A','#F97316','#22c55e','#FFD84D'][i]} opacity="0.75"/>
          <rect x="44" y={119 + i * 19} width="80" height="6" rx="2" fill="#2a2a2a"/>
          <rect x="44" y={128 + i * 19} width="50" height="4" rx="2" fill="#1e1e1e"/>
          <rect x="156" y={119 + i * 19} width="28" height="10" rx="4"
            fill={i < 4 ? '#22c55e' : '#333'} opacity={i < 4 ? 0.6 : 1}/>
        </g>
      ))}
      <rect x="202" y="90" width="184" height="122" rx="8" fill="#141414"/>
      <rect x="212" y="100" width="70" height="8" rx="3" fill="#2a2a2a"/>
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x="212" y={116 + i * 24} width="164" height="18" rx="5"
            fill={i === 0 ? '#FFD84D' : '#1a1a1a'} opacity={i === 0 ? 0.15 : 1}/>
          <rect x="220" y={121 + i * 24} width="60" height="6" rx="2"
            fill={i === 0 ? '#FFD84D' : '#2a2a2a'} opacity={i === 0 ? 0.8 : 1}/>
          <rect x="340" y={121 + i * 24} width="28" height="6" rx="2" fill="#333"/>
        </g>
      ))}
    </svg>
  )
}

// ─── Home page: 6 featured projects ─────────────────────────────────────────

const homeProjects = [
  {
    tags: ['Automation', 'Intake', 'Next.js'],
    title: 'Client Intake Agent',
    description: 'An intake system that qualifies leads, matches them to the right service tier, drafts proposals, and books discovery calls — running 24/7 without you touching it.',
    url: 'intake.stackd.app',
    imageUrl: '/work/intake-agent.jpg',
    objectPosition: 'center',
  },
  {
    tags: ['Knowledge Base', 'Search', 'Next.js'],
    title: 'Business Brain App',
    description: 'A knowledge app that answers staff questions straight from your own SOPs, reports, and documents — no more digging through folders.',
    url: 'brain.stackd.app',
    imageUrl: '/work/business-brain.jpg',
    objectPosition: 'center',
  },
  {
    tags: ['Reporting', 'Automation', 'Next.js'],
    title: 'Client Audit Tool',
    description: 'An audit platform that surfaces gaps, scores business health, and generates an action plan in minutes — clarity owners can act on the same day.',
    url: 'audit.stackd.app',
    imageUrl: '/work/client-audit-tool.jpg',
    objectPosition: 'center',
  },
  {
    tags: ['Booking', 'Payments', 'Supabase'],
    title: 'Salon Booking System',
    description: 'Online booking with staff scheduling, automated confirmations, rebooking reminders, and a client history dashboard — all branded to the salon.',
    url: 'book.salon.app/schedule',
    imageUrl: '/work/salon-booking.jpg',
    objectPosition: 'center',
  },
  {
    tags: ['LMS', 'Stripe', 'Progress Tracking'],
    title: 'Coaching Program Portal',
    description: 'A structured coaching portal with gated curriculum, session scheduling, progress milestones, and a private client dashboard for accountability.',
    url: 'coach.portal.app/program',
    imageUrl: '/work/coaching-portal.jpg',
    objectPosition: 'center',
  },
  {
    tags: ['SaaS', 'Multi-tenant', 'Next.js'],
    title: 'Operations Platform',
    description: 'A modular, multi-tenant SaaS platform built for small business owners and multi-venture entrepreneurs. Universal core with industry-specific modules.',
    url: 'ops.platform/dashboard',
    imageUrl: '/work/operations-platform.jpg',
    objectPosition: 'center',
  },
]

export default function OurWork() {
  return (
    <section
      id="our-work"
      className="py-24 bg-[#F6F4EF]"
      aria-labelledby="our-work-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
              Our Work
            </p>
            <h2
              id="our-work-heading"
              className="text-[clamp(28px,4.5vw,52px)] text-[#0C0C0C] leading-[1.1]"
            >
              Real systems. Real clients.
              <br className="hidden sm:block" /> Built to run themselves.
            </h2>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeProjects.map((project, i) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#0C0C0C] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
              >
                <div className="relative">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <div className="ml-3 flex-1 bg-[#0f0f0f] rounded-md px-3 py-1 flex items-center gap-2">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" stroke="#444" strokeWidth="1"/>
                        <path d="M3 5h4M5 3v4" stroke="#444" strokeWidth="1"/>
                      </svg>
                      <span className="text-[#555] text-[10px] font-mono truncate">{project.url}</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: project.objectPosition }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none" aria-hidden="true"/>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[#FFD84D] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#FFD84D]/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white text-xl leading-tight">{project.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed flex-1">{project.description}</p>

                  <Link
                    href="/contact"
                    className="text-[#FFD84D] font-semibold text-sm hover:text-white transition-colors mt-auto inline-flex items-center gap-2 group-hover:gap-3 duration-200"
                    aria-label={`Start a project like ${project.title}`}
                  >
                    Start My Project
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
