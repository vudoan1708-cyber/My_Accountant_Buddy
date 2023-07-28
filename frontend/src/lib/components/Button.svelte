<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  /** @type {'primary' | 'secondary'} */
  export let type = 'primary';
  /** @type {'small' | 'normal'} */
  export let size = 'normal';
  // /** @type {string?} */
  // export let rel = null;
  /** @type {string?} */
  export let id = null;
  // /** @type {'_self'} */
  // export let target = '_self';
  /** @type {string?} */
  export let style = null;
  /** @type {string?} */
  export let title = '';
  /** @type {boolean} */
  export let disabled = false;
  /** @type {boolean} */
  export let working = false;
</script>

<!-- <template> -->
<button
  class="button {type} {size}"
  data-testid="button"
  class:working
  class:disabled={disabled && !working}
  {id}
  on:click|stopPropagation={() => { dispatch('click'); }}
  on:focus
  on:blur
  {style}
  {disabled}
  {title}>
  <span><slot /></span>
</button>
<!-- </template> -->

<style>
  .button {
    border: var(--border-width) solid var(--color-theme-2);
    border-radius: var(--border-radius);
    text-transform: var(--type-button-transform);
    transition: all .2s ease-out;
    display: inline-flex;
    gap: var(--margin);
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }

  /* variants */
  .button.primary {
    background-color: var(--color-theme-2);
    color: var(--color-on-theme-2);
  }

  .button.primary:hover {
    background-color: var(--color-theme-2-light);
    color: var(--color-on-theme-2);
  }

  .button.secondary {
    background-color: var(--color-neutral-50);
    color: var(--color-theme-2);
  }

  .button.secondary:hover {
    border-color: var(--color-primary-dark);
    color: var(--color-theme-2-light);
  }

  .button.disabled,
  .button.disabled:hover {
    background-color: var(--color-neutral-200);
    border-color: var(--color-neutral-500);
    color: var(--color-neutral-500);
    cursor: not-allowed;
  }

  /* sizes */
  .button.normal {
    padding: calc(var(--padding) - var(--border-width));
    min-width: calc(var(--type-button-line-height) + ( var(--padding) * 2 ));
  }

  .button.small {
    padding: calc((var(--padding) / 4 ) - var(--border-width));
    min-width: calc(var(--type-button-line-height) + calc(var(--padding) / 2));
  }

  /* working */
  .button.working,
  .button.working:hover {
    cursor: wait;
    color: var(--color-theme-2-light);
    background:
      repeating-linear-gradient(
        45deg,
        var(--color-primary) 25%,
        var(--color-primary) 50%,
        var(--color-primary-light) 50%,
        var(--color-primary-light) 75%
      );
    background-size: var(--type-button-line-height) var(--type-button-line-height);
    animation: stripeBackgroundPosition .5s linear infinite;
  }

  .button.secondary.working,
  .button.secondary.working:hover {
    color: var(--color-primary);
    background:
      repeating-linear-gradient(
        45deg,
        var(--color-on-primary) 25%,
        var(--color-on-primary) 50%,
        var(--color-neutral-300) 50%,
        var(--color-neutral-300) 75%
      );
    background-size: var(--type-button-line-height) var(--type-button-line-height);
  }

  @keyframes stripeBackgroundPosition {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: calc(var(--type-button-line-height) * -1) 0;
    }
  }
</style>
