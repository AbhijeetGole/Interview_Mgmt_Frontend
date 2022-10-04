import { useEffect,useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {axiosInterviewPrivate} from '../api/axios';
import { useNavigate, useLocation } from "react-router-dom";
import useData from '../hooks/useData';
import Chart from './Chart';
import VerticalLinearStepper from './Stepper'
import { Box } from '@mui/material';
import '../index.css'

const Dashboard = () => {
  const {setInterviews}=useData();
  const [flag,setFlag]=useState(false);
  const [labels,setLabels]=useState([]);
  const [data,setData]=useState([]);

  const axiosPrivate=useAxiosPrivate(axiosInterviewPrivate);

  const navigate=useNavigate();
  const location=useLocation();

  useEffect(()=>{
    let isMounted=true;
    
    const getInterviews=async()=>{
      try{
        const response=await axiosPrivate.get('/interview');
        if(response?.data?.success){
          isMounted && setInterviews((prev)=>response?.data?.data);

          const currInterviews=response.data.data;
          const map = new Map();
          for(let interview of currInterviews){
            if(map.has(interview.status)){
                map.set(interview.status,map.get(interview.status)+1);
            }else{
                map.set(interview.status,1);
            }
          }
          for(let [key,value] of map){                         
            setLabels((prev)=>[...prev,key]);
            setData((prev)=>{
              return([...prev,value])
            });
          }  
          setFlag(true);
        }
      }catch(error){
        navigate('/login', { state: { from: location }, replace: true });
      }
    }
    getInterviews();

    return ()=>{
      isMounted=false;
    }
  },[navigate,location,axiosPrivate,setInterviews])
  
  return (
  <>
   
    <h4 style={{textAlign:'center'}}>Dashboard</h4>
    <Box style={{display:'flex'}}>
    <div className="flex-item-left" >
    {
      flag 
      &&<Chart 
        labels={labels}
        data={data}
      />
    }
    </div>
    <div className="flex-item-right">
      <VerticalLinearStepper/>
    </div>
    </Box>
  </>
  )
}

export default Dashboard