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
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return toursAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        addNewTour: builder.mutation({
            query: initialNote => ({
                url: '/tours',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        updateTour: builder.mutation({
            query: initialNote => ({
                url: '/tours',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        deleteTour: builder.mutation({
            query: ({ id }) => ({
                url: `/tours`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
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
export const selectNotesResult = toursApiSlice.endpoints.getTours.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = toursAdapter.getSelectors(state => selectNotesData(state) ?? initialState)