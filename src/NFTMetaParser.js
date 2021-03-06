const NFT721_ABI = require('./abis/721.json');
const axios = require('axios').default;
const atobOfNode = require('atob');
const decodeBase64 = (typeof window !== 'undefined') ? window.atob : atobOfNode;

/**
 * @param {object} conflux - Pass a js-conflux-sdk Conflux instance
 * @param {string} ipfsGateway - If meta info is stored on IPFS then the second parameter is needed
 */
class NFTMetaParser {
  constructor(conflux, ipfsGateway = '') {
    this.conflux = conflux;
    //
    if (!ipfsGateway.endsWith('/')) {
      ipfsGateway += '/';
    }
    this.ipfsGateway = ipfsGateway;
  }

  async getTokenURI(address, tokenId) {
    const _contract = this.conflux.Contract({
      address,
      abi: NFT721_ABI
    });
    const _tokenURI = await _contract.tokenURI(tokenId);
    return _tokenURI;
  }

  async getMetaByURI(rawURI) {
    let meta = {};
    try {
      // get meta throught ipfs gateway
      if (rawURI.startsWith("ipfs")) {
        rawURI = this._ipfsGatewayURI(rawURI);
      }

      if (rawURI.startsWith("http")) {
        const rawMeta = await axios.get(rawURI);
        meta = typeof rawMeta.data === 'object' ? rawMeta.data : JSON.parse(rawMeta.data);
      }
  
      if (rawURI.match('base64')) {
        meta = this._decodeBase64(rawURI);
      }
    } catch(e) {
      console.log("Meta data get failed: ");
      console.error(e);
      throw e;
    }
    // normalize and return
    return this.normalizeMeta(meta);
  }

  normalizeMeta(meta) {
    // lowerCase of all keys in first level
    const normalizedMeta = {};
    for(let key in meta) {
      normalizedMeta[this._lowerFirstLetter(key)] = meta[key];
    }

    if (normalizedMeta.image) {
      normalizedMeta.image = this._ipfsGatewayURI(normalizedMeta.image);
    }
    return normalizedMeta;
  }

  _ipfsGatewayURI(_uri) {
    if (_uri.startsWith('ipfs')) {
      _uri = this.ipfsGateway + _uri.replace("ipfs://", "ipfs/");
    }
    return _uri;
  }

  _lowerFirstLetter(str) {
    return str[0].toLowerCase() + str.slice(1);
  }

  _decodeBase64(data) {
    const parts = data.split(',');
    const decoded = decodeBase64(parts[1]);
    return JSON.parse(decoded);
  }
}



module.exports = NFTMetaParser;