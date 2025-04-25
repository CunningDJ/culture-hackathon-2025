import { useDocument, useProjection } from '@sanity/sdk-react'
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useParams } from 'react-router';
import { useState } from 'react';
import { exportToSvg } from "@excalidraw/excalidraw";

export function DrawMe() {
  const { artworkId } = useParams();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const documentHandle = { 
    "documentId": artworkId,
    "documentType": "artwork", 
    "dataset": "team-4", 
    "projectId": "n7xckjbt"
 }

  const proj = useProjection({
    ...documentHandle,
    projection: `{
        "images": images[0].asset->url
    }`
  })
  return (
    <div className="example-container">
        <h1>DrawMe</h1>
      <img src={proj?.data.images} style={{height: "500px"}}/>
      <div style={{ height: "500px", width: "100%" }}>
        <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)}>
            <MainMenu >
            <MainMenu.Item onSelect={() => window.alert("nice!")}>
                Save to Public Gallery
          </MainMenu.Item> 
            </MainMenu>
        </Excalidraw>
        <button onClick={async () => {
         if (!excalidrawAPI) {
            return
        }
        const elements = excalidrawAPI.getSceneElements();
        if (!elements || !elements.length) {
            return
        }
        const svg = await exportToSvg({elements});
        console.log("SVG", svg)
        }}>
          Save
        </button>
      </div>
    </div>
  )
}