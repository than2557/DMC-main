
import './chart.css';
// import './nightmode.css';
import React,{useState,useEffect,} from'react';
import {Button,Container,Navbar,Nav,InputGroup,Form,NavDropdown} from 'react-bootstrap';

import LineChart from '../../component/LineChart';
import logo from '../../img/icon.png';
import account from '../../img/account_circle_FILL0_wght400_GRAD0_opsz48.svg';
import  lightbulb from '../../img/lightbulb_FILL0_wght400_GRAD0_opsz48.svg';
import monitoring from '../../img/monitoring_FILL0_wght400_GRAD0_opsz48.svg';
import  logout from '../../img/logout_FILL0_wght400_GRAD0_opsz48.svg';
import 'twin.macro';
import jwt_decode  from "jwt-decode";
import 'chart.js/auto'; 


function ReportChart() {
  
  const options = {
    responsive: true,
    maintainAspectRatio:false
  };
  const labels = [
    "ม.ค.",
    "ก.พ",
    "มี.ค.",
    "เม.ย",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
    "ม.ค."
  ];
  let data 
let LineData = {labels,datasets:[]};
  const [arrDataOption, setArrData] = useState([]);
  const [type, setType] = useState();
  const [state, setState] = useState();
  const [year, setYear] = useState();
  const [ChartData,setChartData] = useState(LineData);
 const [ComTypeList,setComTypeList] = useState([]);
 const [comtype,setComType] = useState()
  const [optionData,setoptiondata] = useState();
  const [id, setId] = useState();
  const [usertype,setUserType] = useState();  
  const [antigen,setantigen] = useState();
  
let data_option;
  let url = "http://localhost:3005/DmscReportGateway/api/v1/report02/systemlist";
let data_option3;

const fetchData = async() => {
  await fetch(url,{
    method:'POST', 
  }).then(optionData =>optionData.json().then(data=>({data: data,
    status: optionData.status})).then(res =>{
      data_option  = res.data.systemlist;
      
      // console.log(data_option)
      setArrData(data_option)
      return data_option;
    }));
}


const comType = async() =>{
 // let urlR = "http://192.168.33.81:9877/DmscReportGateway/api/v1/report03/comtypelist";
 let url = "http://localhost:3005/DmscReportGateway/api/v1/report03/comtypelist";
  await fetch(url,{
    method:'POST', 
  }).then(optionData =>optionData.json().then(data=>({data: data})).then(res =>{
      data_option3  = res.data.comtypelist;
   //   console.log(data_option3)
      setComTypeList(data_option3)
      return data_option3;
    }));
  
}
useEffect(() => {
  fetchData();
  comType();
}, [])







  
  
  let token = localStorage.getItem("accessToken");
  let decodeJwt = jwt_decode(token);
  // console.log(decodeJwt.uname);
  let Authorization = 'Bearer'+' '+token;
 
 // let url = `http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/systemlist`;


 const SerachDataTree =  async() => {
  
  let data_res

 data = {usertype,comtype,year};
  
  // console.log(data);
 
  // console.log(token);
 




  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/data';
  
  // let url = 'http://localhost:3005/reportData';

  const response =  await fetch(process.env.REACT_APP_URL_REPORT_TREE,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          
          data_res = res.data;
          // console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));
     
      
}


const SerachDataTwo =  async() => {
  
  let data_res

 data = {id,year};
  
  // console.log(data);
 
  // console.log(token);
 




  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report02/data';
  // // let url = 'http://localhost:3005/reporttree'
  // let url = 'http://localhost:3005/reportData';

  const response =  await fetch(process.env.REACT_APP_URL_REPORT_TWO,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          
          data_res = res.data;
          // console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));
     
      
}

const SerachDataone = async() =>{
  let data_res

  let data = {type,state,year};
  

  let token = localStorage.getItem("accessToken");

  let Authorization = 'Bearer'+' '+token;

  // let url ='http://192.168.33.54:9877/DmscReportGateway/api/v1/report/01';
  // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report01/data';
   // let url = 'http://192.168.33.81:9877/DmscReportGateway/api/v1/report01/data';
  let url = 'http://localhost:3005/getreportone';

  const response =  await fetch(process.env.REACT_APP_URL_REPORT_ONE,{
    method:'POST', 
    mode: 'cors',
    body: JSON.stringify(data),
    headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    }
  }).then(response =>response.json().then(data=>({data: data,
        status: response.status})).then(res =>{
          // console.log(res);
          data_res = res.data;
          // console.log(data_res);
          if(data_res.status){

            setChartData({labels,datasets:data_res.datasets})
          }else{
            setChartData({labels,datasets:[]})
          }
          
      
         
        }));


}


const Logout = ()=>{
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}
const GetReportwo = ()=>{
  document.getElementById('report2').style.display ='block';
  document.getElementById('report3').style.display = 'none';
  document.getElementById('report1').style.display = 'none';
  setChartData({labels,datasets:[]});
  document.getElementById('Excel1').style.display = 'none';
}
const GetReporone = ()=>{
  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'block';
  document.getElementById('report3').style.display = 'none';
  setChartData({labels,datasets:[]});
  document.getElementById('Excel1').style.display = 'none';
}
const GetReporoneTree = ()=>{

  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'none';
  document.getElementById('report3').style.display = 'block';
  setChartData({labels,datasets:[]});
  document.getElementById('Excel1').style.display = 'none';
}
const getExcelData = ()=>{
  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'none';
  document.getElementById('report3').style.display = 'none';
  document.getElementById('Excel1').style.display = 'block';
  setChartData({labels,datasets:[]});
}


// const optionsExcelAntigen = selectExcel(Authorization);


function checkpermission(event){
  // console.log(event.target.value);
  let permission = parseInt(event.target.value);
 
  switch(permission){
    case 0:
      document.getElementById('comtype').disabled= true;
      document.getElementById('comtype').value = null;
      setUserType(permission);
      setComType(null);
      break;
    case 2:
      document.getElementById('comtype').disabled= true;
      document.getElementById('comtype').value = null;
      setUserType(permission);
      setComType(null);
      break;
    default:
      document.getElementById('comtype').disabled= false;
      setUserType(permission);
      break;
  }
  
}

// console.log(antigen);
  return (
    


    <div style={{"height":1980}}>
      
        <Navbar bg="light"  expand="lg" className="backgourndColormand">
      <Container fluid>
        <Navbar.Brand><img  className="Nav" src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
          
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   DMC-REPORT
          </Nav>
          {/* <span class="material-symbols-outlined">
lab_profile
</span>
&nbsp;&nbsp;
          <NavDropdown   title="รายงานEXCELL" id="basic-nav-dropdown" style={{'margin-right':50}}>
            
              <NavDropdown.Item>
              <a onClick={getExcelData}>excell01</a>
              </NavDropdown.Item>

              <NavDropdown.Item>
              <a>excell02</a>
              </NavDropdown.Item>
 
              <NavDropdown.Item>
             <a >excell03</a>  
              </NavDropdown.Item>
              
              <NavDropdown.Item >
              <a >excell04</a>  
              </NavDropdown.Item>
              
              <NavDropdown.Item>
              <a>excell05</a>
          
              </NavDropdown.Item>
              
              <NavDropdown.Item>
              <a>excell06</a>
          
              </NavDropdown.Item>
              
              <NavDropdown.Item>
              <a>excell07</a>
          
              </NavDropdown.Item>
              
            </NavDropdown> */}
          <span class="material-symbols-outlined">
          <img  className="Nav" src={monitoring} alt="monitoring" />
</span>
&nbsp;&nbsp;&nbsp; <NavDropdown   title="รายงาน" id="basic-nav-dropdown" style={{'margin-right':20}}>
            
              <NavDropdown.Item>
              <a onClick={GetReporone} >หนังสือรับรองการแจ้ง/ใบอนุญาต</a>
          
              </NavDropdown.Item>
              <NavDropdown.Item>
              <a onClick={GetReportwo}>บัญชีผู้ใช้งานระบบบูรณาการ</a>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item>
             <a onClick={GetReporoneTree}>บัญชีผู้ใช้งานระบบสนับสนุน</a>  
              </NavDropdown.Item>
              
            </NavDropdown>
            <span class="material-symbols-outlined">
            <img  className="Nav" src={account} alt="account" />  
</span>&nbsp;&nbsp;&nbsp;
            <NavDropdown   title={decodeJwt.uname} id="basic-nav-dropdown" style={{'margin-right':50}}>
              <NavDropdown.Item>
              <button  type="button" class="btn btn-light" onClick={Logout}>ออกจากระบบ     <span class="material-symbols-outlined">
            <img  className="Nav" src={logout} alt="logout" />  
</span></button>
         
              </NavDropdown.Item>
            </NavDropdown>
       
        </Navbar.Collapse>
        <span class="material-symbols-outlined">
<img  className="Nav" src={lightbulb} alt="lightbulb" />  
</span>
      </Container>
    </Navbar>

    {/* hello side bar*/}
    
    <br/>

   
{/* excel data  begin*/}
{/* <div className="card col-md-8 center" id="Excel1" style={{"display":"none"}}>
      
  <div className="container">
    รายงานEXCEL 1
  <div className="row">
    <div className="col">
 <br/>
 <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">รหัสเชื้อโรค </InputGroup.Text>
      <Select className="basic-multi-select selectEXcelOne"
                 classNamePrefix="หน่วยงาน"
                 isMulti
           options={optionsExcelAntigen} id="Antigen" name="Antigen" onChange={(chioce) => {setantigen(chioce)}} />
      </InputGroup> 
    </div>
    <div className="col">
    <br/> 
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">หน่วยงาน </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          id="username" name="username"
        />
      </InputGroup>
 
    </div>
 
    <div className="col">
    <br/>
  
      <Button onClick={SerachDataTree}>ค้นหาข้อมูล</Button>
    </div>
    
  </div>
</div>
  </div> */}

{/* excel data end*/}
    <div className="card col-md-8 center" id="report3" style={{"display":"none"}}>
      <input id="inputreport3" value="report3"  hidden/>
  <div className="container">
    รายงานบัญชีผู้ใช้งานระบบสนับสนุนพระราชบัญญัติเชื้อโรคและพิษจากสัตว์ออนไลน์
  <div className="row">
    <div className="col">
 <br/>
 <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">สิทธิการใช้งาน </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="usertype" name="usertype" onChange={checkpermission}>
      <option value="" >--สิทธิการใช้งาน--</option>
      <option value="1" >ผู้ใช้งานทั้วไป</option>
      <option value="2" >ผู้ดูแลระบบ</option>
      <option value="0" >ไม่สมารถระบุได้</option>
      </Form.Select>
      </InputGroup> 
    </div>
    <div className="col">
    <br/> 
    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">ประเภทหน่วยงาน </InputGroup.Text>
        <Form.Select aria-label="Default select example" id="comtype" name="comtype" onChange={e=>setComType(e.target.value)}>
        <option value="0" selected="">--ประเภทหน่วยงาน--</option>
        {
        ComTypeList.map((e)=>(<option value={e}>{e}</option>))
        }
    </Form.Select>
      </InputGroup>
      {/* <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">หน่วยงานเชื่อมโยง </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="agency" name="agency" onChange={e=>setagency(parseInt(e.target.value))}>
      <option value="0" selected="">กรมการปกครอง</option>
      <option value="1">กรมพัฒนาธุรกิจ</option>
      <option value="2">กรมสรรพกร</option>
      </Form.Select>
      </InputGroup> */}
    </div>
    <div className="col">
    <br/>
    <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1">ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
  
      <Button onClick={SerachDataTree}>ค้นหาข้อมูล</Button>
    </div>
    
  </div>
</div>
  </div>
    {/* end of form tree */}
    <div className="card col-md-8 center" id="report2" style={{"display":"none"}}>
      <input id="inputreport2" value="report2"  hidden/>
  <div className="container">
      รายงานบัญชีผู้ใช้งานระบบบูรณาการข้อมูลประชาขนและการบริการภาครัฐ
  <div className="row">
    <div className="col">
 <br/>
    
    </div>
    <div className="col">
    <br/> 
    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1" style={{height:40}}>ระบบงาน</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="id" name="id" onChange={e=>setId(parseInt(e.target.value))}>
        <option value="0" selected="">--ระบบงาน--</option>
        {arrDataOption.map((d)=>(<option key={d.id} id={d.id} value={d.id}>{d.name}</option>))}

    </Form.Select>
      </InputGroup>
      {/* <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">หน่วยงานเชื่อมโยง </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="agency" name="agency" onChange={e=>setagency(parseInt(e.target.value))}>
      <option value="0" selected="">กรมการปกครอง</option>
      <option value="1">กรมพัฒนาธุรกิจ</option>
      <option value="2">กรมสรรพกร</option>
      </Form.Select>
      </InputGroup> */}
    </div>
    <div className="col">
    <br/>
    <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1"  style={{height:40}}>ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachDataTwo}>ค้นหาข้อมูล</Button>
    </div>
  </div>
</div>
  </div>
{/* <div>end form report 2</div> */}

  <div className="card col-md-8 center" id="report1" style={{"display":"block"}}>
  <input id="inputreport1" value="report1"  hidden/>
  <div className="container">
  รายงานผลการดำเนินการเกี่ยวกับหนังสือรับรองการแจ้ง/ใบอนุญาต
  <div className="row">
    <div className="col">
 <br/>
      <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1"  style={{height:40}}>ประเภท</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="type" name="type" onChange={e=>setType(parseInt(e.target.value))}>
        <option value="0" selected="">เลือกประเภท</option>
      <option value="1">ใบอนุญาต</option>
      <option value="2">หนังสือรับรอง</option>
    </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1"  style={{height:40}}>สถานะ</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="state" name="state" onChange={e=>setState(parseInt(e.target.value))}>
      <option value="0" selected="">รอยืนเอกสาร</option>
      <option value="1">ยื่นคำขอ</option>
      <option value="2">หลักฐานในการยื่นไม่ครบถ้วน</option>
      <option value="3">แบบตรวจสถานที่ไม่ครบถ้วน</option>
      <option value="4">รอพิจารณาเอกสารลักษณะของสถานที่ ครั้งที่ 1</option>
      <option value="5">รอผลออกตรวจสอบสถานที่</option>
      <option value="6">รอพิจารณาอนุมัติ</option>
      <option value="7">รอผู้ประกอบการชำระค่าธรรมเนียม</option>
      <option value="8">อนุมัติคำขอเรียบร้อย</option>
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <InputGroup className="mb-2">
      <InputGroup.Text id="basic-addon1"  style={{height:40}}>ปี</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="year" name="year" onChange={e=>setYear(e.target.value)}>
      <option value="0" selected="">--เลือกปี--</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2020">2019</option>
      <option value="2020">2018</option>
   
      </Form.Select>
      </InputGroup>
    </div>
    <div className="col">
    <br/>
      <Button onClick={SerachDataone}>ค้นหาข้อมูล</Button>
    </div>
  </div>
</div>
  </div>
<br/>

  <div className="card container">
    <div className="row" id="chartID">

    <LineChart options={options} ChartData={ChartData}/>
    </div>
   
      </div>
{/* 
      <Footer/> */}
    </div> 

  
  );
}



export default ReportChart;

