import _ from 'lodash';
import asciidoctor from 'asciidoctor';
import React from 'react';
import request from 'axios';
import urljoin from 'url-join';
import { connect } from 'react-redux';

import { EuiLink } from '@elastic/eui';

import ANALYZERS, { CHAR_FILTERS, TOKEN_FILTERS, TOKENIZERS } from '../analyzers';
import { openDocsFlyout } from '../actions';

const asciidoctorInstance = asciidoctor();
const renderAsciidoc = asciidoctorInstance.convert.bind(asciidoctorInstance);

function DocsLink(props) {
  const { analysisAspect, openDocsFlyout, type } = props;
  const analysisAspectLabel = analysisAspect.type || analysisAspect;
  const elasticDocsUrl = getDocsPage(type, analysisAspectLabel);

  return (
    <EuiLink color="secondary" onClick={openDocsFlyout(elasticDocsUrl)} target="_blank">{analysisAspectLabel}</EuiLink>
  );
}

function getDocsPage(type, analysisAspect) {
  const docsByType = {
    analyzer: ANALYZERS,
    charfilter: CHAR_FILTERS,
    tokenfilter: TOKEN_FILTERS,
    tokenizer: TOKENIZERS,
  };
  const docs = docsByType[type];

  return _.get(
    _.find(docs, doc => doc.value === analysisAspect),
    'link'
  );
}

function mapDispatchToProps(dispatch) {
  return {
    openDocsFlyout: docsUrl => {
      const docsFlyoutDispatch = () => dispatch(openDocsFlyout(fetchDocs(docsUrl)));
      return docsFlyoutDispatch;
    },
  };
}

export default connect(null, mapDispatchToProps)(DocsLink);

function fetchDocs(docsUrl) {
  const asciiDocsUrl = convertDocsLinkToAsciiDocLink(docsUrl);
  return request.get(asciiDocsUrl).then(response => {
    return renderAsciidoc(response.data);
  });
}

function convertDocsLinkToAsciiDocLink(docsUrl) {
  const BASE = 'https://raw.githubusercontent.com/elastic/elasticsearch/7.3/docs/reference/analysis';
  const [ name, type ] = docsUrl.match(/analysis-(.+)-(charfilter|tokenfilter|tokenizer).html$/).slice(1);
  return urljoin(BASE, `${type}s`, `${name}-${type}.asciidoc`);
}
