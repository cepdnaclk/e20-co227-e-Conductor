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
    "id": "2735048624",
    "date": "2024-01-28",
    "from": "Bantul",
    "to": "Helsingborg",
    "status": "Used",
    "amount": 1511.28
  }, {
    "id": "4158355141",
    "date": "2024-05-28",
    "from": "Al Jadīd",
    "to": "Bārkhān",
    "status": "Used",
    "amount": 959.61
  }, {
    "id": "7080966116",
    "date": "2023-11-12",
    "from": "Tanjungrejo Lor",
    "to": "Calilegua",
    "status": "Available",
    "amount": 1234.53
  }, {
    "id": "2896893555",
    "date": "2024-02-25",
    "from": "Paulba",
    "to": "Qingchuan",
    "status": "Refunded",
    "amount": 248.85
  }, {
    "id": "5078276874",
    "date": "2024-04-23",
    "from": "Kirovs’k",
    "to": "Phoenix",
    "status": "Refunded",
    "amount": 1604.95
  }, {
    "id": "1470175037",
    "date": "2023-12-11",
    "from": "Pilar",
    "to": "Tagapul-an",
    "status": "Refunded",
    "amount": 154.46
  }, {
    "id": "8634285022",
    "date": "2023-10-22",
    "from": "Tatrang",
    "to": "Kunvald",
    "status": "Available",
    "amount": 1389.87
  }, {
    "id": "7348444687",
    "date": "2024-02-07",
    "from": "Savannah",
    "to": "Panawuan",
    "status": "Refunded",
    "amount": 422.15
  }, {
    "id": "5579200692",
    "date": "2024-04-27",
    "from": "San Jose",
    "to": "Staryy Urukh",
    "status": "Refunded",
    "amount": 1962.13
  }, {
    "id": "4733516169",
    "date": "2023-11-23",
    "from": "Kashihara",
    "to": "Santa Bárbara",
    "status": "Refunded",
    "amount": 1628.18
  }, {
    "id": "3248740566",
    "date": "2023-12-09",
    "from": "Željezno Polje",
    "to": "Naushki",
    "status": "Used",
    "amount": 737.75
  }, {
    "id": "5580212267",
    "date": "2023-08-17",
    "from": "Konibodom",
    "to": "El Potrero",
    "status": "Available",
    "amount": 703.52
  }, {
    "id": "7126960263",
    "date": "2024-02-28",
    "from": "Sumbersewu",
    "to": "Antananarivo",
    "status": "Available",
    "amount": 1157.46
  }, {
    "id": "0399458670",
    "date": "2024-03-09",
    "from": "Kusŏng",
    "to": "Santa Praxedes",
    "status": "Used",
    "amount": 1653.74
  }, {
    "id": "3795253403",
    "date": "2023-09-14",
    "from": "Huaping",
    "to": "Igbor",
    "status": "Available",
    "amount": 1944.14
  }, {
    "id": "3602638073",
    "date": "2024-01-12",
    "from": "Kizema",
    "to": "Janowiec",
    "status": "Used",
    "amount": 407.94
  }, {
    "id": "0617878854",
    "date": "2024-01-13",
    "from": "Cungapmimbo",
    "to": "Minji",
    "status": "Refunded",
    "amount": 352.04
  }, {
    "id": "9658246745",
    "date": "2023-10-11",
    "from": "Nanshe",
    "to": "Widorokandang",
    "status": "Used",
    "amount": 573.71
  }, {
    "id": "4541055112",
    "date": "2024-03-04",
    "from": "Rio Largo",
    "to": "Qian’an",
    "status": "Refunded",
    "amount": 1835.81
  }, {
    "id": "9836913173",
    "date": "2024-01-26",
    "from": "Jardim da Serra",
    "to": "Moorreesburg",
    "status": "Refunded",
    "amount": 1656.37
  }, {
    "id": "6556251186",
    "date": "2023-10-25",
    "from": "Ponggok",
    "to": "Zwierzyniec",
    "status": "Used",
    "amount": 415.97
  }, {
    "id": "2375268172",
    "date": "2023-09-25",
    "from": "Uva",
    "to": "København",
    "status": "Refunded",
    "amount": 1218.39
  }, {
    "id": "9200701701",
    "date": "2023-06-26",
    "from": "Rama",
    "to": "Shenshan",
    "status": "Available",
    "amount": 843.37
  }, {
    "id": "0955620724",
    "date": "2023-06-13",
    "from": "Xinji",
    "to": "Citarik",
    "status": "Refunded",
    "amount": 407.24
  }, {
    "id": "9125456024",
    "date": "2024-05-16",
    "from": "Batulawang",
    "to": "Bousso",
    "status": "Available",
    "amount": 1682.37
  }, {
    "id": "2496726457",
    "date": "2023-11-23",
    "from": "Mrkonjić Grad",
    "to": "Sungi Liput",
    "status": "Used",
    "amount": 1720.31
  }, {
    "id": "3844572732",
    "date": "2024-01-28",
    "from": "Linshui",
    "to": "Malanay",
    "status": "Refunded",
    "amount": 1689.42
  }, {
    "id": "3764749881",
    "date": "2023-10-12",
    "from": "Puncaktugu",
    "to": "Wolomoni",
    "status": "Available",
    "amount": 224.55
  }, {
    "id": "7405819052",
    "date": "2023-11-24",
    "from": "Emiliano Zapata",
    "to": "Topol’noye",
    "status": "Used",
    "amount": 110.91
  }, {
    "id": "3746823420",
    "date": "2023-07-12",
    "from": "Portland",
    "to": "Båstad",
    "status": "Refunded",
    "amount": 43.24
  }, {
    "id": "9588528461",
    "date": "2024-04-18",
    "from": "Dzaoudzi",
    "to": "Lugulu",
    "status": "Refunded",
    "amount": 1811.04
  }, {
    "id": "6375355788",
    "date": "2023-11-03",
    "from": "Artesianón",
    "to": "Kalávryta",
    "status": "Refunded",
    "amount": 1851.12
  }, {
    "id": "4091325920",
    "date": "2024-02-16",
    "from": "Gīdolē",
    "to": "Manhan",
    "status": "Available",
    "amount": 994.06
  }, {
    "id": "0429472331",
    "date": "2024-04-17",
    "from": "Jambubol",
    "to": "Makoua",
    "status": "Refunded",
    "amount": 580.19
  }, {
    "id": "2718086459",
    "date": "2024-02-04",
    "from": "Sikonge",
    "to": "Zaindainxoi",
    "status": "Available",
    "amount": 984.57
  }, {
    "id": "9725911083",
    "date": "2023-12-07",
    "from": "Stockholm",
    "to": "Labinot-Mal",
    "status": "Used",
    "amount": 179.85
  }, {
    "id": "2863055151",
    "date": "2024-06-03",
    "from": "Santa Luzia",
    "to": "Bodzentyn",
    "status": "Available",
    "amount": 572.83
  }, {
    "id": "7057270852",
    "date": "2023-09-10",
    "from": "Miaotang",
    "to": "Detroit",
    "status": "Refunded",
    "amount": 1072.58
  }, {
    "id": "6300568296",
    "date": "2023-07-10",
    "from": "Kamenka",
    "to": "Heiheba",
    "status": "Refunded",
    "amount": 1286.86
  }, {
    "id": "8991900216",
    "date": "2024-04-27",
    "from": "Międzyzdroje",
    "to": "Khenifra",
    "status": "Used",
    "amount": 546.09
  }]
   
  
  // Dummy filter list
  const filterList = ['Available', 'Used', 'Refunded'];

  const AvailableTickets = 20;

  const navigate = useNavigate();

  // Handle Button Click
  const handleButton = (e) =>{
    console.log(`${e.target.id} Clicked`);
    navigate('/');
  }

  return (
    <CustomTable 
      headerData={headCells}
      bodyData={bodyData}
      filterData={filterList}
      filterColumn={'status'}
      title={`Available\u00a0Tickets:\u00a0${AvailableTickets}`}
      button2Label={'View'}
      handleButton={handleButton}
    />
  )
}
