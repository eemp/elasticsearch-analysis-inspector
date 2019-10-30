import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  EuiDescribedFormGroup,
  EuiForm,
  EuiFormRow,
} from '@elastic/eui';

import EuiSelectField from '../ThemedReduxFormFields/EuiSelect';
import EuiSwitchField from '../ThemedReduxFormFields/EuiSwitch';

const EDITOR_OPTIONS = [
  { text: 'Friendly', value: 'friendly' },
  { text: 'Code', value: 'code' },
];

const EDITOR_THEME_OPTIONS = [
  { text: 'Visual Studio', value: 'vs' },
  { text: 'Visual Studio Dark', value: 'vs-dark' },
  { text: 'High Contrast Dark', value: 'hc-black' },
];

function Preferences(props) {
  return (
    <EuiForm>
      <EuiDescribedFormGroup
        title={<h3>Analysis Editor</h3>}
        description="Change how you modify analyzer definitions."
      >
        <EuiFormRow helpText="By default, how would you prefer to update analyzer definitions?" >
          <Field name="default_editor" component={EuiSelectField} options={EDITOR_OPTIONS} />
        </EuiFormRow>
        <EuiFormRow helpText="When you use the monaco code editor, which theme would you like to see?">
          <Field name="editor_theme" component={EuiSelectField} options={EDITOR_THEME_OPTIONS} />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={<h3>Analysis Results</h3>}
        description="Change how analysis results are presented."
      >
        <EuiFormRow helpText="Would you like to have token offset prefixes with each token?" >
          <Field name="enable_token_offsets" component={EuiSwitchField} />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
}

export default reduxForm({
  destroyOnUnmount: false,
  form: 'preferences',
  initialValues: {
    'default_editor': 'friendly',
    'editor_theme': 'vs',
    'enable_token_offsets': true,
  },
})(Preferences);
