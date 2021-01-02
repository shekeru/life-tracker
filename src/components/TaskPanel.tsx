import React, { ChangeEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as Panels from '../store/Panels'
import TimeAgo from 'react-timeago'
import { isNumber } from "lodash"

export function TaskPanel(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" className="basic_header">Time Elapsed</th>
                    <th scope="col" className="basic_header">Task Description</th>
                    <th scope="col" className="basic_header" style={{width: "125pt" }}>Frequency</th>
                    <th scope="col" className="basic_header" style={{textAlign: "right", width: "190px" }}>
                        <a className="btn btn-outline-primary abtn" onClick = {props.newTask}>New Entry</a>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.current?.entries.map((entry: Panels.Entry, idx) => 
                    <TaskEntry title={entry.title} key={entry.ikey} ikey={entry.ikey} units={entry.units}
                        idx={idx} parent={props.current} last={entry.last} interval={entry.interval} />)}
            </tbody>
        </table>
    )
}

function TaskEntry(props) {
    const dispatch = useDispatch()
    const [bDelete, setDelete] = useState(false)
    const base = {parent: props.parent.ikey, ikey: props.ikey}
    let editField = (ev) => dispatch(Panels.Slice.actions.editEntry({
        [ev.target.name]: ev.target.type == "text" ? ev.target.value 
            : BetterNumber(ev.target.value), ...base}))
    return (
        <tr>
            <td style={{textAlign: "center", verticalAlign: "middle", width: "120pt"}}>
                <TimeEntry last={props.last} diff={ - props.last} range={props.interval * props.units} />
            </td>
            <td>
                <input className="form-control" type="text" name="title" value={props.title} onChange={editField} />
            </td>
            <td className="form-row">
                <input className="form-control col-5" type="number" name="interval" value={props.interval} onChange={editField} />
                <select className="form-control col-7" name="units" onChange={editField} value={props.units}>
                    <option value={3600000}>Hours</option>
                    <option value={86400000}>Days</option>
                </select>
            </td>
            <td>
                <button type="button" className="btn btn-outline-success"
                    onContextMenu={(ev) => {ev.preventDefault(); setDelete(true)}}
                    onClick={() => dispatch(Panels.Slice.actions.editEntry({
                        last: Date.now(), ...base}))} hidden={bDelete}>Refresh</button>
                <button type="button" className="btn btn-danger"
                    onContextMenu={(ev) => {ev.preventDefault(); setDelete(false)}}
                    onClick={() => dispatch(Panels.Slice.actions.delEntry({
                        ...base}))} hidden={!bDelete}>Delete</button>
                <div className="btn-group right">
                    <button type="button" className="btn" onClick={(ev) => {
                        dispatch(Panels.Slice.actions.mvEntry({
                            parent: props.parent.ikey, idx: props.idx, delta: -1
                        })); ev.preventDefault()
                    }}><i className="bi bi-arrow-up"></i></button>
                    <button type="button" className="btn" onClick={(ev) => {
                        dispatch(Panels.Slice.actions.mvEntry({
                            parent: props.parent.ikey, idx: props.idx, delta: 1
                        })); ev.preventDefault()
                    }}><i className="bi bi-arrow-down"></i></button>
                </div>
            </td>
        </tr>
    )
}

function TimeEntry(props) {
    const [time, setTime] = useState(Date.now()), delta = time - props.last
    useEffect(() => {
        let timeout = setTimeout(() => setTime(Date.now()), (delta <= 60) ? 150 : 1000)
        return () => {clearTimeout(timeout)}
    }, [time])
    return <>{(props.last) ? 
        <TimeAgo date={props.last} className={BetterClass(delta, props.range)} /> : 
        <span className="font-weight-bold">Never</span>
    }</>
}

function BetterNumber(value) {
    const parsed = Number(value) 
    return NaN !== parsed ? parsed : value
}

function BetterClass(delta, range) {
    if (delta > range * 0.95)
        return "text-danger font-weight-bold"
    if (delta > range * 0.75)
        return "text-warning"
    return ""
}