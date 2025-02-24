import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000); // 3秒後自動跳轉

        return () => clearTimeout(timer); // 清除計時器
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1>404 Not Found</h1>
            <p>3秒後自動跳轉到首頁...</p>
        </div>
    );
}