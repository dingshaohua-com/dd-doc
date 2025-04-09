import "./style.scss";
import { useEffect, useState } from "react";

import Editor from "@/components/editor";
import noDocImg from "@/assets/no-doc.svg";
import { PlusCircleOutlined } from "@ant-design/icons";


import type { MenuProps } from "antd";
import LeftBar from "./left-bar";



function Detail() {


  // // const [showEditor, setShowEditor] = useState(false);
  // const [content, setContent] = useState("");







  // const toSave = async () => {
  //   console.log(111, content);
  //   const res = await api.doc.put({ id: activeDoc, des: content });
  // };

  // const createDoc = async () => {
  //   const params: any = { name: "无标题文档", book_id };
  //   params.pid = activeDoc;
  //   const res = await api.doc.add(params);
  //   syncDocs();
  // };
  // const onClick: MenuProps["onClick"] = ({ key }) => {
  //   if (key === "add") {
  //     createDoc();
  //   }
  // };

  // const onClickDoc = (id) => {
  //   setActiveDoc(id);
  // };



  // const syncContent = async () => {
  //   if (activeDoc) {
  //     const res = await api.doc.get({ id: activeDoc });
  //     setContent(res.des || "");
  //   }
  // };

 
  // useEffect(() => {
  //   syncContent();
  // }, [activeDoc]);

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
      
      <LeftBar/>
      <div className="main">
        {/* <div className="top-bar">
          <div></div>
          <div>
            <Button type="primary" onClick={toSave} size="small">
              保存
            </Button>
          </div>
        </div> */}
        {/* {docs.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
}

export default Detail;
