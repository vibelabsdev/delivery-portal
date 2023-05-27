import React from 'react'
import { DatePicker, Button } from 'components/ui'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSalesDashboardData } from '../store/dataSlice'
import { setEndDate, setStartDate } from 'store/delivery_dashboard/dashboardStateSlice'
import dayjs from 'dayjs'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const SalesDashboardHeader = () => {
    const dispatch = useDispatch()

    // get current day
    const endDate = new Date()
    const startDate = dayjs().subtract(7, 'day').toDate()

    const handleDateChange = (value) => {
        console.log('handleDateChange --', value)
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }

    const onFilter = () => {
        // dispatch(getSalesDashboardData())
        console.log(' functions onFilter work')
    }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Sales Overview</h3>
                <p>View your current sales & summary</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                from
                <DatePickerRange
                    value={[startDate, endDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                />
                <Button size="sm" icon={<HiOutlineFilter />} onClick={onFilter}>
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default SalesDashboardHeader
