import { useParams } from "react-router"


const ArtworkDetailPage = () => {
  const { artworkId } = useParams();
  return (
    <h1>{artworkId}</h1>
  )
}

export default ArtworkDetailPage;