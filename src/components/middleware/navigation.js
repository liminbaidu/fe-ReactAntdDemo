import React from "react";
import "antd/dist/antd.css";
import { Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import {Redirect} from "react-router";
const { SubMenu } = Menu;

class Navigation extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            "NavigationRoute":"",
            "defaulturl":"http://172.16.77.22:3000/",
            "Navigation": {
                "NavigationLevelId":{"frist":[1],"second":[2,3,4],"third":[]},
                "NavigationInfo":{
                    "1": {
                        "name": "其他",
                        "remark":"Other",
                        "components":""
                    },
                    "2": {
                        "name": "修改会议纪要",
                        "remark":"UpdateMeetingMinutes",
                        "components":"UpdateMeetingMinutes"
                    },
                    "3": {
                        "name": "js易错点",
                        "remark":"JsErrorProne",
                        "components":"JsErrorProne"
                    },
                    "4": {
                        "name": "react生命周期",
                        "remark":"ReactLifeCycle",
                        "components":"ReactLifeCycle"
                    }

                },
                "NavigationRelation":{
                    "1":[2,3,4]
                }
            }
        })
    }
    createNavigationInfo=() => {
        var Navigation=this.state.Navigation
        var NavigationFristLevel=[<Menu.Item key={"HomePage"}><div onClick={()=>{window.location.href=this.state.defaulturl}}>首页</div></Menu.Item>]
        var ret=[]
        for(var i=0; i<Navigation.NavigationLevelId.frist.length; i++){
            var NavigationSecondLevel=[]
            for (var j=0; j<Navigation.NavigationRelation[Navigation.NavigationLevelId.frist[i]].length;j++){
                let secondNavigation=Navigation.NavigationInfo[Navigation.NavigationRelation[Navigation.NavigationLevelId.frist[i]][j]]
                NavigationSecondLevel.push(<Menu.Item key={secondNavigation.remark}><div onClick={()=>this.setState({NavigationRoute:secondNavigation.remark})}>{secondNavigation.name}</div></Menu.Item>)
            }
            var firstNavigation=Navigation.NavigationInfo[Navigation.NavigationLevelId.frist[i]]
            NavigationFristLevel.push(<SubMenu key={firstNavigation.remark} icon={<UserOutlined />} title={firstNavigation.name}>{NavigationSecondLevel}</SubMenu>)
        }
        ret.push(<Menu
            key={"Menu"}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >{NavigationFristLevel}<Redirect to={"/"+this.state.NavigationRoute}></Redirect></Menu>)
        return ret
    }
    render() {
        var ret=this.createNavigationInfo()
        return ret
    }
}

export default Navigation