import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  EuiDescribedFormGroup,
  EuiForm,
  EuiFormRow,
} from '@elastic/eui';

import EuiSelectField from '../ThemedReduxFormFields/EuiSelect';

const HOST_OPTIONS = [
  { text: 'Default Provider', value: 'default' },
  { text: 'localhost:9200', value: 'localhost' },
];

function Preferences(props) {
  return (
    <EuiForm>
      <EuiDescribedFormGroup
        title={<h3>Elasticsearch Host (**WIP**)</h3>}
        description="Change the Elasticsearch host the app works against."
      >
        <EuiFormRow helpText="What Elasticsearch host would you like to rely on?" >
          <Field name="host" component={EuiSelectField} options={HOST_OPTIONS} />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
}

export default reduxForm({
  form: 'settings',
  destroyOnUnmount: false,
})(Preferences);
