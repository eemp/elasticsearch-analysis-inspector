import _ from 'lodash';
import React from 'react';

import DocsLink from './DocsLink';

function AnalysisDescription(props) {
  const { analyzer, char_filter:charFilter, filter, tokenizer } = props;
  return (
    <React.Fragment>
      {
        commaSeparate(_.compact([
          !_.isEmpty(analyzer) && <AnalysisAspectDescription key="analyzer-desc" type="analyzer" value={analyzer} />,
          !_.isEmpty(tokenizer) && <AnalysisAspectDescription key="tokenizer-desc" type="tokenizer" value={tokenizer} />,
          !_.isEmpty(charFilter) && <AnalysisAspectDescription key="charfilter-desc" type="charfilter" value={charFilter} />,
          !_.isEmpty(filter) && <AnalysisAspectDescription key="tokenfilter-desc" type="tokenfilter" value={filter} />,
        ]))
      }
    </React.Fragment>
  );
}

export default AnalysisDescription;

function AnalysisAspectDescription(props) {
  const { type, value } = props;
  const labels = {
    analyzer: 'Analyzer',
    charfilter: 'Character Filters',
    tokenfilter: 'Filters',
    tokenizer: 'Tokenizer',
  };
  const label = labels[type];
  const items = _.castArray(value).map(val => <DocsLink key={val.type || val} type={type} analysisAspect={val} />);
  const renderedValues = commaSeparate(items);

  return (
    <span>{label}: {renderedValues}</span>
  );
}

function commaSeparate(elementList) {
  return _.flatMap(elementList, (element, idx) => elementList.length - 1 !== idx ? [ element, ', ' ] : element);
}

