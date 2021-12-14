<script>
  export let width = 6
  export let height = 6
  export let country = 'US'
  export let customClass = ''
</script>

<img
  class="w-{width} h-{height} {customClass} rounded border border-black"
  alt="United States"
  src={'/' + country + '.svg'}
/>

<style></style>
