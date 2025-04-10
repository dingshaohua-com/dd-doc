import { useState } from 'react';
import './style.scss';
import MenuBar from '@/components/menu-bar';
import MarkdownIt from 'markdown-it';
import mdcont from 'markdown-it-container';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

const md = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>';
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  },
});
md.use(mdcont, 'tip');
md.use(mdcont, 'danger');
function App() {
  const [content, setContent] = useState('');
  const onContentIpt = (event: any) => {
    setContent(event.target.value);
  };
  return (
    <div className="editor-wrapp">
      <MenuBar editor={{} as any} />
      <div className="editor">
        <textarea className="md-editor" value={content} onInput={onContentIpt}></textarea>
        <div className="md-view" dangerouslySetInnerHTML={{ __html: md.render(content) }}></div>
      </div>
    </div>
  );
}

export default App;
