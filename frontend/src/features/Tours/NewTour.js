import { usstates, mxstates, countries } from "../../config/geocodes"
import { lengthOptions } from "../../config/optionCodes"
import NewTourForm from "./NewTourForm"

const NewTour = () => {
  return (
    <NewTourForm usstates={usstates} mxstates={mxstates} countries={countries} 
    lengths={lengthOptions}/>
  )
}
export default NewTour
