import React, { useEffect } from "react";
import { AdaptableCard } from "components/shared";

import { Link, useLocation } from "react-router-dom";
import UserRegisForm from "./components/UserRegisForm";

// injectReducer('store', reducer)

const StoreCreate = () => {
  const { state } = useLocation();
  const { store_name, store_id } = state; // Read values passed on state

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">
          {" "}
          Tạo tài khoản - {store_name ? store_name : ""}{" "}
        </h3>{" "}
        <Link
          // activeClass="text-gray-900 dark:text-gray-50"
          className="cursor-pointer block transform transition-colors duration-200 py-2 hover:text-gray-900 dark:hover:text-gray-100"
          to="/delivery-store"
        >
          Back{" "}
        </Link>{" "}
      </div>{" "}
      <UserRegisForm state={state} />{" "}
    </AdaptableCard>
  );
};

export default StoreCreate;
