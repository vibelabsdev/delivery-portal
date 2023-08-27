import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import jwt from 'jwt-decode'
import { Link, useLocation } from "react-router-dom";
import OrderForm from "./components/OrderForm";


const OrderCreate = () => {

  const role = localStorage.getItem('role')
  const token = localStorage.getItem('accessToken')
  const store_info = jwt(token)?.payload

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">
          {" "}
          Tạo Đơn Hàng
        </h3>{" "}
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          to="/delivery-store"
        >
          Trở về{" "}
        </Link>{" "}
      </div>{" "}
      <OrderForm state={store_info} />
    </AdaptableCard>
  );
};

export default OrderCreate;
