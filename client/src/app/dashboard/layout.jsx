import Sidebar from "../ui/dashboard/sidebar/sidebar"

const Layout = ({children}) => {
  return (
    <div>
        <Sidebar/>
        <div className="Hello">{children}</div>
    </div>
  )
}

export default Layout