import { useDocument, useProjection } from '@sanity/sdk-react'
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useParams } from 'react-router';
import { useState } from 'react';
import { exportToSvg, exportToBlob } from "@excalidraw/excalidraw";

import { createDocument, publishDocument, editDocument } from '@sanity/sdk'
import { useApplyDocumentActions, useClient } from '@sanity/sdk-react'


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
 const apply = useApplyDocumentActions()
 const client = useClient({apiVersion: "2021-03-25"})
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
        const png = await exportToBlob({elements})
        //const svg = await exportToSvg({elements});
        //console.log("SVG", svg)

        //const blob = new Blob([svg], { type: 'image/svg+xml' });
        console.log("PNG", png)
        const handle = { documentId: window.crypto.randomUUID(), documentType: 'userDrawing' }
        const uploaded = await client.assets.upload('image', png)
        console.log("UPLOADED", uploaded._id)
        await apply([
            createDocument(handle),
            editDocument(handle, {
                set: {
                    "userDrawing": {
                    _type:"image",
                    asset: {
                        _ref:uploaded._id,
                        _type:"reference"
                    },
                },
                "userName":"Bobby 2",
                "refArtwork": {
                    _type:"reference",
                    _ref:artworkId
                }
            }
            }),
            publishDocument(handle),
        ])
        }}>
          Save
        </button>
      </div>
    </div>
  )
}