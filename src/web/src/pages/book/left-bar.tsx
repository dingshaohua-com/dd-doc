import { Divider } from 'antd';
import libImg from '@/assets/lib.svg';
import backImg from '@/assets/back.svg';
import DocNav from '@/components/doc-nav';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import emitter from '@/emitter';

const LeftBar: FC<any> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
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


  const items = [
    {
      key: 'add',
      label: <span>新增</span>,
    },
    {
      key: 'edit',
      label: <span>编辑</span>,
    },
    {
      key: 'remove',
      label: <span>删除</span>,
    },
  ];

  const onDropdownClick = (key, node) => {
    emitter.emit('onDropdownClick', {key, node});

  }

  useEffect(() => {
    if (docId) {
      setActiveDoc(docId);
    } else {
      if (props.book.docs.length > 0) {
        const firstDoc = props.book.docs.at(0).id;
        setActiveDocWithUrl(firstDoc);
      }
    }
  }, [props.book]);


  return (
    <div className="left-bar">
      <div className="title">
        <img className="back" src={backImg} onClick={goBack} />
        <div className="title-inner">
          <img src={libImg} />
          {props.book.name}
        </div>
      </div>
      <Divider />
      <div className="docs">
        {props.book?.docs?.length > 0 && <DocNav data={props.book.docs} dropdownItems={items} onDropdownClick={onDropdownClick} activeId={activeDoc} setActiveId={setActiveDocWithUrl} />}
      </div>
    </div>
  );
};

export default LeftBar;
