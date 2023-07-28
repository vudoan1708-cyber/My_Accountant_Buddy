<script>
  export let variables = {
    fv: 0,
    pv: 0,
    r: 0,
    t: 0,
    unknown: 0,
  };
  /** @type {'fv' | 'pv' | 'r' | 't' | 'unknown'} */
  export let unknown = 'unknown';
</script>

<!-- <template> -->
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
      <li><span class="variable">FV</span>: Future Value - A financial value in the <b>future time</b></li>
      <li><span class="variable">PV</span>: Future Value - A financial value in the <b>present time</b></li>
      <li><span class="variable">R</span>: The <b>compounding interest rate</b></li>
      <li><span class="variable">T</span>: The time value of the money (is usually counted in <b>years)</b></li>
    </ul>
  </div>
<!-- </template> -->

<style>
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
