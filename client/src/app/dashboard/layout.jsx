
import Navbar from "@/ui/pmcNavbar/PmcNavbar"
import {useAuth} from '../../utils/authContext'

const DashboardLayout = ({children}) => {
  
  

  return (
    
    <div>
      
        <div><Navbar/></div>
        <div>{children}</div>
    </div>
  )
}

export default DashboardLayout