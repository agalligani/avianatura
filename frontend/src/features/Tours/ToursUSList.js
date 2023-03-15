import { useGetToursQuery } from "./toursApiSlice"
import TourSummary from "./TourSummary"
// import { useParams } from "react-router-dom"
// import useAuth from "../../hooks/useAuth"
// import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const ToursUSList = () => {
    // useTitle('techNotes: Notes List')

    // const { username, isManager, isAdmin } = useAuth()

    // const { countryid } = useParams()

    const {
        data: tours,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetToursQuery('toursList', {
        pollingInterval: 15000,
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = tours

        console.log(tours)

        let filteredIds
        filteredIds = [...ids]
        console.log(filteredIds)

        const countryId = "AD"

        if (!countryId) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].country === countryId)
        }

        const tableContent = ids?.length && filteredIds.map(tourId => <TourSummary key={tourId} tourId={tourId} />)

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ToursUSList