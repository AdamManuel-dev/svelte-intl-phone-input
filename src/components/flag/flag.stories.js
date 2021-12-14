import Flag from './Flag.svelte'

export default { title: 'Flag SVG' }

export const USFlagStory = () => ({
  Component: Flag,
  props: { width: 8, height: 8, country: 'US', customClass: '' }
})

export const GEFlagStory = () => ({
  Component: Flag,
  props: { width: 8, height: 8, country: 'GE', customClass: '' }
})

export const NZFlagStory = () => ({
  Component: Flag,
  props: { width: 8, height: 8, country: 'NZ', customClass: '' }
})
