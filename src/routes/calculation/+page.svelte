<script>
	import { onMount } from "svelte";

  // Component
	import Button from "$lib/components/Button.svelte";

  // Sub-components
  import CompoundingInterestRate from "./CompoundingInterestRate.svelte";

  // Helpers
  import superParseFloat from "$lib/helpers/superParseFloat";

  let variables = {
    fv: 0,
    pv: 0,
    r: 0,
    t: 0,
    unknown: 0,
  };

  /** @type {'fv' | 'pv' | 'r' | 't' | 'unknown'} */
  let unknown = 'unknown';

  const findTheUnknownVariable = () => {
    if (!variables.fv && !variables.pv && !variables.r && !variables.t) return 'unknown';

    if (!variables.fv) return 'fv';
    if (!variables.pv) return 'pv';
    if (!variables.r) return 'r';
    if (!variables.t) return 't';
    return 'unknown';
  }

  const calculate = {
    /** @description the multiplication of PV and the addition of 1 and rate percent to the t-th power */
    fv() {
      return superParseFloat(variables.pv * ((1 + variables.r / 100) ** variables.t), 4);
    },
    /** @description the division of FV and the addition of 1 and rate percent to the t-th power */
    pv() {
      return superParseFloat(variables.fv / ((1 + variables.r / 100) ** variables.t), 4);
    },
    /** @description t-th root of FV over PV minus 1 */
    r() {
      return (Math.pow(superParseFloat(variables.fv / variables.pv, 4), 1 / variables.t) - 1) * 100;
    },
    // Reference: https://www.golinuxcloud.com/javascript-math-log/
    t() {
      return Math.round(Math.log(variables.fv / variables.pv) / (variables.r / 100));
    },
    unknown() {
      return 0;
    }
  };

  const clear = () => {
    variables.fv = 0;
    variables.pv = 0;
    variables.r = 0;
    variables.t = 0;
  };

  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });
</script>

<!-- <template> -->
  <svelte:head>
    <title>Calculation</title>
    <meta name="description" content="Calculation" />
  </svelte:head>
  
  <section class="calculateSect">
    <h1>Calculate with compounding interest rate</h1>

    <!-- Interest rate Calculation Feature -->
    <CompoundingInterestRate bind:variables {unknown} />

    <span style="align-self: flex-end;">
      <Button id="clear" disabled={!isMounted} type="secondary" on:click={clear}>
        Clear
      </Button>
      <Button id="calculate" disabled={!isMounted} on:click={() => {
        unknown = findTheUnknownVariable();
        variables[unknown] = calculate[unknown]();
      }}>
        Calculate
      </Button>
    </span>
  </section>
<!-- </template> -->

<style>
  .calculateSect {
    display: flex;
    flex-direction: column;
    gap: calc(var(--margin) * 3);
  }
</style>
