import React, { useEffect } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import SalesReport from './SalesReport'
import SalesByCategories from './SalesByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import { getSalesDashboardData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { salesDashboardData } from 'mock/data/salesData'

// import  from '../../../mock/data/salesData'

const SalesDashboardBody = () => {
    const dispatch = useDispatch()

    // const {
    //     statisticData,
    //     salesReportData,
    //     topProductsData,
    //     latestOrderData,
    //     salesByCategoriesData,
    // } = useSelector((state) => state.salesDashboard.data.dashboardData)
    // const loading = useSelector((state) => state.salesDashboard.data.loading)

    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const fetchData = () => {
    //     dispatch(getSalesDashboardData())
    // }
    const statisticData = salesDashboardData.statisticData
    const salesReportData = salesDashboardData.salesReportData
    const salesByCategoriesData = salesDashboardData.salesByCategoriesData

    return (
        <Loading loading={false}>
            <Statistic data={statisticData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={salesReportData} className="col-span-2" />
                <SalesByCategories data={salesByCategoriesData} />
                
            </div>
            
        </Loading>
    )
}

export default SalesDashboardBody
