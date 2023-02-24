import React from "react";

export enum ActionTypes {
  SetOpen
};

const DefaultStateProps = [
  {
    type: ActionTypes.SetOpen,
    value: false,
  },
  {
    type: "",
    value: "",
  },
];

type StateDefinition = {

}

export const useStateReducer = (defaultState = {}) => {
  const [state, dispatch] = React.useReducer(
    (state: StateDefinition, action: any) => {
      switch(action.type) {
        case ActionTypes.SetOpen:
          return {open: action.value}
      }
      return {
        ...state,
        ...action
      };
    },
    {...defaultState}
  );

  return {
    state,
    dispatch,
  };
};
