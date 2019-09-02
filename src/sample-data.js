const sampleText = '<p>quick brown fox jumps over the dog then it jumped yet again until dog follow suit</p>';

const analyses = [
  {
    name: 'Standard',
    definition: {
      analyzer: 'standard',
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
  },
  {
    name: 'Stop',
    definition: {
      analyzer: 'stop',
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
  },
  {
    name: 'Custom',
    definition: {
      tokenizer: 'standard',
      char_filter: [ 'html_strip' ],
      filter: [ 'lowercase', 'kstem' ],
    },
    description: 'Tokenizer: standard, filter: lowercase, snowball, standard',
  },
];

export {
  analyses,
  sampleText,
};
