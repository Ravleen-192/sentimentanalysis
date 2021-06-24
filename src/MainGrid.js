import React, { useState, useEffect } from "react";
import axios from 'axios';
import { showError } from './App';
import {
  Container,
  Grid,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import Amplify from 'aws-amplify'
import LanguageTable from './LanguageTable';
import SentimentTable from './SentimentTable';
import EntitiesTable from './EntitiesTable';
import KeyPhrasesTable from './KeyPhrasesTable';
import SyntaxTokensTable from './SyntaxTokensTable';
import { Storage } from 'aws-amplify';
import personalbg from "./images/personalbg.png";

Amplify.configure({
  Auth: {
    identityPoolId: 'us-west-2:17f9de9e-6aca-4cb2-9239-f7e61c952621',
    region: 'us-west-2',
    userPoolId: 'us-west-2_ytWKtTJ4e',
    userPoolWebClientId: '22nltdicfgrgstpeg662sg4pnt',
  },
  Storage: {
    bucket: 'sareacts3storage124511-dev',
    region: 'us-west-2',
    identityPoolId: 'us-west-2:17f9de9e-6aca-4cb2-9239-f7e61c952621',
  }
});

const divStyle = {
  backgroundposition: "50% 0",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  opacity: 1,
  backgroundImage: `url(${personalbg})`,
};
const MainGrid = () => {
  const [fileurl, setfileurl] = useState("");
  const [file, setfile] = useState("");
  const [folder, setfolder] = useState("public/");
  const [filename, setfilename] = useState("");
  const [contentType, setcontentType] = useState("text/plain");
  const [response, setResponse] = useState("");
  const [gFileUrl, setgFileUrl] = useState(null);
  const [isToggle, setisToggle] = useState(false);
  const [buttonText, setbuttonText] = useState("Attach File");
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});
  const [type, setType] = useState("");
  const [finaltype, setfinalType] = useState("");
  const [query, setQuery] = useState("");

  const analysisTypeLinks = [

    {
      postLink: 'https://i0r8q9vwyk.execute-api.us-west-2.amazonaws.com/default/trg-s3-safile?filename=' + encodeURIComponent(String(folder + filename)).replace(/%2F/g, "/") + (String('&contentType=')) + (String(contentType)) + (String('&apiType=')) + (String(type)) + (String('&text=')) + encodeURIComponent(String(input)).replace(/%20/g, "+")
    }

  ];
  const handleClick = (e) => {
    if (isToggle) {
      setisToggle(false);
      setbuttonText("Attach File");
    }
    else {
      setisToggle(true);
      setbuttonText("Enter Text");
    }
    setfileurl("");
    setfile("");
    setfilename("");
    setcontentType("");
    setInput("");
    setResult("");
    setType("");
  }
  const handleFileChange = event => {
    const file = event.target.files[0];
    setInput("");
    setfileurl(URL.createObjectURL(file));
    setfile(file);
    setfilename(file.name);
    setfolder("public/")
    setcontentType(file.type);
    console.log(file.type);
    console.log(contentType);
    console.log("RRRRRRRRRRRRRRRRRRR");
    console.log(file);
    console.log("RRRRRRRRRRRRRRRRRRR");
    console.log({ filename });
  };
  const saveFile = () => {
    Storage.put(`${filename}`,
      file)
      .then(result => {
        setResponse("Success uploading file!");
      })
      .catch(err => {
        setResponse(`Cannot upload file: ${err}`);
      });
  }

  const handleSubmit = () => {
    if (!input && !filename) {
      showError("Input Required.");
      return;
    }
    if (!type) {
      showError("Please Select the Analysis type.");
      return;
    }
    if ((filename) && response !== "Success uploading file!") {
      showError("File not uploaded.");
      return;
    }
    setfileurl("");
    setfile("");
    setfilename("");
    setcontentType("");
    setResult(input);
    setfinalType(type);
    console.log(query);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(type);

    axios.post(query, { key1: input })
      .then(res => {
        setResult(res.data);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(res.data);
      })
  }
  const handleChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);

  }

  useEffect(() => {
    const filtered = analysisTypeLinks[0];
    console.log("____-ILTERED--------------------");
    console.log(filtered);
    if (type)
      setQuery(filtered.postLink);
  }, [type]);


  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> RAVLEEN");
    console.log(query);
  }, [query]);


  return (
    <div style={divStyle} className="homeimg">
      <Grid container spacing={10} className="grid">

        <Grid item xs={6} className="input-box">
          <div
            style={{ display: !(isToggle) ? 'block' : 'none' }}
            className="container"
          >
            <label className="label"> Text </label>
            <TextField
              placeholder="Type your text here"
              variant="filled"
              multiline
              value={input}
              rows={6}
              fullWidth={true}
              onChange={(e) => { setInput(e.target.value); setcontentType("text/plain"); setfilename(""); setfolder(""); }}
            />
          </div>
          <div>
            <button
              className="frmbtn2"
              onClick={handleClick}
            >
              {buttonText}
            </button>
          </div>
          <div
            style={{ display: isToggle ? 'block' : 'none' }}
          >
            <div>
                <input className="new-line" type="file" onChange={handleFileChange}/>
                <button className="frmbtn2" onClick={saveFile}  type="submit">Upload</button>
              {!!response && <div>{response}</div>}
            </div>
          </div>
        </Grid>

        <Grid item xs={4} className="grid_item">
          <label className="label"> Text Analysis Type </label>
          <Select placeholder="Select Analysis Type"
            fullWidth={true}
            variant="outlined"
            value={type}
            onChange={(e) => {
              handleChange(e);
            }}
            className="grid_item"
          >
            <MenuItem value={"sentiment"}>Sentiment</MenuItem>
            <MenuItem value={"language"}>Language</MenuItem>
            <MenuItem value={"entity"}>Entity</MenuItem>
            <MenuItem value={"key phrases"}>Key Phrases</MenuItem>
            <MenuItem value={"syntax"}>Syntax</MenuItem>
          </Select>

          <button
            className="frmbtn"
            onClick={() => {
              handleSubmit()
            }}
          >
            Analyse
          </button>
        </Grid>
        <Grid item xs={12} className="grid_item">
          <label className="label"> Result </label>
          <br />
          <Container className="result">
            {result.Entities && <EntitiesTable result={result} />}

            {result.Languages && <LanguageTable result={result} />}

            {result.Sentiment && <SentimentTable result={result} />}

            {result.KeyPhrases && <KeyPhrasesTable result={result} />}

            {result.SyntaxTokens && <SyntaxTokensTable result={result} />}


          </Container>
        </Grid>
      </Grid>
    </div>
  );
};
export default MainGrid;