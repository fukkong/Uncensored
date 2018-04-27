'use strict'

var ethers = require('ethers')
var providers = ethers.providers

const utf8module = require('./utf8')

var provider = providers.getDefaultProvider('ropsten')

var address = '0x44938b01da1feb3f6fa1cf38870ee564e25d9bf3'

provider.getBalance(address).then(function (balance) {

  // balance is a BigNumber (in wei); format is as a sting (in ether)
  var etherString = ethers.utils.formatEther(balance)

  console.log('Balance: ' + etherString)
})

provider.getTransactionCount(address).then(function (transactionCount) {
  console.log('Total Transactions Ever Send: ' + transactionCount)
})

provider.resolveName('test.ricmoose.eth').then(function (address) {
  console.log('Address: ' + address)
})

var etherScanProvider = new ethers.providers.EtherscanProvider()

var startBlock = 3135808
var endBlock = 5490404
var data
etherScanProvider.getHistory(address, startBlock, endBlock).then(function (history) {
  console.log(history)
  data = history[1]['data']
  console.log(decodeURIComponent(hexToString(data)))
})

