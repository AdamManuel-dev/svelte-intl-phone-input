<script>
  import { getCountries } from 'country-state-picker'
  import MenuSurface from '@smui/menu-surface'
  import Textfield from '@smui/textfield'
  import IconButton from '@smui/icon-button'
  import Button from '@smui/button'
  import List, { Item } from '@smui/list'
  import Flag from './flag/Flag.svelte'
  import { createEventDispatcher } from 'svelte'
  import { distance, closest } from 'fastest-levenshtein'
  const dispatch = createEventDispatcher()

  /** 
  @type {{
    name: string;
    code: string;
    dial_code: string;
  }[]}
  */
  const countries = getCountries()

  export let countrySearch = ''
  let selection = {
    name: 'United States of America',
    code: 'us',
    dial_code: '+1',
  }
  let selectionIndex = 0
  let surface
  let focusOnSearch = false

  let filteredCountries = [...countries]

  const searchInput = () => {
    // TODO: Replace this with `distance` combined with
    console.log(countrySearch)
    const newList = filteredCountries.filter(country => {
      return country.name.toLowerCase().includes(countrySearch.toLowerCase())
    })
    if (newList.length === 0) {
      filteredCountries = countries
    } else filteredCountries = newList
    console.log(filteredCountries)
  }

  const countryPicked = ctry => {
    console.log(ctry)
    surface.setOpen(false)
    selection = ctry
    dispatch('selected', selection)
  }
</script>

<div class="m-1">
  <Button
    variant="unelevated"
    class="text-sm h-14 p-2 z-20 w-20 -mt-1 -mr-2 rounded-lg rounded-r-none"
    style="background: #34325d"
    on:click={() => {
      surface.setOpen(true)
      focusOnSearch = true
    }}
  >
    <Flag
      customClass="bg-black"
      country={selection.code.toUpperCase()}
      width={6}
      height={4}
    />
    <span class="text-right pl-2"
      >{selection === '' ? '+ 1' : selection.dial_code}</span
    ></Button
  >
  <MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT">
    <div
      style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
    >
      <div class="w-full flex flex-row flex-nowrap space-between">
        <Textfield
          class="w-full"
          label="Search Country Codes"
          focus={focusOnSearch}
          bind:value={countrySearch}
          on:blur={searchInput}
          on:change={searchInput}
          on:keyup={searchInput}
        />
        <div style="display: flex; align-items: center;">
          <IconButton
            class="material-icons"
            title="Close"
            on:click={() => surface.setOpen(false)}>close</IconButton
          >
        </div>
      </div>

      <List
        class="demo-list w-72"
        twoLine
        avatarList
        singleSelection
        bind:selectedIndex={selectionIndex}
      >
        {#each filteredCountries as country}
          <Item
            on:SMUI:action={countryPicked(country)}
            class="w-72"
            selected={selection === country.name}
          >
            <div class="flex flex-row justify-between align-center w-full">
              <div class="flex flex-row justify-start align-center w-40">
                <Flag
                  customClass="-mt-1 bg-black"
                  country={country.code.toUpperCase()}
                  width={12}
                  height={8}
                />
                <p class="text-md text-left text-clip overflow-hidden pl-3">
                  {country.dial_code}
                </p>
              </div>
              <p
                class="text-md text-right text-ellipsis overflow-hidden -ml-16"
              >
                {country.name}
              </p>
            </div>
          </Item>
        {/each}
      </List>
    </div>
  </MenuSurface>
</div>

<style>
  .full-height {
    height: 100vh;
  }
</style>
