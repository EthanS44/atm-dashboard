const BASE_URL = 'https://dev.smartjournal.net/um/test/api/jr/txn'

// function to get list of atms
export async function getAtmList() {
    const response = await fetch(`${BASE_URL}/atmlist/v1`)
    const data = await response.json()
    return data
}

// function to get list of aids
export async function getAidList() {
    const response = await fetch(`${BASE_URL}/aidlist/v1`)
    const data = await response.json()
    return data
}

//helper function to reformat date, returns date as int
function returnIntDate(date) {
    date = date.replaceAll("-", "")
    date += "000000"
    return parseInt(date, 10)
}

// function to get filtered transactions
export async function getTransactions(filters){
    const body = {
        devtime0: returnIntDate(filters.startDate),
        devtime1: returnIntDate(filters.endDate),
    }

    // atmId is required - if none selected, send all atm ids
    if (filters.selectedAtm) {
        body.atmId = [parseInt(filters.selectedAtm)]
    } else {
        body.atmId = filters.atmList.map(atm => atm.id)
    }

    // only add optional filters if they have values
    if (filters.pan) body.pan = filters.pan
    if (filters.selectedAid) body.aidId = parseInt(filters.selectedAid)
    if (filters.ref) body.ref = filters.ref

    const response = await fetch(`${BASE_URL}/v1`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

//function to get transaction logs
export async function getTransactionLog(atmId, devTime) {
    const response = await fetch(`${BASE_URL}/log/v1?a=${atmId}&t=${devTime}`)
    const text = await response.text()
    return text
}

