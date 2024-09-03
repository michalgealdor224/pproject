import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import HomePage from "./HomePage";
import MyDropzone from "./MyDropzone";

function UploadFile({sendDataToHomePage}) {
    const [files, setFiles] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);
    const [numerator, setNumerator] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
        const urls = acceptedFiles.map(file => URL.createObjectURL(file));
        setFileUrls(urls);
                const formData = new FormData();
                formData.append("file", acceptedFiles[0]);
                axios.post("http://localhost:9124/upload-image", formData, {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                }).then(response => {
                             console.log(response.data)
                            sendDataToHomePage(response.data)
                            setNumerator(numerator+1)

                        })

        // downloadImage(urls,numerator);
        // axios.get("http://localhost:9124/get-image-description", {
        //     params : {
        //         url : "C:\\Users\\USER\\Downloads\\" + numerator +".jpg"
        //     }
        // }).then(response => {
        //     console.log(response.data)
        //     sendDataToHomePage(response.data)
        //     setNumerator(numerator+1)
        //
        // })
        },
        []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px' }}>
            <button onClick={(event) => {


            }}>UPLOAD{files.length}</button>
            {/*<MyDropzone />*/}
            <input {...getInputProps()} />
            {
                files.length === 0 ? (
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                ) : (
                    <div>
                        <p>הקובץ הועלה, ניתן ללחוץ כדי להעלות קובץ אחר</p>
                    </div>
                )
            }
            {
                files.map((file, index) => (
                    <div key={index}>
                        {/*<p>{file.name}</p>*/}
                        <img src={fileUrls[index]} alt={file.name} style={{maxWidth: '100px', maxHeight: '100px'}} />
                    <div> {fileUrls}  </div>
                    </div>
                ))
            }

            {
                // files.length > 0 &&

            }
        </div>
    );
    function downloadImage( url, numerator) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = numerator + '.jpg';  // שם הקובץ שתשמרו
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('Error downloading the image'));
    }


}

export default UploadFile;
