import React from "react";
import "antd/dist/antd.css";
import UpdateMeetingMinutes from "./../index/Other/UpdateMeetingMinutes/index"
import JsErrorProne from "./../index/Other/JsErrorProne/index"
import ReactLifeCycle from "./../index/Other/ReactLifeCycle/index"

class PageContent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            "content":{
                "UpdateMeetingMinutes":<UpdateMeetingMinutes />,
                "JsErrorProne":<JsErrorProne/>,
                "ReactLifeCycle":<ReactLifeCycle/>
            }
        }
    }
    render() {
        return this.state.content[this.props.path["path"]]?this.state.content[this.props.path["path"]]:"首页"
    }
}

export default PageContent