
import React from'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import ExcelData from '../Page/excel/excel';
import ReportChart from '../Page/chartReport/reportChart';
function Rounter() {
    return ( 
        <Routes>
        {/* <Route path='/ReportChart' element={< ReportChart />}></Route>    */}
        <Route path='/ExcelData' element={< ExcelData />}></Route>
        </Routes>
     );
}

export default Rounter;