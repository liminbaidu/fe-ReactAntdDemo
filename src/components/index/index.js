import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout } from 'antd';
import Navigation from "./../middleware/navigation"
import PageContent from "./../middleware/content"
const { Header, Content, Sider } = Layout;


class index extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            "Navigation":<Navigation/>,
            collapsed:false
        }
        console.log(this.props.match.params)
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    render() {
        return(
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" ></div>
                    </Header>
                    <Layout>
                        <Sider width={200}  collapsedWidth={80} theme={"light"} className="site-layout-background" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <Navigation />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    marginTop: 20,
                                    minHeight: 500,
                                }}
                            >
                                <PageContent path={this.props.match.params}/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )

    }

}

export default index