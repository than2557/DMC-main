import { Route,Routes,BrowserRouter,Navigate } from 'react-router-dom';
import ReportChart from './Page/chartReport/reportChart';
import Login from './Page/login/login';




function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Login />
  }

  return (

         

      <ReportChart />
 
  
   
  );
}
export default App;
