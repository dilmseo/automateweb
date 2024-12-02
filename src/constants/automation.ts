export const WAIT_DURATION = 1000; // 1 second

export const STEP_TYPES = {
  CLICK: 'click',
  INPUT: 'input',
  WAIT: 'wait',
  SCROLL: 'scroll',
} as const;

export const SELECTOR_EXAMPLES = {
  CLICK: '#submit-button, .btn-primary',
  INPUT: '#username, .input-field',
};