import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unauthorized } from '../assets/asset';
import { useDispatch } from "react-redux";
import { logOut } from "../features/userSlice";

const UnAuthenticated = () => {
    const [redirect, setRedirect] = useState(5);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let inte = setInterval(() => {
            if (redirect <= 0) {
                clearInterval(inte);
                dispatch(logOut());
                navigate("/");
                return;
            }
            return setRedirect((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(inte);
        };
    }, [redirect, navigate]);
    return (
        <div
            style={{
                // width: "100vh",
                height: "70vh",
                margin:'auto',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                style={{ width: "500px" }}
                src={unauthorized}
                alt="UnAuthenticated"
            />
            <h1 style={{ fontSize: "60px", color:"#EF5350" }}>401 Unauthorized</h1>
            <h1 style={{ color: "#90A3BF" }}>
                Looks like you are not logged in, redirecting {redirect}
            </h1>
        </div>
    );
};

export default UnAuthenticated;