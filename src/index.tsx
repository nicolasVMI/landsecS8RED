import { createRoot } from 'react-dom/client'

import './style.css'

import App from './App'

const container: HTMLElement = document.getElementById('root')
const root = createRoot(container!)

root.render(<App/>)