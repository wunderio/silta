// Prism theme matching the Mearra code block colors (ink background, violet keys, signal strings).
module.exports = {
  plain: {
    color: '#ede7df',
    backgroundColor: '#140435',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {color: '#8e8ba6', fontStyle: 'italic'},
    },
    {
      types: ['punctuation', 'operator'],
      style: {color: '#c9c3d6'},
    },
    {
      types: ['keyword', 'atrule', 'attr-name', 'builtin', 'selector', 'tag', 'property', 'function', 'class-name'],
      style: {color: '#a59bff'},
    },
    {
      types: ['string', 'char', 'attr-value', 'inserted', 'url', 'regex'],
      style: {color: '#00f087'},
    },
    {
      types: ['number', 'boolean', 'constant', 'important', 'deleted', 'symbol'],
      style: {color: '#ff9492'},
    },
    {
      types: ['variable', 'changed'],
      style: {color: '#efa831'},
    },
  ],
};
