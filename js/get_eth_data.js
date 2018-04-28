'use strict'

const providers = ethers.providers

const provider = providers.getDefaultProvider('ropsten')

const address = '0x44938b01da1feb3f6fa1cf38870ee564e25d9bf3'

provider.getBalance(address).then(function (balance) {

  // balance is a BigNumber (in wei); format is as a sting (in ether)
  const etherString = ethers.utils.formatEther(balance)

  console.log('Balance: ' + etherString)
})

provider.getTransactionCount(address).then(function (transactionCount) {
  console.log('Total Transactions Ever Send: ' + transactionCount)
})

provider.resolveName('test.ricmoose.eth').then(function (address) {
  console.log('Address: ' + address)
})

const etherScanProvider = new ethers.providers.EtherscanProvider()

const startBlock = 3135808
const endBlock = 5490404
let data
etherScanProvider.getHistory(address, startBlock, endBlock).then(function (history) {
  console.log(history)
  const table = document.getElementById('table_body')
  for (let i = 0; i < history.length; i++) {
    const number = document.createElement('th')
    number.setAttribute('scope','row')
    number.innerHTML = i + 1
    const blockNum = document.createElement('td')
    blockNum.innerHTML = history[i]['blockNumber']
    const txHash = document.createElement('td')
    txHash.innerHTML = history[i]['hash']
    const txIndex = document.createElement('td')
    txIndex.innerHTML = history[i]['transactionIndex']
    const tr = document.createElement('tr')
    tr.appendChild(number)
    tr.appendChild(blockNum)
    tr.appendChild(txHash)
    tr.appendChild(txIndex)
    table.appendChild(tr)

  }
})

function utf8Decode (utf8String) {
  if (typeof utf8String !== 'string') throw new TypeError('parameter ‘utf8String’ is not a string')
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  return utf8String.replace(
    /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
    function (c) {  // (note parentheses for precedence)
      const cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f)
      return String.fromCharCode(cc)
    }
  ).replace(
    /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
    function (c) {  // (note parentheses for precedence)
      const cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f
      return String.fromCharCode(cc)
    }
  )
}

function hexToString (hex) {
  let string = ''
  for (let i = 0; i < hex.length; i += 2) {
    string += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return string
}



