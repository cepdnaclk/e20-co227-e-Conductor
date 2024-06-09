import React from 'react'
import CustomTable from '../Tables/Table'
import { useNavigate } from 'react-router-dom';

export default function Tickets({ language }) {
  // Dummy data for table header
  const headCells = [
    {
      id: 'id',
      align: 'left',
      label:'Ticket\u00a0No' 
    },{
      id: 'date',
      align: 'left',
      label:'Date' 
    },{
      id: 'from',
      align: 'left',
      label:'From' 
    },{
      id: 'to',
      align: 'left',
      label:'To' 
    },{
      id: 'status',
      align: 'center',
      label:'Ticket\u00a0Status' 
    },{
      id: 'amount',
      align: 'right',
      label:'Price\u00a0(LKR)' 
    }
  ];

  // Dummy data for table rows
  const bodyData = [{
    "id": "6731061654",
    "date": "2023-08-03",
    "from": "Were Īlu",
    "to": "Neópolis",
    "status": "Refunded",
    "amount": 1777.56
  }, {
    "id": "4513884975",
    "date": "2024-03-20",
    "from": "Le Port",
    "to": "Zaqatala",
    "status": "Not Used",
    "amount": 593.19
  }, {
    "id": "8407961310",
    "date": "2023-07-26",
    "from": "Bassano",
    "to": "Shuigou",
    "status": "Used",
    "amount": 1078.24
  }, {
    "id": "4773824336",
    "date": "2023-10-17",
    "from": "Jaunpiebalga",
    "to": "Kupiskis",
    "status": "Refunded",
    "amount": 968.25
  }, {
    "id": "4199645128",
    "date": "2024-04-08",
    "from": "Xiancun",
    "to": "Tabou",
    "status": "Not Used",
    "amount": 473.49
  }, {
    "id": "5079452749",
    "date": "2024-01-27",
    "from": "Las Carreras",
    "to": "T’aebaek",
    "status": "Not Used",
    "amount": 633.1
  }, {
    "id": "3435763434",
    "date": "2023-08-01",
    "from": "Turze Pole",
    "to": "Mansôa",
    "status": "Not Used",
    "amount": 1345.86
  }, {
    "id": "7399048983",
    "date": "2023-12-24",
    "from": "Gandi",
    "to": "Rosario de Mora",
    "status": "Refunded",
    "amount": 271.11
  }, {
    "id": "6375947286",
    "date": "2024-03-18",
    "from": "Pousada",
    "to": "Dashu",
    "status": "Used",
    "amount": 1628.05
  }, {
    "id": "0977363422",
    "date": "2023-06-22",
    "from": "Zhaoxian",
    "to": "Kovrov",
    "status": "Used",
    "amount": 1466.33
  }, {
    "id": "2380278644",
    "date": "2023-12-06",
    "from": "Ngembel",
    "to": "Bariri",
    "status": "Not Used",
    "amount": 985.55
  }, {
    "id": "7420000751",
    "date": "2024-03-08",
    "from": "Penteado",
    "to": "Dobra",
    "status": "Refunded",
    "amount": 1731.49
  }, {
    "id": "1756044252",
    "date": "2023-07-04",
    "from": "Saint John’s",
    "to": "Ijero-Ekiti",
    "status": "Used",
    "amount": 1921.14
  }, {
    "id": "9976727461",
    "date": "2023-08-20",
    "from": "Paris 16",
    "to": "Thành Phố Bà Rịa",
    "status": "Refunded",
    "amount": 392.9
  }, {
    "id": "2712431944",
    "date": "2024-06-02",
    "from": "Skorogoszcz",
    "to": "Sukhothai",
    "status": "Refunded",
    "amount": 1847.47
  }, {
    "id": "8288770304",
    "date": "2023-10-06",
    "from": "Lusambo",
    "to": "Nuquí",
    "status": "Refunded",
    "amount": 1332.27
  }, {
    "id": "1319955479",
    "date": "2023-11-19",
    "from": "Fredericton",
    "to": "Nagrog Wetan",
    "status": "Refunded",
    "amount": 1217.4
  }, {
    "id": "9943861878",
    "date": "2024-03-14",
    "from": "Liji",
    "to": "Klavdiyevo-Tarasove",
    "status": "Used",
    "amount": 1866.83
  }, {
    "id": "9408196864",
    "date": "2024-03-01",
    "from": "El Paso",
    "to": "Henggang",
    "status": "Used",
    "amount": 173.63
  }, {
    "id": "2666169367",
    "date": "2023-12-21",
    "from": "Lasi Dua",
    "to": "Fengyang Fuchengzhen",
    "status": "Not Used",
    "amount": 683.62
  }]  
  
  // Dummy filter list
  const filterList = ['Used', 'Not\u00a0Used', 'Refunded'];

  const navigate = useNavigate();

  // Handle Button Click
  const handleButton = () =>{
    console.log('Button Clicked');
    navigate('/');
  }

  return (
    <CustomTable 
      headerData={headCells}
      bodyData={bodyData}
      buttonDisable={false}
      filterData={filterList}
      filterColumn={'status'}
      title={'Ticket\u00a0History'}
      buttonLabel={'View'}
      handleButton={handleButton}
    />
  )
}
