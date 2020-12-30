import React, { useState } from "react"
import { useDispatch } from "react-redux"
import * as Panels from '../store/Panels'
import TimeAgo from 'react-timeago'

export function TaskPanel(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Last Action</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Intervals</th>
                    <th scope="col">
                        <button type="button" className="btn btn-outline-primary"
                            onClick = {props.newTask}>New Entry</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.current?.entries.map((entry: Panels.Entry) => 
                    <TaskEntry title={entry.title} key={entry.ikey} ikey={entry.ikey} units={entry.units}
                        parent={props.current} last={entry.last} interval={entry.interval} />)}
            </tbody>
        </table>
    )
}

function TaskEntry(props) {
    const dispatch = useDispatch()
    const [bDelete, setDelete] = useState(false)
    const base = {parent: props.parent.ikey, ikey: props.ikey}
    let editField = (ev) => dispatch(Panels.Slice.actions.editEntry({
        [ev.target.name]: ev.target.numericValue || ev.target.value, ...base}))
    return (
        <tr>
            <td>
                <TimeAgo date={props.last} className={(() => {
                    let diff = Date.now() - props.last
                    let range = props.interval * props.units
                    if (diff > range * 0.95)
                        return "text-danger font-weight-bold"
                    if (diff > range * 0.75)
                        return "text-warning"
                })()} />
            </td>
            <td>
                <input type="text" name="title" value={props.title}
                    onChange={editField} />
            </td>
            <td>
                <input type="number" name="interval"
                    value={props.interval} onChange={editField} />
                <select name="units" onChange={editField} value={props.units}>
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
            </td>
        </tr>
    )
}