import { Link as LinkCore, type LinkOptions } from '@tiptap/extension-link';
import { InputRule } from '@tiptap/core';

const Link = LinkCore.extend<LinkOptions & { navigave?: () => void }>({
  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addInputRules() {
    return [
      ...(this.parent?.() || []),

      new InputRule({
        find: /\[([^\]]+)\]\[([^\]]+)\]\s$/, // seacrhes for `[title][url] ` with \s in the end

        handler: ({ range, match, commands }) => {
          const [, text, href] = match;

          commands.deleteRange(range);

          commands.insertContentAt(range.from, {
            type: 'text',
            text,
            marks: [{ type: 'link', attrs: { href } }],
          });
        },
      }),
    ];
  },
});

export { Link };
