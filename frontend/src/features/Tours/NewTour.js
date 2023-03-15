import { usstates, mxstates, countries } from "../../config/geocodes"
import NewTourForm from "./NewTourForm"

const NewTour = () => {
  return (
    <NewTourForm usstates={usstates} mxstates={mxstates} countries={countries} />
  )
}
export default NewTour
