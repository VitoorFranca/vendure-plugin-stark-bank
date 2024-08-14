# Vendure Pagar.me Plugin

[![npm (scoped)](https://img.shields.io/npm/v/vendure-plugin-stark-bank.svg)](https://www.npmjs.com/package/vendure-plugin-stark-bank)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This plugin is designed to integrate Stark Bank as a payment provider within the Vendure framework. Please note that this is an ongoing project. For details on the remaining tasks and improvements, refer to the Issues section.

## ⚙️ Install
### 1. Install and configure Vendure
[Here](https://www.vendure.io/docs/getting-started/) you can find out how to install

### 2. Install the package
```bash
npm install vendure-plugin-stark-bank --save
```

### 3. Add the plugin in Vendure configuration
```typescript
import { PagarmePlugin } from 'vendure-plugin-stark-bank';
const config: VendureConfig = {
  ...
  plugins: [
    PagarmePlugin
  ]
}
```