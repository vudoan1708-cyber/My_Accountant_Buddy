<script>
  import Button from "$lib/components/Button.svelte";
	import Tabs from "$lib/components/Tabs.svelte";

  // Utils
  import { replaceStateWithQuery, superParseFloat } from "$lib/helpers";
	import { onMount } from "svelte";

  import { defaultDcfTemplate } from "./constants";

  /** @typedef {import('$lib/components/Tabs.svelte').Tab} OriginalTab */

  /** @type {import('./$types').PageData['allPayments']} */
  export let allPayments = [];
  export let rate = 0;
  /** @type {'diff' | 'same'} */
  export let category = 'diff';

  /** @typedef {OriginalTab & { key: 'diff' | 'same' }} Tab */
  /** @type {Tab[]} */
  const TABS = [
    { key: 'diff', label: 'Different payment values' },
    { key: 'same', label: 'Same payment values' }
  ];
  let activeTab = TABS.find((t) => t.key === category) || TABS[0];

  const addPeriod = () => {
    allPayments = [ ...allPayments, defaultDcfTemplate(allPayments.length) ];
  };

  const onInputBlur = () => {
    // Update URL parameter
    replaceStateWithQuery({
      category: activeTab.key,
      payments: allPayments.map((p) => p.payment.value).filter((v, idx) => idx !== 0 && v).join('_'),
      rate: !rate ? null : Number(rate),
    });
  };

  const reset = () => {
    allPayments = [{
      ...allPayments[0],
      payment: { ...allPayments[0].payment, value: '' },
    }];
    rate = 0;

    // same
    numOfPeriods = 0;
    cashFlowPerPeriod = 0;
  };

  const onTabChanged = (/** @type {{ detail: Tab }} */ { detail }) => {
    activeTab = { ...detail };
    reset();
    onInputBlur();
  };

  // Same Category variables
  let numOfPeriods = 0;
  let cashFlowPerPeriod = 0;
  const calculate = {
    diff() {
      allPayments[0].payment.value = allPayments
        .slice(1)
        .map((p) => p.payment.value)
        .reduce((prev, curr, idx) => (
          superParseFloat(prev) + superParseFloat(superParseFloat(curr) / ((1 + rate / 100) ** (idx + 1)))
        ), 0);
    },
    same() {
      allPayments[0].payment.value = Array(Number(numOfPeriods))
        .fill(Number(numOfPeriods))
        .reduce((prev, _, idx) => (
          superParseFloat(prev) + superParseFloat(superParseFloat(cashFlowPerPeriod) / ((1 + rate / 100) ** (idx + 1)))
        ), 0);
    },
  };

  // Life Cycles
  onMount(() => {
    onInputBlur();
  });

  $: calcBtnDisabled = {
    diff: !rate || allPayments.length === 1 || allPayments.slice(1).some((p) => !p.payment.value),
    same: !rate || !numOfPeriods || !cashFlowPerPeriod,
  };
</script>

<!-- <template> -->
<div class="inputs_area">
  <form class="rate">
    <label>
      <strong>Discount rate:</strong>
      <input
        type="number"
        min="0"
        step="0.01"
        required
        bind:value={rate}
        on:blur={onInputBlur} />
      %
    </label>
  </form>

  <div>
    <Tabs tabs={TABS} {activeTab} on:change={onTabChanged} />
    <section class="dcf_graph">
      {#if activeTab.key === 'diff'}
        {#each allPayments as paymentData, idx}
          <form class="diff_section">
            <input
              type="text"
              placeholder="Period"
              class="periods"
              title="Period"
              disabled={paymentData.period.disabled}
              value={paymentData.period.value} />
      
            <hr />
      
            <div class="payment">
              <input
                type="text"
                placeholder="Payment"
                class:finalAnswer={idx === 0 && paymentData.payment.value}
                title={idx === 0 ? 'DCF value' : 'Periodical payments'}
                disabled={paymentData.payment.disabled}
                bind:value={paymentData.payment.value}
                on:blur={onInputBlur} />
            </div>
          </form>
        {/each}
    
        <Button style="margin-left: var(--margin); align-self: center;" on:click={addPeriod}>
          +
        </Button>
      {:else if activeTab.key === 'same'}
        <form class="same_section">
          <label>
            Payment / Cash flow per period
            <input type="text" bind:value={cashFlowPerPeriod} />
          </label>
          <label>
            Number of Periods
            <input type="text" bind:value={numOfPeriods} />
          </label>
          <label class="same_result_label">
            <input
              type="text"
              placeholder="Result"
              title="DCF value"
              disabled
              class:finalAnswer={allPayments[0].payment.value}
              value={allPayments[0].payment.value} />
          </label>
        </form>
      {/if}
    </section>
  </div>
</div>

<!-- Answer -->
<div class="answer">
  Answer is <b style="text-decoration: underline;">{allPayments[0].payment.value || ''}</b>
</div>

<!-- Helper -->
<div class="helper">
  <span>
    The timeline graphics above is used to calculate <b>Discounted Cash Flow (DCF)</b> - estimate
    future cash, the compounding periods and you should be able to discount the value back into the present to determine
    the opportunity of an investment,... by comparing the initial value vs. the DCF valuation.
  </span>

  <strong>
    {#if activeTab.key === 'diff'}
      **Add in all periodical payments and rate to compute DCF valuation - The period 0
    {:else if activeTab.key === 'same'}
      **Add in the payment values (assuming they are all identical for this category)
      which spread across the number of periods (e.g. 20 years) - The final valuation will result in the Result input box
    {/if}
  </strong>
</div>

<div class="btn_wrapper">
  <Button type="secondary" title="Clear all created nodes" on:click={reset}>
    Clear
  </Button>
  <Button disabled={calcBtnDisabled[activeTab.key]} title="Calculate DCF" on:click={() => { calculate[activeTab.key](); }}>
    Calculate
  </Button>
</div>
<!-- </template> -->

<style>
  .inputs_area {
    display: grid;
    gap: calc(var(--margin) * 2);
  }

  form.rate label input {
    width: 100px;
    text-align: left;
  }

  section.dcf_graph {
    --pointer-len: calc(var(--margin) * 2);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: calc(var(--margin) * 3);
    /* box-shadow: 0 0 2px black; */
    border: var(--border-width) solid var(--color-neutral-500);
    padding: calc(var(--padding) * 2);
  }

  hr {
    width: 100%;
    margin: 0;
    border: var(--border-width) solid var(--color-neutral-600);
  }

  input {
    width: 75%;
    text-align: center;
  }
  input:invalid {
    border-color: var(--color-error-foregound);
    color: var(--color-error-foregound);
    background-color: var(--color-error-background);
  }
  input::placeholder {
    text-align: center;
  }

  .diff_section {
    display: flex;
    flex-direction: column;
    gap: var(--pointer-len);
    align-items: flex-start;
  }

  input.periods {
    margin-bottom: var(--margin);
    align-self: center;
  }
  
  .payment {
    position: relative;
    width: fit-content;
    margin-top: var(--margin);
    text-align: center;
  }
  .payment::before {
    content: '';
    position: absolute;
    /* Length of pointer + margin top from the .payment element then invert the value */
    top: calc(calc(var(--pointer-len) + var(--margin)) * -1);
    left: 50%;
    width: var(--border-width);
    height: var(--pointer-len);
    background-color: var(--color-neutral-600);
  }

  input.finalAnswer {
    border-color: var(--color-theme-2-light);
    color: var(--color-on-theme-2);
    background-color: var(--color-theme-2);
  }

  .btn_wrapper {
    align-self: flex-end;
  }

  .answer {
    text-align: center;
  }

  .helper {
    display: grid;
    align-items: center;
    gap: calc(var(--margin) * 2);
    padding: var(--padding);
    background-color: var(--color-bg-2);
    border-radius: var(--border-radius);
    box-shadow: 0 0 2px black;
  }

  .same_section {
    display: grid;
    gap: var(--margin);
    width: 100%;
  }
  .same_section label {
    display: inline-grid;
    grid-template-columns: 1fr 50%;
  }

  label.same_result_label {
    grid-row: 1 / 3;
    grid-column: 2 / 4;
    display: inline-flex;
  }
</style>
