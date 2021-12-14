<script>
  import Textfield from "@smui/textfield";
  import CountryPicker from "./CountryPicker.svelte";
  import {
    validatePhoneNumberLength,
    isPossiblePhoneNumber,
  } from "libphonenumber-js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let customClass = "";
  export let width = "80";
  export let variant = "outlined";

  /** Currenly entered phone number */
  export let phoneNumber = "";

  /**
   * Currently selected Country Code
   * @type {{ name: string; code: string; dial_code: string; }}
   */
  export let countryCode = {
    name: "United States of America",
    code: "us",
    dial_code: "+1",
  };

  /** Validity of current country and phone number combo */
  let invalid = false;

  const validateNumber = () => {
    // Construct the phone number
    const num = `${countryCode.dial_code} ${phoneNumber}`;

    // Construct the country code
    const code =
      countryCode && countryCode.code && countryCode.code.toUpperCase()
        ? countryCode.code.toUpperCase()
        : "US";

    // Check if long enough
    if (validatePhoneNumberLength(num, code) && num.length >= 12) {
      // Check if possibly valid
      if (isPossiblePhoneNumber(num, code)) {
        invalid = false;
        dispatch("isValid", !invalid);
      } else {
        invalid = true;
        dispatch("isValid", !invalid);
      }
    } else {
      invalid = false;
      dispatch("isValid", !invalid);
    }
  };
</script>

<style></style>

<div class="w-{width} p-2 flex flex-row flex-nowrap {customClass}">
  <CountryPicker
    on:selected={(selectedCountry) => {
      countryCode = selectedCountry;
      validateNumber();
    }}
  />
  <Textfield
    class="w-full"
    label="{invalid ? 'Invalid' : 'Enter'} Phone Number"
    {variant}
    bind:invalid
    updateinvalid
    bind:value={phoneNumber}
    on:blur={() => {
      validateNumber();
      dispatch("blur", invalid);
    }}
    on:change={() => {
      validateNumber();
      dispatch("change", invalid);
    }}
    on:keyup={() => {
      validateNumber();
      dispatch("keyup", invalid);
    }}
  />
</div>
