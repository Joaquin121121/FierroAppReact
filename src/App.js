import { useTranslation } from "react-i18next"
import "./services/i18n"
import Login from "./components/Login"
import Start from "./components/Start"
import '@fortawesome/fontawesome-free/css/all.css'
import { changeLanguage } from "i18next"

function App() {

  changeLanguage("en")
  return (
    <Login></Login>
  )
}

export default App
