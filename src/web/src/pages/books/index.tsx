import { useEffect, useState } from "react";
import "./style.scss";
import { Button, Input, Space } from "antd";
import AddType from "./add-type";
import AddBook from "./add-book";
import { PlusOutlined } from '@ant-design/icons';
import libImg from "@/assets/lib.svg"
import nobookImg from "@/assets/no-book.webp"


function Books() {
  const [typesIncludeBook, setTypesIncludeBook] = useState([]);
  const syncTypesIncludeBook = async () => {
    const res = await api.type.get({ includeBook: true });
    setTypesIncludeBook(res);
  }

  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const [content, setContent] = useState("");
  const onSearch = (event: any) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    syncTypesIncludeBook();
  }, [])
  useEffect(() => {
    if (!isAddTypeOpen) {
      syncTypesIncludeBook();
    }

  }, [isAddTypeOpen])
  useEffect(() => {
    if (!isAddBookOpen) {
      syncTypesIncludeBook();
    }
  }, [isAddBookOpen])




  return (
    <div className="books-cmp">
      <div className="tools">
        <div className="right"> <Input.Search placeholder="搜索知识库" onSearch={onSearch} enterButton /></div>
        <div className="left">
          <Space>
            <Button type="primary" onClick={() => setIsAddTypeOpen(true)}><PlusOutlined />书架</Button>
            <Button type="primary" onClick={() => setIsAddBookOpen(true)}><PlusOutlined />知识库</Button>
          </Space>
        </div>
      </div>
      {typesIncludeBook.map(item => (<div className="types-includebook" key={item.id}>
        <div className="type-includebook">
          <div className="type">
            <img src={libImg} />
            {item.name}
          </div>
          <div className="books">
            {item.book.length > 0 ? item.book.map(book => (
              <div className="book">
                <div className="book-some">
                  <div className="name">{book.name}</div>
                  <div className="des">{book.des}</div>
                </div>
              </div>
            )) : <div className="no-book">
              <img src={nobookImg} />
              <div>该书架暂无书籍！</div>
            </div>
            }
          </div>
        </div>
      </div>))}

      <AddBook open={isAddBookOpen} setOpen={setIsAddBookOpen} />
      <AddType open={isAddTypeOpen} setOpen={setIsAddTypeOpen} />
    </div>
  );
}

export default Books;