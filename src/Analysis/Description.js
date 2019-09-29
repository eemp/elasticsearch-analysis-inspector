import _ from 'lodash';
import React from 'react';

import DocsLink from './DocsLink';

function AnalysisDescription(props) {
  const { analyzer, char_filter:charFilter, filter, tokenizer } = props;
  return (
    <React.Fragment>
      {
        commaSeparate(_.compact([
          analyzer && <AnalysisAspectDescription key="analyzer-desc" type="analyzer" value={analyzer} />,
          tokenizer && <AnalysisAspectDescription key="tokenizer-desc" type="tokenizer" value={tokenizer} />,
          charFilter && <AnalysisAspectDescription key="charfilter-desc" type="charfilter" value={charFilter} />,
          filter && <AnalysisAspectDescription key="tokenfilter-desc" type="tokenfilter" value={filter} />,
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
  const renderedValues = commaSeparate(
    _.castArray(value).map(val => <DocsLink key={val.type || val} type={type} analysisAspect={val} />),
  );

  return (
    <span>{label}: {renderedValues}</span>
  );
}

function commaSeparate(elementList) {
  return _.flatMap(elementList, (element, idx) => elementList.length - 1 !== idx ? [ element, ', ' ] : element);
}

