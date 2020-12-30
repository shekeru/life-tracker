import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { TaskPanel } from '../components/TaskPanel'
import { FirebaseContext } from '../store/Context'
import * as Active from '../store/Active'
import * as Panels from '../store/Panels'
import * as User from '../store/User'

export function IndexPage(props) {
    const dispatch = useDispatch()
    let panels = Panels.Select()
    let active = Active.Select()
    if(!active && panels.length)
        dispatch(Active.Slice.actions.update(panels[0].ikey))
    let current = panels.find(el => el.ikey == active)
    return (<>
        <div className="btn-group">
            {panels.map((val, idx) => (
                <button type="button" className={"btn btn-outline-info" + (active == val.ikey ? " active" : "")}
                    onClick={() => dispatch(Active.Slice.actions.update(val.ikey))} key={val.ikey}
                    onContextMenu={(ev) => { 
                        ev.preventDefault()
                        console.log(ev.clientX, ev.clientY) 
                }}>{val.title}</button>))}
        </div>
        <button className="btn btn-light" type="button"
            onClick={() => dispatch(Panels.Slice.actions.create())}>+</button>
        <button className="btn userBtn">{props.user.displayName}</button>
        <TaskPanel current={current} newTask={() => 
            dispatch(Panels.Slice.actions.addEntry(current?.ikey))}/>
    </>)
}