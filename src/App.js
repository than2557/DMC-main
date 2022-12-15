import { Route,Routes,BrowserRouter,Navigate } from 'react-router-dom';
import ReportChart from './Page/chartReport/reportChart';
import Login from './Page/login/login';
import ReportChartTwo from './Page/chartTwo/chartreportTwo';
import Profile from './Page/chartReport/profile';



function App() {
  const token = localStorage.getItem('accessToken');
  const report = localStorage.getItem('report');
let render 
  if(!token) {
    return <Login />
  }

    //  return <BrowserRouter><Routes>
      
    //    <ReportChartTwo  />
    //    </Routes>  </BrowserRouter>

  
// }else{}
  return ( <BrowserRouter><ReportChart/> </BrowserRouter>);





  
}
export default App;
