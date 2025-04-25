import { useDocument, useProjection } from '@sanity/sdk-react'
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useParams } from 'react-router';
import { useState } from 'react';
import { exportToSvg, exportToBlob } from "@excalidraw/excalidraw";

import {PortableText, PortableTextComponents} from '@portabletext/react'

import { createDocument, publishDocument, editDocument } from '@sanity/sdk'
import { useApplyDocumentActions, useClient } from '@sanity/sdk-react'


const pTag = ({children, value}) => {
  // `value` is the single Portable Text block of this header
  return <p className="typography $typography/size:large $typography/weight:regular">{children}</p>
}


const components: PortableTextComponents = {
  block: {
    normal: pTag,
  },
}

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
      "artist": artist->{
        ...,
        "imageUrl": image.asset->.url
      },
      name,
      year,
      medium,
      description,
      "imageUrl": images[0].asset->{
        url
      }.url
    }`
  })

 const apply = useApplyDocumentActions()
 const client = useClient({apiVersion: "2021-03-25"})
 console.log(proj)
  return (
    <div className="color/background $color/background:black layout/wrapper layout/height:100% $color/white layout/flex:column layout/justify:between layout/padding:page">

      <div className="layout/grid:2 layout/grid:gap:page">
        <div className="">
          <h1 className="typography $typography/size:large">{proj.data.name}</h1>
          <div className="layout/margin:top:page">
            <p className="typography $typography/size:large $typography/weight:regular">{proj.data.artist.name}</p>
            <p className="typography $typography/size:large $typography/weight:regular layout/margin:top:cap">{proj.data.year}</p>
            <div className="layout/margin:top:page"><PortableText components={components} value={proj.data.description} /></div>
          </div>
        </div>

        <img src={proj?.data.imageUrl} style={{height: "500px", objectFit: 'cover'}} />
      </div>

      <div className="layout/border:3pt layout/padding:page layout/margin:top:page">
        <div className="typography $typography/size:medium">Use the tools below to create your own masterpiece. You can copy the artwork, remix it, or make something totally bananas!</div>
      </div>


      <div
        className="layout/margin:top:page"
        style={{ height: "500px", width: "100%" }}>

        <h1 className="typography $typography/size:extra-large">Debora's {proj.data.name}</h1>

        <div className="layout/margin:top:page"></div>

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