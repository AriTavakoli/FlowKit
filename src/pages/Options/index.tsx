import React from 'react';
import { createRoot } from 'react-dom/client';
import Options from './Options';
import { GlobalProvider } from '@Context/Global/GlobalProvider';
import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<GlobalProvider><Options title={'Settings'} /> </GlobalProvider>);
