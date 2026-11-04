import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(`${data.app}: ${data.status}`))
      .catch(() => setStatus('API is not reachable'))
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>CozyCommit</h1>
      <p>{status}</p>
    </main>
  )
}

export default App