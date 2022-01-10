import { createMachine, assign } from "xstate";

export const timerMachine = createMachine(
  {
    initial: "idle",
    context: {
      duration: 60, // secs
      elapsed: 0, // secs
      interval: 0.1, // 1/10th of a sec
    },
    states: {
      idle: {
        // Reset duration and elapsed on entry
        entry: assign({
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
            actions: "addMinute",
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
  },
  {
    actions: {
      addMinute: assign({
        duration: (ctx) => ctx.duration + 60,
      }),
    },
  }
);
