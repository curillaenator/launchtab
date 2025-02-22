const INIT_CONTENT = JSON.stringify({
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'blocksGrid',
      attrs: {
        blocksCount: 2,
        fatBlockIdx: 0,
        timestamp: null,
        blocksGridId: '111d7c8d-ec10-4722-a584-dd54028aa685',
      },
      content: [
        {
          type: 'column',
          attrs: {
            blocksGridId: '111d7c8d-ec10-4722-a584-dd54028aa685',
          },
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
            },
          ],
        },
        {
          type: 'column',
          attrs: {
            blocksGridId: '111d7c8d-ec10-4722-a584-dd54028aa685',
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
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
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
      type: 'blocksGrid',
      attrs: {
        blocksCount: 2,
        fatBlockIdx: 1,
        timestamp: null,
        blocksGridId: 'a6435857-f242-47d6-a0f1-ec57a12f8432',
      },
      content: [
        {
          type: 'column',
          attrs: {
            blocksGridId: 'a6435857-f242-47d6-a0f1-ec57a12f8432',
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
                  text: 'I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.',
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
              type: 'orderedList',
              attrs: {
                start: 1,
              },
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
                          text: 'sdklvlnsdv',
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
                          text: 'sdlkdskbndsb',
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
                          text: 'ds',
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
                          text: 'b',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'column',
          attrs: {
            blocksGridId: 'a6435857-f242-47d6-a0f1-ec57a12f8432',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
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
                columnWidths: [219, 204, 183, 292],
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
                        backgroundColor: {
                          backgroundColor: 'var(--editor-highlight-bgc)',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'var(--editor-highlight-bgc)',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'var(--editor-highlight-bgc)',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'var(--editor-highlight-bgc)',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: '#ABF5D1',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: '#ABF5D1',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: '#FFF0B3',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
                        backgroundColor: {
                          backgroundColor: '#ABF5D1',
                        },
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
                        backgroundColor: {
                          backgroundColor: 'transparent',
                        },
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
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
            },
            {
              type: 'paragraph',
              attrs: {
                textAlign: 'justify',
              },
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
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'justify',
      },
    },
  ],
});

export { INIT_CONTENT };
