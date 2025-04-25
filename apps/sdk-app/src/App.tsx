import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react'
import {ExampleComponent} from './ExampleComponent'
import './App.css'
import {ArtworkList} from './ArtworkList'
import SelectArtwork from './SelectArtwork'

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
        <SelectArtwork />
        {/* add your own components here! */}
        <ExampleComponent />
        <ArtworkList />
      </SanityApp>
    </div>
  )
}

export default App
