<script>
	import { onMount } from "svelte";

  // Component
	import Button from "$lib/components/Button.svelte";

  // Helpers
  import superParseFloat from "$lib/helpers/superParseFloat";

  const variables = {
    effectiveRate: 0,
    nominalRate: 0,
    time: 1,
    unknown: 0,
  };
  /** @type {'effectiveRate' | 'nominalRate' | 'time' | 'unknown'} */
  let unknown = 'unknown';

  const findTheUnknownVariable = () => {
    if (!variables.effectiveRate && !variables.nominalRate && !variables.time) return 'unknown';

    if (!variables.effectiveRate) return 'effectiveRate';
    if (!variables.nominalRate) return 'nominalRate';
    // We don't calculate time for this as not very needed
    // if (!variables.time) return 'time';
    return 'unknown';
  }

  const calculate = {
    /** @description the division of nominal rate and compounding periods per year added to 1, exponentised to the periods and subtracted to 1 */
    effectiveRate() {
      const decimal = ((1 + (variables.nominalRate / 100 / variables.time)) ** variables.time) - 1;
      return superParseFloat(decimal * 100, 2);
    },
    /** @description the multiplication of time periods and the t-th root of effective rate plus 1, subtracted by 1 */
    nominalRate() {
      const tRootPart = (superParseFloat(variables.effectiveRate / 100) + 1) ** (1 / variables.time)
      return superParseFloat(variables.time * (tRootPart - 1)) * 100;
    },
    /** @description t-th root of FV over PV minus 1 */
    time() {
      return 1;
    },
    unknown() {
      return 0;
    }
  };

  const clear = () => {
    variables.effectiveRate = 0;
    variables.nominalRate = 0;
    variables.time = 1;
  };

  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });

  $: calculateBtnDisabled = !isMounted || Boolean(document.querySelector('input:invalid'));
</script>

<!-- <template> -->
<section>
  <form on:submit|preventDefault>
    <label>
      <span class="variable">R <sub class="variable">effective</sub></span>
      <input
        type="number"
        step="0.01"
        min="0"
        class:finalAnswer={unknown === 'effectiveRate' && variables[unknown]}
        bind:value={variables.effectiveRate} />
    </label>

    <span>=</span>

    <label>(
      (
        1
        +
      <span class="r_over_preiod_division">
        <span>
            <span class="variable">R <sub class="variable">nominal</sub></span>
            <input
              type="number"
              step="0.01"
              min="0"
              class:finalAnswer={unknown === 'nominalRate' && variables[unknown]}
              bind:value={variables.nominalRate} />
            %
          </span>

          <hr />

          <span>
            <span class="variable">T</span>
            <input
              type="number"
              step="0.01"
              min="1"
              class:finalAnswer={unknown === 'time' && variables[unknown]}
              bind:value={variables.time} />
          </span>
      </span>
      )
    </label>

    <span>^</span>

    <label>
      <span class="variable">T</span>
      <input
        type="number"
        step="0.01"
        min="1"
        class:finalAnswer={unknown === 'time' && variables[unknown]}
        bind:value={variables.time} />)
    </label>

    <span>-</span>
    <span>1</span>
  </form>

  <!-- Answer -->
  <div class="answer">
    Answer is <b style="text-decoration: underline;">{variables[unknown] || ''}</b>
  </div>

  <!-- Helper -->
  <div class="helper">
    <span>
      The formula above is used to calculate the interest rate whether it is
      for the <b>nominal rate (stated rate / annual percentage rate (APR))</b>
      or for the <b>effective rate (compound annualised rate)</b>.
    </span>
    This is to determine the actual rate value that you'll realistically get,
    as sometimes, based on different wordings, the actual computation will be different.
    Below are the explanation of the notations:

    <ul>
      <li>
        <span class="variable">
          R <sub class="variable">effective</sub>
        </span>: Future Value - A financial value in the <b>future time</b>
      </li>
      <li>
        <span class="variable">
          R <sub class="variable">nominal</sub>
        </span>: Future Value - A financial value in the <b>present time</b>
      </li>
      <li>
        <span class="variable">T</span>: The compounding periods (is usually counted in <b>months</b> per year).
        <i>*This is not computable for the time being</i>
      </li>
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

  hr {
    width: 100%;
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

  .r_over_preiod_division {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
