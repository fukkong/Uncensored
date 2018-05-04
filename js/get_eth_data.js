'use strict'

const providers = ethers.providers

const provider = providers.getDefaultProvider('mainnet')
const etherScanProvider = new ethers.providers.EtherscanProvider()

const address = '0x19AAA2dBAAEd1463764b113849f21Ee4d0aA0460'
const startBlock = 3135808

function getDataAndShow (addressTofind, start) {
    provider.getBlockNumber().then((blockNumber) => {
        etherScanProvider.getHistory(addressTofind, start, blockNumber).then(function (history) {
            const table = document.getElementById('table_body')
            for (let i = 0; i < history.length; i++) {
                const number = document.createElement('th')
                number.setAttribute('scope', 'row')
                number.innerHTML = i + 1
                const blockNum = document.createElement('td')
                blockNum.innerHTML = history[i]['blockNumber']
                const txData = document.createElement('td')
                txData.innerHTML = utf8Decode(hexToString(history[i]['data']))
                txData.setAttribute('class', 'limit')
                const txIndex = document.createElement('td')
                txIndex.innerHTML = history[i]['transactionIndex']
                const tr = document.createElement('tr')
                tr.appendChild(number)
                tr.appendChild(blockNum)
                tr.appendChild(txData)
                tr.appendChild(txIndex)
                table.appendChild(tr)
            }
        })
    })
}

getDataAndShow(address, startBlock)

function searchByInput () {
    const inputAddress = $('#searchInput').val()
    if (inputAddress !== '') {
        try {
            getDataAndShow(inputAddress, startBlock)
        } catch (e) {
            //not working TODO: catch error
            alert('search address is not valid.')
        }
    } else {
        alert('search address is empty.')
    }
}

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
