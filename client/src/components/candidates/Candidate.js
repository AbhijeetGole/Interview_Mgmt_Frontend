import React,{useEffect} from 'react'
import useData from '../../hooks/useData';

const Candidate = () => {
  const {candidates,setCandidates,err,setErr}=useData();

  //set candidates here write api for that 
  // useEffect(()=>{
      
  // },[])

  return (
    <div>Candidate</div>
  )
}

export default Candidate