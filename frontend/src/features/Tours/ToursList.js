import { useGetToursQuery } from "./toursApiSlice"
import TourSummary from "./TourSummary"
// import { useParams } from "react-router-dom"
// import useAuth from "../../hooks/useAuth"
// import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {
    const {
        data: tours,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetToursQuery('toursList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = tours

        let filteredIds
        filteredIds = [...ids]



        // if (isManager || isAdmin) {
        //     filteredIds = [...ids]
        // } else {
        //     filteredIds = ids.filter(noteId => entities[noteId].username === username)
        // }

        const tableContent = ids?.length && filteredIds.map(tourId => <TourSummary key={tourId} noteId={tourId} />)

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
export default NotesList