import React from 'react';
const clearStyle = { background: "#ac3939" },
    operatorStyle = { background: "#666666" },
    equalsStyle = {
        background: "#004466",
        position: "absolute",
        height: 130,
        bottom: 5
    };
export default class Buttons extends React.Component{
    render(){
        return(
            <div>
                <button id='clear' onClick={this.props.initialize} value='AC' className='jumbo' style={clearStyle}>AC</button>
                <button id='divide' onClick={this.props.operators} value='/' style={operatorStyle}>/</button>
                <button id='multiply' onClick={this.props.operators} value='x' style={operatorStyle}>x</button>
                <button id='seven' onClick={this.props.numbers} value='7'>7</button>
                <button id='eight' onClick={this.props.numbers} value='8'>8</button>
                <button id='nine' onClick={this.props.numbers} value='9'>9</button>
                <button id='subtract' onClick={this.props.operators} value='-' style={operatorStyle}>-</button>
                <button id='four' onClick={this.props.numbers} value='4'>4</button>
                <button id='five' onClick={this.props.numbers} value='5'>5</button>
                <button id='six' onClick={this.props.numbers} value='6'>6</button>
                <button id='add' onClick={this.props.operators} value='+' style={operatorStyle}>+</button>
                <button id='one' onClick={this.props.numbers} value='1'>1</button>
                <button id='two' onClick={this.props.numbers} value='2'>2</button>
                <button id='three' onClick={this.props.numbers} value='3'>3</button>
                <button id='zero' onClick={this.props.numbers} value='0' className='jumbo'>0</button>
                <button id='decimal' onClick={this.props.decimal} value='.'>.</button>
                <button id='equals' onClick={this.props.evaluate} value='=' style={equalsStyle}>=</button>
            </div>
        )
    }
}