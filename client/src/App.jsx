import { useEffect, useState } from 'react'
import Room from './components/Room'
import { defaultFurniture } from './data/defaultFurniture'

function App() {
  const [apiStatus, setApiStatus] = useState('checking...')
  const [message, setMessage] = useState('Click the laptop to start practicing.')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setApiStatus(`${data.app}: ${data.status}`))
      .catch(() => setApiStatus('API is not reachable'))
  }, [])

  function handleItemClick(item) {
    setMessage(`You clicked the ${item.label}! The laptop screen comes in Step 3.`)
  }

  return (
    <main className="app">
      <h1>CozyCommit</h1>
      <p className="tagline">Solve problems. Earn coins. Decorate your cozy room.</p>
      <Room furniture={defaultFurniture} onItemClick={handleItemClick} />
      <p className="message">{message}</p>
      <p className="status">{apiStatus}</p>
    </main>
  )
}

export default App