import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'

import { useDispatch, useSelector } from 'react-redux'
import { salesDashboardData } from 'mock/data/salesData'
import { selectDashboardData } from 'store/delivery_dashboard/dashboardSlice'

// import  from '../../../mock/data/salesData'

const SalesDashboardBody = () => {
    const dispatch = useDispatch()

    
    const salesReportData = salesDashboardData.salesReportData

    const dashboardData = useSelector(selectDashboardData);

    return (
        <Loading loading={false}>
            <Statistic data={dashboardData} />

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={salesReportData} className="col-span-2" />
                <SalesByCategories data={dashboardData} />
            </div> */}
            
        </Loading>
    )
}

export default SalesDashboardBody
