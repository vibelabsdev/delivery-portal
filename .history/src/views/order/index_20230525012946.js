import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { fetchListOrderByStatus } from "actions/order.actions";
import { selectListOrders } from "store/delivery_order/orderSlice";
import OrderTable from "./components/OrderTable";

// injectReducer('store', reducer)

const OrderList = () => {
  const status = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = async () => {
    await dispatch(
      fetchListOrderByStatus({ offset: 0, limit: 5, status: status })
    );
  };

  const orderData = useSelector(selectListOrders);

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
