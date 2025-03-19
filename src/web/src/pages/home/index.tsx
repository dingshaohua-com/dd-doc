import { useState } from "react";
import "./style.scss";
import MenuBar from "@/components/menu-bar";
import MarkdownIt from "markdown-it";
import { container } from "@mdit/plugin-container";
import mdcont from "markdown-it-container";
import hljs from "highlight.js";

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (__) {}
  }
  return ""; // 使用额外的默认转义
};
const md = MarkdownIt();
md.set({ highlight });
md.use(mdcont, "tip");
md.use(mdcont, "danger");
function App() {
  const [content, setContent] = useState(`
::: tip
你好我是 tip 类型的自定义容器
:::

## 🙂🙂🙂🙂🙂


`);
  const onContentIpt = (event: any) => {
    setContent(event.target.value);
  };

  return (
    <div className="editor-wrapp">
      <MenuBar editor={{} as any} />
      <div className="editor">
        <textarea
          className="md-editor"
          value={content}
          onInput={onContentIpt}
        ></textarea>
        <div
          className="md-view"
          dangerouslySetInnerHTML={{ __html: md.render(content) }}
        ></div>
      </div>
    </div>
  );
}

export default App;
