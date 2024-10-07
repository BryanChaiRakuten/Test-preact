import './App.css';
import DynamicReactDOMLoader from './component/DynamicReactDOMLoader';
import DynamicPreactDOMLoader from './component/DynamicPreactDOMLoading';
function App() {
  const root = document.getElementById('root');

  return (
    <div>
        <h1>Hello, World!!</h1>
        <p>This is a dynamic ReactDOM loading example.</p>
        {root && <>
          <DynamicReactDOMLoader></DynamicReactDOMLoader>
          <DynamicPreactDOMLoader></DynamicPreactDOMLoader>
        </>}
        <p>=================</p>
    </div>
);
}

export default App;
