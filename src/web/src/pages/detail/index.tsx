import "./style.scss";
import { useEffect, useState } from "react";
import { Button, Divider } from "antd";
import Editor from "@/components/editor";
import noDocImg from "@/assets/no-doc.svg";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router";
import libImg from "@/assets/lib.svg"

function Detail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");


  // const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState("");

  const [type, setType] = useState({name:''});
  const syncType = async () => {
    const res = await api.type.get({ id });
    setType(res);
  };

  const [docs, setDocs] = useState([]);
  const syncDocs = async () => {
    const res = await api.doc.get();
    setDocs(res);
  };

  const toSave = async () => {
    console.log(111, content);
    const res = await api.doc.add();
  };

  const createDoc = async()=>{
    const res = await api.doc.add({name:'无标题文档'});
    syncDocs();
  }

  useEffect(() => {
    syncType();
    syncDocs();
  }, []);
  return (
    <div className="detail-cmp">
      <div className="navbar">
        <div></div>
        <div>
          <Button type="primary" onClick={toSave}>
            保存
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="docs">
          <div className="title"> <img src={libImg} /> {type.name}</div>
          <Divider />
          <div></div>
        </div>
        <div className="editor">
          {(docs.length > 0 )? (
            <div className="data">
              <Editor content={content} setContent={setContent} />
            </div>
          ) : (
            <div className="no-data">
              <div>
                <img src={noDocImg} />
                <div onClick={createDoc}>
                  <PlusCircleOutlined /> 创建第一篇
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
