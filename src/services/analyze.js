import _ from 'lodash';
import Promise from 'bluebird';
import request from 'axios';

const SERVICE_URL = 'https://hear2learn.azurewebsites.net/_analyze';

export default function updateAnalyses(analyses, text) {
  return Promise.mapSeries(analyses, analysis => {
    return updateAnalysis(analysis, text).catch(err => {
      console.error('Unable to fetch updated analysis for:', analysis);
      return Promise.resolve(analysis);
    });
  });
}

export function updateAnalysis(analysis, text) {
  const { definition } = analysis;
  return request.post(SERVICE_URL, {
    ...definition,
    text,
  }).then(res => {
    const { tokens } = res.data;
    return _.assign({}, analysis, {
      tokens,
      //tokens: _.map(tokens, ({token}) => token),
    });
  });
}
