import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'



// injectReducer('store', reducer)

const OrderList = () => {
    const status = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    console.log('----status-------', status)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        
        console.log('----status-------', status)
        if (status) {
            
        }
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Orders</h3>
            </div>
            {/* <StoreTable /> */}
        </AdaptableCard>
    )
}

export default OrderList
