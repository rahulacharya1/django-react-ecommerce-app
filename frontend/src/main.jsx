import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { useEffect } from 'react'
import API from './services/api'

function Root() {
    useEffect(() => {
        API.get('csrf/').catch(() => {});
    }, []);

    return <App />;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Root />
    </StrictMode>
)
