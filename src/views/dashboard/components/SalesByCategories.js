import React, { useEffect, useState } from 'react'
import { Card, Badge } from 'components/ui'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import isEmpty from 'lodash/isEmpty'

const SalesByCategories = ({ data = {} }) => {

    const [ dataChart, setDataChart ] = useState({})
   
    const _data_chart = {
        order_cancel: data.order_cancel,
        order_delivering: data.order_delivering,
        order_fail: data.order_fail,
        order_partial_success: data.order_partial_success,
        order_success: data.order_success,
        order_wait: data.order_wait,
    }
    
    useEffect(( ) => {

        const label_arr = Object.keys(_data_chart);
        const data_arr = Object.values(_data_chart);

        setDataChart({
            data: data_arr,
            labels: label_arr
        })

    }, _data_chart)
    
    return (
        <Card>
            <h4>Order Chart</h4>
            <div className="mt-6">
                {!isEmpty(dataChart) && (
                    <>
                        <Chart
                            donutTitle={`${dataChart.data.reduce(
                                (a, b) => a + b,
                                0
                            )}`}    
                            donutText="Total Order"
                            series={dataChart.data}
                            customOptions={{ labels: dataChart.labels }}
                            type="donut"
                        />
                        {dataChart.data.length === dataChart.labels.length && (
                            <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-[64px] w-full px-auto">
                                {dataChart.labels.map((value, index) => 
                                    (
                                    
                                        <div
                                            key={value}
                                            className="flex items-center gap-1"
                                        >
                                           
                                            <Badge
                                                badgeStyle={{
                                                    backgroundColor: COLORS[index],
                                                }}
                                            />
                                        
                                            <span className="font-semibold">
                                                {value}
                                            </span>
                                        </div>
                                    )
                                    
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    )
}

export default SalesByCategories
