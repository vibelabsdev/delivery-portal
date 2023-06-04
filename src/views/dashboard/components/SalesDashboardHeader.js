import React, { useEffect } from 'react'
import { DatePicker, Button } from 'components/ui'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSalesDashboardData } from '../store/dataSlice'
import { setEndDate, setStartDate } from 'store/delivery_dashboard/dashboardStateSlice'
import dayjs from 'dayjs'
import { fetchDataDashboard } from 'actions/dashboard.actions'
import { selectDashboardData } from 'store/delivery_dashboard/dashboardSlice'

const dateFormat = 'DD-MM-YYYY'

const { DatePickerRange } = DatePicker

const SalesDashboardHeader = () => {
    const dispatch = useDispatch()

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const startDate = useSelector(
        (state) => state.dashboardState.startDate
    )
    const endDate = useSelector(
        (state) => state.dashboardState.endDate
    )
    
    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }

    const handleFilter = () => {
        const date = formatDate(startDate)
        const end_date = formatDate(endDate)
        useEffect(() => {
            if (startDate && endDate ) {
                fetchDashboard();
            }
        }, [ date, end_date ]);
      
        const fetchDashboard = async () => {
          await dispatch(
            fetchDataDashboard({ date, end_date })
          );
        };
        
    }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Order Overview</h3>
                {/* <p>View your current sales & summary</p> */}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                from
                <DatePickerRange
                    value={[startDate, endDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                />
                <Button size="sm" icon={<HiOutlineFilter />} onClick={handleFilter()}>
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default SalesDashboardHeader
