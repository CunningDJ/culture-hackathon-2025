import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react';
import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import {ArtworkList} from './ArtworkList'
import Homepage from './Homepage';

export function App() {
  // apps can access many different projects or other sources of data
  const sanityConfigs: SanityConfig[] = [
    {
      projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
      dataset: process.env.SANITY_STUDIO_DATASET!,
    },
  ]

  return (
    <div className="app-container">
      <SanityApp config={sanityConfigs} fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            {/* add your own components here! */}
            <Route path="/" element={<Homepage />} />
            <Route path="/select-artwork" element={<div/>} />
            <Route path="/artwork/:artworkId" element={<div/>} />
            <Route path="/artwork/:artworkId/draw" element={<div/>} />
          </Routes>
        </BrowserRouter>
      </SanityApp>
    </div>
  )
}

export default App
