import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOrderByStatus } from "actions/order.actions";
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
import { fetchListCustomerByStore } from "actions/customer.action";
import CustomerTable from "./components/CustomerTable";

// injectReducer('store', reducer)

const CustomerList = () => {
  
  const dispatch = useDispatch();

  const userRole = localStorage.getItem('role')
  const token = localStorage.getItem('accessToken')
  
  const store_id = jwt(token)?.payload.store_id;
  
  useEffect(() => {
    if(userRole === 'store') {
        fetchCustomer()
    } 
  }, [userRole]);

  const fetchCustomer = async () => {
    await dispatch(
      fetchListCustomerByStore({ offset: 0, limit: 5, store_id: store_id })
    );
  }


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0"> Danh sách khách hàng</h3>{" "}
        <Link
          // activeClass="text-gray-900 dark:text-gray-50"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          to="/delivery-order/create"
        >
          Tạo khách hàng{" "}
        </Link>{" "}
      </div>{" "}
      {/* <OrderTable status={status} />{" "} */}
      <CustomerTable />
    </AdaptableCard>
  );
};

export default CustomerList;
