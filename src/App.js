import "./services/i18n"
import Login from "./components/Login"
import Start from "./components/Start"
import Main from "./components/Main"
import "@fortawesome/fontawesome-free/css/all.css"
import Welcome from "./components/Welcome"
import { Routes, Route } from "react-router-dom"
import PageLoader from "./components/PageLoader"
import ProtectedRoutes from "./utils/ProtectedRoutes"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLoader />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/start" element={<Start />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/start/:param" element={<Start />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
