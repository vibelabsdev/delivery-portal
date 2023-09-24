import React from 'react'
import { Card, Avatar } from 'components/ui'
import { IconText } from 'components/shared'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const CustomerInfo = ({ data }) => {

    const orderType = {
        normal: {
            label: 'Giao thường',
            class: 'text-blue-500 dark:bg-emerald-500/20 dark:text-emerald-100',
        },
        express: {
            label: 'Giao nhanh',
            class: 'text-yellow-500 dark:bg-emerald-500/20 dark:text-emerald-100',
        },
    }

    return (
        <Card>
            <h5 className="mb-4">Thông tin khách hàng</h5>
            <Link
                className="group flex items-center justify-between"
                to="/app/crm/customer-details?id=11"
            >
                <div className="flex items-center">
                    <Avatar shape="circle" src="" />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {data.cust_name}
                        </div>
                        
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />
            {/* <IconText
                className="mb-4"
                icon={<HiMail className="text-xl opacity-70" />}
            >
                <span className="font-semibold">{data}</span>
            </IconText> */}
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{data.cust_phone}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">Địa chỉ giao hàng</h6>
            <address className="not-italic">
                <div className="mb-1">{data.address}</div>
                
            </address>
            <hr className="my-5" />
            <h6 className="mb-4">Loại giao</h6>
            <div className={classNames(
                                'mb-1',
                                orderType[data.order_type].class
                            )}>
                {orderType[data.order_type].label}
            </div>
           
        </Card>
    )
}

export default CustomerInfo
