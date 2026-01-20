import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
        },
    },
})

// Use basename for GitHub Pages deployment
const basename = import.meta.env.BASE_URL

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
)
