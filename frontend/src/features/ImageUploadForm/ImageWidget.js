import React, { useState } from "react"

const ImageWidget = () => {

    const [file, setFile] = useState()
    const handleChange = (e) => {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]))
    }

    return (
      <>

      <div className="container">
        <div className="row">
          <div className="col-sm-8 mt-3">
            <h4>Choose the image file you wish to upload...</h4>
  
            <form action="http://localhost:3500/images" method="POST" enctype="multipart/form-data">
              <div className="form-group">
                <input
                  type="file"
                  name="file"
                  id="input-files"
                  className="form-control-file border"
                  onChange={handleChange}
                />
                <img src={file} alt="upload me" />
                <h4 className="image-file-name">{file}</h4>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <hr />
          <div className="row">
            <div className="col-sm-12">
              <div className="preview-images">
              </div>
            </div>
          </div>
        </div>
        </>  
      )
  }
  export default ImageWidget