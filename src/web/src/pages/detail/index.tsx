
import "./style.scss";
import { useEffect, useState } from "react";
import { Button } from "antd"
import Editor from "@/components/editor";
import noDocImg from '@/assets/no-doc.svg'


function Detail() {
  const [content, setContent] = useState("");

  const [docs, setDocs] = useState([]);
  const syncDocs = async () => {
    const res = await api.doc.get();
    setDocs(res)
  }

  const toSave = async () => {
    console.log(111, content);
    const res = await api.doc.add();
  }

  useEffect(() => {
    syncDocs();
  }, [])
  return (
    <div className="detail-cmp">
      <div className="navbar">
        <div>

        </div>
        <div>
          <Button type="primary" onClick={toSave}>保存</Button>
        </div>

      </div>
      <div className="content">
        <div className="docs">

        </div>
        <div className="editor">
          {docs.length > 0 ? <div className="data">
            <Editor content={content} setContent={setContent} />
          </div> : <div className="no-data">
            <div>
            <img src={noDocImg} />
            <div>创建第一篇</div>
            </div>
           
          </div>}

        </div>
      </div>

    </div>
  );
}

export default Detail;
