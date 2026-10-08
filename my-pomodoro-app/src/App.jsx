import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('focus')
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (seconds !== 0 || !running) return
    setRunning(false)
    if (mode === 'focus') {
      setSessions((prev) => prev + 1)
      setMode('break')
      setSeconds(5 * 60)
    } else {
      setMode('focus')
      setSeconds(25 * 60)
    }
  }, [seconds, running, mode])

  const changeMode = (nextMode) => {
    setMode(nextMode)
    setRunning(false)
    setSeconds(nextMode === 'focus' ? 25 * 60 : 5 * 60)
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    // ⭐ 여기가 핵심! mode에 따라 클래스를 동적으로 바꿉니다.
    <div className={`app-container ${mode === 'focus' ? 'focus-mode' : 'break-mode'}`}>
      <div className="card">
        <p className="label">POMODORO TIMER</p>
        <h1>뽀모도로 타이머</h1>
        
        <div className="mode-buttons">
          <button 
            className={mode === 'focus' ? 'active' : ''} 
            onClick={() => changeMode('focus')}
          >집중</button>
          <button 
            className={mode === 'break' ? 'active' : ''} 
            onClick={() => changeMode('break')}
          >휴식</button>
        </div>

        <h2 className="time">{mm}:{ss}</h2>

        <div className="controls">
          <button 
            className={running ? 'stop-btn' : 'start-btn'} 
            onClick={() => setRunning(!running)}
          >
            {running ? '일시정지' : '시작'}
          </button>
          <button className="reset-btn" onClick={() => { setRunning(false); setSeconds(mode === 'focus' ? 25 * 60 : 5 * 60) }}>
            초기화
          </button>
        </div>

        <p className="session-count">완료한 집중 세션: {sessions}회</p>
      </div>
    </div>
  )
}

export default App
