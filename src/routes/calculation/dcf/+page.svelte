<script>
	import DiscountedCashFlow from "./DiscountedCashFlow.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<!-- <template> -->
  <svelte:head>
    <title>Discounted Cash Flow</title>
    <meta name="description" content="Calculating discounted cash flow" />
  </svelte:head>
  
  <section class="calculateSect">
    <h1>Calculate discounted cash flow</h1>

    <div class="contents">
      <DiscountedCashFlow allPayments={data.allPayments} />
    </div>
  </section>
<!-- </template> -->

<style>
  .calculateSect {
    display: flex;
    flex-direction: column;
    gap: calc(var(--margin) * 3);
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: calc(var(--margin) * 5);
  }
</style>
