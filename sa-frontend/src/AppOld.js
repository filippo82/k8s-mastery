import React, {Component, useState} from 'react';
import './App.css';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Polarity from "./components/Polarity";

const style = {
    marginLeft: 12,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentence: '',
            polarity: undefined
        };
    };

    analyzeSentence() {
        fetch('http://localhost:8080/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: this.textField.getValue()})
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    onEnterPress = e => {
        if (e.key === 'Enter') {
            this.analyzeSentence();
        }
    };

    render() {
        const polarityComponent = this.state.polarity !== undefined ?
            <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
            null;

        return (
            <MuiThemeProvider>
                <div className="centerize">
                    <Paper elevation={3} className="content">
                        <h2>Sentiment Analyser</h2>
                        <TextField ref={ref => this.textField = ref} onKeyUp={this.onEnterPress.bind(this)}
                                   placeholder="Have a good day!" helperText="Type your sentence."/>
                        <Button variant="contained" onClick={this.analyzeSentence.bind(this)}>Send</Button>
                        {polarityComponent}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
