import { SanityDocument, useDocument, useDocuments } from "@sanity/sdk-react";

const DROPDOWN_SIZE = 25;

interface Artwork extends SanityDocument {

}

const ArtworkOption = ({doc}) => {
  const name: string = useDocument(doc, 'name');
  return (
    <option value={doc.documentId}>{name}</option>
  );
}

const SelectArtwork = () => {
  const {data, hasMore, isPending, loadMore, count} = useDocuments({
    filter: '_type == "artwork"',
    batchSize: DROPDOWN_SIZE,
  })

  const onSelectArtwork = (e) => {
    console.log('target.value:', e.target.value);
  }

  return (
    <div>
      <h1>Select Artwork</h1>
      <select name="artworks" onChange={onSelectArtwork}>
        {data.map(doc => (
          <ArtworkOption key={doc.documentId} doc={doc} />
        ))}
      </select>
    </div>
  );
}

export default SelectArtwork;