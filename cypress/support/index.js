// Using CommonJS syntax for compatibility
require('./commands');

// Conditionally load the testing-library commands
try {
  require('@testing-library/cypress/add-commands');
} catch (e) {
  console.warn('Unable to load @testing-library/cypress');
}

// Conditionally load accessibility testing commands
try {
  require('cypress-axe');
} catch (e) {
  console.warn('Unable to load cypress-axe');
}

// Conditionally load wait until utility
try {
  require('cypress-wait-until');
} catch (e) {
  console.warn('Unable to load cypress-wait-until');
}