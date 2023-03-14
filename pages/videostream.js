import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function videoStream() {
    const socket = useRef();
    const [hello, setHello] = useState();

    useEffect(() => {
        socket.current = io();
        socket.current.on("now", (data) => {
            console.log("waite", data)
            setHello(data);
            console.log(data);

        });
    }, []);

    return (
        <div style={{ width: "full", height: "100vh", background: "whitesmoke" }}>
            <div style={{ width: "1100px", marginLeft: "auto", marginRight: "auto", paddingTop: "40px", }} >
                <div style={{width: "200px", marginLeft: "auto", marginRight: "auto",paddingBottom:"10px"}}>Recorded Video Streaming</div>
                <div className='' style={{ "position": "relative", background: "#bdd8bd", "borderRadius": "10px", border: "0.5px solid black ", width: "500px", height: "378px", marginLeft: "auto", marginRight: "auto" }} >
                    <video style={{
                        display: 'block', "borderRadius": "10px",
                        border: "0px solid black ", width: "500px",
                        padding: "4px",
                        height: "378px"

                    }} autoPlay
                        src={hello}
                        controls />

                </div>
            </div>
        </div>
    );
}
