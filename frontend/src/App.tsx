import { Button, Upload, UploadFile, UploadProps, notification } from "antd";
import { useEffect, useState } from "react";
import "./App.css";

import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import DocumentList from "./Components/DocumentList";
import axios from "axios";

export interface DocumentStructure {
  name: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

function App() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [documentList, setDocumentList] = useState<DocumentStructure[]>([]);

  const fetchAllDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/document/");
      setDocumentList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (options) => {
    const isCsv = fileList[0].type === "text/csv";
    if (!isCsv) {
      notification.error({
        message: "Wrong Format",
        description: "Please upload a valid CSV file.",
      });
      return false; // Prevent upload
    }
    // Continue upload

    try {
      const formdata = new FormData();
      formdata.append("csvfile", fileList[0] as any);
      const res = axios.post("http://localhost:3000/document/", formdata);
      notification.success({
        message: "Document Added",
        description: `Document ${fileList[0].name} uploaded!`,
      });
      fetchAllDocuments();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error Adding document",
        description: "Please check console for errors",
      });
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Upload.Dragger
        customRequest={handleUpload}
        multiple={false}
        accept=".csv"
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag a CSV file to this area to upload
        </p>
      </Upload.Dragger>
      <Button
        style={{ width: "200px" }}
        danger
        type="primary"
        size="large"
        onClick={handleUpload}
        icon={<CloudUploadOutlined />}
      >
        Upload Document
      </Button>
      <DocumentList documentList={documentList} />
    </div>
  );
}

export default App;
