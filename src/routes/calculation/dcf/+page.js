// since there's DYNAMIC data here, we need to set prerender to false
// it so that it gets served as a dynamic asset in production
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  const payments = url.searchParams.get('payments');

  if (!payments?.match(/(\d{0,9}_?)?/)) {
    return {
      allPayments: [
        {
          period: {
            disabled: true,
            value: 0,
          },
          payment: {
            disabled: true,
            value: '',
          }
        },
      ],
    };
  }

  const allPayments = [ '', ...payments.split('_') ];
  return {
    allPayments: allPayments.map((p, idx) => ({
      period: {
        disabled: true,
        value: idx,
      },
      payment: {
        disabled: idx === 0,
        value: p === '' ? p : Number(p),
      }
    }))
  };
}
