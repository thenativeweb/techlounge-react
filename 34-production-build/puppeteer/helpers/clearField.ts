import { ElementHandle } from 'puppeteer';

// Little Hack to clear a field from all its inputs, see https://evanhalley.dev/post/clearing-input-field-puppeteer/
const clearField = async ($field: ElementHandle): Promise<void> => {
  await $field.click({ clickCount: 3 });
  await $field.press('Backspace');
};

export {
  clearField
};
