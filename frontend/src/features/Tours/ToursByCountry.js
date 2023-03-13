import { useParams } from "react-router-dom"

const ToursByCountry = () => {

  const { id } = useParams()

  return (
    <div>Tours for {id}</div>
  )
}
export default ToursByCountry