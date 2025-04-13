import { Divider } from 'antd';
import libImg from '@/assets/lib.svg';
import backImg from '@/assets/back.svg';
import DocNav from '@/components/doc-nav';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const LeftBar: FC<any> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookId = searchParams.get('book_id');
  const docId = searchParams.get('doc_id');

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/shelf');
  };

  // 当前选中的doc
  const [activeDoc, setActiveDoc] = useState<string>();
  const setActiveDocWithUrl = (docId) => {
    setActiveDoc(docId);
    searchParams.set('doc_id', docId);
    setSearchParams(searchParams); // 自动更新 URL，无刷新
  };

  // 获取书籍详情
  const [book, setBook] = useState<any>({});
  const syncBook = async () => {
    const res = await api.book.get({ id: bookId, includeDoc: true });
    setBook(res);
    props.setDocs(res.docs)
    if (docId) {
      setActiveDoc(docId);
    } else {
      if(res.docs.length>0){
        const firstDoc = res.docs.at(0).id;
        setActiveDocWithUrl(firstDoc);
      }
     
    }
  };

  const items = [
    {
      key: 'add',
      label: <span>新增</span>,
    },
    {
      key: '2',
      label: <span>删除</span>,
    },
  ];

  const onDropdownClick = (key, node)=>{
    console.log(key, node);
    
  }

  useEffect(() => {
    // syncType();
    // syncDocs();
    syncBook();
  }, []);


  return (
    <div className="left-bar">
      <div className="title">
        <img className="back" src={backImg} onClick={goBack} />
        <div className="title-inner">
          <img src={libImg} />
          {book.name}
        </div>
      </div>
      <Divider />
      <div className="docs">{book?.docs?.length > 0 && <DocNav data={book.docs} dropdownItems={items} onDropdownClick={onDropdownClick}  activeId={activeDoc} setActiveId={setActiveDocWithUrl} />}</div>
    </div>
  );
};

export default LeftBar;
