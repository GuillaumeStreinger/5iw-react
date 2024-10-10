import React, { useContext, Suspense, lazy, useRef, useState } from 'react';
import { DarkThemeProvider, DarkThemeContext } from './DarkThemeContext';
import ChildComponent from './ChildComponent';
import { AuthProvider, AuthContext } from './AuthContext';
import './App.css';
import Error403 from './Error403';

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  const { isDarkTheme, toggleTheme } = React.useContext(DarkThemeContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLazyComponent, setShowLazyComponent] = React.useState(false);
  const childRef = useRef();
  const [dataFromChild, setDataFromChild] = useState('');
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  if (!isAuthenticated) {
    return <Error403 />;
  }

  const callChildFocus = () => {
    if (childRef.current) {
      childRef.current.focusInput();
    }
  };

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <button onClick={toggleTheme}>
        Toggle to {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>
      <button onClick={() => setShowLazyComponent((prev) => !prev)}>
        {showLazyComponent ? 'Hide' : 'Show'} Lazy Component
      </button>
      <button onClick={isAuthenticated ? logout : login}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
      {showLazyComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}

      <div style={{ margin: '20px 0' }}>
        <ChildComponent ref={childRef} sendDataToParent={handleDataFromChild} />
        <button onClick={callChildFocus} style={{ marginLeft: '10px' }}>
          Enfant !
        </button>
      </div>
      {dataFromChild && <p>Donnée provenant de l'Enfant: {dataFromChild}</p>}
    </div>
  );
};

export default function RootApp() {
  return (
    <AuthProvider>
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    </AuthProvider>
  );
}
