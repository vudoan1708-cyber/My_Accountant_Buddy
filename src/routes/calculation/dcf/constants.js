  /** @return {import('./$types').PageData['allPayments'][0]} */
export const defaultDcfTemplate = (/** @type {number} */ increment = 0) => ({
  period: {
    disabled: true,
    value: increment,
  },
  payment: {
    disabled: false,
    value: '',
  }
});
