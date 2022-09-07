
const NFT721_ABI = [
  'function tokenURI(uint256 tokenId) public view returns (string memory)'
];

const ERC1155_ABI = [
  'function uri(uint256) public view returns (string memory)'
];

module.exports = {
  NFT721_ABI,
  ERC1155_ABI
}