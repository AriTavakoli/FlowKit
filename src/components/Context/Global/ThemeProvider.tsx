import React, { createContext, useEffect, useState } from 'react';
import SettingOps from './classes/SettingsOps';
const ThemeContext = createContext<Settings['theme']>('light');


export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Settings['theme']>('light');

  useEffect(() => {
    SettingOps.getTheme().then(setTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme === 'dark' ? 'dark' : 'light'}`}>{children}</div>
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}