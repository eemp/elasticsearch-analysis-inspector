import uuid from 'uuid/v4';

const sampleText = '<p>The quick brown fox jumps over the lazy dog.</p>';

const analyses = [
  {
    //mode: 'edit',
    name: 'General Content Analyzer',
    definition: {
      tokenizer: 'standard',
      char_filter: [ 'html_strip' ],
      filter: [ 'asciifolding', 'lowercase', 'stop', 'kstem' ],
    },
    key: uuid(),
  },
  {
    name: 'Content Analyzer w/ Shingles (bigrams + trigrams)',
    definition: {
      tokenizer: 'standard',
      char_filter: [ 'html_strip' ],
      filter: [ 'asciifolding', 'lowercase', 'stop', 'kstem', { type: 'shingle', max_shingle_size: 3, output_unigrams: false } ],
    },
    key: uuid(),
  },
  {
    name: 'Standard Analyzer',
    definition: {
      analyzer: 'standard',
    },
    key: uuid(),
  },
];

export {
  analyses,
  sampleText,
};
