import React, { useState } from 'react';
import './style.scss';
import MenuBar from '@/components/menu-bar';
import { EditorProps, md } from './helper';

const Editor: React.FC<EditorProps> = (props) => {
  // const [content, setContent] = useState("");
  // const onContentIpt = (event: any) => {
  //   setContent(event.target.value);
  // };

  const onContentIpt = (event: any) => {
    props.setContent(event.target.value);
  };
  return (
    <div className="editor-wrapp">
      <div className="menubar-wrapp">
        <MenuBar editor={{} as any} />
      </div>

      <div className="editor">
        {!props.readOnly && <textarea className="md-editor" value={props.content} onInput={onContentIpt}></textarea>}

        <div className="md-view" dangerouslySetInnerHTML={{ __html: md.render(props.content) }}></div>
      </div>
    </div>
  );
};

export default Editor;
