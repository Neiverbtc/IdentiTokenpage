import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify'
import Rewards from './pages/Rewards'
import Documentation from './pages/Documentation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="verify" element={<Verify />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App