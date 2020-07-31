import React from 'react';
// import './App.css';
import './App.scss';
import Buttons from './Buttons';
import Formula from './Formula';
import Output from './Output';
const isOperator = /[x/+-]/; //Nhan, chia, cong, tru
const endsWithOperator = /[x/+-]$/;
const endsWithNegativeSign = /[x/+]-$/;
class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentValue: '0',
      prevValue: '0',
      formula:'',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false //Nguoi dung co click nut bang hay chua?
    }
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  initialize(){
    this.setState({
      currentValue: '0',
      prevValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false 
    })
  }
  maxDigitWarning(){
    this.setState({
      currentValue: 'Digit Limit Met',
      prevValue: this.state.currentValue
    })
    setTimeout(()=>{
      this.setState({
        currentValue: this.state.prevValue
      })
    }, 1000)
  }
  handleEvaluate() {
    if (!this.state.currentValue.includes("Limit") && !this.state.evaluated) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      console.log(expression);
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula:
          expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }

  handleOperators(event){
    if(!this.state.currentValue.includes('Limit')){
      const value = event.target.value;
      const {formula, prevValue, evaluated} = this.state;
      this.setState({
        currentValue: value,
        evaluate: false
      })
      if(evaluated){
        this.setState({
          formula:prevValue+value
        })
      }
      else if(!endsWithOperator.test(formula)){
        this.setState({
          prevValue:formula,
          formula: formula+value
        })
      }
      else if(!endsWithNegativeSign.test(formula)){
        this.setState({
          formula: (endsWithNegativeSign.test(formula+value) ? formula:prevValue) + value
        })
      }
      else if(value !== '-'){
        this.setState({
          formula: prevValue+value
        })
      }
    }
  }

  handleNumbers(event){
    if(!this.state.currentValue.includes('Limit')){
      const value = event.target.value;
      const {currentValue, formula, evaluated} = this.state;
      this.setState({
        evaluated: false
      })
      if(currentValue.length > 21){
        this.maxDigitWarning();
      }
      else if(evaluated){ //trong truong hop dau bang da duoc bam truoc do, thi khi mot number duoc bam thi cac ket qua hien thi truoc do se bien mat va duoc thay the bang number vua bam
        this.setState({
          currentValue: value,
          formula: value !== '0' ? value:'' //Dam bao neu bam so 0 nhieu lan thi man hinh chi hien thi so 0 mot lan(ham else if binh thuong nhung du dk dung hay sai deu tra ve cung mot gia tri la value)
        })
      }
      else{//truong hop chua click dau =
        this.setState({
          currentValue: currentValue === '0' || isOperator.test(currentValue) ? value : currentValue+value,
          formula: currentValue === '0' && value === '0'?
                      formula === ''? value:formula
                    :/([^.0-9]0|^0)$/.test(formula)?formula.slice(0,-1) + value:formula+value
        })
      }
    }
  }
  
  handleDecimal(){
    if(this.state.evaluated === true){
      this.setState({
        currentValue: '0.',
        formula: '0.',
        evaluated: false
      })
    }
    else if(!this.state.currentValue.includes('.') && !this.state.currentValue.includes('Limit')){
      this.setState({
        evaluated: false
      })
      if(this.state.currentValue.length>21){
        this.maxDigitWarning();
      }
      else if(endsWithOperator.test(this.state.formula)||(this.state.currentValue==='0' && this.state.formula==='')){
        this.setState({
          currentValue:'0.',
          formula: this.state.formula + '0.'
        })
      }
      else{
        this.setState({
          currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula+'.'
        })
      }
    }
  }
  render(){
    return(
      <div>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, '.')} />
          <Output currentValue = {this.state.currentValue} />
          <Buttons decimal={this.handleDecimal} evaluate={this.handleEvaluate} initialize={this.initialize} numbers={this.handleNumbers} operators={this.handleOperators} />
        </div>
        <div className="author">
          {" "}
          Designed and Coded By <br />
          <a href="https://github.com/hungnguyen7" target="_blank">
            Hung Nguyen
          </a>
        </div>
      </div>
    )
  }
}

export default Calculator;
