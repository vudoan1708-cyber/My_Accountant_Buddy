<script>
  import { slide } from "svelte/transition";

  import { evaluate } from 'mathjs';

  // Component
  import Button from "$lib/components/Button.svelte";

  /** @type {'open' | 'close'} */
  export let state = 'open';

  let windowResolutionObserver = 0;

  /** @type {HTMLInputElement?} */
  let calcInputElement = null;
  const changeState = () => {
    state = state === 'open' ? 'close' : 'open';

    if (state === 'open') {
      calcInputElement?.focus();
    }
  };

  /**
	 * @typedef {Object} CalculationResult
   * @prop {string} expression
   * @prop {number?} value
	 */
  /** @type {CalculationResult[]} */
  let results = [];
  const onKeyDown = (/** @type {KeyboardEvent} */ e) => {
    try {
      if (e.key === 'Enter' || e.keyCode === 13) {
        // @ts-ignore
        const exp = e.target?.value;
        const val = evaluate(exp);
        results = [ { expression: exp, value: val }, ...results ];

        // Reassign the displayed value to the new result
        if (!calcInputElement) return;
        calcInputElement.value = val;
      }
    } catch (ex) {
      alert(ex);
    }
  };

  $: button = {
    textContent: {
      open: '&lt Calculator',
      close: '&gt Calculator',
    },
    style: {
      open: 'position: fixed; left: 400px; bottom: 0;',
      close: 'position: fixed; left: 0; bottom: 0;',
    },
  };
  $: if (windowResolutionObserver <= 770 && windowResolutionObserver > 540) {
    button.style.open = 'position: fixed; left: 250px; bottom: 0;';
  } else if (windowResolutionObserver <= 540) {
    button.style.open = 'position: fixed; left: 200px; bottom: 0; font-size: 12px;';
    button.style.close = 'position: fixed; left: 0; bottom: 0; font-size: 12px;';
  } else {
    button.style.open = 'position: fixed; left: 400px; bottom: 0;'
    button.style.close = 'position: fixed; left: 0; bottom: 0; font-size: initial;';
  };
</script>

<!-- <template> -->
<svelte:window bind:innerWidth={windowResolutionObserver} />

<section
  id="Calculator"
  class:closed={state === 'close'}
  transition:slide={{ delay: 200 }}>
  <div class="calculator_part calculator_display">
    <input
      type="text"
      class="calculator_input"
      bind:this={calcInputElement}
      on:keydown={onKeyDown} />
  </div>
  <div class="calculator_part calculator_keys">
    <button class="key--operator" data-action="add">+</button>
    <button class="key--operator" data-action="subtract">-</button>
    <button class="key--operator" data-action="multiply">&times;</button>
    <button class="key--operator" data-action="divide">÷</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>0</button>
    <button data-action="decimal">.</button>
    <button data-action="clear">AC</button>
    <button class="key--equal" data-action="calculate">=</button>
  </div>
  <div class="calculator_part results">
    {#each results as result}
      <div class="result">
        <div class="exp">{result.expression}</div>
        <div class="value">= {result.value}</div>
      </div>
    {/each}
  </div>
</section>

<Button id="calculator" style={button.style[state]} on:click={changeState}>
  {@html button.textContent[state]}
</Button>
<!-- </template> -->

<style>
  section#Calculator {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr 300px;
    grid-gap: var(--border-width);
    overflow: hidden;
    background-color: var(--color-neutral-900);
  }

  section#Calculator.closed {
    width: 0;
  }
  section#Calculator.closed div {
    width: 0;
  }

  .calculator_part {
    position: relative;
    width: 100%;
    border-bottom: var(--border-width) solid var(--color-neutral-300);
  }

  .calculator_display {
    color: var(--color-neutral-50);
    text-align: right;
    vertical-align: middle;
    font-size: 45px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .calculator_input {
    /* opacity: 0;
    width: 0;
    height: 0;
    display: none; */
    width: 100%;
    height: 100%;
    text-align: right;
    margin: 0;
    padding: 8px;
  }

  .calculator_keys {
    display: grid;
    grid-gap: var(--border-width);
    grid-template-columns: repeat(4, 1fr);
    background-color: var(--color-neutral-300);
  }
  .key--operator {
    background-color: #eee;
  }

  .key--equal {
    background-image: linear-gradient(to bottom, #bb6afe, var(--color-theme-1));
    grid-column: -2;
    grid-row: 2 / span 4;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: var(--margin);
    align-items: flex-end;
    background-color: var(--color-neutral-900);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .result {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: calc(var(--margin) / 2);
    padding: var(--padding);
  }

  .result .exp {
    color: var(--color-neutral-300);
    font-weight: lighter;
    font-size: 15px;
  }
  .result .value {
    color: var(--color-theme-2);
    font-weight: bold;
    font-size: 25px;
  }

  @media screen and (max-width: 770px) {
    section#Calculator {
      width: 250px;
    }
  }
  @media screen and (max-width: 540px) {
    section#Calculator {
      width: 200px;
    }
  }
</style>
