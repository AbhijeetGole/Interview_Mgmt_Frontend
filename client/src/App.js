import { Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Panel from './components/panels/Panel';
import RegisterPanel from './components/panels/RegisterPanel';
import EditPanel from './components/panels/EditPanel';
import Candidate from './components/candidates/Candidate';
import RegisterCandidate from './components/candidates/RegisterCandidate';
import EditCandidate from './components/candidates/EditCandidate';
import Interviews from './components/interviews/Interview';
import ScheduleInterview from './components/interviews/ScheduleInterview';
import UpdateInterview from './components/interviews/UpdateInterview'
import Interviewer from './components/Interviewer';
import NotFound from "./components/NotFound";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Layout/>}>
          <Route element={<RequireAuth allowedRole={'admin'}/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='panel'>
              <Route index element={<Panel/>}/>  
              <Route path='register' element={<RegisterPanel/>}/>
              <Route path='edit/:id' element={<EditPanel/>}/>
            </Route>
            <Route path='candidate'>
              <Route index element={<Candidate/>}/>
              <Route path='register' element={<RegisterCandidate/>}/>
              <Route path='edit/:id' element={<EditCandidate/>}/>
            </Route>
            <Route path='interview'>
              <Route index element={<Interviews/>}/>
              <Route path='schedule' element={<ScheduleInterview/>}/>
              <Route path='edit/:id' element={<UpdateInterview/>}/>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={'tech hr'}/>}>
            <Route path='interviewer'>
              <Route index element={<Interviewer/>}/>
            </Route>
          </Route>
          <Route path='unauthorized' element={<Unauthorized/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
