import React, {Component} from 'react';
import logo from './ffxii-logo.png';
import './App.css';
import MersenneTwister from 'mersennetwister';

const n = 624;
const m = 397;

class App extends Component {

    state = {
        healValues: [],
        inputValue: "",
        mt: new MersenneTwister(4537)
    };

    constructor(props) {
        super(props);
    }

    beginClick() {
        this.setState(st => {
            return {
               healValues: [st.inputValue],
                inputValue: ""
            };
        })
    }

    inputHealChange(value) {
        let cleanValue = (value || "").replace(/\D/, "");
        this.setState({
            inputValue: cleanValue
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Final Fantasy XII - ZA RNG Helper - Webapp edition</h1>
                </header>
                <input value={this.state.inputValue} onInput={(event) => this.inputHealChange(event.target.value)}/>
                <button onClick={() => this.setState(st =>  {
                    let arr = st.healValues;
                    if (st.inputValue.trim())
                        arr.push(st.inputValue);
                    return {
                        healValues: arr,
                        inputValue: ""
                    }
                })}>Teste</button>
                <button onClick={() => this.beginClick()}>Begin</button>
                <div>{this.state.healValues.join(", ")}</div>
            </div>
        );
    }
}

export default App;
