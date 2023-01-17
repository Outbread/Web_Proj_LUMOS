import { Outlet, useNavigate } from "react-router-dom";
import MyPageNavbar from "../components/common/MyPageNavbar";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";

function MyPageLayout() {

    const navigate = useNavigate();


    useEffect(() => {
        navigate("/mypage", { replace: false });
    }, 
    []);


    return (
        <>
            <div>
                <MyPageNavbar />
                <main >
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default MyPageLayout;