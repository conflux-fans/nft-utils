const { Conflux } = require('js-conflux-sdk');
const { NFTMetaParser } = require('../src/index');

const conflux = new Conflux({
  /* url: 'https://test.confluxrpc.com',
  networkId: 1, */
  url: 'https://main.confluxrpc.com',
  networkId: 1029
});

const checker = new NFTMetaParser(conflux, 'https://ipfs.io'); 

;(async function main() {
  /* let uri = 'ipfs://QmSDmbMpAuXkYokS6nDB2SaxYE334ToDhzhmPYFAy2FA2D/2.json';

  let meta = await checker.getMetaByURI(uri);
  console.log(meta); */

  /* let uri = await checker.getTokenURI('cfx:aceyccebnjp4mty68xbabavd38v39bynxp0npgw198', 2);
  console.log(uri); */

  // 1155
  let uri = await checker.getTokenURI('cfx:ace6p6egsuxv5hf61j332fayut6bxr3c7yv475a8cn', 11592235624451, true);
  console.log(uri);

  /* let meta = {
    Name: "McD Memory #2",
    Description: "Mcd and cocafe",
    TokenId: 2,
    Attributes: [
      {
        Trait: "scene",
        Value: "1"
      }
    ],
    Image: "ipfs://QmPHDqoATMTU3bq2RFmawxmtQFUm2AyEN5yyS3weJ7sWrH/1.mp4"
  };
  console.log(checker.normalizeMeta(meta)); */

  // decodeData();
})();

function decodeData() {
  const testBase64 = 'data:application/json;base64,eyJuYW1lIjogIueOi+iAheiLsembhCMxIiwgImRlc2NyaXB0aW9uIjogIuKAnOeOi+iAheKAneaYr+maj+acuueUn+aIkOW5tuWtmOWCqOWcqOmTvuS4iueahOiLsembhOOAgue7n+iuoeaVsOaNruOAgeWbvuWDj+WSjOWFtuS7luWKn+iDveiiq+aVheaEj+ecgeeVpeS7peS+m+WFtuS7luS6uuino+mHiuOAguivt+maj+aEj+S7peS7u+S9leaCqOaDs+imgeeahOaWueW8j+S9v+eUqOKAnOeOi+iAheKAnSIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSEJ5WlhObGNuWmxRWE53WldOMFVtRjBhVzg5SW5oTmFXNVpUV2x1SUcxbFpYUWlJSFpwWlhkQ2IzZzlJakFnTUNBek5UQWdNelV3SWo0OGMzUjViR1UrTG1KaGMyVWdleUJtYVd4c09pQjNhR2wwWlRzZ1ptOXVkQzFtWVcxcGJIazZJSE5sY21sbU95Qm1iMjUwTFhOcGVtVTZJREUwY0hnN0lIMGdMbWhsY204Z2UyWnZiblF0YzJsNlpUb2dNakp3ZUR0OVBDOXpkSGxzWlQ0OGNtVmpkQ0IzYVdSMGFEMGlNVEF3SlNJZ2FHVnBaMmgwUFNJeE1EQWxJaUJtYVd4c1BTSmliR0ZqYXlJdlBqeDBaWGgwSUhnOUlqSXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVnYUdWeWJ5SSs1WkNPNTc2Lzc3eUk1WWliNUxpVzc3eUpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqSXdJaUI1UFNJeE1EQWlJR05zWVhOelBTSmlZWE5sSWo3bmxKL2xrYjNsZ0x6dnZKb3pNVGd5TFRJeVBDOTBaWGgwUGp4MFpYaDBJSGc5SWpJd0lpQjVQU0l4TWpBaUlHTnNZWE56UFNKaVlYTmxJajdwclpUbXM1WGxnTHp2dkpvME5EQXJNand2ZEdWNGRENDhkR1Y0ZENCNFBTSXlNQ0lnZVQwaU1UUXdJaUJqYkdGemN6MGlZbUZ6WlNJKzU0bXA1NUNHNXBTNzVZZTc3N3lhTVRnd0t6VThMM1JsZUhRK1BIUmxlSFFnZUQwaU1qQWlJSGs5SWpFMk1DSWdZMnhoYzNNOUltSmhjMlVpUHVhemxlYWNyK2FVdStXSHUrKzhtakFyTUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l5TUNJZ2VUMGlNVGd3SWlCamJHRnpjejBpWW1GelpTSSs1NG1wNTVDRzZaaXk1YjZoNzd5YU9EWXRNend2ZEdWNGRENDhkR1Y0ZENCNFBTSXlNQ0lnZVQwaU1qQXdJaUJqYkdGemN6MGlZbUZ6WlNJKzVyT1Y1cHl2NlppeTViNmg3N3lhTlRBck1Ud3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNJeU1DSWdlVDBpTWpJd0lpQmpiR0Z6Y3owaVltRnpaU0krNXBTNzVZZTc2SXlENVp1MDc3eWE2TCtjNTZpTFBDOTBaWGgwUGp4MFpYaDBJSGc5SWpJd0lpQjVQU0k0TUNJZ1kyeGhjM005SW1KaGMyVWlQdWVvZ09hY2llVzZwdSs4bXVlN2orV0Z1RHd2ZEdWNGRENDhMM04yWno0PSJ9';
  console.log(checker._decodeBase64(testBase64));
}