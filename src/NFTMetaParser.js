const axios = require('axios').default;
const decodeBase64 = (typeof window !== 'undefined') ? window.atob : base64Decode;
const {
  NFT721_ABI,
  ERC1155_ABI
} = require('./abis');

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

  async getTokenURI(address, tokenId, is1155 = false) {
    if (!is1155) {
      const _contract = this.conflux.Contract({
        address,
        abi: NFT721_ABI
      });
      const _tokenURI = await _contract.tokenURI(tokenId);
      return _tokenURI.replace('{id}', paddingId(tokenId));
    } else {
      const _contract = this.conflux.Contract({
        address,
        abi: ERC1155_ABI
      });
      const _tokenURI = await _contract.uri(tokenId);
      return _tokenURI.replace('{id}', paddingId(tokenId));
    }
  }

  async getMetaByURI(rawURI, axiosConfig = {timeout: 30000}) {
    let meta = {};
    try {
      if (typeof rawURI.startsWith("{")) {
        try {
          meta = JSON.parse(rawURI);
          return meta;
        } catch (e) {
          
        }
      }

      // get meta throught ipfs gateway
      if (rawURI.startsWith("ipfs")) {
        rawURI = this._ipfsGatewayURI(rawURI);
      }

      if (rawURI.startsWith("http")) {
        const rawMeta = await axios.get(rawURI, axiosConfig);
        meta = typeof rawMeta.data === 'object' ? rawMeta.data : JSON.parse(rawMeta.data);
      }

      if (rawURI.match('base64')) {
        meta = this._decodeBase64(rawURI);
      }
    } catch(e) {
      // console.log("Meta data get failed: ", e);
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

function paddingId(tokenId) {
  tokenId = Number(tokenId).toString(16);
  return tokenId.padStart(64, '0');
}

function base64Decode(base64encoded) {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

module.exports = NFTMetaParser;