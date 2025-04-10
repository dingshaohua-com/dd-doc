import { Divider } from 'antd';
import libImg from '@/assets/lib.svg';
import backImg from '@/assets/back.svg';
import DocNav from '@/components/doc-nav';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';

const LeftBar: FC = () => {
  const [searchParams] = useSearchParams();
  const book_id = searchParams.get('id');

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const [type, setType] = useState({ name: '' });
  const syncType = async () => {
    const res = await api.type.get({ id: book_id });
    console.log(1111, res);

    setType(res);
  };

  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState();
  const syncDocs = async () => {
    const res = await api.doc.get({ book_id });
    setDocs(res);
    setActiveDoc(res.at(0).id);
  };

  useEffect(() => {
    syncType();
    syncDocs();
  }, []);
  return (
    <div className="left-bar">
      <div className="title">
        <img className="back" src={backImg} onClick={goHome} />
        <div className="title-inner">
          <img src={libImg} /> {type.name}
        </div>
      </div>
      <Divider />
      <div className="docs">
        {/* <DocNav
          data={docs}
          activeId={activeDoc}
          onItemClick={onClickDoc}
          // dropdownItems={dropdownItems}
          onDropdownClick={onClick}
        /> */}
      </div>
    </div>
  );
};

export default LeftBar;
