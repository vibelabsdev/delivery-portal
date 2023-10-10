import React, { useEffect } from "react";
import { DatePicker, Button } from "components/ui";
import { HiOutlineFilter } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getSalesDashboardData } from "../store/dataSlice";
import {
  setEndDate,
  setStartDate,
} from "store/delivery_dashboard/dashboardStateSlice";
import dayjs from "dayjs";
import { fetchDataDashboard } from "actions/dashboard.actions";
import { selectDashboardData } from "store/delivery_dashboard/dashboardSlice";
import jwt from 'jwt-decode'

const dateFormat = "DD-MM-YYYY";

const { DatePickerRange } = DatePicker;

const userRole = localStorage.getItem('role')
const token = localStorage.getItem('accessToken')
const store_id = jwt(token)?.payload.store_id;

const SalesDashboardHeader = () => {
  const dispatch = useDispatch();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const startDate = useSelector((state) => state.dashboardState.startDate);
  const endDate = useSelector((state) => state.dashboardState.endDate);

  

  const handleDateChange = (value) => {
    dispatch(setStartDate(value[0]));
    dispatch(setEndDate(value[1]));
  };

  const handleFilter = () => {
    const date = formatDate(startDate);
    const end_date = formatDate(endDate);
    useEffect(() => {
      if (startDate && endDate) {
        if (userRole === 'store'){
          fetchDashboardByStore()
        }else {
          fetchDashboard();
        }
        
      }
    }, [date, end_date]);

    const fetchDashboard = async () => {
      await dispatch(fetchDataDashboard({ date, end_date }));
    };

    const fetchDashboardByStore = async () => {
      await dispatch(fetchDataDashboard({ date, end_date, store_id }));
    }
    
  };

  return (
    <div className="lg:flex items-center justify-between mb-4 gap-3">
      <div className="mb-4 lg:mb-0">
        <h3>Tổng quan đơn hàng</h3>
        {/* <p>View your current sales & summary</p> */}
      </div>
      <div className="flex lg:flex-row items-center gap-3">
        Từ ngày
        <DatePickerRange
          value={[startDate, endDate]}
          onChange={handleDateChange}
          inputFormat={dateFormat}
          size="sm"
        />
        <Button size="sm" icon={<HiOutlineFilter />} onClick={handleFilter()}>
          Lọc
        </Button>
      </div>
    </div>
  );
};

export default SalesDashboardHeader;
