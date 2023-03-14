import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
const VideoStream = () => {
    useEffect(() => {
        const socket = io.connect('http://localhost:3000');

        socket.on('stream', data => {
            const img = document.getElementById('imagetag');
            img.src = data;
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <img id='imagetag'></img>
        </div>
    );
};

export default VideoStream;
