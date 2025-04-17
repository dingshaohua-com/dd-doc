import './style.scss';
import { useEffect, useState } from 'react';

import Editor from '@/components/editor';
import noDocImg from '@/assets/no-doc.svg';
import { PlusCircleOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import LeftBar from './left-bar';
import { useNavigate, useSearchParams } from 'react-router';

function Book() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc_id');
  const bookId = searchParams.get('book_id');

  const [docs, setDocs] = useState([]);

  const [docDtl, setDocDtl] = useState('');
  const syncDoc = async () => {
    const res = await api.doc.get({ id: docId });
    setDocDtl(res.des || '');
  };

  // // const [showEditor, setShowEditor] = useState(false);
  // const [content, setContent] = useState("");

  // const toSave = async () => {
  //   console.log(111, content);
  //   const res = await api.doc.put({ id: activeDoc, des: content });
  // };

  const createDoc = async () => {
    const params: any = { name: "无标题文档", book_id:bookId };
    // params.pid = activeDoc;
    const res = await api.doc.add(params);
    // syncDocs();
  };
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

  useEffect(() => {
    if (docId) {
      syncDoc();
    }
  }, [docId]);

  return (
    <div className="detail-cmp">
      <LeftBar setDocs={setDocs}/>
      <div className="main">
        {/* <div className="top-bar">
          <div></div>
          <div>
            <Button type="primary" onClick={toSave} size="small">
              保存
            </Button>
          </div>
        </div> */}
        {docs.length > 0 ? (
          <div className="have-data">
            <Editor content={docDtl} setContent={setDocDtl} readOnly={true}/>
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

export default Book;
