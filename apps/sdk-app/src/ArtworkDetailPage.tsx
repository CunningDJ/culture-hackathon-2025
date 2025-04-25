import { useProjection } from "@sanity/sdk-react";
import { Link, useParams } from "react-router";
import { IconArrow } from "./IconArrow";
import {PortableText, PortableTextComponents} from '@portabletext/react'


const createDocumentHandle = (documentId: string) => ({
  documentId,
  documentType: "artwork",
  dataset: "team-4",
  projectId: "n7xckjbt"
});

const pTag = ({children, value}) => {
  // `value` is the single Portable Text block of this header
  return <p className="typography $typography/size:large $typography/weight:regular">{children}</p>
}


const components: PortableTextComponents = {
  block: {
    normal: pTag,
  },
}

const ArtworkDetailPage = () => {
  const { artworkId } = useParams();
  const artworkDocHandle = createDocumentHandle(artworkId as string);
  const { data: doc }: any = useProjection({
    ...artworkDocHandle,
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
  });

  console.log('artwork data:', doc);


  return (
    <div className="color/background $color/background:black layout/wrapper layout/height:100% $color/white layout/flex:column layout/justify:between layout/padding:page">
      <div>
        <div>
          <h1 className="$typography/size:extra-extra-large typography"><em>{doc.name}</em></h1>
          <img className="layout/width:100% layout/height:100% layout/margin:top:page"
          style={{
            height: '50vh',
            objectFit: 'cover'
          }}
          src={doc.imageUrl} alt={doc.name} />
        </div>

        <div className="layout/margin:top:page">
          <p className="typography $typography/size:extra-large $typography/weight:regular">{doc.artist.name}</p>
          <p className="typography $typography/size:medium-large $typography/weight:regular layout/margin:top:cap">{doc.year}</p>
          <div className="layout/margin:top:page"><PortableText components={components} value={doc.description} /></div>
        </div>
      </div>
      <div className="">
        <Link to={`/artwork/${artworkId}/draw`}>
          <span className="typography $typography/size:30pt">Start my drawing <IconArrow /></span>
        </Link>
      </div>
    </div>
  )
}

export default ArtworkDetailPage;