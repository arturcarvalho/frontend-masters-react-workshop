import { createMachine, assign } from "xstate";

export const timerMachine = createMachine({
  initial: "idle",
  context: {
    duration: 60, // secs
    elapsed: 0, // secs
    interval: 0.1, // 1/10th of a sec
  },
  states: {
    idle: {
      // Reset duration and elapsed on entry
      actions: assign({
        duration: 60,
        elapsed: 0,
      }),

      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
        ADD_MINUTE: {
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
});
