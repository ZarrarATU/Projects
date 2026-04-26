import { Outlet } from "react-router"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"

function MainLayout() {
  return (
    <>
     <Header></Header>
     <Outlet></Outlet>
     <Footer></Footer>
    </>
  )
}

export default MainLayout