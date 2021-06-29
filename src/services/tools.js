export const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();

export const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);
