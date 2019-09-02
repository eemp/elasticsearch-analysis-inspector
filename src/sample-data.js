import uuid from 'uuid/v4';

const sampleText = '<p>quick brown fox jumps over the dog then it jumped yet again until dog follow suit</p>';

const analyses = [
  {
    name: 'Standard Analyzer',
    definition: {
      analyzer: 'standard',
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
    key: uuid(),
  },
  {
    name: 'Stop Analyzer',
    definition: {
      analyzer: 'stop',
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
    key: uuid(),
  },
  {
    name: 'Custom Analyzer',
    definition: {
      tokenizer: 'standard',
      char_filter: [ 'html_strip' ],
      filter: [ 'lowercase', 'kstem' ],
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
    key: uuid(),
  },
];

export {
  analyses,
  sampleText,
};
