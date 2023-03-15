import { useNavigate } from 'react-router-dom'
import { useGetToursQuery } from './toursApiSlice'
import { memo } from 'react'

const TourSummary = ({tourId}) => {

    const { tour } = useGetToursQuery("toursList", {
        selectFromResult: ({ data }) => ({
            tour: data?.entities[tourId]
        }),
    })

    const navigate = useNavigate()

    if (tour) {
        // const created = new Date(tour.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(tour.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const showTourDetails = () => navigate(`/tour/${tourId}`)

        return (
            <tr className="table__row">
                <td className="table__cell tour__status">
                {tour.tourname}
                </td>
                <td className="table__cell"></td>
                <td className="table__cell tour__updated"></td>
                <td className="table__cell tour__title"></td>
                <td className="table__cell tour__username"></td>
                <td className="table__cell">
                <button
                        className="icon-button table__button"
                        onClick={showTourDetails}
                    >
                        Show Details
                        {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedTourSummary = memo(TourSummary)

export default memoizedTourSummary