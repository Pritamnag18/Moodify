import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useLocation } from 'react-router-dom'
import { BsArrowLeftCircle, BsPlay } from "react-icons/bs";
import { BiDownArrowAlt } from "react-icons/bi";
import './index.css'

export default function Playlist() {

    const [playlist, setPlaylist] = useState([])
    const location = useLocation();
    const [resultlen, setResultlen] = useState(20)
    const [url, setUrl] = useState("")
    async function fetch_playlist() {
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultlen}&q=${location.state.emotion}%20song%20%23vevo&type=video&key=AIzaSyCTNupUdbjvYR7qErqZ1AQSNYKUhqgAJo8&videoDuration=short`, {
            method: "GET",
        });
     
        let data = await response.json();
        setResultlen(resultlen+10)

        let temp = []
        data.items.forEach(element => {
            temp.push({ videoId: element.id.videoId, channelTitle: element.snippet.channelTitle, thumbnail: element.snippet.thumbnails.default.url, title: element.snippet.title })
        });
        setPlaylist(temp)
        setUrl(`https://www.youtube.com/watch?v=${temp[0].videoId}`)
    }

    useEffect(() => {

        if (playlist.length === 0)
            fetch_playlist()

    }, [playlist])

    return (
        <div className='bg-dark'>
            <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/> */}
                    <BsArrowLeftCircle className="d-inline-block align-top mx-2" size={30} />
                    <span className='navbar-brand fw-bold'>  Moodify</span>
                </Link>
            </nav>
            <div className="container-fluid ">
                <div className="row flex-lg flex-wrap-reverse align-items-end">
                    <div className="col-xl-8 col-lg-7 mt-2" style={{ padding: '0 0 0 5px' }}>
                        <div className="shadow-4 table-responsive rounded-4 ">
                            <table id="dtBasicExample" className="table table-striped align-middle mb-0 table-dark"

                            >
                                <thead className="bg-light fs-5">
                                    <tr>
                                        <th>No.</th>
                                        <th>Track</th>
                                        <th>Channel</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                {playlist.length === 0 ?
                                    <div className="d-flex align-items-start justify-content-center text-center" style={{height:'85vh'}}>
                                        <div className="spinner-border text-light" style={{margin:'8px'}} role="status">
                                        </div>
                                            <span className="sr-only fs-4">Creating Playlist...</span>
                                    </div> :
                                        <tbody>
                                        
                                        {
                                            playlist.map((e, index) => {

                                                return <tr key={e.videoId} style={{cursor:"pointer"}} onClick={() => { setUrl(`https://www.youtube.com/watch?v=${e.videoId}`) }}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={e.thumbnail}
                                                                alt=""
                                                                style={{ width: "45px", height: "45px" }}
                                                                className="rounded-circle"
                                                            />
                                                            <div className="ms-3">
                                                                <p className="fw-bold mb-1">{e.title}</p>
                                                                {/* <p className="text-muted mb-0">john.doe@gmail.com</p> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="fw-bold mb-1">{e.channelTitle}</p>
                                                        {/* <p className="text-muted mb-0">IT department</p> */}
                                                    </td>


                                                    <td>
                                                        <button type="button" onClick={() => { setUrl(`https://www.youtube.com/watch?v=${e.videoId}`) }} className="btn btn-sm rounded-5 btn-outline-light btn-dark">
                                                            <BsPlay style={{verticalAlign:"top"}} size={22} /> Play
                                                        </button>
                                                    </td>
                                                </tr>
                                            }
                                            )
                                        }


                                    </tbody>
                                }
                            </table>
                        </div>
                              {resultlen<60?<button className='btn btn-outline-light btn-dark d-flex align-items-center my-2' onClick={()=>{fetch_playlist()}} style={{margin:"0 auto"}}><BiDownArrowAlt size={28}/><span className='mx-2'>Load More</span></button>:""}
                    </div>
                    <div className="col-xl-4 col-lg-5 mt-5 ytube me-2">
                        <ReactPlayer url={url} playing={true} width='100%'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
