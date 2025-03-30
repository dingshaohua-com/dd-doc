import { useState } from "react";
import "./style.scss";


function Book() {
  const [content, setContent] = useState("");
  const onContentIpt = (event: any) => {
    setContent(event.target.value);
  };
  return (
    <div className="book">

    </div>
  );
}

export default Book;
