import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
const getWebcam = (callBack) => {
    try {
        const constraints = {
            'video': true,
            'audio': false
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(callBack);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}
const Styles = {
    Video: {
        width: "50%",
        height: "50%",
        background: 'rgba(245, 240, 215, 0.5)',
        border: '1px solid black'
    },
    Canvas: {
        width: "50%",
        height : "50%",
        background: 'rgba(245, 240, 215, 0.5)',
        border: '1px solid green'
    },
    None: {
        display: 'none'
    }
}
function TestOverlay() {
    const [playing, setPlaying] = useState(undefined);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
        getWebcam((stream => {
            setPlaying(true);
            videoRef.current.srcObject = stream;
        }));
    }, []);

    const drawToCanvas = () => {
        try {
            const ctx = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            if (ctx && ctx !== null) {
                if (videoRef.current) {
                    ctx.translate(canvasRef.current.width, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                }
            }
        } catch(err){
            console.log(err);
        }
    }
    const startOrStop = () => {
        if (playing) {
            const s = videoRef.current.srcObject;
            s.getTracks().forEach((track) => {
                track.stop();
            });
        } else {
            getWebcam((stream => {
                setPlaying(true);
                videoRef.current.srcObject = stream;
            }));
        }
        setPlaying(!playing);
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Video</td>
                        <td>Canvas</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><video ref={videoRef} autoPlay style={Styles.Video} /></td>
                        <td><canvas ref={canvasRef} style={Styles.Canvas} /></td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <Button color="warning" onClick={() => startOrStop()}>{playing ? 'Stop' : 'Start'} </Button>
            <Button color="warning" onClick={() => drawToCanvas()}>Draw to Canvas </Button>
            <hr />
        </div >

    );
}
export default TestOverlay;