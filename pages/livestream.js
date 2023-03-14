import { io } from 'socket.io-client';
// import ReactMediaRecorder from 'react-media-recorder';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const socket = io('http://localhost:3000');
export default function VideoRecorder() {

    const [recording, setRecording] = useState(false);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    useEffect(() => {
        document.getElementById('upload-btn').disabled = true

        startRecording(false)
    }, [])

    const startRecording = async (value) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            // videoRef.current.srcObject = stream;
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 640;
            canvas.height = 480;
            setInterval(() => {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const data = canvas.toDataURL('image/jpeg');
                socket.emit('stream', data);
            }, 1000 / 30);

            if (value) {
                document.getElementById('recordersimple').style.display = 'block'
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
                mediaRecorderRef.current.start();
            }

        } catch (err) {
            console.error(err);
        }
    };

    async function stopRecording() {
        mediaRecorderRef.current.stop();
        document.getElementById('recordersimple').style.display = 'none'
        setRecording(false);
        document.getElementById('upload-btn').disabled = false
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
        }
    };

    async function test() {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        socket.emit('recordedVideo', blob);
    }





    return (
        <div style={{ width: "full", height: "100vh", background: "whitesmoke" }}>
            <div style={{ width: "1100px", marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ display: "flex", justifyContent: 'center', gap: "30px", paddingTop: "40px", "borderRadius": "10px", width: "500px", marginLeft: "auto", marginRight: "auto" }}>


                    <button onClick={() => { test() }} id='upload-btn'></button>
                </div>

                <div className='' style={{ "position": "relative", background: "#bdd8bd", "borderRadius": "10px", marginTop: "40px", border: "0.5px solid black ", width: "500px", height: "378px", marginLeft: "auto", marginRight: "auto" }} >
                    <video ref={videoRef} style={{
                        display: 'block', "borderRadius": "10px",
                        border: "0px solid black ", width: "500px",
                        padding: "4px",
                        height: "auto"
                    }} autoPlay id='video' />
                    <div style={{ width: "30px", height: "30px", borderRadius: "100%", background: "red", position: "absolute", top: "10px", right: "10px", display: "none" }} id='recordersimple'>
                        <div style={{ width: "10px", height: "10px", borderRadius: "100%", background: "white", position: "absolute", top: "10px", right: "10px" }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
