<script>
  import Button from "$lib/components/Button.svelte";

  // Utils
  import { replaceStateWithQuery, superParseFloat } from "$lib/helpers";

  import { defaultDcfTemplate } from "./constants";

  /** @type {import('./$types').PageData['allPayments']} */
  export let allPayments = [];
  export let rate = 0;

  const addPeriod = () => {
    allPayments = [ ...allPayments, defaultDcfTemplate(allPayments.length) ];
  };

  const onInputBlur = () => {
    // Update URL parameter
    replaceStateWithQuery({
      payments: allPayments.map((p) => p.payment.value).filter((v, idx) => idx !== 0 && v).join('_'),
      rate: !rate ? null : Number(rate),
    });
  };

  const reset = () => {
    allPayments = [ allPayments[0] ];
    rate = 0;
  };

  const calculate = () => {
    allPayments[0].payment.value = allPayments
      .slice(1)
      .map((p) => p.payment.value)
      .reduce((prev, curr, idx) => (
        superParseFloat(prev) + superParseFloat(superParseFloat(curr) / ((1 + rate / 100) ** (idx + 1)))
      ), 0);
  };

  $: calcBtnDisabled = !rate || allPayments.length === 1 || allPayments.slice(1).some((p) => !p.payment.value);
</script>

<!-- <template> -->
<div class="inputs_area">
  <form class="rate">
    <label>
      <strong>Rate:</strong>
      <input
        type="number"
        min="0"
        required
        bind:value={rate}
        on:blur={onInputBlur} />
      %
    </label>
  </form>
  
  <section class="dcf_graph">
    {#each allPayments as paymentData, idx}
      <form class="data_wrapper">
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
  </section>
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
</div>

<div class="btn_wrapper">
  <Button type="secondary" title="Clear all created nodes" on:click={reset}>
    Clear
  </Button>
  <Button disabled={calcBtnDisabled} title="Calculate DCF" on:click={calculate}>
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
    box-shadow: 0 0 2px black;
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

  .data_wrapper {
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

  .payment input.finalAnswer {
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
</style>
