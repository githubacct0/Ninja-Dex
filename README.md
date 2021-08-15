# NINJA DEX UI

Hardfork of projectserum's DEX-UI

### Running the UI

Run `yarn` to install dependencies, then run `yarn start` to start a development server or `yarn build` to create a production build that can be served by a static file server.

---
FOR ERROR

1. See how to `Running the UI` and install the DEX package 
2. After Package Installed
3. open folder `node_modules/@project-serum/serum/lib/`
4. Change `node_modules/@project-serum/serum/lib/markets.json` with new `serium-lib/markets.json`
5. Change `node_modules/@project-serum/serum/lib/token-mints.json` with new `serium-lib/token-mints.json`
6. V3 Add Change `node_modules/@project-serum/serum/lib/tokens_and_markets.d.ts` replace with `serum-lib/tokens_and_markets.d.ts`
7. Restart server :) ALL DONE
---

See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for other commands and options.

---

See [A technical introduction to the Serum DEX](https://projectserum.com/blog/serum-dex-introduction) to learn more about the Serum DEX.

See [serum-js](https://github.com/project-serum/serum-js) for DEX client-side code. Serum DEX UI uses this library.

See [sol-wallet-adapter](https://github.com/project-serum/sol-wallet-adapter) for an explanation of how the Serum DEX UI interacts with wallet services to sign and send requests to the Serum DEX.

See [spl-token-wallet](https://github.com/project-serum/spl-token-wallet) for an implementation of such a wallet, live at [sollet.io](https://sollet.io).
