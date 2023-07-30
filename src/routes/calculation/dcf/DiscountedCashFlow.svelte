<script>
	import Button from "$lib/components/Button.svelte";

  // Utils
  import { replaceStateWithQuery } from "$lib/helpers/replaceStateWithQuery";

  import { defaultDcfTemplate } from "./constants";

  /** @type {import('./$types').PageData['allPayments']} */
  export let allPayments = [];

  const addPeriod = () => {
    allPayments = [ ...allPayments, defaultDcfTemplate(allPayments.length) ];
  };

  const onInputBlur = () => {
    // Update URL parameter
    replaceStateWithQuery({
      payments: allPayments.map((p) => p.payment.value).filter((v, idx) => idx !== 0 && v).join('_'),
    });
  };

  const clearTimeline = () => {
    allPayments = [ allPayments[0] ];
  };

  $: calcBtnDisabled = allPayments.length === 1 || allPayments.slice(1).some((p) => !p.payment.value);
</script>

<!-- <template> -->
<section class="dcf_graph">
  {#each allPayments as paymentData}
    <form class="data_wrapper">
      <input
        type="text"
        class="periods"
        placeholder="Period"
        disabled={paymentData.period.disabled}
        value={paymentData.period.value} />

      <hr />

      <div class="payment">
        <input
          type="text"
          placeholder="Payment"
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

<div class="btn_wrapper">
  <Button type="secondary" title="Clear all created nodes" on:click={clearTimeline}>
    Clear
  </Button>
  <Button disabled={calcBtnDisabled}>
    Calculate
  </Button>
</div>
<!-- </template> -->

<style>
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

  .btn_wrapper {
    align-self: flex-end;
  }
</style>
