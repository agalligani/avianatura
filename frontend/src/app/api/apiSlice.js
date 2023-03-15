
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCredentials } from '../../features/auth/authSlice'

// For version with  authorization verson See:
// https://github.com/gitdagray/mern_stack_course/blob/main/lesson_12-frontend

const baseQuery = fetchBaseQuery(
{
    baseUrl: 'http://localhost:3500'
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Tour'],
    endpoints: builder => ({})
})