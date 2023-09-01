import React,{useState} from 'react'
import {PuffLoader} from 'react-spinners'
import { saveAs } from "file-saver";
import '../styles/transcribe.css'

import uploadFileImg from '../images/upload-file.png'
import closeBtn from '../images/close-circle.svg'
import pictureIcon from '../images/picture-icon.png'

const Transcribe = () => {
  const [uploadedFile,setUploadedFile] = useState("")
  const [transResult,setTransResult] = useState([])
  const [loaderHidden,setLoaderHidden]= useState(true)

  const exportFile = () => {
    let finalExport = ""
    transResult.forEach((tr)=>{
      finalExport+=tr+'\n'
    })
    console.log(finalExport);
    var blob = new Blob([finalExport], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${uploadedFile.name}.txt`);
}

  const handleFileUpload = (e) => {

    console.log(e.target.files[0])
    let userUpload = e.target.files[0]
    setUploadedFile(userUpload)
    var image = document.getElementById('output1');
	        image.src = URL.createObjectURL(e.target.files[0]);
  }

  const handleServerUpload = () => {
    setLoaderHidden(false)
    const formData = new FormData();
    formData.append('image', uploadedFile);
    
    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
      mode: 'cors'
    })
    .then(data => data.json())
    .then(resp => {console.log(resp);setTransResult(resp.result);setLoaderHidden(true)})
    .catch(error => {
      console.error('Error:', error);
    });
    
  }

  return (
    <div className = "transcribe-container">
        <div className="transcribe-container-upload">
          <div className="tcu-top">
            Upload Document
            <div>Documents must be images less than 5mb</div>
          </div>

          <div className="tcu-bottom">
            <div className="document-display">
              {/* <div className="dd-border"></div> */}
              {uploadedFile? null :
              <div className="dd-internal">
                <img src={uploadFileImg} alt="" />
                <label htmlFor="uploaded-document">Click to Upload Document</label>
                <input type="file" id="uploaded-document" onChange={(e) => {handleFileUpload(e)}}/>
              </div>
              }
              <img src="" alt="" id="output1" style={uploadedFile?{display:"flex"}:{display:"none"}}/>
              <div className={loaderHidden?"loader-hide":"loader-container"}>
                <PuffLoader color="#14254a" />
              </div>
            </div>
            {
              uploadedFile &&
            <div className="document-info">
              <div className="di-left">

              <div className="di-pic">
                <img src={pictureIcon} alt="" />
              </div>
              <div className="di-header">
                <div className='di-file_name'>{uploadedFile.name.length > 25?uploadedFile.name.substring(0,25) + "...":uploadedFile.name}</div>
                <div className="di-file_size">
                {(uploadedFile.size/(1024*1024)).toFixed(2)}mb
              </div>
              </div>
              </div>
                <div className="di-close" onClick={(e) => setUploadedFile("")}>
                  <img src={closeBtn} alt="" />
                </div>
              
            </div>
            }
          </div>
        </div>
        <div className={uploadedFile && loaderHidden?"transcribe-btn":"transcribe-btn-inactive transcribe-btn"} onClick={handleServerUpload}>
          Transcribe
        </div>
        <div className="tcd-wrapper">
          <div className="export-button" onClick={exportFile}>
            Export
          </div>
          <div className="transcribe-container-display">
            <div className="tcd-type">
              {
                transResult.map((tr) => {
                  console.log(tr);
                  return (<div className='tcd-line'>{tr} <br/></div>)
                })
              }
            </div>

          </div>
        </div>
          
    </div>
  )
}

export default Transcribe