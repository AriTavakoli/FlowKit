import { Suspense, useState } from 'react';
import SearchResults from '@src/components/Webflow/Features/Results/SearchResults.js';

import TabButton from './TabButton.jsx';
import Live from '@src/components/Webflow/Features/Live/live-index.js';
import BiggestBoy from '@Mocks/BigBoy.json';


export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => setTab('posts')}
      >
        Posts
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        onClick={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />

      {tab === 'about' && <SearchResults styleSheet={BiggestBoy.css} />}
      {tab === 'posts' && <Live />}
    </Suspense>
  );
}