import uuid from 'uuid/v4';

const sampleText = '<p>The quick brown fox jumps over the quick dog.</p>';

const analyses = [
  {
    name: 'Standard Analyzer',
    definition: {
      analyzer: 'standard',
    },
    key: uuid(),
  },
  {
    name: 'Stop Analyzer',
    definition: {
      analyzer: 'stop',
    },
    key: uuid(),
  },
  {
    name: 'Custom Analyzer',
    definition: {
      tokenizer: 'standard',
      char_filter: [ 'html_strip' ],
      filter: [ 'lowercase', 'kstem' ],
    },
    key: uuid(),
  },
];

export {
  analyses,
  sampleText,
};
