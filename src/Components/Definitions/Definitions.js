import React from 'react'
import './Definitions.css'

//9.1 receiving the word ...
const Definitions = ({word, category, meanings, LightMode}) => {
    return (

        <div className="meanings">
            {
                //adding the Audio
                meanings[0] && word && category === 'en' && (
                    <audio 
                        src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio} 
                        style={{backgroundColor: "#fff", borderRadius: 10}}
                        controls
                        >
                        Your Browser doesn't support audio element.
                    </audio>
                )
            }

            {/* 9.2 notice the usage of ternary operators */}
            { word === "" ? ( 
                <span className="subTitle"> Start by typing a word in Search </span>
            ) : (
                meanings.map((mean) => 
                   mean.meanings.map((item) => 
                      item.definitions.map((def) => (
                        <div 
                           className="singleMean"
                           style={{ 
                               backgroundColor: LightMode ? "#dbcbb4" : "white", 
                               color: LightMode ? "white" : "black" }}    
                        >
                            <b style={{color: "#E85A4F"}}>{def.definition}</b>
                            <hr style={{ backgroundColor: "#dadada", color: "#dadada", width: "100%" }}/>
                            {def.example && (
                                <span style={{fontFamily: "larsseit", fontWeight: "500"}}>
                                    <b>Example: </b>
                                    {def.example}
                                </span>
                            )}
                            {def.synonyms && (
                                <span style={{fontFamily: "larsseit", fontWeight: "500"}}>
                                    <b>Synonyms: </b>
                                    {def.synonyms.map((s) => `${s}, `)}
                                </span>
                            )}
                          </div>
                      ))
                   )
                )
            )}
        </div>
    );
}


export default Definitions
