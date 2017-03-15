
import type { Action } from '../actions/types';
import { SET_INDEX } from '../actions/list';

export type State = {
  list: string,
}

const initialState = {
  list: [
    'Incident 1 Placeholder',
    'Incident 2 Placeholder',
    'Incident 3 Placeholder',
    'Incident 4 Placeholder',
    'Incident 5 Placeholder',
  ],
  selectedIndex: undefined,
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload,
    };
  }
  return state;
}
