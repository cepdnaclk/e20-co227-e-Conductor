import React from 'react'
import CustomTable from '../Tables/Table';

function Transactions({ language }) {
  const credits = 500;

  // Dummy data for table body
  const rows = [{
    "id": "3168411663",
    "date": "2023-09-28",
    "time": "18:05",
    "description": "Top-up",
    "amount": "2691.84"
  }, {
    "id": "0493819959",
    "date": "2023-11-21",
    "time": "05:02",
    "description": "Top-up",
    "amount": "493.86"
  }, {
    "id": "5007381039",
    "date": "2023-06-12",
    "time": "13:09",
    "description": "Payment",
    "amount": "4342.70"
  }, {
    "id": "3088106392",
    "date": "2024-02-13",
    "time": "12:37",
    "description": "Top-up",
    "amount": "2813.59"
  }, {
    "id": "1140751379",
    "date": "2023-10-11",
    "time": "18:01",
    "description": "Top-up",
    "amount": "444.29"
  }, {
    "id": "2316623786",
    "date": "2023-11-26",
    "time": "22:53",
    "description": "Payment",
    "amount": "211.33"
  }, {
    "id": "7345134679",
    "date": "2023-06-09",
    "time": "10:30",
    "description": "Top-up",
    "amount": "3251.09"
  }, {
    "id": "7924725849",
    "date": "2023-08-25",
    "time": "13:12",
    "description": "Payment",
    "amount": "2585.33"
  }, {
    "id": "9628229036",
    "date": "2024-01-11",
    "time": "05:46",
    "description": "Payment",
    "amount": "1457.97"
  }, {
    "id": "8500069333",
    "date": "2023-12-06",
    "time": "20:12",
    "description": "Refund",
    "amount": "1199.81"
  }, {
    "id": "4152116854",
    "date": "2023-06-10",
    "time": "04:55",
    "description": "Refund",
    "amount": "4808.60"
  }, {
    "id": "4081744084",
    "date": "2024-01-23",
    "time": "17:48",
    "description": "Top-up",
    "amount": "3539.11"
  }, {
    "id": "3648482173",
    "date": "2023-12-19",
    "time": "10:33",
    "description": "Refund",
    "amount": "3195.80"
  }, {
    "id": "3529607835",
    "date": "2023-08-24",
    "time": "00:43",
    "description": "Refund",
    "amount": "358.49"
  }, {
    "id": "3597384706",
    "date": "2024-02-17",
    "time": "22:49",
    "description": "Refund",
    "amount": "3384.72"
  }, {
    "id": "3837687465",
    "date": "2023-12-11",
    "time": "20:46",
    "description": "Refund",
    "amount": "4006.26"
  }, {
    "id": "8316824159",
    "date": "2023-08-24",
    "time": "15:31",
    "description": "Top-up",
    "amount": "983.75"
  }, {
    "id": "9997797213",
    "date": "2024-01-14",
    "time": "18:42",
    "description": "Payment",
    "amount": "994.03"
  }, {
    "id": "9384848891",
    "date": "2024-03-03",
    "time": "20:37",
    "description": "Top-up",
    "amount": "4463.27"
  }, {
    "id": "4554452417",
    "date": "2023-12-04",
    "time": "00:01",
    "description": "Payment",
    "amount": "959.38"
  }, {
    "id": "9504591574",
    "date": "2023-08-20",
    "time": "22:33",
    "description": "Top-up",
    "amount": "4344.46"
  }, {
    "id": "7472405558",
    "date": "2024-02-25",
    "time": "90:30",
    "description": "Payment",
    "amount": "78.19"
  }, {
    "id": "6243681548",
    "date": "2023-09-04",
    "time": "23:34",
    "description": "Refund",
    "amount": "2073.00"
  }, {
    "id": "5101638455",
    "date": "2023-09-15",
    "time": "12:29",
    "description": "Refund",
    "amount": "1367.98"
  }, {
    "id": "3184324451",
    "date": "2024-03-07",
    "time": "12:35",
    "description": "Top-up",
    "amount": "3122.44"
  }, {
    "id": "8911395633",
    "date": "2024-05-18",
    "time": "05:02",
    "description": "Payment",
    "amount": "4697.27"
  }, {
    "id": "1998055647",
    "date": "2024-04-12",
    "time": "08:54",
    "description": "Payment",
    "amount": "266.99"
  }, {
    "id": "6058516161",
    "date": "2023-12-15",
    "time": "04:27",
    "description": "Top-up",
    "amount": "1352.19"
  }, {
    "id": "9901765420",
    "date": "2024-04-19",
    "time": "12:19",
    "description": "Top-up",
    "amount": "4429.20"
  }, {
    "id": "6953478373",
    "date": "2024-03-04",
    "time": "15:21",
    "description": "Refund",
    "amount": "4472.13"
  }, {
    "id": "5093741078",
    "date": "2023-07-28",
    "time": "00:13",
    "description": "Refund",
    "amount": "1456.69"
  }, {
    "id": "9112703303",
    "date": "2023-07-23",
    "time": "04:35",
    "description": "Top-up",
    "amount": "379.39"
  }, {
    "id": "5792120099",
    "date": "2024-02-05",
    "time": "12:35",
    "description": "Top-up",
    "amount": "4270.02"
  }, {
    "id": "2250082936",
    "date": "2024-02-24",
    "time": "04:17",
    "description": "Refund",
    "amount": "320.33"
  }, {
    "id": "3320001655",
    "date": "2023-09-27",
    "time": "17:17",
    "description": "Payment",
    "amount": "4207.88"
  }, {
    "id": "3926541709",
    "date": "2023-08-29",
    "time": "12:42",
    "description": "Refund",
    "amount": "3650.72"
  }, {
    "id": "4076335333",
    "date": "2024-03-05",
    "time": "04:58",
    "description": "Top-up",
    "amount": "4946.73"
  }, {
    "id": "9611627718",
    "date": "2023-09-27",
    "time": "15:02",
    "description": "Top-up",
    "amount": "3635.01"
  }, {
    "id": "4052461207",
    "date": "2023-10-02",
    "time": "06:56",
    "description": "Top-up",
    "amount": "2729.84"
  }, {
    "id": "6961288448",
    "date": "2024-03-17",
    "time": "07:02",
    "description": "Payment",
    "amount": "4322.93"
  }];
  
  // Dummy data for table header
  const headCells = [
    {
      id: 'id',
      align: 'left',
      label:'Transaction\u00a0ID' 
    },{
      id: 'date',
      align: 'left',
      label:'Date' 
    },{
      id: 'time',
      align: 'left',
      label:'Time\u00a0(Hrs)' 
    },{
      id: 'description',
      align: 'left',
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
      filterColumn={'description'}
      buttonDisable={true}
    />
  )
}

export default Transactions
