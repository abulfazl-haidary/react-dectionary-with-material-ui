import { createMuiTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import './Header.css';
import categories from '../../data/category'

// 5.2 receiving category and set getCategory in the header(distructuring)
// 5.5 receiving the word and setWord in header
// 10.7 receiving the LightMode in header
const Header = ({ setCategory, category, word, setWord, LightMode }) => {
    //4.2 adding the darkTheme form Material UI
    const darkTheme = createMuiTheme({
        palette: {
            primary: {
                main: LightMode ? "#000" : "#fff"   // 10.8
            },
            type: LightMode ? "light" : "dark"      // 10.8
        },
    });

    //7. creating new func for when changing the lang it should remove the searched work and its title
    const handleChange = (language) => {
        setCategory(language)
        setWord("");
    }


    return (
        //4.1 Creating the header
        <div className="header">
            {/* 6. changing the title using ternary operators*/}
            <span className="title">{word ? word : "Word Hunt"} </span>           
            <div className="inputs">
                {/* adding darkTheme for the input */}
                <ThemeProvider theme={darkTheme}>
                    {/* 5.3 adding the label for the word input */}
                    <TextField 
                        className="search" 
                        label="Search a Word" 
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <TextField
                        className="select"
                        select
                        label="Language"
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                        >
                            {categories.map(option => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
