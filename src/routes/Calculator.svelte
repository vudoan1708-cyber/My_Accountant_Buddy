<script>
  import { evaluate } from 'mathjs';

  // Component
  import Button from "$lib/components/Button.svelte";
	import { tick } from "svelte";

  /** @type {'open' | 'close'} */
  export let state = 'close';

  let windowResolutionObserver = 0;

  /** @type {HTMLInputElement?} */
  let calcInputElement = null;
  let calcInputVal = '';
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
  const onKeyDown = (/** @type {string} */ key) => {
    try {
      if (key === 'Enter') {
        // @ts-ignore
        const val = evaluate(calcInputVal);
        results = [ { expression: calcInputVal, value: val }, ...results ];

        // Reassign the displayed value to the new result
        calcInputVal = val;
      }
    } catch (ex) {
      alert(ex);
    }
  };

  const formExpression = async (/** @type {string} */ entry) => {
    if (!entry) {
      calcInputVal = '';
      return;
    }
    if (entry === '=') {
      onKeyDown('Enter');
      return;
    }
    calcInputVal += entry;

    if (!calcInputElement) return;

    await tick();
    calcInputElement.focus();
    calcInputElement.scrollLeft = calcInputElement.scrollWidth;
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
  class:closed={state === 'close'}>
  <div class="calculator_part calculator_display">
    <input
      type="text"
      class="calculator_input"
      bind:value={calcInputVal}
      bind:this={calcInputElement}
      on:keydown={(e) => { onKeyDown(e.key); }} />
  </div>
  <div class="calculator_part calculator_keys">
    <button
      class="key--operator"
      data-action="add"
      on:mousedown|preventDefault
      on:click={() => { formExpression('+'); }}>
      +
    </button>
    <button
      class="key--operator"
      data-action="subtract"
      on:mousedown|preventDefault
      on:click={() => { formExpression('-'); }}>
      -
    </button>
    <button
      class="key--operator"
      data-action="multiply"
      on:mousedown|preventDefault
      on:click={() => { formExpression('*'); }}>
      &times;
    </button>
    <button
      class="key--operator"
      data-action="divide"
      on:mousedown|preventDefault
      on:click={() => { formExpression('/'); }}>
      ÷
    </button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('7'); }}>7</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('8'); }}>8</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('9'); }}>9</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('4'); }}>4</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('5'); }}>5</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('6'); }}>6</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('1'); }}>1</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('2'); }}>2</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('3'); }}>3</button>
    <button on:mousedown|preventDefault on:click={() => { formExpression('0'); }}>0</button>
    <button data-action="decimal" on:mousedown|preventDefault on:click={() => { formExpression('.'); }}>.</button>
    <button data-action="clear" on:mousedown|preventDefault on:click={() => { formExpression(''); }}>AC</button>
    <button class="key--equal" data-action="calculate" on:mousedown|preventDefault on:click={() => { formExpression('='); }}>=</button>
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
    background-color: var(--color-neutral-900);
    box-shadow: 0 0 2px black;
    overflow: hidden;
    transition: width .2s ease-out;
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
    word-break: break-all;
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
