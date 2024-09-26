
import React from 'react'
import { createRoot } from 'react-dom/client'
import { defineContentScript } from 'wxt/sandbox'
import App from '../components/App'
import "~/assets/global.css"

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI Reply Extension loaded')
    const root = document.createElement('div')
    root.id = 'linkedin-ai-reply-root'
    document.body.appendChild(root)
    
    createRoot(root).render(React.createElement(App))
  }
})