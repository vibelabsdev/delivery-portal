import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'
import BarCode from './BarCode'

const FormatPrice = (price) => {
    if(price)
        return price.toLocaleString()
    return 0
}

const SumPrice = (price, fee) => {
    if(price,  fee) {
        let _sum = price + fee
        return _sum.toLocaleString()
    }  
    return 0
}


const PaymentInfo = ({ label, value, isLast }) => {
    return (
        <li
            className={`flex items-center justify-between${
                !isLast ? ' mb-3' : ''
            }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumberFormat
                    displayType="text"
                    value={(Math.round(value * 100) / 100).toFixed(2)}
                    prefix={'$'}
                    thousandSeparator={true}
                />
            </span>
        </li>
    )
}

const PaymentSummary = ({ data }) => {

    return (
        <Card className="mb-4">
            <h5 className="mb-4">Thanh Toán</h5>
            <ul className='flex gap-y-2 flex-col'>
                
                <div className='flex flex-row justify-between'>
                    <p>Tiền hàng: </p>
                    <span className='right'>{FormatPrice(data.total_amount)}</span>
                </div>

                <div className='flex flex-row justify-between'>
                    <p>Phí ship: </p>
                    <span className='right'>{FormatPrice(data.fee_ship)}</span>
                </div>
                
                <hr className="mb-3" />
                
                <div className='flex flex-row justify-between'>
                    <p>Tổng cộng: </p>
                    <span className='right'>{SumPrice(data.total_amount, data.fee_ship)}</span>
                </div>
            </ul>
            
            <hr className="mb-4 mt-4" />
            <div className='flex justify-center'>
                <BarCode order_code={data.order_code} />
            </div>
        </Card>
    )
}

export default PaymentSummary
