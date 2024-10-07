import React, { useEffect, useState } from 'react';

const PREACT_URL = 'https://unpkg.com/preact@10.24.2/dist/preact.umd.js';
const PREACT_HOOKS_URL = 'https://unpkg.com/preact@10.24.2/hooks/dist/hooks.umd.js';
const PREACT_COMPAT_URL = 'https://unpkg.com/preact@10.15.1/compat/dist/compat.umd.js';

const DynamicPreactDOMLoading = () => {
    const [Preact, setPreact] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const loadPreactAndCompat = async () => {
            try {
                // Load Preact
                const preactScript = document.createElement('script');
                preactScript.src = PREACT_URL;
                preactScript.async = true;

                preactScript.onload = () => {
                    // Load Preact Hooks
                    const hooksScript = document.createElement('script');
                    hooksScript.src = PREACT_HOOKS_URL;
                    hooksScript.async = true;

                    hooksScript.onload = () => {
                        // Load Preact Compatibility Layer
                        const compatScript = document.createElement('script');
                        compatScript.src = PREACT_COMPAT_URL;
                        compatScript.async = true;

                        compatScript.onload = () => {
                            console.log("Preact and Compat loaded");
                            setPreact(window.preact);
                        };

                        compatScript.onerror = () => {
                            console.error('Error loading Preact Compat.');
                            setLoadError(true);
                        };

                        document.head.appendChild(compatScript);
                    };

                    hooksScript.onerror = () => {
                        console.error('Error loading Preact Hooks.');
                        setLoadError(true);
                    };

                    document.head.appendChild(hooksScript);
                };

                preactScript.onerror = () => {
                    console.error('Error loading Preact.');
                    setLoadError(true);
                };

                document.head.appendChild(preactScript);
            } catch (error) {
                console.error('Error loading Preact:', error);
                setLoadError(true);
            }
        };

        loadPreactAndCompat();
    }, []);

    if (loadError) {
        return <div>Error loading Preact.</div>;
    }

    if (!Preact) {
        return <div>Loading Preact...</div>;
    }

    const renderGreeting = () => {
        const dynamicRoot = document.getElementById('dynamic-root2');
        console.log("dynamic-root2 ",dynamicRoot)
        if (dynamicRoot) {
            //If you’re not using a transpiler like Babel, cannot directly use JSX syntax. 
            //Instead, you need to use Preact's h function to create elements:
            //to try out with transpiler with bible
            window.preact.render(window.preact.h("h2", null, "Hello, Preact World!"), dynamicRoot);

        } else {
            console.error("Dynamic root not found");
        }
    };

    return (
        <div>
            <h1>Dynamically Loaded Preact</h1>
            <button onClick={renderGreeting}>
                Render Greeting
            </button>
            <div id="dynamic-root2"></div>
        </div>
    );
};

export default DynamicPreactDOMLoading;
