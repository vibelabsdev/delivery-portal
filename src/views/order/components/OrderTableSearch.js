import React, { useRef } from 'react'
// import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData } from '../../../store/delivery_order/orderSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { fetchListOrderByStatus } from 'actions/order.actions'
import { Field, Form, Formik } from 'formik'
import { Input, Button, FormItem, FormContainer, Radio, Select, Alert } from 'components/ui'
import jwt from 'jwt-decode'
// import { useHistory } from 'react-router-dom';


const OrderTableSearch = () => {
    const dispatch = useDispatch()
    const status = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
    );

    const token = localStorage.getItem('accessToken')
    const token_jwt = jwt(token)?.payload

    // const {store_id} = jwt(token)?.payload.store_id;
    const {store_id, store_code } = token_jwt

    // const history = useHistory();

    return (
        
        <div>
            <Formik
                initialValues={{
                    search_value: ''
                }}
                onSubmit={(values) => {

                    const {search_value} = values
                    const params = {
                        offset: 0,
                        limit: 5,
                        status: status,
                    }
                    if( store_id != 1) {
                        params['store_id'] = store_id
                    }

                    if(search_value.length < 10 && search_value.length > 0){
                        const _orderCode = store_code + '-' + search_value

                        if(_orderCode) {
                            params['order_code'] = _orderCode.replace('#','')
                        }else {
                            params['order_code'] = search_value
                        }
                        // if(search_value.includes('#')) {
                        //     params['order_code'] = search_value.replace('#','')
                        // }else {
                        //     params['order_code'] = search_value
                        // }

                        localStorage.setItem('storageDataFilter', params['order_code'])
                    }
                    else if (search_value.includes('-')){
                        if(search_value.includes('#')) {
                            params['order_code'] = search_value.replace('#','')
                        }else {
                            params['order_code'] = search_value
                        }
                        
                        localStorage.setItem('storageDataFilter', params['order_code'])
                    }
                    else if(search_value.indexOf('0') == 0 && search_value.length >= 10) {
                        params['cust_phone'] = search_value
                        localStorage.setItem('storageDataFilter', params['cust_phone'] )
                    }
                    else {
                        localStorage.removeItem('storageDataFilter')
                    }
                    
                    dispatch(fetchListOrderByStatus(params));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <FormContainer>
                            <div className='flex flex-row gap-4'>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="search_value"
                                    placeholder="Tìm kiếm theo mã vận đơn hoặc số điện thoại"
                                    component={Input}
                                    className='max-h-[40px] w-[400px]'
                                />
                                
                                <Button type="submit" className='max-h-[40px] ltr:mr-2 rtl:ml-2' >
                                    Tìm
                                </Button>
                                
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default OrderTableSearch
