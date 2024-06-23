import Navbar from "@/ui/pmcNavbar/PmcNavbar"
import {useAuth} from '../../utils/authContext'

const SlotsLayout = ({children}) => {
  
  

  return (
    
    <div>
      
        <div><Navbar/></div>
        <div>{children}</div>
    </div>
  )
}

export default SlotsLayout