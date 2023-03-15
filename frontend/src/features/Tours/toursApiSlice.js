import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const toursAdapter = createEntityAdapter({
    // sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = toursAdapter.getInitialState()

export const toursApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTours: builder.query({
            query: () => ({
                url: '/tours',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedTours = responseData.map(tour => {
                    tour.id = tour._id
                    return tour
                });
                return toursAdapter.setAll(initialState, loadedTours)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Tour', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Tour', id }))
                    ]
                } else return [{ type: 'Tour', id: 'LIST' }]
            }
        }),
        addNewTour: builder.mutation({
            query: initialTour => ({
                url: '/tours',
                method: 'POST',
                body: {
                    ...initialTour,
                }
            }),
            invalidatesTags: [
                { type: 'Tour', id: "LIST" }
            ]
        }),
        updateTour: builder.mutation({
            query: initialTour => ({
                url: '/tours',
                method: 'PATCH',
                body: {
                    ...initialTour,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Tour', id: arg.id }
            ]
        }),
        deleteTour: builder.mutation({
            query: ({ id }) => ({
                url: `/tours`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Tour', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetToursQuery,
    useAddNewTourMutation,
    useUpdateTourMutation,
    useDeleteTourMutation,
} = toursApiSlice

// returns the query result object
export const selectToursResult = toursApiSlice.endpoints.getTours.select()

// creates memoized selector
const selectToursData = createSelector(
    selectToursResult,
    toursResult => toursResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTours,
    selectById: selectTourById,
    selectIds: selectTourIds
    // Pass in a selector that returns the tours slice of state
} = toursAdapter.getSelectors(state => selectToursData(state) ?? initialState)