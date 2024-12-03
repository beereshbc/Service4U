import React, { useCallback, useContext } from 'react'
import SignIn from './pages/SignIn.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddAgent from './pages/Admin/AddAgent.jsx';
import AgentList from './pages/Admin/AgentList.jsx';
import { AgentContext } from './context/AgentContext.jsx';
import AgentDashboard from './pages/Agent/AgentDashboard.jsx';
import AgentProfile from './pages/Agent/AgentProfile.jsx';
import AgentAppointments from './pages/Agent/AgentAppointments.jsx';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { sToken } = useContext(AgentContext)

  return aToken || sToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin route  */}
          <Route path='/' element={<> </>} />
          <Route path='/admin-dashboard'element={< Dashboard/>} />
          <Route path='/all-appointments'element={<AllAppointments />} />
          <Route path='/add-agent'element={<AddAgent />} />
          <Route path='/agent-list'element={<AgentList />} />

          {/* Doctor Route */}
          <Route path='/agent-dashboard'element={<AgentDashboard />} />
          <Route path='/agent-profile'element={<AgentProfile />} />
          <Route path='/agent-appointments'element={<AgentAppointments />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <SignIn />
      <ToastContainer />
    </>
  )
}

export default App