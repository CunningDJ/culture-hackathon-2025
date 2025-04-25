import { useProjection } from "@sanity/sdk-react";
import { Link, useParams } from "react-router";

const createDocumentHandle = (documentId: string) => ({
  documentId,
  documentType: "artwork",
  dataset: "team-4",
  projectId: "n7xckjbt"
});

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
      "imageUrl": images[0].asset->{
        url
      }.url
    }`
  });

  console.log('artwork data:', doc);
  return (
    <div>
      <h1>{doc.name}</h1>
      <img src={doc.imageUrl} alt={doc.name} />
      <div>
        <div>
          <p><b>Artist:</b> {doc.artist.name}</p>
          <img src={doc.artist.imageUrl} width="500" alt={doc.artist.name}/>
        </div>
        <p><b>Year:</b> {doc.year}</p>
        <p><b>Medium:</b> {doc.medium}</p>
        <Link to={`/artwork/${artworkId}/draw`}>
          <button>Now Draw!</button>
        </Link>
      </div>
    </div>
  )
}

export default ArtworkDetailPage;