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
import { selectDashboardData } from 'store/delivery_dashboard/dashboardSlice'

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

    const dashboardData = useSelector(selectDashboardData);

    const data_arr = []
    const label_arr = []
    useEffect(() => {
        data_arr.push(dashboardData.order_cancel)
        label_arr.push('order cancel')

        data_arr.push(dashboardData.order_delivering)
        label_arr.push('order delivering')

        data_arr.push(dashboardData.order_fail)
        label_arr.push('order fail')

        data_arr.push(dashboardData.order_partial_success)
        label_arr.push('order partial success')

        data_arr.push(dashboardData.order_success)
        label_arr.push('order success')

        data_arr.push(dashboardData.order_wait)
        label_arr.push('order wait')

        
    },[dashboardData])
    
    
    const _category_data = {
        data: data_arr,
        labels: label_arr
    }

    return (
        <Loading loading={false}>
            <Statistic data={dashboardData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={salesReportData} className="col-span-2" />
                <SalesByCategories data={_category_data} />
            </div>
            
        </Loading>
    )
}

export default SalesDashboardBody
