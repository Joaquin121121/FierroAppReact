import "./services/i18n"
import Login from "./components/Login"
import Start from "./components/Start"
import Main from "./components/Main"
import "@fortawesome/fontawesome-free/css/all.css"
import Welcome from "./components/Welcome"
import { Routes, Route } from "react-router-dom"
import PageLoader from "./components/PageLoader"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLoader />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
