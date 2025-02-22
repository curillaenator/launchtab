const INIT_CONTENT = JSON.stringify({
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'justify',
        level: 2,
        id: null,
      },
      content: [
        {
          type: 'text',
          text: 'Hi there,',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
      content: [
        {
          type: 'text',
          text: 'this is a ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'basic',
        },
        {
          type: 'text',
          text: ' example of ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Tiptap',
        },
        {
          type: 'text',
          text: '. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
              content: [
                {
                  type: 'text',
                  text: 'That’s a bullet list with one …',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
              content: [
                {
                  type: 'text',
                  text: '… or two list items.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
      content: [
        {
          type: 'text',
          text: 'Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'css',
      },
      content: [
        {
          type: 'text',
          text: 'body {\n  display: none;\n}',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
      content: [
        {
          type: 'text',
          text: 'I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.',
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'justify',
          },
          content: [
            {
              type: 'text',
              text: 'Wow, that’s amazing. Good work, boy! 👏 ',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: '— Mom',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'table',
      attrs: {
        columnWidths: [96, 355, 302, 246],
        filters: [],
        sort: null,
        summaryRow: {},
        calcColumn: null,
        style: null,
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '#',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'name',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'descript',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'price',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '56',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'apple',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: '#ABF5D1',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'fruit',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '10',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '4',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'orange',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: '#ABF5D1',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'fruit',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '26',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '1',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'potato',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: '#FFF0B3',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'vegetable',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '8',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '12',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'peach',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: '#ABF5D1',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'fruit',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'justify',
                  },
                  content: [
                    {
                      type: 'text',
                      text: '15',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export { INIT_CONTENT };
