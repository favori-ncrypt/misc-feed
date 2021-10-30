import React from 'react';
import './styles.css';
import axios from 'axios';

class Calculator extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            result: 0
        };
    }

    render() {
        const updateValue = (e) => {
            this.setState({
                value: (this.state.value!==0)?this.state.value+e.target.innerHTML:e.target.innerHTML,
            });
        };

        const updateResult = () => {
            var result = eval(this.state.value);
            this.setState({
                value: result,
                result: result
            });
        }
        
        const clear = () => {
            if (this.state.value.toString().length!==1){
                this.setState({
                    value: this.state.value.toString().slice(0,this.state.value.toString().length-1),
                    result: this.state.result
                });
            }
            else {
                this.setState({
                    value: 0,
                    result: 0
                });
            }
        }

        const allClear = () => {
            this.setState({
                value: 0,
                result: 0
            });
        }

   

        return (
        <div id="calculator">
		<header>
			<label id="previous">{this.state.result}</label>
			<div id="current">
				<div id="current-value">{this.state.value}</div>
			</div>
            
		</header>

		<div id="keys">
			<button id="all_clear" onClick={allClear}>AC</button>
			<button id="clear" onClick={clear}>C</button>

			<button className="numbers" onClick={updateValue}>1</button>
			<button className="numbers" onClick={updateValue}>2</button>
			<button className="numbers" onClick={updateValue}>3</button>
			<button className="operators" onClick={updateValue}>/</button>

			<button className="numbers" onClick={updateValue}>4</button>
			<button className="numbers" onClick={updateValue}>5</button>
			<button className="numbers" onClick={updateValue}>6</button>
			<button className="operators" onClick={updateValue}>*</button>

			<button className="numbers" onClick={updateValue}>7</button>
			<button className="numbers" onClick={updateValue}>8</button>
			<button className="numbers" onClick={updateValue}>9</button>
			<button className="operators" onClick={updateValue}>+</button>

			<button className="numbers" onClick={updateValue}>0</button>
			<button className="numbers" onClick={updateValue}>.</button>
			<button className="numbers" onClick={updateResult}>=</button>
			<button className="operators" onClick={updateValue}>-</button>
		</div>
	</div>
        );
    };
};

export default Calculator;