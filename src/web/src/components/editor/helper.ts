import MarkdownIt from 'markdown-it';
import mdcont from 'markdown-it-container';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

export const md = MarkdownIt({
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

export interface EditorProps {
  readOnly:boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  rightBar?: React.ReactNode;
}
