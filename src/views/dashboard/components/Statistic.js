import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'
import { GrowShrinkTag } from 'components/shared'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const StatisticCard = ({ value, label, valuePrefix, date }) => {

    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumberFormat
                            displayType="text"
                            value={value}
                            thousandSeparator
                            prefix={valuePrefix}
                        />
                    </h3>
                    
                </div>
                {/* <GrowShrinkTag value={data.growShrink} suffix="%" /> */}
            </div>
        </Card>
    )
}

const Statistic = ({ data = {} }) => {
    // const startDate = useSelector(
    //     (state) => state.salesDashboard.state.startDate
    // )

    console.log('-----data------', data)

    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                value={data?.total_amount }
                // valuePrefix="$"
                label="Tổng"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={data?.total_amount - data?.ship}
                label="Tiền Hàng"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={data?.ship}
                // valuePrefix="$"
                label="Phí giao hàng"
                tagSuffix="%"
                // date={startDate}
            />

        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-[40px]'>
            <StatisticCard
                value={data?.total_order}
                // valuePrefix="$"
                label="Tổng đơn hàng"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={data?.order_success}
                // valuePrefix="$"
                label="Đơn thành công"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={data?.order_wait}
                // valuePrefix="$"
                label="Đơn chờ giao"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={data?.order_delivering}
                // valuePrefix="$"
                label="Đơn đang giao"
                tagSuffix="%"
                // date={startDate}
            />

            <StatisticCard
                value={data?.order_cancel}
                // valuePrefix="$"
                label="Đơn đã huỷ"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                value={0}
                // valuePrefix="$"
                label="Đơn hẹn giao"
                tagSuffix="%"
                // date={startDate}
            />
        </div>
        </>
    )
}

export default Statistic
