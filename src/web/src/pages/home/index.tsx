import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import './style.scss'
import MenuBar from '@/components/menu-bar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='editor-wrapp'>
      <MenuBar editor={{} as any} />
      <div className='editor'>
        <div className='md-editor'>1231</div>
        <div className='md-view'></div>
      </div>
    </div>
  )
}

export default App
