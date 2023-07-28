<script>
  // Sub-components
  import CompoundingInterestRate from "./CompoundingInterestRate.svelte";
	import InterestRate from "./InterestRate.svelte";
</script>

<!-- <template> -->
  <svelte:head>
    <title>Calculation</title>
    <meta name="description" content="Calculation" />
  </svelte:head>
  
  <section class="calculateSect">
    <h1>Calculate with compounding interest rate</h1>

    <div class="contents">
      <div>
        <h2>Effective vs. Nominal rates</h2>
        <!-- Interest Rate Calculation Feature -->
        <InterestRate />
      </div>

      <hr />

      <div>
        <h2>Compounding returns over time</h2>
        <!-- Compounding Calculation Feature -->
        <CompoundingInterestRate />
      </div>
    </div>
  </section>
<!-- </template> -->

<style>
  hr {
    width: 100%;
  }

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
