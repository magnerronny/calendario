import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarioPage } from "../calendario";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
// import { getEnvVariables } from "../helpers";

export const AppRouter = () => {

  const {status, checkAuthToken } = useAuthStore()
  // const authStatus = 'not-authenticated';

  // console.log(getEnvVariables());
  useEffect(() => {
    checkAuthToken()
  
  }, [])
  

  if(status === 'checking') {
    return (
      <h3>Cargando.......</h3>
    )
  }

  return (
    <Routes>
    {
      (status === 'not-authenticated')
        ? (
          <>
            <Route path="/auth/*" element={<LoginPage/>}/>
            <Route path="/*" element = {<Navigate to="/auth/login"/>} />
          </>
        )
        :(
           <>
            <Route path="/" element={<CalendarioPage/>}/>
            <Route path="/*" element = {<Navigate to="/"/>} />
           </>
        )
    }

    </Routes>
  )
}
