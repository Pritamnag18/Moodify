import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { MdOutlineCamera } from "react-icons/md";
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './index.css'

function WebCameraCapture() {
    const [loader, setLoader] = useState(0)
    const wedRef = useRef(null);
    const navigate = useNavigate()
    const showImage = async () => {
        setLoader(1)
        const encode = wedRef.current.getScreenshot();

        let bodyContent = new FormData();
     

        bodyContent.append("image", encode.replace("data:image/jpeg;base64,", ""));

        let response = await fetch("/process", {
            method: "POST",
            body: bodyContent,
        });

        let data = await response.text();
        if (response.status === 200) {
            console.log(JSON.parse(data));
            Swal.fire({
                icon:'success',
                title:'Success',
                text:`Face Detected-${JSON.parse(data).emotion}`
            })
            navigate("/playlist",{state:JSON.parse(data)})
        }
        else {
            setLoader(0)
            Swal.fire({
                icon:'error',
                title:'Oops..',
                text:"Face Not Detected. Please try again!"
            })
        }

    };


    return (
        <div className="bg-dark" >
           <div className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '100vh' }}>
           {loader === 0 ? <> <Webcam ref={wedRef}
                    className="rounded webcamera"
                    screenshotFormat="image/jpeg"
                />
                <button className="my-3 btn btn-danger fs-4" onClick={() => {
                    showImage()
                }}><MdOutlineCamera style={{ verticalAlign: 'text-bottom' }} size={30} /> Capture</button></>: <div className="d-flex align-items-center justify-content-center text-center">
                <div className="spinner-border text-light" role="status" style={{margin:'8px'}}>
                </div>
                    <span className="sr-only text-light fs-4">Processing...</span>
                </div>}
            </div> 
           
        </div>

    );
}
export default WebCameraCapture;