import React, { Component } from 'react';
import { Card ,Button, Icon, Table} from 'antd';
import LinkBtn from '../../components/linkBtn'
import {reqGetCategoryList} from '../../api'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categorys: [],//分类列表
            loading: false
         }
    }

    getInitCol = () => {
        this.columns = [
            {
              title: '一级分类列表',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 200,
              render: () => (
                  <span>
                      <LinkBtn>修改</LinkBtn>
                      <LinkBtn>查看</LinkBtn>
                  </span>
              )
            },
          ];
    }

    getCategorys = async () => {
        this.setState({loading: true})
        const result = await reqGetCategoryList();
        if(result.status === 0) {
            this.setState({categorys: result.data, loading: false})
        }else {

        }
    }

    componentWillMount() {
        this.getInitCol()
    }
    //发送异步请求获取数据
    componentDidMount(){
        this.getCategorys()
    }

    render() { 
        const title = '一级分类列表';
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        const {categorys, loading} = this.state
          
        return ( 
            <Card title={title} extra={extra}>
                <Table 
                    bordered
                    rowKey='key'
                    loading={loading}
                    dataSource={categorys} 
                    columns={this.columns} 
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
            </Card>
        );
    }
}
 
export default Category;