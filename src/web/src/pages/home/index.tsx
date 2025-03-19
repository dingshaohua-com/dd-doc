import { useState } from "react";
import "./style.scss";
import MenuBar from "@/components/menu-bar";
import MarkdownIt from "markdown-it";
import { container } from "@mdit/plugin-container";
import mdcont from "markdown-it-container";

const md = MarkdownIt();
md.use(mdcont, "tip", {
  // validate(params) {
  //   return params.trim().match(/^tip(\s+.*)?$/);
  // },
  // render(tokens, idx) {
  //   const m = tokens[idx].info.trim().match(/^tip(\s+.*)?$/);
  //   if (!m) {
  //     console.error('正则匹配失败，tokens[idx].info:', tokens[idx].info);
  //     return ''; // 返回空字符串，避免报错
  //   }
  //   let title = m[1].trim(); // 获取标题内容
  //   // 如果没有标题，使用默认值
  //   if (!title) {
  //     title = "默认标题";
  //   }

  //   if (tokens[idx].nesting === 1) {
  //     // 打开标签
  //     return `<div class="tip"><p>${md.utils.escapeHtml(title)}</p>\n`;
  //   } else {
  //     // 关闭标签
  //     return "</div>\n";
  //   }
  // },
});
md.use(mdcont, "danger", {
  // validate: function (params) {
  //   console.log("Params:", params); // 打印输入
  //   const match = params.trim().match(/^danger\s+(.*)$/);
  //   console.log("Match:", match); // 打印匹配结果
  //   return match;
  // },
  // render: function (tokens, idx) {
  //   const m = tokens[idx].info.trim().match(/^danger\s+(.*)$/);
  //   if (tokens[idx].nesting === 1) {
  //     //  opening tag
  //     return '<div class="danger"><p>' + md.utils.escapeHtml(m[1]) + "</p>\n";
  //   } else {
  //     // closing tag
  //     return "</div>\n";
  //   }
  // },
});
function App() {
  const [content, setContent] = useState(`
::: tip 提示
你好我是 tip 类型的自定义容器
:::

## 🙂🙂🙂🙂🙂


`);

  // ::: danger 警告
  // **提示**
  // 你好我是 danger 类型的自定义容器
  // :::
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
