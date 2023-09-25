import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Tag } from 'components/ui'
import { Loading, Container, DoubleSidedImage } from 'components/shared'
import OrderProducts from './components/OrderProducts'
import PaymentSummary from './components/PaymentSummary'
import ReactToPrint from 'react-to-print';

import CustomerInfo from './components/CustomerInfo'
import { HiOutlineCalendar } from 'react-icons/hi'

import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import { actionGetOrderDetail } from 'actions/order.actions'
// import OrderPrint from './order-print'
import { OrderPrint } from './order-print';

const paymentStatus = {
    wait: {
        label: 'Chờ giao',
        class: 'bg-blue-500 text-white dark:bg-emerald-500/20 dark:text-emerald-100',
    },
    delivering: {
        label: 'Đang giao',
        class: 'bg-yellow-500 text-white dark:text-red-100 dark:bg-red-500/20',
    },
    success: {
        label: 'Giao thành công',
        class: 'bg-green-600 text-white dark:text-red-100 dark:bg-red-500/20',
    },
    partial_success: {
        label: 'Giao một phần',
        class: 'bg-green-600 text-white dark:text-red-100 dark:bg-red-500/20',
    },
    fail: {
        label: 'Giao thất bại',
        class: 'bg-red-500 text-white dark:text-red-100 dark:bg-red-500/20',
    },
    cancel: {
        label: 'Đơn đã huỷ',
        class: 'bg-gray-500 text-white dark:text-red-100 dark:bg-red-500/20',
    },
}

const progressStatus = {
    0: {
        label: 'Fulfilled',
        class: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100',
    },
    1: {
        label: 'Unfulfilled',
        class: 'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
    },
}

const OrderDetails = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const { state } = useLocation();
    const { order_id } = state;

    const componentRef = useRef();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
       
        if (order_id) {
            setLoading(true)

            const response = await actionGetOrderDetail({
                id: order_id
            })
            if (response) {
                setLoading(false)
                setData(response.data)
            }
        }
    }

    return (
        <>
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <>
                        <div className="mb-6 flex flex-row justify-between">
                            <div>
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>Order</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                        {data.order_code}
                                    </span>
                                </h3>
                                <Tag
                                    className={classNames(
                                        'border-0 rounded-md ltr:ml-2 rtl:mr-2',
                                        paymentStatus[data.status].class
                                    )}
                                >
                                    {paymentStatus[data.status].label}
                                </Tag>
                                
                            </div>
                            <span className="flex items-center">
                                <HiOutlineCalendar className="text-lg" />
                                <span className="ltr:ml-1 rtl:mr-1">
                                    {dayjs
                                        .unix(data.created_time)
                                        .format('ddd DD-MMM-YYYY, hh:mm A')}
                                </span>
                            </span>
                            </div>
                            <div>
                                <ReactToPrint
                                    trigger={() => <button className='bg-blue-500 text-white w-[100px] p-2 rounded'>In đơn</button>}
                                    content={() => componentRef.current}
                                />
                            </div>
                        </div>
                        <div className="xl:flex gap-4">
                            <div className="w-full">
                                <OrderProducts data={data.product_list} />
                                <div className="xl:grid grid-cols-2 gap-4">

                                    <PaymentSummary
                                        data={data}
                                    />
                                </div>
                               
                            </div>
                            <div className="xl:max-w-[360px] w-full">
                                <CustomerInfo data={data} />
                            </div>
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">No order found!</h3>
                </div>
            )}
        </Container>
        <div className='hidden'>
            <OrderPrint data={data} ref={componentRef} />
        </div>
        
        </>
    )
}

export default OrderDetails
