<template>
  <!-- This div will serve as the container for the Buy Me A Coffee button -->
  <!-- The script will append the button here. The mt-6 class provides some top margin. -->
  <div id="bmc-button-container" class="mt-6">
    <!-- The Buy Me A Coffee button will be injected here by the external script. -->
  </div>
</template>

<script>
export default {
  name: 'BuyMeACoffeeButton', // Component name
  mounted() {
    // Check if the Buy Me A Coffee script already exists in the document to prevent multiple loads.
    // This is crucial if this component might be mounted multiple times or if the script
    // is loaded elsewhere in your application.
    if (
      !document.querySelector(
        'script[src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"]',
      )
    ) {
      // Create a new script element.
      let bmcScript = document.createElement('script')

      // Set the 'src' attribute to the Buy Me A Coffee script URL.
      bmcScript.setAttribute('src', 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js')

      // Set the data attributes required by the Buy Me A Coffee button.
      // These attributes configure the appearance and behavior of the button.
      bmcScript.setAttribute('data-name', 'bmc-button') // Required by BMC script
      bmcScript.setAttribute('data-slug', 'bisesh') // Your Buy Me A Coffee slug
      bmcScript.setAttribute('data-color', '#8bd0cc') // Button background color
      bmcScript.setAttribute('data-emoji', '') // Emoji to display on the button (empty for none)
      bmcScript.setAttribute('data-font', 'Cookie') // Font style for the button text
      bmcScript.setAttribute('data-text', 'Buy me a coffee') // Text displayed on the button
      bmcScript.setAttribute('data-outline-color', '#000000') // Outline color of the button
      bmcScript.setAttribute('data-font-color', '#000000') // Font color of the button text
      bmcScript.setAttribute('data-coffee-color', '#FFDD00') // Color of the coffee icon

      // Append the script to the document body. Appending to the body is generally
      // recommended for external scripts that manipulate the DOM or render UI elements,
      // as it ensures the DOM is fully parsed before the script attempts to interact with it.
      document.body.appendChild(bmcScript)
    }
  },
  data() {
    return {
      // This component does not require any reactive data properties for its current functionality.
      // Add data properties here if your component needs to manage its own state.
    }
  },
  methods: {
    // This component does not require any custom methods for its current functionality.
    // Add methods here if your component needs to perform specific actions or logic.
  },
}
</script>

<style>
/*
  The following CSS imports the 'Inter' font and sets it as the default font for the body.
  While this component itself is minimal, keeping a general font import can be useful
  for overall application consistency if this component is part of a larger app.
  The Buy Me A Coffee button's font is controlled by its 'data-font' attribute.
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>
