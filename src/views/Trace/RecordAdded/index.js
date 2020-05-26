import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  RecordAddedHeader,
  RecordAddedCode,
  RecordAddedActions,
  RecordAddedTitle,
} from './RecordAdded.module.scss';

import Button from 'components/_shared/Button';
import recordsSelectors from 'ducks/record/selectors';

const RecordAdded = () => {
  const status = useSelector(state => recordsSelectors.getStatus(state));
  const record = useSelector(state => recordsSelectors.getRecord(state));

  if (status !== 'PREVIEW_RECORD') {
    return null;
  }

  return (
    <Modal>
      <Dialog width="650px">
        <header className={RecordAddedHeader}>
          <h3 className={RecordAddedTitle}>New Record Added</h3>
          <p>
            Your record has been created and the patient’s data has been loaded.
            For future reference, this record can be found with the following
            Record ID:
          </p>
        </header>
        <p className={RecordAddedCode}>{record.id}</p>
        <div className={RecordAddedActions}>
          <Button large onClick={() => console.log('Close Modal')}>
            Ok
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default RecordAdded;
