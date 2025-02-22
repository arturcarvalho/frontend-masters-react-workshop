export const timerMachineConfig = {
  initial: "idle",
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
};

export const timerMachine = (state, event) => {
  const nextState = timerMachineConfig.states[state].on[event.type] || state;  
  return nextState;
};
