import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOrderByStatus } from "actions/order.actions";
import { selectListOrders } from "store/delivery_order/orderSlice";
import OrderTable from "./components/OrderTable";
import jwt from 'jwt-decode'

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

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0"> Danh sách đơn hàng</h3>{" "}
      </div>{" "}
      <OrderTable status={status} />{" "}
    </AdaptableCard>
  );
};

export default OrderList;
