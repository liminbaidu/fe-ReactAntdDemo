import React from "react";
import "antd/dist/antd.css";
import "./index.css";

import { Button } from "antd";
import { Select } from 'antd';
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

class UpdateMeetingMinutes extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            meetingPreson:"王宇雪",
            jobContent:"",
            thisWeekJobContentJobContent:[],
            nextWeekJobContentJobContent:[],
            jobTimeWeekType:"1"
        }
    }
    UpjobContent=({ target: { value } }) => {
        this.setState({ jobContent:value });
    };

    UpmeetingPreson=(value)=>{
        this.setState({ meetingPreson:value });
    };

    UpjobTimeWeekType=(value)=>{
        this.setState({ jobTimeWeekType:value });
    };

    handleResult=()=>{
        var jobContent=[];
        var extractTeamidRegular=/T\d{6}/;
        var jobContentLine=this.state.jobContent.split('\n');
        for (var i=0; i<jobContentLine.length;i++){
            jobContentLine[i]=jobContentLine[i].split("、")[1]?jobContentLine[i].split("、")[1]:jobContentLine[i].split("、")[0]
            var teamid=jobContentLine[i].match(extractTeamidRegular)?jobContentLine[i].match(extractTeamidRegular):[]
            if (teamid.length){
                var splitJobContentLine=jobContentLine[i].split(teamid[0])
                jobContent[i]=<p className="p">{splitJobContentLine[0]}<a href={"https://team.corp.kuaishou.com/web/task/"+teamid[0]}>{teamid[0]}</a>{splitJobContentLine[1]} - {this.state.meetingPreson}</p>
            }else {
                jobContent[i]=<p className="p">{jobContentLine[i]} - {this.state.meetingPreson}</p>
            }
        }
        if (this.state.jobTimeWeekType==="1"){
            jobContent.push(this.state.thisWeekJobContent)
            this.setState({
                thisWeekJobContent:jobContent,
                jobContent:""
            })
        }else {
            jobContent.push(this.state.nextWeekJobContent)
            this.setState({
                nextWeekJobContent:jobContent,
                jobContent:""
            })
        }

    };

    render(){
        return(
            <div className="GeneralContent">
                <div>
                    <div>
                        输入内容：
                        <TextArea
                            className="jobContentTextArea"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            value={this.state.jobContent} onChange={this.UpjobContent}
                            placeholder={this.state.jobContent}>
                        </TextArea>
                    </div>
                    <div>
                        输入姓名：
                        <Select className="ScreeningItems" defaultValue="王宇雪" style={{ width: 120 }} onChange={this.UpmeetingPreson}>
                            <Option value="王宇雪">王宇雪</Option>
                            <Option value="王超冉">王超冉</Option>
                            <Option value="李娜">李娜</Option>
                            <Option value="汪莉">汪莉</Option>
                            <Option value="李敏">李敏</Option>
                        </Select>
                        输入范围：
                        <Select className="ScreeningItems" defaultValue="1" style={{ width: 120 }} onChange={this.UpjobTimeWeekType}>
                            <Option value="1">本周工作</Option>
                            <Option value="2">下周工作</Option>
                        </Select>
                        <Button className="ScreeningItems" type="primary" onClick={this.handleResult}>确定</Button>
                        <Button className="ScreeningItems" type="primary" onClick={()=>{this.setState({thisWeekJobContent:[],nextWeekJobContent:[]})}}>清空</Button>
                    </div>
                </div>
                <div>
                    <p className="p">本周重点项目：</p>
                    {this.state.thisWeekJobContent}
                    <p className="p">下周重点项目：</p>
                    {this.state.nextWeekJobContent}
                </div>
            </div>
        )
    }
}

export default UpdateMeetingMinutes