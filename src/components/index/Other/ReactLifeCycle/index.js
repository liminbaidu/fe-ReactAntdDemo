import React from "react";
import "antd/dist/antd.css";
import "./index.css";


class ReactLifeCycle extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            x:"开始渲染-1"
        }
        console.log(this.state)
    }
    static getDerivedStateFromProps (props, state) {
        console.log(props, state)
        if (props !== state.x) {
            return {
                x: props.color
            }
        }
        return null
    }

    render() {
        // ReactLifeCycle.getDerivedStateFromPropss("xx")
        return(
            <div className="GeneralContent">{this.state.x}</div>
        )
    }

}

export default ReactLifeCycle