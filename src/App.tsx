import React, { Component } from "react";
import { Button, Table, Avatar } from "antd";
import './App.css';

const dataSource = [
  {'title': 'test1', 'id': 1, 'avatar': `https://api.adorable.io/avatars/285/${'test1'}.png`},
  {'title': 'test2', 'id': 2, 'avatar': `https://api.adorable.io/avatars/285/${'test2'}.png`},
  {'title': 'test3', 'id': 3, 'avatar': `https://api.adorable.io/avatars/285/${'test3'}.png`},
  {'title': 'test4', 'id': 4, 'avatar': `https://api.adorable.io/avatars/285/${'test4'}.png`},
]

class APP extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    }
  }


  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: string, _: any) => (
          <Avatar src={text}/>
        )
      },
    ];

    return (
      <div className="container">
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginTop: 32, marginBottom: 16 }} type="primary" onClick={() => {console.log(this.state.selectedRows)}}>
            举报
          </Button>
        </div>
        <Table
          pagination={false}
          rowKey='id'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                selectedRowKeys,
                selectedRows,
              })
            },
          }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default APP;
