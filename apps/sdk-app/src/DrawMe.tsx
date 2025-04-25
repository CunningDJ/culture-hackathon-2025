import { useDocument } from '@sanity/sdk-react'
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
 
const documentHandle = { 
    "documentId": "175e1ba4-ba5b-4400-a14a-1c70459e16b9", 
    "documentType": "artwork", 
    "dataset": "team-4", 
    "projectId": "n7xckjbt"
}

export function DrawMe() {
  const id = '175e1ba4-ba5b-4400-a14a-1c70459e16b9'
  const doc = useDocument(documentHandle)
  console.log("DOC", doc)
  return (
    <div className="example-container">
        <h1>DrawMe</h1>
        {doc?.images[0].asset.url}
      <div style={{ height: "500px", width: "100%" }}>
        <Excalidraw >
            <MainMenu >
            <MainMenu.Item onSelect={() => window.alert("nice!")}>
                Save to Public Gallery
          </MainMenu.Item> 
            </MainMenu>
        </Excalidraw>
      </div>
    </div>
  )
}