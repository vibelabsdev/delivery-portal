import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'
import BarCode from './BarCode'

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
            <h5 className="mb-4">Payment Summary</h5>
            <ul>
                
                <PaymentInfo label="Subtotal" value={data.total_amount - data.fee_ship} />
                <PaymentInfo label="Delivery fee" value={data.fee_ship} />
                
                <hr className="mb-3" />
                <PaymentInfo label="Total" value={data.total_amount} isLast />
            </ul>
            
            <hr className="mb-4 mt-4" />
            <div className='flex justify-center'>
                <BarCode order_code={data.order_code} />
            </div>
        </Card>
    )
}

export default PaymentSummary
