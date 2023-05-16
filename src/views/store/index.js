import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import { injectReducer } from 'store'
import StoreTable from './components/StoteTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListStore } from 'actions/store.actions'
import { selectListStores } from 'store/delivery_store/storeSlice'


// injectReducer('store', reducer)

const StoreList = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchStores()
        
    }, [])

    const fetchStores = async () => {
        await dispatch(fetchListStore({offset: 0, limit: 5 }))
    }


    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Stores</h3>
            </div>
            <StoreTable />
        </AdaptableCard>
    )
}

export default StoreList
