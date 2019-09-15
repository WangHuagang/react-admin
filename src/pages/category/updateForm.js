import React, { Component } from 'react';
import {Form, Select, Input} from 'antd'

const Option = Select.Option
const {Item} = Form

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentWillMount(){
        //执行父组件传递过来的函数，将值回调回去
        this.props.getForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {categoryName} = this.props
        return ( 
            <Form>
                {/* <Item>
                    <Select>
                        <Option value='0'>123</Option>
                        <Option value='2'>13</Option>
                    </Select>
                </Item> */}
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: categoryName
                        })(
                            <Input/>
                        )
                    }
                </Item>
            </Form>
        );
    }
}
 
export default Form.create()(UpdateForm);