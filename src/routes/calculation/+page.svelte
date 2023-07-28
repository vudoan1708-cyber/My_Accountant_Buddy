<script>
	import { onMount } from "svelte";

	import Button from "$lib/components/Button.svelte";

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
    variables.t = 1;
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
    <form on:submit|preventDefault>
      <label>
        <span class="variable">FV</span>
        <input
          type="number"
          step="0.01"
          min="0"
          bind:value={variables.fv} />
      </label>

      <span>=</span>

      <label>
        <span class="variable">PV</span>
        <input
          type="number"
          step="0.01"
          min="0"
          bind:value={variables.pv} />
      </label>

      <span>x</span>

      <span>
        (
          1
          +
        <label>
          <span class="variable">R</span>
          <input
          type="number"
          step="0.01"
          min="0"
          bind:value={variables.r} />
        </label>
          %
        )
      </span>

      <span>^</span>

      <label>
        <span class="variable">T</span>
        <input
          type="number"
          step="0.01"
          min="0"
          bind:value={variables.t} />
      </label>
    </form>

    <!-- Answer -->
    <div class="answer">
      Answer is <b style="text-decoration: underline;">{variables[unknown] || ''}</b>
    </div>

    <!-- Helper -->
    <div class="helper">
      <span>
        The formula is used to calculate financial values with <b>compounding interest rates</b>,
        meaning you're paying or earning interests on interests.
      </span>
      If you're looking to compute the future value given the other 3 numeric values,
      the equation above is going to give you an approximation into the future given a compounding interest rate.

      However, if you're looking to compute the present value,
      this is called discounting future cash back to the present.
      Below are the explanation of the notations:
      <ul>
        <li><span class="variable">FV</span>: Future Value - A financial value in the future time</li>
        <li><span class="variable">PV</span>: Future Value - A financial value in the present time</li>
        <li><span class="variable">R</span>: The compounding interest rate</li>
        <li><span class="variable">T</span>: The time value of the money (is usually counted in years)</li>
      </ul>
    </div>

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

  .helper {
    display: grid;
    align-items: center;
    gap: calc(var(--margin) * 2);
    padding: var(--padding);
    background-color: var(--color-bg-2);
    border-radius: var(--border-radius);
    box-shadow: 0 0 2px black;
  }

  .variable {
    font-weight: bold;
  }

  .answer {
    align-self: center;
  }

  form {
    display: flex;
    gap: calc(var(--margin) * 2);
    justify-content: center;
    align-items: center;
  }

  label {
    display: inline-flex;
    gap: var(--margin);
    align-items: center;
  }

  input {
    width: 100px;
  }

  input:invalid {
    border-color: var(--color-error-foregound);
    color: var(--color-error-foregound);
    background-color: var(--color-error-background);
  }
</style>
