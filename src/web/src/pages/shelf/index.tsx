import { useEffect, useRef, useState } from 'react';
import './style.scss';
import { Button, Input, Space } from 'antd';
import AddType from './add-shelf';
import AddBook from './add-book';
import { PlusOutlined } from '@ant-design/icons';
import libImg from '@/assets/lib.svg';
import nobookImg from '@/assets/no-book.webp';
import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux'


function Shelf() {
  // const loginUser = useSelector((state) => state.loginUser);
  // const isLogin = loginUser !== null;
  const isLogin = true;

  // 导航路由对象
  const navigate = useNavigate();

  // 搜索内容
  const [content, setContent] = useState('');
  const onSearch = (event: any) => {
    setContent(event.target.value);
  };

  // 书架相关
  const [shelfsInclBook, setShelfsInclBook] = useState([]);
  const syncShelfsIncludeBook = async () => {
    const res = await api.shelf.get({ includeBook: true });
    console.log(11111, res);

    setShelfsInclBook(res);
  };

  // 打开弹窗（新增书架 or 书籍）
  const [isAddShelfOpen, setIsAddShelfOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const prevState = useRef({ isAddShelfOpen, isAddBookOpen }); // useRef 用于记录上一次的状态；

  // 进入详情
  const goDtl = (book_id: string) => {
    navigate({
      pathname: '/book',
      search:
        '?' +
        new URLSearchParams({
          id:book_id,
        }).toString(),
    });
  };

  useEffect(() => {
    syncShelfsIncludeBook();
  }, []);

  useEffect(() => {
    const prev = prevState.current;
    const createShelfOver = isAddShelfOpen !== prev.isAddShelfOpen && !isAddShelfOpen;
    const createBookOver = isAddBookOpen !== prev.isAddBookOpen && !isAddBookOpen;
    if (createShelfOver || createBookOver) {
      syncShelfsIncludeBook();
    }
  }, [isAddShelfOpen, isAddBookOpen]);

  return (
    <div className="books-cmp">
      <div className="tools">
        <div className="right">
          <Input.Search placeholder="搜索知识库" onSearch={onSearch} enterButton />
        </div>

        <div className="left">
          <Space>
            {
              isLogin ? <>
                <Button type="primary" onClick={() => setIsAddShelfOpen(true)}>
                  <PlusOutlined />
                  书架
                </Button>
              </> : <Button type="primary">
                <PlusOutlined />
                登录
              </Button>
            }

          </Space>
        </div>
      </div>
      {shelfsInclBook.map((item) => (
        <div className="types-includebook" key={item.id}>
          <div className="type-includebook">
            <div className="type">
              <div className='label'>
                <img src={libImg} />
                {item.name}
              </div>
              <div className='action' onClick={() => setIsAddBookOpen(true)}>
                <PlusOutlined />
                书本
              </div>
            </div>
            <div className="books">
              {item.book.length > 0 ? (
                item.book.map((book) => (
                  <div className="book" key={book.id} onClick={() => goDtl(book.id)}>
                    <div className="book-some">
                      <div className="name">{book.name}</div>
                      <div className="des">{book.des}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-book">
                  <img src={nobookImg} />
                  <div>该书架暂无书籍！</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <AddBook open={isAddBookOpen} setOpen={setIsAddBookOpen} />
      <AddType open={isAddShelfOpen} setOpen={setIsAddShelfOpen} />
    </div>
  );
}

export default Shelf;
