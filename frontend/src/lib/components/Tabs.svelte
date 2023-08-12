<script context="module">
  /**
	 * @typedef {Object} Tab
   * @prop {string | number} key
   * @prop {string | number} label
   * @prop {boolean} [disabled] - optional
	 */
</script>

<script>
  /*
    Usage:
    to use like an input <Tabs bind:activeTab={myVar} />
    to use as a navigation tool <Tabs on:change={changeHandler} />

    when a non-active, non-disabled tab is clicked:
        the change event fires with the tab object in the event.detail property
        the activeTab object is changed to match the selected tab object
    */
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // array of objects each with key and label and optional disabled property
  
  /** @type {Tab[]} */
   export let tabs = [];
  /** @type {Tab?} */
  export let activeTab = null;

  const onClick = (/** @type {Tab} */ e) => {
    if (!e.disabled && e.key !== activeTab?.key) {
      dispatch('change', e);
      activeTab = { ...e };
    }
  };
</script>

<div class="tabs" data-testid="tabs">
  {#each tabs as tab (tab.key)}
    <div
      data-testid="tab"
      class="tab"
      class:active={tab.key === activeTab?.key}
      class:disabled={tab.disabled}
      role="button"
      tabindex="0"
      on:keydown
      on:click={() => onClick(tab)}
    >
      <span>{tab.label}</span>
    </div>
  {/each}
</div>

<style>
  .tabs {
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .tab {
    width: unset;
    height: unset;
    display: inline-flex;
    align-items: flex-end;
    gap: var(--margin);
    font-family: var(--type-button-font);
    font-size: var(--type-button-size);
    /* line-height: var(--type-button-line-height); */
    font-weight: var(--type-button-weight);
    text-transform: var(--type-button-transform);
    background-color: var(--color-neutral-400);
    border: var(--border-width) var(--color-neutral-500);
    border-style: solid;
    padding: calc(var(--padding) - var(--border-width)) var(--padding);
    color: var(--color-background);
    line-height: inherit;
    border-radius: var(--border-radius);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
    cursor: pointer;
    user-select: none;
    margin-bottom: -1px;
  }

  .tab:first-of-type {
    border-left: var(--border-width) solid var(--color-neutral-500);
  }

  .tab:hover {
    background-color: var(--color-neutral-500);
  }

  .tab.disabled,
  .tab.disabled:hover {
    background-color: var(--color-neutral-200);
    color: var(--color-neutral-500);
    cursor: not-allowed;
  }

  .active {
    background-color: var(--color-on-theme-2);
    color: var(--color-theme-2);
    cursor: default;
    border-bottom-color: var(--color-on-theme-2);
  }

  .active:hover {
    background-color: var(--color-on-theme-2);
  }
</style>
