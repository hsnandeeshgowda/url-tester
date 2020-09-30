import React, { useState } from 'react';
import './App.css';

function App() {

  const initalResponseData = {
    resCode:null,
    resTime:null,
    resText:null,
    loading:false,
  }

  const [ url, setUrl ] = useState(null);
  const [ apiResponse, setReponse ] = useState(initalResponseData)

  const handleInputChange = (e) =>{
    e.preventDefault();
    setUrl(e.target.value)
  }

  const handleUrlTest = async() =>{

    let startTime = null;
    let endTime = null;
    let response = null;
    let result = null;

    try {

      setReponse({
          ...apiResponse,
          loading:true
        });
      
      startTime = performance.now();
      response = await fetch(url);
      endTime = performance.now();

      if(response.ok){

        result = await response.json();
        responseHandler( response, startTime, endTime, result, false)
      }else{
        responseHandler( response, startTime, endTime, "Provide a valid url", false)
      }
    
    } catch (error) {

      endTime = performance.now();
      responseHandler( response, startTime, endTime, false, error)
    }
  }

  const responseHandler = ( response, startTime, endTime, result, error ) =>{
   
    setReponse({
      resCode: response && response.status ? response.status : "Sorry!, no status code found!" ,
      resTime: startTime && endTime ? `${calTimeTaken(startTime, endTime)} Sec` : "I am not sure about the time it took!",
      resText: result ? JSON.stringify(result) : error ? `${JSON.stringify(error)} - Server error` : "I did't found any response text from the api given!",
      loading:false,
    });

  }


  const calTimeTaken = ( startTime, endTime ) => {

    return ((endTime - startTime) / 1000).toFixed(2);
  }

  return (
    <div className="container">
      
      <div className="header">
           <h1>Test Your API</h1>
      </div>
      
      <div className="content">
           
        <div className="center">
          
          <div className="inputContainer">
            <input className="input" value={url} placeholder="Enter url to test" onChange={handleInputChange} />
          </div>

          <div className="buttonContainer">
            { !apiResponse.loading ? <button className="button" onClick={handleUrlTest}>Test</button> : '...testing!' }
          </div>
        
        </div>

        <div className="footer">

          <div className="footerFirst">

            <div>
                <h3>Response Code : {apiResponse.resCode} </h3>
            </div>

            <div>
                <h3>Response Time : {apiResponse.resTime} </h3>
            </div>

          </div>

          <div className="footerSecond">
              <h3>Response Text</h3>
              <h4 className="resText">{apiResponse.resText}</h4>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
