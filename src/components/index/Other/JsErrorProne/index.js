import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Select } from 'antd';
import { Button } from "antd";
const { Option } = Select;


class JsErrorProne extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ErrorProne:[
                {
                    name:". VS = 操作符优先级",
                    question:"  let a = {n : 1};\n" +
                        "        let b = a;\n" +
                        "        a.x = a = {n: 2};\n" +
                        "\n" +
                        "        \n" +
                        "        console.log(a.x)\n" +
                        "        console.log(b.x)\n",
                    answer:"undefined\n" +
                        "{ n : 2}"
                },
                {
                    name:"你真的了解作用域吗",
                    question:"  var a = 0,  \n" +
                        "            b = 0;\n" +
                        "        function A(a) {\n" +
                        "            A = function (b) {\n" +
                        "                console.log(a + b++)\n" +
                        "            }\n" +
                        "            console.log(a++)\n" +
                        "        }\n" +
                        "        A(1)\n" +
                        "        A(2)\n",
                    answer:"1\n" +
                        "4"
                },
                {
                    name:"类数组的length",
                    question:"  var obj = {\n" +
                        "            \"2\" : 3,\n" +
                        "            \"3\" : 4,\n" +
                        "            \"length\" : 2,\n" +
                        "            \"splice\" : Array.prototype.splice,\n" +
                        "            \"push\" : Array.prototype.push\n" +
                        "        }\n" +
                        "        obj.push(1)\n" +
                        "        obj.push(2)\n" +
                        "        console.log(obj)\n",
                    answer:"Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]\n"
                },
                {
                    name:"",
                    question:"",
                    answer:""
                },
            ],
            ErrorProneQuestion:[],
            ErrorProneAnswer:[],
            ErrorProneOrder:0
        }
    }

    CtErrorProneTypeOption=()=>{
        var ErrorProneTypeOption=[];
        for(var i=0;i<this.state.ErrorProne.length-1;i++){
            let ErrorProne=this.state.ErrorProne[i]
            ErrorProneTypeOption.push(<Option key={i} value={i}>{ErrorProne["name"]}</Option>)
        }
        console.log(ErrorProneTypeOption)
        return(
            <Select className="ScreeningItems" defaultValue={this.state.ErrorProne[0].name} style={{ width: 240 }} onChange={this.UpErrorProneQuestion}>
                {ErrorProneTypeOption}
            </Select>
        )
    }

    UpErrorProneQuestion=(value)=>{
        var ErrorProneQuestionList=[]
        var ErrorProneQuestion=this.state.ErrorProne[value]?this.state.ErrorProne[value]:this.state.ErrorProne[0]
        let QuestionFrist="问题：\n"
        ErrorProneQuestionList.push(<pre key={"ErrorProneQuestion"}>{QuestionFrist}{ErrorProneQuestion.question}</pre>)
        this.setState({
            ErrorProneQuestion:ErrorProneQuestionList,
            ErrorProneAnswer:[],
            ErrorProneOrder:value
        })
    }
    UpErrorProneAnswer=()=>{
        let AnswerFrist="答案：\n"
        var ErrorProneAnswer=[]
        ErrorProneAnswer.push(<pre key={"ErrorProneAnswer"}>{AnswerFrist}{this.state.ErrorProne[this.state.ErrorProneOrder].answer}</pre>)
        this.setState({
            ErrorProneAnswer:ErrorProneAnswer
        })
    }

    render() {
        let QuestionFrist="问题：\n"

        var ErrorProneQuestion=[]
        if (this.state.ErrorProneQuestion.length===0){
             ErrorProneQuestion.push(<pre key={"ErrorProneQuestion"}>{QuestionFrist}{this.state.ErrorProne[0].question}</pre>)
        }else {
            ErrorProneQuestion.push(this.state.ErrorProneQuestion)
        }
        return (
            <div className={"GeneralContent"}>
                <div>
                    <div>
                        选择类型：
                        {this.CtErrorProneTypeOption()}
                        <Button className={"ScreeningItems"} type="primary" onClick={this.UpErrorProneAnswer}>查看答案</Button>
                    </div>
                </div>
                <div>
                    <>{ErrorProneQuestion}</>
                    <>{this.state.ErrorProneAnswer}</>
                </div>
            </div>
        )
    }
}
export default JsErrorProne