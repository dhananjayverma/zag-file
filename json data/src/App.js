import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiFileUploadLine } from "react-icons/ri";
import "./App.css";
import successImage from "./check-circle.gif";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/json") {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setSelectedFile(file);
          setFileData(jsonData);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("Invalid JSON file format.");
          setSelectedFile(null);
          setFileData(null);
        }
        setIsLoading(false);
      };
      reader.readAsText(file);
    } else {
      setErrorMessage("Please select a valid JSON file.");
      setSelectedFile(null);
      setFileData(null);
    }
  };

  const handleSubmit = () => {
    if (name.trim() === "" || email.trim() === "") {
      setErrorMessage("Please enter a name and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (selectedFile === null) {
      setErrorMessage("Please select a JSON file.");
      return;
    }

    if (Object.keys(fileData).length === 0) {
      setErrorMessage("The selected JSON file is empty.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage(true);
    setDataCount(Object.keys(fileData).length);
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setSelectedFile(null);
    setFileData(null);
    setDataCount(0);
    setSuccessMessage(false);
  };

  const handleGoToEntities = () => {
    window.location.href = "/my-entities";
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="App">
      <h1>
        <span className="submit-arrow">&larr;</span> Submit form{" "}
      </h1>

      <div className="form-section">
        <div className="form-field">
          <label htmlFor="name-input">Name:</label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email-input">Email:</label>
          <div className="email-input-wrapper">
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={handleEmailChange}
            />
            <span className="email-icon">&#9993;</span>
          </div>
        </div>
        <div className="form-field file-input">
          <label htmlFor="file-input">Upload JSON File:</label>
          <div
            {...getRootProps()}
            className={`file-dropzone ${isDragActive ? "active" : ""}`}
          >
            <input id="file-input" {...getInputProps()} />
            {selectedFile ? (
              <span className="file-name">{selectedFile.name}</span>
            ) : (
              <div className="file-upload-container">
                <RiFileUploadLine className="file-upload-icon" />
                <span className="file-upload-text">Browse File</span>
              </div>
            )}
          </div>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="file-contents-section">
        <h2>File Contents:</h2>
        <div className="file-contents-wrapper">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            fileData && <pre>{JSON.stringify(fileData, null, 2)}</pre>
          )}
        </div>
        {successMessage && (
          <div className="modal">
            <div className="success-icon-container">
              <img className="success-icon" src={successImage} alt="Success" />
            </div>
            <p className="total-entries">Total Entries: {dataCount}</p>
            <div className="modal-buttons">
              <div className="cancel-container">
                <button className="go-to-entities" onClick={handleGoToEntities}>
                  Go to My Entities
                </button>
                <button className="cancel" onClick={handleClear}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!successMessage && (
        <>
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
          {dataCount > 0 && (
            <p className="data-count">Data Count: {dataCount}</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;








