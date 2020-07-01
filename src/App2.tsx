import React, { useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Card, Typography, List } from 'antd';
import { convertMarkdownToProblem } from './utils/ConvertMarkdown';
import { Problem } from './interfaces';
import './App.css';

const { Title, Paragraph, Text } = Typography;

function App() {
  const [problems, setProblems] = useState<Array<Problem>>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState('');

  return (
    <div className="App">
      <Upload
        className="avatar-uploader"
        showUploadList={false}
        accept=".md"
        beforeUpload={file => {
          let myReader = new FileReader();
          setUploading(true);
          myReader.addEventListener("loadend", (e) => {
            let markdown = e.target?.result?.toString();
            setFile(file.name)
            if (markdown) {
              let problems = convertMarkdownToProblem(markdown)
              console.log(JSON.stringify(problems));
              setProblems(problems);
            }
            setUploading(false);
          });
          myReader.readAsText(file)

          return false;
        }}
      >
        {file ?
          <span>{file}</span> :
          <div>
            {uploading ? <LoadingOutlined /> : <UploadOutlined />}
            <div className="ant-upload-text">上传markdown文件</div>
          </div>
        }
      </Upload>

      <div className="problem-list">
        {problems.length !== 0 &&
          <Button 
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => {
              let blob1 = new Blob([JSON.stringify(problems)], { type: "text/plain" });
              let url = window.URL.createObjectURL(blob1);

              let a: any = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";
              a.href = url;
              a.setAttribute("download","json_file.json");
              a.click();
              window.URL.revokeObjectURL(url);
            }}
          >
            下载json文件
          </Button>
        }
        <List
          grid={{
            gutter: 24,
            md: 1,
            lg: 2,
            xl: 3,
          }}
          dataSource={problems}
          renderItem={(problem: Problem) => (
            <List.Item key={problem.title} style={{ marginBottom: 0 }}>
              <Card className="problem-card">
                <Typography>
                  <Title level={4}>{problem.title}</Title>
                  {problem.options.map((option) => (
                    <Paragraph key={option.value}>
                      <Text strong>
                        {option.value}
                      </Text>.{option.text}
                    </Paragraph>
                  ))}
                  <Paragraph>
                    <Text strong>
                      正确答案
                  </Text>：{problem.answer}
                  </Paragraph>
                  <Paragraph>
                    <Text strong>
                      解释
                  </Text>：{problem.hint}
                  </Paragraph>
                </Typography>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default App;
