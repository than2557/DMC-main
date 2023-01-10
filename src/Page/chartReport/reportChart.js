
import './chart.css';
// import './nightmode.css';
import React,{useState,useEffect,useRef} from'react';
import {Button,Container,Navbar,Nav,InputGroup,Form,NavDropdown} from 'react-bootstrap';

import LineChart from '../../component/LineChart';
import logo from '../../img/icon.png';
import account from '../../img/account_circle_FILL0_wght400_GRAD0_opsz48.svg';
import  lightbulb from '../../img/lightbulb_FILL0_wght400_GRAD0_opsz48.svg';
import monitoring from '../../img/monitoring_FILL0_wght400_GRAD0_opsz48.svg';
import doccument from '../../img/description_FILL0_wght400_GRAD0_opsz48.svg';
import  logout from '../../img/logout_FILL0_wght400_GRAD0_opsz48.svg';
import search from '../../img/search_FILL0_wght200_GRAD-25_opsz20.svg';
import 'twin.macro';
import jwt_decode  from "jwt-decode";
import 'chart.js/auto'; 
import { MDBFooter,MDBBtn,MDBBtnGroup, MDBIcon } from 'mdb-react-ui-kit';
import MovingText from 'react-moving-text'
import axios from 'axios';
import Swal from 'sweetalert2';
import FileDownload from 'react-file-download';
import blob  from 'blob';
import * as XLSX from 'xlsx/xlsx.mjs';



function ReportChart() {
  

  let token = localStorage.getItem("accessToken");
  let decodeJwt = jwt_decode(token);
  let Authorization = 'Bearer'+' '+token;
 
const checkAccessToken = async()=>{
  if(new Date(decodeJwt.exp) < new Date()){
    new Swal("Failed","Token error");
    console.log("Error Token");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
}
  const reportPDF = useRef(null);



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
  const [systemname,setSystemName] = useState();
  
let data_option;

let data_option3;
const comType = async() =>{
    await fetch(process.env.REACT_APP_ComType_List_R03,{method:'GET',headers:{ Authorization:Authorization}}).then(optionData =>optionData.json().then(data=>({data: data,
      status: optionData.status})).then(res =>{
        data_option3  = res.data.data.comtypelist;
        setComTypeList(data_option3)
         return data_option3;
      }));
}
    


  const SystemLIstData = async() => {

    await fetch(process.env.REACT_APP_SYSTEM_LIST_R02,{method:'GET',headers:{ Authorization:Authorization}}).then(optionData =>optionData.json().then(data=>({data: data,
          status: optionData.status})).then(res =>{
          setArrData(res.data.data.systemlist)
            return res;
          }));
  }

  useEffect(() => {
    SystemLIstData();
    comType();
    checkAccessToken();

}, [])




const Dowloadfile = async(data) => {

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  const formattedToday = dd + '-' + mm + '-' + yyyy;
let typeDowload = {'typedata':data};
console.log(typeDowload);
let body = {type,state,year,typeDowload};
// let url = `http://192.168.33.80:9877/DmscReportGateway/api/v1/chart/report01/data/${typeDowload.typedata}`;
await axios(process.env.REACT_APP_URL_DOWLOAD_EXCELL_PDF,{
method: 'post', 
headers: {'Content-Type': 'application/json', "Authorization":Authorization},
params: {typeDowload,type,state,year},
}).then(response =>{
 
if(response.data.status){
  var link = document.createElement('a');
  link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(response.data.data);
  link.setAttribute('download',formattedToday+response.data.filename);

  link.style.display = 'none';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}else{
  throw new Error('DATA FOT FOUND');
}
 
}) .catch(error => {
  console.log(error);
});
}

const Dowloadfile02 = async (data) => {

const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  const formattedToday = dd + '-' + mm + '-' + yyyy;
let typeDowload = {'typedata':data};

let body = {typeDowload,id,year,systemname};
// let url = `http://192.168.33.80:9877/DmscReportGateway/api/v1/chart/report01/data/${typeDowload.typedata}`;
await axios(process.env.REACT_APP_URL_DOWLOAD_EXCELL_PDF02,{
method: 'post', 
headers: {'Content-Type': 'application/json', "Authorization":Authorization},
params: body,
}).then(response =>{
  // console.log(response.data);
if(response.data.status){
  var link = document.createElement('a');
  link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(response.data.data);
  link.setAttribute('download',formattedToday+response.data.filename);

  link.style.display = 'none';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}else{
  throw new Error('DATA FOT FOUND');
}
 
}) .catch(error => {
  console.log(error);
});

}

const Dowloadfile03 = async(data) =>{
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  const formattedToday = dd + '-' + mm + '-' + yyyy;
let typeDowload = {'typedata':data};

let body = {typeDowload,usertype,comtype,year};
 

await axios(process.env.REACT_APP_URL_DOWLOAD_EXCELL_PDF03,{
method: 'post', 
headers: {'Content-Type': 'application/json', "Authorization":Authorization},
params: body,
}).then(response =>{
  // console.log(response.data);
if(response.data.status){
  var link = document.createElement('a');
  link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(response.data.data);
  link.setAttribute('download',formattedToday+response.data.filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}else{
  throw new Error('DATA FOT FOUND');
}
 
}) .catch(error => {
  console.log(error);
});

}

const SerachDataTree =  async() => {
 data = {usertype,comtype,year};
 const getDataTree =  await getreportData(process.env.REACT_APP_URL_REPORT_TREE,data,Authorization);
//  console.log(getDataTree);
 if(getDataTree.status){

  setChartData({labels,datasets:getDataTree.data.datasets})
 }
   else{
    console.log("NOT FOUND")
    Swal.fire({
      title: 'ไม่พบข้อมูล!',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    })
    let label = [] 
    setChartData({label,datasets:[]});    
  } 
}

const SerachDataTwo =  async() => {
  

  data = {id,year,systemname};
  const getDataTwo =  await getreportData(process.env.REACT_APP_URL_REPORT_TWO,data,Authorization);
  // console.log(getDataTwo);
  if(getDataTwo.status){
 
   setChartData({labels,datasets:getDataTwo.data.datasets})
  }
    else{
     console.log("NOT FOUND")
     Swal.fire({
       title: 'ไม่พบข้อมูล!',
       icon: 'error',
       confirmButtonText: 'ตกลง'
     })
     let label = [] 
     setChartData({label,datasets:[]});    
   }
}

const SerachDataone = async() =>{

  
  data = {type,state,year};
  const getDataOne=  await getreportData(process.env.REACT_APP_URl_DATAMOCK_LOCAL,data,Authorization);
  // console.log(getDataOne);
  if(getDataOne.status){
   setChartData({labels,datasets:getDataOne.data.datasets})
  }
    else{
     console.log("NOT FOUND")
     console.log(getDataOne);
     Swal.fire({
       title: getDataOne.data,
       icon: 'error',
       confirmButtonText: 'ตกลง'
     })
     let label = [] 
     setChartData({label,datasets:[]});    
   }
}


const Logout = ()=>{
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}
const GetReportwo = event =>{
  let el = document.getElementById("report2");
  if(el !== null){
    document.getElementById('report2').style.display ='block';
    document.getElementById('report3').style.display = 'none';
    document.getElementById('report1').style.display = 'none';
    setChartData({labels,datasets:[]});
    document.getElementById('Excel1').style.display = 'none';
  }

}
const GetReporone = ()=>{
  let el = document.getElementById("report1");
  if(el !== null){
  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'block';
  document.getElementById('report3').style.display = 'none';
  setChartData({labels,datasets:[]});
  document.getElementById('Excel1').style.display = 'none';
  }
}
const GetReporoneTree = ()=>{
  let el = document.getElementById("report3");
  if(el !== null){
  document.getElementById('report2').style.display ='none';
  document.getElementById('report1').style.display = 'none';
  document.getElementById('report3').style.display = 'block';
  setChartData({labels,datasets:[]});
  document.getElementById('Excel1').style.display = 'none';
}
}

// const getExcelData = ()=>{
//   document.getElementById('report2').style.display ='none';
//   document.getElementById('report1').style.display = 'none';
//   document.getElementById('report3').style.display = 'none';
//   document.getElementById('Excel1').style.display = 'block';
//   setChartData({labels,datasets:[]});
// }







function checkpermission(event){

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


  return (
    


    <div style={{"height":970,"background-color": 'rgb(175 165 165 / 20%)'}}>
      
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
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         

<MovingText
 type="effect3D"
 duration="3000ms"
 delay="20s"
 direction="normal"
 timing="ease-in-out"
 iteration="infinite"
 fillMode="backwards">
  DMSC - REPORT
</MovingText> 
          </Nav>
          <br/>
          {/* <span class="material-symbols-outlined">
          <img  className="Nav" src={doccument} alt="monitoring" />
</span>

          <NavDropdown   title="รายงานEXCELL" id="basic-nav-dropdown" style={{'margin-right':15}}>
            
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
              <li onClick={GetReporone}><a>หนังสือรับรองการแจ้ง/ใบอนุญาต</a></li>
              </NavDropdown.Item>
              <NavDropdown.Item>
              <li onClick={GetReportwo}><a>บัญชีผู้ใช้งานระบบบูรณาการ</a></li>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item>
             <li onClick={GetReporoneTree}><a>บัญชีผู้ใช้งานระบบสนับสนุน</a></li>
              </NavDropdown.Item>
              
            </NavDropdown>
            <span class="material-symbols-outlined">
            <img  className="Nav" src={account} alt="account" />  
</span>&nbsp;&nbsp;&nbsp;
            <NavDropdown   title={decodeJwt.uname} id="basic-nav-dropdown" style={{'margin-right':50}}>
              <NavDropdown.Item>
              <button  type="button" class="btn btn-light" onClick={Logout}>ออกจากระบบ<span class="material-symbols-outlined">
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


{/* excel data end*/}
    <div className="card col-md-8 center" id="report3" style={{"display":"none","width":1300,"height":100}}>
      <input id="inputreport3" value="report3"  hidden/>
  <div className="container">
  <p style={{"margin-top":-25}}> รายงานบัญชีผู้ใช้งานระบบสนับสนุนพระราชบัญญัติเชื้อโรคและพิษจากสัตว์ออนไลน์ </p>
  <div className="row">
    <div className="col">

 <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1"  style={{height:40}}>สิทธิการใช้งาน </InputGroup.Text>
      <Form.Select aria-label="Default select example" id="usertype" name="usertype" onChange={checkpermission}>
      <option value="" >--สิทธิการใช้งาน--</option>
      <option value="1" >ผู้ใช้งานทั้วไป</option>
      <option value="2" >ผู้ดูแลระบบ</option>
      <option value="0" >ไม่สมารถระบุได้</option>
      </Form.Select>
      </InputGroup> 
    </div>
    <div className="col">
    
    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1"  style={{height:40}}>ประเภทหน่วยงาน </InputGroup.Text>
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
      
      <MDBBtnGroup aria-label='Basic example'>
      <MDBBtn  onClick={SerachDataTree} style={{backgroundColor:'#4896f0'}}>ค้นหาข้อมูล</MDBBtn>  
      <MDBBtn  onClick={()=>Dowloadfile03('pdf')}  style={{ backgroundColor: '#f23f3f' }}>
         PDF
        </MDBBtn>
      <MDBBtn   onClick={()=>Dowloadfile03('excel')}  color='success'>Excell</MDBBtn>
       
      </MDBBtnGroup>
      </div>
    
  </div>
</div>
  </div>
    {/* end of form tree */}
    <div className="card col-md-8 center" id="report2" style={{"display":"none","width":1300,"height":100}}>
      <input id="inputreport2" value="report2"  hidden/>
  <div className="container">
  <p style={{"margin-top":-25}}>  รายงานบัญชีผู้ใช้งานระบบบูรณาการข้อมูลประชาชนและการบริการภาครัฐ</p>
  <div className="row">
    <div className="col">

    
    </div>
    <div className="col">

    <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1" style={{height:40}}>ระบบงาน</InputGroup.Text>
        <Form.Select  onChange={e=>{
          const select = e.target;
          setId(parseInt(e.target.value)) 
          setSystemName(select.selectedOptions[0].text)
          }}>
        <option value="0" name="ระบบงาน" selected="">--ระบบงาน--</option>
        {arrDataOption.map((d)=>(<option class={d.name} key={d.id} id={d.name} value={d.id} name={d.name}>{d.name}</option>))}

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
      
      <MDBBtnGroup aria-label='Basic example'>
      <MDBBtn  onClick={SerachDataTwo} style={{backgroundColor:'#4896f0'}}>ค้นหาข้อมูล</MDBBtn>  
      <MDBBtn onClick={()=>Dowloadfile02('pdf')} style={{ backgroundColor: '#f23f3f' }}>
       PDF
      </MDBBtn>
    <MDBBtn  onClick={()=>Dowloadfile02('excel')} color='success'>Excell</MDBBtn> 
       
      </MDBBtnGroup>
      </div>
  </div>
</div>
  </div>
{/* <div>end form report 2</div> */}

  <div className="card col-md-8 center" id="report1" style={{"display":"block","width":1300,"height":100}}>
  <input id="inputreport1" value="report1"  hidden/>
  <div className="container">
<p style={{"margin-top":-25}}>  รายงานผลการดำเนินการเกี่ยวกับหนังสือรับรองการแจ้ง/ใบอนุญาต</p>
  <div className="row">
    <div className="col">
 
      <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1"  style={{height:40}}>ประเภท</InputGroup.Text>
        <Form.Select aria-label="Default select example" id="type" name="type" onChange={e=>setType(parseInt(e.target.value))}>
        <option value="0" selected="">--เลือกประเภท--</option>
      <option value="1">ใบอนุญาต</option>
      <option value="2">หนังสือรับรอง</option>
    </Form.Select>
      </InputGroup>
    </div>
    <div className="col">

      <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1"  style={{height:40}}>สถานะ</InputGroup.Text>
      <Form.Select aria-label="Default select example" id="state" name="state" onChange={e=>setState(parseInt(e.target.value))}>
      <option value="null">--เลือกสถานะ--</option>
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
      
    <MDBBtnGroup aria-label='Basic example'>
    <MDBBtn  onClick={SerachDataone} style={{backgroundColor:'#4896f0'}}>ค้นหาข้อมูล</MDBBtn>  
    <MDBBtn onClick={()=>Dowloadfile('pdf')} style={{ backgroundColor: '#f23f3f' }}>
       PDF
      </MDBBtn>
    <MDBBtn  onClick={()=>Dowloadfile('excel')} color='success'>Excell</MDBBtn> 
     
    </MDBBtnGroup>
    </div>
 
  
    
  </div>
</div>
  </div>
  <br/>
  <div className="card container">
    <div className="row"  id="chartID" style={{height:450}} ref={reportPDF}>

    <LineChart  options={options} ChartData={ChartData} />
    </div>
   
      </div>
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      

<MDBFooter bgColor='light' className='text-center text-lg-left backgourndColormand' style={{height:55}}>
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' >
        ระบบสนับสนุนพระราชบัญญัติเชื้อโรคและพิษจากสัตว์ออนไลน์ V1.0
        </a>
      </div>
    </MDBFooter>
    </div> 
  );
}

async function getreportData(url,data,Authorization){
  const response = await axios({
    method: 'get',
    url: url,
      headers:{ 
      'content-type': 'application/json;UTF-8',
      'Authorization':Authorization
    },
    params: data
  });
  if(response.data.data.status){
    return {"status":true,"data":response.data.data}
  }
  else{
    if(response.data.data.variable){
      
      return {"status":false,"data":"validate data error"+response.data.data.variable}
    }
    return {"status":false,"data":"Data not found"}
  }
}

export default ReportChart;

