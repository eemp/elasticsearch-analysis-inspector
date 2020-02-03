import _ from 'lodash';
import React, { useState } from 'react';

import {
  EuiButton,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiPopover,
  EuiFieldText,
  EuiSpacer
} from '@elastic/eui';

import Analysis from './Item';

class SaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.nameField = React.createRef();
  }

  save() {
    const { onSave } = this.props;
    _.isFunction(onSave) && onSave(this.nameField.value);
  }

  render() {
    return (
      <EuiForm>
        <EuiFormRow label="Save As">
          <EuiFieldText name="saveName" inputRef={inputRef => (this.nameField = inputRef)}/>
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton fullWidth onClick={this.save}>Save</EuiButton>
      </EuiForm>
    );
  }
}

export default function AnalysisList(props) {
  const { analyses, addAnalysis, addSavedItem, defaultEditor, diffEditor, editorTheme, removeAnalysis, reorderAnalyses, updateAnalysis, selectedTokenPosition, selectToken, text } = props;

  const [ isSavePopoverOpen, setSavePopoverOpen ] = useState(false);
  const closeSavePopover = () => setSavePopoverOpen(false);
  const toggleSavePopover = () => setSavePopoverOpen(!isSavePopoverOpen);

  return (
    <React.Fragment>
      <EuiFlexGroup justifyContent="flexEnd" key="new-analysis">
        <EuiFlexItem grow={false}>
          <EuiButton fill iconType="plusInCircle" id="new-button" onClick={addAnalysis} style={{float: 'right'}}>New Analysis</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            ownFocus
            button={<EuiButton iconType="save" id="save-button" onClick={toggleSavePopover}>Save</EuiButton>}
            isOpen={isSavePopoverOpen}
            closePopover={closeSavePopover}
          >
            <SaveForm onSave={_.over([addSavedItem, closeSavePopover])} />
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiDragDropContext onDragEnd={reorderAnalyses}>
        <EuiDroppable droppableId="ANALYSES_DROPPABLE_AREA" spacing="m">
          {
            _.map(analyses, (analysis, idx) => (
              <EuiDraggable
                spacing="m"
                key={analysis.key}
                index={idx}
                draggableId={analysis.key}
                customDragHandle={true}>
                {provided => (
                  <Analysis
                    {...analysis}
                    analysisId={analysis.key}
                    defaultEditor={defaultEditor}
                    diffEditor={diffEditor}
                    dragHandleProps={provided.dragHandleProps}
                    isFirst={idx === 0}
                    editorTheme={editorTheme}
                    onChange={updateAnalysis}
                    onClose={() => removeAnalysis(analysis.key)}
                    onTokenSelect={selectToken}
                    selectedStartOffset={selectedTokenPosition}
                    text={text}
                  />
                )}
              </EuiDraggable>
            ))
          }
        </EuiDroppable>
      </EuiDragDropContext>
    </React.Fragment>
  );
}
