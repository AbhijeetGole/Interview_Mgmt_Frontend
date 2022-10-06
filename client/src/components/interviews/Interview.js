import {useEffect} from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {axiosInterviewPrivate} from '../../api/axios';
import useData from '../../hooks/useData'
import { useNavigate,useLocation ,Link} from 'react-router-dom';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import { Box } from '@mui/system';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Interview = () => {
  const {interviews,setInterviews}=useData();

  const axiosPrivate=useAxiosPrivate(axiosInterviewPrivate);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    let isMounted = true;

    const getInterviews=async()=>{
      try {
        const response=await axiosPrivate.get('/interview');
        if(response?.data?.success){
          isMounted && setInterviews(response?.data?.data);
        }
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true });
      }
      
    }
    getInterviews();

    return () => {
      isMounted = false;
    }

  },[axiosPrivate,setInterviews,navigate,location])
  
  return (
    <>
      <Container maxWidth="lg">
            <Box display='flex' justifyContent='space-between' margin='10px 0px'>
                <Typography varient='h2' component='h2' display='flex' justifyContent='center'  fontSize='26px' color='blue' fontWeight='600'>ALL INTERVIEWS</Typography>
                <Link className='btn' to='/interview/schedule'>Schedule An Interview</Link>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                        <StyledTableCell align="center">Candidate Id</StyledTableCell>
                        <StyledTableCell align="center">Tech Id</StyledTableCell>
                        <StyledTableCell align="center">HR Id</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Tech Rating</StyledTableCell>
                        <StyledTableCell align="center">Tech Comments</StyledTableCell>
                        <StyledTableCell align="center">HR Rating</StyledTableCell>
                        <StyledTableCell align="center">HR Comments</StyledTableCell>
                        <StyledTableCell align="center">Start Time</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {interviews.map((interview) => (
                        <TableRow key={interview._id}>
                            <TableCell component="th" scope="row" display='flex' justifyContent='space-between'>
                                <Link to={`/interview/edit/${interview._id}`} className='btn-edit'>Edit</Link>
                            </TableCell>
                            <TableCell component="th" scope="row">{interview.candidateId}</TableCell>
                            <TableCell align="right">{interview.techId}</TableCell>
                            <TableCell align="right">{interview.hrId}</TableCell>
                            <TableCell align="right">{interview.status}</TableCell>
                            <TableCell align="right">{interview.techRating}</TableCell>
                            <TableCell align="right">{interview.techComments}</TableCell>
                            <TableCell align="right">{interview.hrRating}</TableCell>
                            <TableCell align="right">{interview.hrComments}</TableCell>
                            <TableCell align="right">{interview.startTime}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </>

  )
}

export default Interview