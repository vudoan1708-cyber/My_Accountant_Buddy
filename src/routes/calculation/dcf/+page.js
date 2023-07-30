// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  const payments = url.searchParams.get('payments');

  if (!payments?.match(/(\d{0,9},?)?/)) {
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

  const allPayments = [ '', ...payments.split(',') ];
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
