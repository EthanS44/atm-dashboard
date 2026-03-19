import {useEffect, useState} from "react";

function FilterBar({atmList = [], aidList = [], onSearch}){

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [pan, setPan] = useState('')
    const [ref, setRef] = useState('')
    const [selectedAtm, setSelectedAtm] = useState('')
    const [selectedAid, setSelectedAid] = useState('')

    useEffect(() => {
        onSearch({
            startDate,
            endDate,
            selectedAtm,
            selectedAid,
            pan,
            ref
        })
    }, [startDate, endDate, selectedAtm, selectedAid, pan, ref])

    return (
        <div className="filter-bar">
            <form style={{display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end'}}>
                <div className="filter-group">
                    <label>Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="filter-group">
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="filter-group">
                    <label>ATM ID</label>
                    <select value={selectedAtm} onChange={(e) => setSelectedAtm(e.target.value)}>
                        <option value="">All ATMs</option>
                        {atmList.map(atm => (
                            <option key={atm.id} value={atm.id}>{atm.name}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Customer PAN Number</label>
                    <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} placeholder="Partial or full card number" />
                </div>
                <div className="filter-group">
                    <label>EMV Chip AID</label>
                    <select value={selectedAid} onChange={(e) => setSelectedAid(e.target.value)}>
                        <option value="">All applications</option>
                        {aidList.map(aid => (
                            <option key={aid.id} value={aid.id}>{aid.name}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Transaction Serial Number</label>
                    <input type="number" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="4 digit number" />
                </div>
            </form>
        </div>
    )
}

export default FilterBar