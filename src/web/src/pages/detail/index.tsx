import "./style.scss";
import { useEffect, useState } from "react";
import { Button, Divider, Dropdown } from "antd";
import Editor from "@/components/editor";
import noDocImg from "@/assets/no-doc.svg";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router";
import libImg from "@/assets/lib.svg";
import cs from "classnames";
import moreImg from "@/assets/more.svg";
import backImg from '@/assets/back.svg'
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";

function Detail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const book_id = searchParams.get("id");

  // const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState("");

  const [type, setType] = useState({ name: "" });
  const syncType = async () => {
    const res = await api.type.get({ id: book_id });
    setType(res);
  };

  const [docs, setDocs] = useState([]);
  const syncDocs = async () => {
    const res = await api.doc.get({ book_id });
    setDocs(res);
    setActiveDoc(res.at(0).id);
  };

  const [activeDoc, setActiveDoc] = useState();

  const toSave = async () => {
    console.log(111, content);
    const res = await api.doc.put({ id: activeDoc, des: content });
  };

  const createDoc = async () => {
    const res = await api.doc.add({ name: "无标题文档", book_id });
    syncDocs();
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "add") {
      createDoc();
    }
  };

  const onClickDoc = (id) => {
    setActiveDoc(id);
  };

  useEffect(() => {
    syncType();
    syncDocs();
  }, []);

  const syncContent = async () => {
    if (activeDoc) {
      const res = await api.doc.get({ id: activeDoc });
      setContent(res.des || "");
    }
  };

  const goHome = ()=>{
    navigate('/')
  }
  useEffect(() => {
    syncContent();
  }, [activeDoc]);

  const items: MenuProps["items"] = [
    {
      key: "add",
      label: <span>新增</span>,
    },
    {
      key: "2",
      label: <span>删除</span>,
    },
  ];
  return (
    <div className="detail-cmp">
      <div className="left-bar">
        <div className="title">
          <img className="back" src={backImg} onClick={goHome}/>
          <div className="title-inner">
            <img src={libImg} /> {type.name}
          </div>

        </div>
        <Divider />
        <div className="docs">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className={cs("doc", { "doc-active": doc.id === activeDoc })}
              onClick={() => onClickDoc(doc.id)}
            >
              {doc.name}
              <div className="tools">
                <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                  <img src={moreImg} onClick={(e) => e.preventDefault()} />
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="main">
        <div className="top-bar">
          <div>

          </div>
          <div>
            <Button type="primary" onClick={toSave}>
              保存
            </Button>
          </div>
        </div>
        {docs.length > 0 ? (
          <div className="have-data">
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
  );
}



export default Detail;
