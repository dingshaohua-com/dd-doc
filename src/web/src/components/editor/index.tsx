import React, { useState } from 'react';
import './style.scss';
import MenuBar from '@/components/menu-bar';
import { EditorProps, md } from './helper';

const Editor: React.FC<EditorProps> = (props) => {
  // const [content, setContent] = useState("");
  // const onContentIpt = (event: any) => {
  //   setContent(event.target.value);
  // };

  const LeftBar = props.children;

  console.log(66666, );


  const onContentIpt = (event: any) => {
    props.setContent(event.target.value);
  };
  return (
    <div className="editor-wrapp">
      {!props.readOnly && <div className="menubar-wrapp" >
      <MenuBar editor={{} as any} rightBar={props.rightBar}/>
      </div>}

      <div className="editor">
        {!props.readOnly && <textarea className="md-editor" value={props.content} onInput={onContentIpt}></textarea>}
        <div className="md-view" dangerouslySetInnerHTML={{ __html: md.render(props.content) }}></div>
      </div>
    </div>
  );
};

export default Editor;
