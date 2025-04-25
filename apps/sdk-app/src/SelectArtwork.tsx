import { DocumentHandle, SanityDocument, useDocument, useDocuments } from "@sanity/sdk-react";
import { redirect, useNavigate } from "react-router";

const DROPDOWN_SIZE = 25;

interface ArtworkOptionProps {
  docHandle: DocumentHandle<SanityDocument>;
}

const ArtworkOption = ({ docHandle }: ArtworkOptionProps) => {
  const name: string = useDocument(docHandle, 'name');
  return (
    <option value={docHandle.documentId}>{name}</option>
  );
}

const SelectArtwork = () => {
  const navigate = useNavigate();

  const {data, hasMore, isPending, loadMore, count} = useDocuments({
    filter: '_type == "artwork"',
    batchSize: DROPDOWN_SIZE,
  })

  const onSelectArtwork = (e) => {
    const artworkId = e.target.value;
    console.log('selected artworkId:', artworkId);
    navigate(`/artwork/${artworkId}`);
  }

  return (
    <div>
      <h1>Select Artwork</h1>
      <select name="artworks" onChange={onSelectArtwork}>
        {data.map(docHandle => (
          <ArtworkOption key={docHandle.documentId} docHandle={docHandle} />
        ))}
      </select>
    </div>
  );
}

export default SelectArtwork;