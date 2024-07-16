import React, { useEffect, useState } from 'react'
import CustomTable from '../Tables/Table';
import { Request } from '../../APIs/NodeBackend';

// Data for table header
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

function Transactions({ language }) {
  const userID = JSON.parse(localStorage.getItem('userId'));
  const userType = JSON.parse(localStorage.getItem('userId'));
  
  // Filter list
  const filterList = (userType === 'owner') ? ['Payment', 'Top-Up', 'Refund', 'Income'] : ['Payment', 'Top-Up', 'Refund'];

  // Variable for storing credits
  const [credits, setCredits] = useState(0); 
  
  // Data for table body
  const [transaction, setTransaction] = useState({});
 
  // Requesting transaction data from node backend
  useEffect(()=>{
    const getData = async (value) => {
      // Creating data object
      const data = {
        type: 'Trans1',   // Get transaction infomation from backend
        data: value
      }
      console.log(`request message::   type: ${data.type}      data: ${data.data}`);
  
      try {
          const serverResponse = await Request(data, 'transactions');
          //console.log(`Transactions:: ${JSON.stringify(serverResponse.data)}`);
          setCredits(serverResponse.data.credits);
          setTransaction(serverResponse.data.transaction);
      } catch (error) {
          console.error('Error fetching devices:', error);
      }
    };

    getData(userID);
  }, []);

  return (
    transaction.length > 0 ? (
      <CustomTable
        headerData={headCells}
        bodyData={transaction}
        filterData={filterList}
        title={`Available\u00a0Credits: LKR\u00a0${credits}`}
        filterColumn={'description'}
        buttonDisable={true}
      />
    ) : (<></>)    
  )
}

export default Transactions
