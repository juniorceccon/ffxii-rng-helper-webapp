import React, {Component} from 'react';
import logo from './ffxii-logo.png';
import './App.css';
import MersenneTwister from 'mersennetwister';

const spells = {
    "Cure": 20,
    "Cura": 45,
    "Curaga": 85,
    "Curaja": 145,
    "CuraIZJS": 46,
    "CuragaIZJS": 86,
    "CurajaIZJS": 120
};

function numberOnly(value) {
    return (value || "").replace(/\D/, "");
}

function calcHealValue(spell, level, mag, serenityMult, randomV) {
    let healAmount = (spell + (randomV % (spell * 12.5)) / 100) * (2 + mag * (level + mag) / 256) * serenityMult;

    return Math.floor(healAmount >>> 0);
}

class App extends Component {

    state = {
        inputHeals: [],
        healCalculated: [],
        inputValue: "",
        inputLevel: "",
        selectedSpell: 20,
        checkedSerenity: true,
        inputMag: "",
        mt: new MersenneTwister(4537)
    };

    resetClick() {
        this.setState({inputHeals: []});


    }

    inputHealChange(value) {
        let cleanValue = (value || "").replace(/\D/, "");
        this.setState({
            inputValue: cleanValue
        });
    }


    calcClick() {
        const calculated = calcHealValue(
            this.state.selectedSpell,
            parseInt(this.state.inputLevel, 10),
            parseInt(this.state.inputMag, 10),
            this.state.checkedSerenity ? 1.5 : 1,
            this.state.mt.int());

        this.setState(st => {
            let arr = st.healCalculated;

            arr.push(calculated);

            return {
                healCalculated: arr
            }
        });
    }

    nextClick() {
        this.setState(st => {
            let arr = st.inputHeals;
            if (st.inputValue.trim())
                arr.push(st.inputValue);
            return {
                inputHeals: arr,
                inputValue: ""
            }
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Final Fantasy XII - ZA RNG Helper - Webapp edition</h1>
                </header>
                <div>
                    <label>Level:</label>
                    <input disabled={this.state.inputHeals.length !== 0} name="level" type="text"
                           value={this.state.inputLevel}
                           onInput={e => this.setState({inputLevel: numberOnly(e.target.value)})}/>

                    <label>Mag:</label>
                    <input disabled={this.state.inputHeals.length !== 0} name="level" type="text"
                           value={this.state.inputMag}
                           onInput={e => this.setState({inputMag: numberOnly(e.target.value)})}/>

                    <label>Spell:</label>
                    <select disabled={this.state.inputHeals.length !== 0} value={this.state.selectedSpell}
                            onChange={e => this.setState({selectedSpell: parseInt(e.target.value, 10)})}>
                        {Object.entries(spells).map(entry => <option key={entry[0]}
                                                                     value={entry[1]}>{entry[0]}</option>)}
                    </select>

                    <input disabled={this.state.inputHeals.length !== 0} type="checkbox"
                           checked={this.state.checkedSerenity}
                           onChange={e => this.setState({checkedSerenity: e.target.checked})}/>
                    <label>Serenity</label>

                </div>
                <div>
                    <input value={this.state.inputValue} onInput={(event) => this.inputHealChange(event.target.value)}/>
                    <button onClick={() => this.nextClick()}>Next
                    </button>
                    <button onClick={() => this.resetClick()}>Reset</button>
                    <button onClick={() => this.calcClick()}>Calc next cure</button>
                    <div>{this.state.inputHeals.join(", ")}</div>
                    <div>{this.state.healCalculated.join(", ")}</div>
                </div>
            </div>
        );
    }
}

export default App;
