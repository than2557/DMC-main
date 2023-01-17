import { Route,Routes,BrowserRouter,Navigate } from 'react-router-dom';
import ReportChart from './Page/chartReport/reportChart';
import Login from './Page/login/login';
import ReportChartTwo from './Page/chartTwo/chartreportTwo';
import Profile from './Page/chartReport/profile';
import Rounter from './rounter/rounter';
import ExcelData from './Page/excel/excel';

function App() {
  
  const token = localStorage.getItem('accessToken');


  if(!token) {
    return <Login />
  }

    //  return <BrowserRouter><Routes>
      
    //    <ReportChartTwo  />
    //    </Routes>  </BrowserRouter>

  return (<><ReportChart/></> );
  
}
export default App;
