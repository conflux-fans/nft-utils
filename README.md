# nft-utils

## Install

```sh
$ npm install @confluxfans/nft-utils
```

## How to use

```js
const { Conflux } = require('js-conflux-sdk');
const { NFTMetaParser } = require('@confluxfans/ntf-utils');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1
});

const ipfsGateway = 'https://ipfs.io';

const metaParser = new NFTMetaParser(conflux, ipfsGateway);

async function main() {
  const contractAddress = 'cfxtest:acf9kx23mgzt70zc9n9sz7m1s7wydtt2dek5yzn4ym';
  const tokenId = 2;
  const tokenURI = await metaParser.getTokenURI(contractAddress, tokenId);
  console.log('The NFT URI is: ', tokenURI);
  const meta = await metaParser.getMetaByURI(tokenURI);
  console.log('NFT meta is: ', meta);
}

main();

```
