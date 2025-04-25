import { Link } from "react-router";
import { IconArrow } from "./IconArrow";
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
    <div className="color/background $color/background:black layout/wrapper layout/height:100% $color/white layout/flex:column  layout/justify:between layout/padding:page">
      <div>
        <div className="">
          <span>
            <h1>
              <span className="typography $typography/size:extra-extra-large">Ready to make your own masterpiece?</span>
            </h1>
          </span>
        </div>

        <div className="layout/margin:top:page:2">
          <label className="typography $typography/weight:regular $typography/size:extra-large layout/margin:top:cap:0.5">Select the artwork you want to draw</label>
          <select name="artworks" onChange={onSelectArtwork} className="typography $typography/weight:regular $typography/size:medium-large layout/margin:top:cap layout/border:bottom:3pt layout/padding:bottom:cap:0.5">
            {data.map(docHandle => (
              <ArtworkOption key={docHandle.documentId} docHandle={docHandle} />
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectArtwork;