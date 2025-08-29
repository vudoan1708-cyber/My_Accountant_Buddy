<script>
	import { onMount } from "svelte";

  // Component
	import Button from "$lib/components/Button.svelte";

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
<section>
  <form on:submit|preventDefault>
    <label>
      <span class="variable">FV</span>
      <input
        type="number"
        step="0.01"
        min="0"
        class:finalAnswer={unknown === 'fv' && variables[unknown]}
        bind:value={variables.fv} />
    </label>

    <span>=</span>

    <label>
      <span class="variable">PV</span>
      <input
        type="number"
        step="0.01"
        min="0"
        class:finalAnswer={unknown === 'pv' && variables[unknown]}
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
          class:finalAnswer={unknown === 'r' && variables[unknown]}
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
        class:finalAnswer={unknown === 't' && variables[unknown]}
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
    If you're looking to compute the future value,
    the equation above is going to give you an approximation of the future return with a compounding interest rate.

    However, if you're looking to compute the present value -
    this is called discounting future cash back to the present, where, given future value, interest rate and time,
    you can estimate how much money is needed to deposit into your bank account now.
    Below are the explanation of the notations:
    <ul>
      <li><span class="variable">FV</span>: Future Value - A financial value in the <b>future time</b></li>
      <li><span class="variable">PV</span>: Present Value - A financial value in the <b>present time</b></li>
      <li><span class="variable">R</span>: The <b>compounding interest rate</b> (either effective or nominal rate)</li>
      <li><span class="variable">T</span>: The compounding period (is usually counted in <b>years</b>)</li>
    </ul>

    <strong>**Leave an input field <u>empty or zero</u> to compute it</strong>
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
  section {
    display: flex;
    flex-direction: column;
    gap: calc(var(--margin) * 2);
  }

  form {
    display: flex;
    gap: calc(var(--margin) * 2);
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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

  input.finalAnswer {
    border-color: var(--color-theme-2-light);
    color: var(--color-on-theme-2);
    background-color: var(--color-theme-2);
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

</style>
