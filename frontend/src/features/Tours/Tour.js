import { useGetToursQuery } from "./toursApiSlice"
import { useParams } from "react-router-dom"

const Tour = () => {
    const { id } = useParams()
    const { tour } = useGetToursQuery("toursList", {
        selectFromResult: ({data}) => ({
            tour: data?.entities[id]
        }),
        refetchOnMountOrArgChange: true
    })


    return (
        <article>
            <h1>{tour.tourname}</h1>
        </article>
    )
}
export default Tour