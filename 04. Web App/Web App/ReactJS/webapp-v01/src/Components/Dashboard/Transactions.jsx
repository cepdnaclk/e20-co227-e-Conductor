import React from 'react'
import CustomTable from '../Tables/Table';

function Transactions() {
  const credits = 500;

  // Dummy data for table body
  const rows = [{
    "id": "54-394-1472",
    "date": "2/23/2024",
    "time": "22:40",
    "description": 'Online\u00a0Top-Up',
    "amount": 2232.43
  }, {
    "id": "04-475-6065",
    "date": "5/14/2024",
    "time": "18:34",
    "description": 'Online\u00a0Top-Up',
    "amount": 3489.10
  }, {
    "id": "62-804-6502",
    "date": "11/18/2023",
    "time": "12:02",
    "description": "nam congue risus semper",
    "amount": 1018.09
  }, {
    "id": "20-112-5909",
    "date": "1/23/2024",
    "time": "23:22",
    "description": "vestibulum sit amet cursus",
    "amount": 4663.60
  }, {
    "id": "59-303-2281",
    "date": "11/30/2023",
    "time": "12:40",
    "description": "consequat",
    "amount": 3208.98
  }, {
    "id": "51-456-5925",
    "date": "1/20/2024",
    "time": "13:51",
    "description": "justo eu massa",
    "amount": 616.82
  }, {
    "id": "78-598-7884",
    "date": "7/26/2023",
    "time": "00:18",
    "description": "proin interdum mauris",
    "amount": 1446.19
  }, {
    "id": "21-922-6002",
    "date": "4/3/2024",
    "time": "14:00",
    "description": 'Online\u00a0Top-Up',
    "amount": 1486.87
  }, {
    "id": "09-240-6417",
    "date": "7/22/2023",
    "time": "04:36",
    "description": "turpis",
    "amount": 3000.82
  }, {
    "id": "70-819-0800",
    "date": "8/31/2023",
    "time": "21:51",
    "description": "eu mi nulla",
    "amount": 412.99
  }, {
    "id": "90-188-8227",
    "date": "11/16/2023",
    "time": "21:40",
    "description": "nunc donec quis",
    "amount": 2402.76
  }, {
    "id": "68-310-0221",
    "date": "2/12/2024",
    "time": "04:30",
    "description": "in magna bibendum imperdiet",
    "amount": 1980.64
  }, {
    "id": "45-238-0811",
    "date": "10/18/2023",
    "time": "18:53",
    "description": "nulla",
    "amount": 2245.53
  }, {
    "id": "35-185-4801",
    "date": "11/15/2023",
    "time": "11:22",
    "description": "ut ultrices vel augue",
    "amount": 3939.22
  }, {
    "id": "88-313-1413",
    "date": "11/21/2023",
    "time": "23:03",
    "description": "vel",
    "amount": 1183.94
  }, {
    "id": "09-911-3125",
    "date": "11/7/2023",
    "time": "04:17",
    "description": "varius",
    "amount": 123.27
  }, {
    "id": "37-071-7661",
    "date": "11/26/2023",
    "time": "10:07",
    "description": "vel lectus",
    "amount": 2596.87
  }, {
    "id": "50-582-5020",
    "date": "6/10/2023",
    "time": "02:10",
    "description": "tristique",
    "amount": 2668.97
  }, {
    "id": "93-557-9009",
    "date": "7/20/2023",
    "time": "07:15",
    "description": "platea dictumst",
    "amount": 2386.79
  }, {
    "id": "85-342-2198",
    "date": "3/20/2024",
    "time": "21:42",
    "description": "ipsum",
    "amount": 2454.39
  }, {
    "id": "55-015-0578",
    "date": "4/12/2024",
    "time": "01:29",
    "description": "nullam orci pede venenatis",
    "amount": 3882.50
  }, {
    "id": "41-631-9931",
    "date": "7/24/2023",
    "time": "03:48",
    "description": "diam neque",
    "amount": 2621.44
  }, {
    "id": "81-070-8487",
    "date": "7/5/2023",
    "time": "21:19",
    "description": "in",
    "amount": 4811.27
  }, {
    "id": "87-306-7246",
    "date": "8/5/2023",
    "time": "23:28",
    "description": "et commodo",
    "amount": 1205.39
  }, {
    "id": "99-709-1629",
    "date": "1/23/2024",
    "time": "06:28",
    "description": "non",
    "amount": 393.8
  }, {
    "id": "16-313-5603",
    "date": "3/23/2024",
    "time": "11:26",
    "description": "metus aenean fermentum donec",
    "amount": 4064.0
  }, {
    "id": "87-075-9655",
    "date": "4/8/2024",
    "time": "23:57",
    "description": "cubilia curae mauris",
    "amount": 1052.79
  }, {
    "id": "44-188-6409",
    "date": "11/4/2023",
    "time": "12:11",
    "description": "integer ac",
    "amount": 4635.92
  }, {
    "id": "20-966-5916",
    "date": "6/6/2024",
    "time": "16:47",
    "description": "nec molestie",
    "amount": 2108.79
  }, {
    "id": "39-715-8385",
    "date": "11/4/2023",
    "time": "00:06",
    "description": "tempus vivamus",
    "amount": 3374.34
  }];
  
  // Dummy data for table header
  const headCells = [
    {
      id: 'id',
      align: 'left',
      label:'Transaction\u00a0ID' 
    },{
      id: 'date',
      align: 'right',
      label:'Date' 
    },{
      id: 'time',
      align: 'right',
      label:'Time\u00a0(Hrs)' 
    },{
      id: 'description',
      align: 'center',
      label:'Description' 
    },{
      id: 'amount',
      align: 'right',
      label:'Amount\u00a0(LKR)' 
    },
  ];
  
  // Dummy filter list
  const filterList = ['Payment', 'Top-Up', 'Refund'];
  

  return (
    <CustomTable
      headerData={headCells}
      bodyData={rows}
      filterData={filterList}
      title={`Available\u00a0Credits: LKR\u00a0${credits}`}
    />
  )
}

export default Transactions
