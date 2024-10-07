import React, { useEffect, useState } from 'react';

const REACT_URL = 'https://unpkg.com/react@18.2.0/umd/react.production.min.js';
const REACT_DOM_URL = 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js';

const DynamicReactDOMLoader = () => {
    const [ReactDOM, setReactDOM] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const loadReactAndReactDOM = async () => {
            try {
                // Load React
                const reactScript = document.createElement('script');
                reactScript.src = REACT_URL;
                reactScript.async = true;

                // Handle React loading
                reactScript.onload = () => {
                    // Load ReactDOM after React has loaded
                    const reactDOMScript = document.createElement('script');
                    reactDOMScript.src = REACT_DOM_URL;
                    reactDOMScript.async = true;

                    // Handle ReactDOM loading
                    reactDOMScript.onload = () => {
                        setReactDOM(window.ReactDOM);

                    };

                    reactDOMScript.onerror = () => {
                        setLoadError(true);
                    };

                    // Append ReactDOM script
                    document.head.appendChild(reactDOMScript);
                };

                reactScript.onerror = () => {
                    setLoadError(true);
                };

                // Append React script
                document.head.appendChild(reactScript);
            } catch (error) {
                console.error('Error loading React and ReactDOM:', error);
                setLoadError(true);
            }
        };

        loadReactAndReactDOM();
    }, []);

    if (loadError) {
        return <div>Error loading React or ReactDOM.</div>;
    }

    if (!ReactDOM) {
        return <div>Loading React and ReactDOM...</div>;
    }

    // Use ReactDOM to render something
    return (
        <div>
            <h1>Dynamically Loaded ReactDOM</h1>
            <button onClick={() => {
                const dynamicRoot = document.getElementById('dynamic-root');
                console.log("dynamic-root1 ",dynamicRoot)
                if (dynamicRoot) {
                     ReactDOM.createRoot(dynamicRoot).render(<h2>Hello, World!</h2>);
                }
            }}>
                Render Greeting
            </button>
            <div id="dynamic-root"></div>
        </div>
    );
};

export default DynamicReactDOMLoader;
