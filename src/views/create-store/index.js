import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'

import { Link } from 'react-router-dom'
import StoreFormValidation from './components/StoreForm'

// injectReducer('store', reducer)

const StoreCreate = () => {


    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Tạo cửa hàng</h3>
                <Link
                    // activeClass="text-gray-900 dark:text-gray-50"
                    className="cursor-pointer block transform transition-colors duration-200 py-2 hover:text-gray-900 dark:hover:text-gray-100"
                    to="/delivery-store"
                    
                >
                    <p className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">Trở về</p>
                </Link>
            </div>
            <StoreFormValidation />
        </AdaptableCard>
    )
}

export default StoreCreate
