import axios from 'axios';
import React, { useEffect } from 'react'
import { apiListStore } from 'services/AuthService';
import SalesDashboardHeader from './dashboard/components/SalesDashboardHeader';
import SalesDashboardBody from './dashboard/components/SalesDashboardBody';


const Home = () => {

    return (
        <div className="flex flex-col gap-4 h-full">
            <SalesDashboardHeader />
            <SalesDashboardBody />
        </div>
    )
}

export default Home
