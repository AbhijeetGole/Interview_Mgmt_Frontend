import React from 'react'
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';

const EditCandidate = () => {
  const {candidates,err,setErr}=useData();

  //create an empty state for singleInterview first then assigned value to that depending on id in params then
  //use that state value in edit form values, take care of primary Skills and Secondary Skills as both has array in backend
  //write handleEdit function that would make api call then navigate to candidate page

  return (
    <div>EditCandidate</div>
  )
}

export default EditCandidate