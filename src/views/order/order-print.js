import React from 'react'
import BarCode from './components/BarCode';

const FormatPrice = (price) => {
    if(price)
        return price.toLocaleString()
    return 0
}

export const OrderPrint = React.forwardRef(({data}, ref) => {
    
    return (
      <div ref={ref} className='flex-col justify-center items-center mt-[24px] py-4 flex'>
        <BarCode order_code={data.order_code}/>
        <div className='w-full px-8'>
            <ul className='text-red text-base text-center pt-[24px] text-black'>
                {
                    data.product_list?.map((item) => (
                        <li className='font-semibold'>Sản phẩm: {item.product_name} | Giá: {FormatPrice(item.product_price)} | Số lượng {item.quantity}</li>
                    ))
                }

            </ul>
            
        </div>
        <div className='flex flex-row w-full font-bold px-[32px] justify-center items-center gap-x-20 mt-[40px] text-black	 '>
            <div className='flex flex-col '>
                <p>Tên: {data.cust_name}</p>
                <p>Số điện thoại: {data.cust_phone}</p>
                <p>Địa chỉ: {data.address}</p>
                <p>Loại giao: {data.order_type}</p>
            </div>
            <div className='flex flex-col'>
                <p>Tiền hàng: {FormatPrice(data.total_amount - data.fee_ship)}</p>
                <p>Phí ship: {FormatPrice(data.fee_ship)}</p>
                <p>Tổng: {FormatPrice(data.total_amount)}</p>
            </div>
        </div>
      </div>
    );
});
