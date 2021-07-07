import React, { Component } from 'react';
import { Card ,Button, Icon, Table, Modal} from 'antd';
import LinkBtn from '../../components/linkBtn'
import {reqGetCategoryList, reqSubCategoryLists} from '../../api'
import UpdateCaregory from './updateForm'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categorys: [],//分类列表
            loading: false,
            isSub: false,
            pareantName: '',
            subcategorys:[],
            isShowUpdateStatue: false
         }
    }

    getInitCol = () => {
        this.columns = [
            {
              title: '种类名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 200,
              render: (category) => (
                  <span>
                      <LinkBtn onClick={() => this.showUpdate(category)}>修改分类</LinkBtn>
                      {this.state.isSub ? null : <LinkBtn onClick={() => this.getSubCategorys(category)}>查看子分类</LinkBtn>}
                  </span>
              )
            },
          ];
    }

    getSubCategorys = async (category) => {
        this.setState({loading: true})
        const result = await reqSubCategoryLists(category.key)
        this.setState({subcategorys: result.data, loading: false, isSub: true, pareantName: category.name})
    }

    getCategorys = async () => {
        const data = [
            {
                key: 1,
                name: '电脑'
            }
        ]
        this.setState({loading: true})
        // this.setState({categorys: data, loading: false})
        const result = await reqGetCategoryList();
        if(result.status === 0) {
            this.setState({categorys: result.data, loading: false})
        }else {
            this.setState({loading: true})
        }
    }

    goFirstList = () => {
        this.setState({
            pareantName:'',
            isSub: false,
            subcategorys: []
        })
    }

    componentWillMount() {
        this.getInitCol()
    }
    //发送异步请求获取数据
    componentDidMount(){
        this.getCategorys()
    }

    handleCancel = () => {
        this.setState({
            isShowUpdateStatue: false
        })
    }

    showUpdate = (category) => {
        this.category = category;
        this.setState({
            isShowUpdateStatue: true
        })
    }
    
    update = () => {
        const reCaregoryName = this.form.getFieldValue('categoryName')
        //获取到从子组件传递过来的值
        console.log(reCaregoryName)
        this.setState({
            isShowUpdateStatue: false
        })
    }

    render() { 
        const {categorys, loading, isSub, subcategorys, pareantName} = this.state
        const category = this.category || {}

        const title = !isSub ? '一级分类列表' : (
            <span>
                <LinkBtn onClick={this.goFirstList}>一级分类列表</LinkBtn>
                <Icon type='arrow-right'></Icon>
                <span>{pareantName}</span>
            </span>
        );
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )

        return ( 
            <Card title={title} extra={extra}>
                <Table 
                    bordered
                    rowKey='key'
                    loading={loading}
                    dataSource={isSub ? subcategorys : categorys} 
                    columns={this.columns} 
                    pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
                <Modal
                    title="更新分类"
                    visible={this.state.isShowUpdateStatue}
                    onOk={this.update}
                    onCancel={this.handleCancel}
                    >
                    {/* 通过props传递函数到子组件，子组件执行这个函数并返回值，从而将值从子组件传递到父组件 */}
                    <UpdateCaregory categoryName={category.name} getForm={(form)=>{this.form = form}} test={(val)=>{console.log(val)}}></UpdateCaregory>
                </Modal>
            </Card>

        );
    }
}
 
export default Category;