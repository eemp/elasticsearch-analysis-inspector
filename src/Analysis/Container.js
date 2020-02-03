import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AnalysisList from './components';
import { addAnalysis, removeAnalysis, reorderAnalyses, updateAnalysis } from './actions';
import { addSavedItem } from '../SavedItems/actions';

function mapStateToProps(state) {
  return {
    analyses: _.get(state, 'analysisReducer'),
    defaultEditor: _.get(state, 'form.preferences.values.default_editor'),
    diffEditor: _.get(state, 'form.preferences.values.diff_editor'),
    editorTheme: _.get(state, 'form.preferences.values.editor_theme'),
    text: _.get(state, 'sampletextReducer'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addAnalysis, addSavedItem, removeAnalysis, reorderAnalyses, updateAnalysis }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);
