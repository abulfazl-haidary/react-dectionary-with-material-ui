import axios from "axios";
import { Container, Switch, withStyles } from '@material-ui/core';
import './App.css';
import {useEffect, useState} from "react"
import Header from "./Components/Header/Header"
import './Components/Definitions/Definitions.css';
import Definitions from "./Components/Definitions/Definitions";
import { grey } from "@material-ui/core/colors";


function App() {
  //4. creating another state for word
  const [word, setWord] = useState("");

  //3. initializing the state
  const [meanings, setMeanings] = useState([]);
  //     -variable  -functionForChangingTheState       -Going to be the initial state
  
  //5. creating another state for the language category
  const [category, setCategory] = useState("en")

  //10.2 creating another state for Modes
  const [LightMode, setLightMode] = useState(false)

  //10. adding the switch for switching the theme
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  //1.we need a async func for fetching from the API
  const dictionaryApi = async() => {
    try {
        const data = await axios.get(
          // 8. for changing the API we need to use the ``
          // "https://api.dictionaryapi.dev/api/v2/entries/en/plane" 
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );

        console.log(data)
        //3.1 just getting the meanings
        setMeanings(data.data)
       
    } catch (err) {
      console.log(err)
    }
  };

  // console.log(meanings);
 
  //2.after fetching we need to call the API and for that we use useEffect
  useEffect(() => {
    dictionaryApi();
  }, [word, category])  //8.1 we need to call this API every time we change our word or category.
  


  return ( 
    <div className="App" 
      style={{ 
        height: "100vh", backgroundColor: LightMode ? "#EAE7DC" : "#24305E",
        color: LightMode ? "black" : "white", 
        transition: "all .4s linear"
    }}
    >
    <Container 
      maxWidth="md" 
      style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "evenly" }}
    >
    
    {/* 10.1  adding Dark and Light Mode */}
    <div style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}>
      
      {/* 10.5 Changing the word when toggling the mode */}
      <span>{LightMode ? "Dark" : "Light"}</span>
      <DarkMode 
        checked={LightMode} 
        onChange={() => setLightMode(!LightMode)}
      /> {/* 10.4 setting the darkMode by default */}
    </div>

      {/* 4. Creating Header component     */}
      {/* 5.1 passing it as a prop*/}
      <Header 
        category={category} 
        setCategory={setCategory} 
        word={word}     // 5.4 passing the word and setWord in header
        setWord={setWord}
        LightMode={LightMode} //10.6 passing the Modes for the header
      />
      {/* 9. Creating the box for the meanings and sending the word, category meanings*/}
      { meanings && (       //9.3 means if its something inside meanings then the definition will be rendered.
        <Definitions word={word} meanings={meanings} category={category} LightMode={LightMode}/> //passing it to the definitions
        )}                                                                    
    </Container>
  </div>
  );
}

export default App;
