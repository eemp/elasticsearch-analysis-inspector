const ANALYZERS = [
  { value: 'custom', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-custom-analyzer.html' },
  { value: 'keyword', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-analyzer.html' },
  { value: 'pattern', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-analyzer.html' },
  { value: 'simple', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-simple-analyzer.html' },
  { value: 'standard', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html' },
  { value: 'stop', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-analyzer.html' },
  { value: 'whitespace', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-analyzer.html' },
];

const CHAR_FILTERS = [
  { value: 'html_strip', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-htmlstrip-charfilter.html' },
  { value: 'mapping', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-mapping-charfilter.html' },
  { value: 'pattern_replace', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-replace-charfilter.html' },
];

const TOKENIZERS = [
  { value: 'char_group', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-chargroup-tokenizer.html' },
  { value: 'classic', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-classic-tokenizer.html' },
  { value: 'edge_ngram', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html' },
  { value: 'keyword', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-tokenizer.html' },
  { value: 'letter', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-letter-tokenizer.html' },
  { value: 'lowercase', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lowercase-tokenizer.html' },
  { value: 'ngram', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html' },
  { value: 'path', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-path-tokenizer.html' },
  { value: 'pattern', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-tokenizer.html' },
  { value: 'simple_pattern', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-simplepattern-tokenizer.html' },
  { value: 'simple_pattern_split', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-simplepatternsplit-tokenizer.html' },
  { value: 'standard', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html' },
  { value: 'uax_url_email', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-uaxurlemail-tokenizer.html' },
  { value: 'whitespace', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-tokenizer.html' },
];

const TOKEN_FILTERS = [
  { value: 'asciifolding', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-asciifolding-tokenfilter.html' },
  { value: 'apostrophe', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-apostrophe-tokenfilter.html' },
  { value: 'classic', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-classic-tokenfilter.html' },
  { value: 'common_ngrams', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-common-ngrams-tokenfilter.html' },
  { value: 'condition', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-condition-tokenfilter.html' },
  { value: 'decimal_digit', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-decimal-digit-tokenfilter.html' },
  { value: 'delimited_payload', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-delimited-payload-tokenfilter.html' },
  { value: 'edge_ngram', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenfilter.html' },
  { value: 'elision', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-elision-tokenfilter.html' },
  { value: 'flatten_graph', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-flatten-graph-tokenfilter.html' },
  { value: 'hunspell', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-hunspell-tokenfilter.html' },
  { value: 'keep', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keep-words-tokenfilter.html' },
  { value: 'keep_types', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keep-types-tokenfilter.html' },
  { value: 'keyword_marker', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-marker-tokenfilter.html' },
  { value: 'keyword_repeat', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-keyword-repeat-tokenfilter.html' },
  { value: 'kstem', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-kstem-tokenfilter.html' },
  { value: 'length', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-length-tokenfilter.html' },
  { value: 'limit', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-limit-tokenfilter.html' },
  { value: 'lowercase', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lowercase-tokenfilter.html' },
  { value: 'min_hash', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-minhash-tokenfilter.html' },
  { value: 'multiplexer', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-multiplexer-tokenfilter.html' },
  { value: 'ngram', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenfilter.html' },
  { value: 'pattern_capture', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-capture-tokenfilter.html' },
  { value: 'pattern_replace', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern_replace-tokenfilter.html' },
  { value: 'phonetic', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-phonetic-tokenfilter.html' },
  { value: 'predicate_token_filter', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-predicatefilter-tokenfilter.html' },
  { value: 'porter_stem', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-porterstem-tokenfilter.html' },
  { value: 'remove_duplicates', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-remove-duplicates-tokenfilter.html' },
  { value: 'reverse', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-reverse-tokenfilter.html' },
  { value: 'shingle', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-shingle-tokenfilter.html' },
  { value: 'snowball', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-snowball-tokenfilter.html' },
  { value: 'stemmer', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stemmer-tokenfilter.html' },
  { value: 'stemmer_override', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stemmer-override-tokenfilter.html' },
  { value: 'stop', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-tokenfilter.html' },
  { value: 'synonym', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html' },
  { value: 'synonym_graph', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-graph-tokenfilter.html' },
  { value: 'trim', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-trim-tokenfilter.html' },
  { value: 'truncate', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-truncate-tokenfilter.html' },
  { value: 'unique', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-unique-tokenfilter.html' },
  { value: 'uppercase', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-uppercase-tokenfilter.html' },
  { value: 'word_delimiter', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-tokenfilter.html' },
  { value: 'word_delimiter_graph', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-graph-tokenfilter.html' },
];

export default ANALYZERS;

export {
  ANALYZERS,
  CHAR_FILTERS,
  TOKENIZERS,
  TOKEN_FILTERS,
};
