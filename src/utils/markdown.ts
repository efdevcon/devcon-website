import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

const markdownUtils = (() => {
  const _interface = {
    toHtml: async (markdown: string, slice?: number) => {
      let raw = markdown; 

      if (slice && raw.length > 255) raw = `${raw.slice(0, slice)}...`

      const markdownAsHtml = await unified()

            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(raw)

      return String(markdownAsHtml);
    }
  }

  return _interface;
})();

export default markdownUtils;