import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useData from "../hooks/useData";

const PersistLogin=()=>{
    const [isLoading,setIsLoading]=useState(true);
    const refresh=useRefreshToken();
    const {auth}=useData();

    useEffect(()=>{
        const verifyRefreshToken=async()=>{
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    },[])

    useEffect(()=>{
        console.log(`isLoading ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    },[isLoading])

    return (
        <>
            {
                isLoading
                ? <p style={{textAlign:'center',color:'blue'}}>Loading...</p> 
                : <Outlet/>
            }
        </>    
    )
}


export default PersistLogin;