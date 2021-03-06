import React, { useEffect, useRef } from 'react';

import {
  selectedDataContextMenu,
  selectedDataContextMenuAction,
} from './SelectedDataContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faTrash,
  faPlus,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import applicationActions from 'ducks/application/actions';
import { useDispatch, useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';
import pointsActions from 'ducks/points/actions';
import pointsSelectors from 'ducks/points/selectors';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const SelectedDataContextMenu = ({ closeAction, addAction, pointsLength }) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));

  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';
  const noFilteredPoints =
    useSelector(state => pointsSelectors.getFilteredPoints(state)).length < 1;

  useOnClickOutside(containerRef, () => closeAction());

  return (
    <div className={selectedDataContextMenu} ref={containerRef}>
      <ul>
        {appStatus !== 'ADD POINT' && isTrace && (
          <li>
            <button
              id="add-data-point"
              className={selectedDataContextMenuAction}
              type="button"
              onClick={() => {
                dispatch(applicationActions.updateStatus('ADD POINT'));
                closeAction();
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Data point
            </button>
          </li>
        )}

        {!noFilteredPoints && (
          <>
            {/* <li>
              <button
                type="button"
                onClick={() => dispatch(pointsActions.clearFilters())}
                className={selectedDataContextMenuAction}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
                Unselect All
              </button>
            </li> */}
            {isTrace && (
              <li>
                <button
                  id="delete-selected"
                  type="button"
                  onClick={() =>
                    dispatch(applicationActions.updateStatus('DELETE POINTS'))
                  }
                  className={selectedDataContextMenuAction}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete All Selected
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default SelectedDataContextMenu;
