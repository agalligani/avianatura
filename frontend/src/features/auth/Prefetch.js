import { store } from '../../app/store'
import { toursApiSlice } from '../tours/toursApiSlice'
// import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(toursApiSlice.util.prefetch('getTours', 'toursList', { force: true }))
        // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch