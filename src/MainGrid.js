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

import LanguageTable from './LanguageTable';
import SentimentTable from './SentimentTable';
import EntitiesTable from './EntitiesTable';
import KeyPhrasesTable from './KeyPhrasesTable';
import SyntaxTokensTable from './SyntaxTokensTable';

const MainGrid = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});
  const [type, setType] = useState("");
  const [finaltype, setfinalType] = useState("");
  const [query, setQuery] = useState("");

  const analysisTypeLinks = [
    {
      type: "sentiment",
      postLink: 'https://9e0a21psrd.execute-api.us-west-2.amazonaws.com/DetectSentiment?text=' + encodeURIComponent(String(input)).replace(/%20/g, "+")
    },
    {
      type: "language",
      postLink: 'https://6gdzbjbmnk.execute-api.us-west-2.amazonaws.com/DetectLanguage?text=' + encodeURIComponent(String(input)).replace(/%20/g, "+")
    },
    {
      type: "entity",
      postLink: 'https://0ob1f1jkt7.execute-api.us-west-2.amazonaws.com/StageTest/DetectEntities?text=' + encodeURIComponent(String(input)).replace(/%20/g, "+")
    },
    {
      type: "key phrases",
      postLink: 'https://mpjc1b99ud.execute-api.us-west-2.amazonaws.com/StateTestKeyPhrases/DetectKeyPhrases?text=' + encodeURIComponent(String(input)).replace(/%20/g, "+")
    },
    {
      type: "syntax",
      postLink: 'https://he4e0vjvl3.execute-api.us-west-2.amazonaws.com/DetectSyntax?text=' + encodeURIComponent(String(input)).replace(/%20/g, "+")
    },
  ];

  const handleSubmit = () => {
    if (!input) {
      showError("Text Required.");
      return;
    }
    if (!type) {
      showError("Please Select the Analysis type.");
      return;
    }
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
    const filtered = analysisTypeLinks.filter(val => val.type == type)[0];
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
    <Grid container spacing={10} className="grid">
      <Grid item xs={6} className="input-box">
        <label className="label"> Text </label>
        <TextField
          placeholder="Type your text here"
          variant="filled"
          multiline
          value={input}
          rows={6}
          fullWidth={true}
          onChange={(e) => setInput(e.target.value)}
        />
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
  );
};
export default MainGrid;