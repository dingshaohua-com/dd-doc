import './style.scss';
import { useEffect, useState } from 'react';

import Editor from '@/components/editor';
import noDocImg from '@/assets/no-doc.svg';
import { PlusCircleOutlined } from '@ant-design/icons';
import NoData from '@/components/no-data';
import { Skeleton } from 'antd';

import type { MenuProps } from 'antd';
import LeftBar from './left-bar';
import { useNavigate, useSearchParams } from 'react-router';
import emitter from '@/emitter';
import { Button, Divider, Space } from 'antd';

function Book() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc_id');
  const bookId = searchParams.get('id');

  // 获取书籍详情
  const [reqOver, setReqOver] = useState(false);
  const [book, setBook] = useState<any>();
  const syncBook = async () => {
    try {
      const res = await api.book.get({ id: bookId, includeDoc: true });
      setBook(res);
    } finally {
      setReqOver(true);
    }

  };




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
    const params: any = { name: "无标题文档", book_id: bookId };
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


  useEffect(() => {
    if (docId) {
      syncDoc();
    }
  }, [docId]);

  const [readOnly, setReadOnly] = useState(true);
  useEffect(() => {
    syncBook();
    emitter.on('onDropdownClick', ({ key, node }) => {
      console.log('onDropdownClick', key, node);
      if (key === 'edit') {
        setReadOnly(false);
      }
    });

  }, []);

  return (
    <div className="book">
      {
        reqOver ? <>{book ? <div className='book-dtl'>
          <LeftBar book={book} />
          <div className="main">
            {docDtl ? (
              <div className="have-data">
                <Editor content={docDtl} setContent={setDocDtl} readOnly={readOnly} rightBar={<Space>
                  <Button type="primary" size="small" onClick={()=>setReadOnly(true)}>
                    退出编辑
                  </Button>
                  <Button type="primary" size="small">
                    保存
                  </Button>
                </Space>}>
                </Editor>
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
        </div> : <NoData path="/shelf" />}</> : <Skeleton />
      }


    </div>
  );
}

export default Book;
