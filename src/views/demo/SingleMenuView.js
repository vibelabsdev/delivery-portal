import { fetchListStore } from 'actions/store.actions';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectListStores } from 'store/delivery_store/storeSlice';

/** Example purpose only */
const SingleMenuView = () => {
    // const dispatch = useDispatch()
    
    // useEffect(() => {
    //     fetchStores()
        
    // }, [])

    // const fetchStores = async () => {
    //     await dispatch(fetchListStore({}))
    // }

    
    // const listStoreData = useSelector(selectListStores)
    // console.log('------listStoreData-----', listStoreData)

    return <div>Single Menu View</div>
}

export default SingleMenuView
