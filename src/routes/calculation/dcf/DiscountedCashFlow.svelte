<script>
	import Button from "$lib/components/Button.svelte";

  import { defaultDcfTemplate } from "./constants";

  /** @type {import('./$types').PageData['allPayments']} */
  export let allPayments = [];

  const addPeriod = () => {
    allPayments = [ ...allPayments, defaultDcfTemplate(allPayments.length) ];
  };
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
          value={paymentData.payment.value} />
      </div>
    </form>
  {/each}

  <Button style="margin-left: var(--margin); align-self: center;" on:click={addPeriod}>
    +
  </Button>
</section>
<!-- </template> -->

<style>
  section.dcf_graph {
    --pointer-len: calc(var(--margin) * 2);
    display: flex;
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
</style>
