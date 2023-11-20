import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import jwt from 'jwt-decode'
import { Link, useLocation } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";


const CustomerCreate = () => {

  const role = localStorage.getItem('role')
  const token = localStorage.getItem('accessToken')
  const store_info = jwt(token)?.payload

  const { state } = useLocation();
  const { phone } = state; // Read values passed on state

  store_info['customer_phone'] = phone

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">
          {" "}
          Tạo Khách Hàng
        </h3>{" "}
        <div className="gap-x-[32px] flex">

          <Link
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            to="/delivery-order/create"
          >
            Trở về{" "}
          </Link>{" "}
        </div>
      </div>{" "}
      <CustomerForm state={store_info}/>
    </AdaptableCard>
  );
};

export default CustomerCreate;
