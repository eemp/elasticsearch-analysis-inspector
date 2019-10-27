import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  EuiDescribedFormGroup,
  EuiForm,
  EuiFormRow,
  EuiSelect
} from '@elastic/eui';

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
    </EuiForm>
  );
}

export default reduxForm({
  form: 'preferences',
  destroyOnUnmount: false,
})(Preferences);

function EuiSelectField(props) {
  const { input, label, meta, ...otherProps } = props;
  return (
    <EuiSelect {...input} {...otherProps} />
  );
}
