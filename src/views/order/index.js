import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOrderByStatus } from "actions/order.actions";
import OrderTable from "./components/OrderTable";
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
import OrderTableTools from "./components/OrderTableTools";

// injectReducer('store', reducer)

const OrderList = () => {
  const status = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const dispatch = useDispatch();

  const userRole = localStorage.getItem('role')
  const token = localStorage.getItem('accessToken')
  
  const store_id = jwt(token)?.payload.store_id;
  
  useEffect(() => {
    if(userRole === 'store') {
      fetchOrderByStore()
    } else {
      fetchOrders();
    }

  }, [status, userRole]);

  const fetchOrders = async () => {
    await dispatch(
      fetchListOrderByStatus({ offset: 0, limit: 5, status: status })
    );
  };

  const fetchOrderByStore = async () => {
    await dispatch(
      fetchListOrderByStatus({ offset: 0, limit: 5, status: status, store_id: store_id })
    );
  }

  // const orderData = useSelector(selectListOrders);
  const state = {
    status: status,
    store_id: store_id,
  }

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0"> Danh sách đơn hàng</h3>{" "}
         <div className="flex flex-row max-h-[40px] gap-x-[60px]">
          <div className="lg:flex items-center justify-between max-h-[40px]">
                  
              <OrderTableTools />
            </div>
          <Link
            // activeClass="text-gray-900 dark:text-gray-50"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            to="/delivery-order/create"
          >
            Tạo đơn hàng{" "}
          </Link>{" "}
         </div>
      </div>{" "}
      <OrderTable state={state} />{" "}
    </AdaptableCard>
  );
};

export default OrderList;
