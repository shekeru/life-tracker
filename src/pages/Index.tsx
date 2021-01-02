import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { TaskPanel } from '../components/TaskPanel'
import { FirebaseContext } from '../store/Context'
import * as CtxMenu from '../store/CtxMenu'
import * as Active from '../store/Active'
import * as Panels from '../store/Panels'
import * as User from '../store/User'

export function IndexPage(props) {
    const [editing, updateEdit] = useState("");
    const [showMenu, menuToggle] = useState(false);
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
                    onClick={() => {if (editing != val.ikey) dispatch(Active.Slice.actions.update(val.ikey))}} key={val.ikey}
                    onContextMenu={(ev) => { 
                        dispatch(CtxMenu.Slice.actions.enable({
                            xPos: ev.clientX, yPos: ev.clientY,
                            opts: [
                                {event: () => updateEdit(val.ikey), text: "Rename"},
                                {event: () => dispatch(Panels.Slice.actions.move({idx: idx, delta: -1})), text: "Move Left"},
                                {event: () => dispatch(Panels.Slice.actions.move({idx: idx, delta: +1})), text: "Move Right"},
                                {event: () => dispatch(Panels.Slice.actions.remove(val.ikey)), text: "Delete"},
                            ]
                        }))
                    }}>{editing == val.ikey ? 
                        <input type="text" autoFocus onBlur={() => updateEdit("")}
                            onKeyPress={(ev) => { if (ev.key == 'Enter') updateEdit("") }} value={val.title} 
                            onChange={(ev) => dispatch(Panels.Slice.actions.rename({idx: idx, title: ev.target.value}))} /> 
                    : val.title}</button>))}
        </div>
        <button className="btn btn-light" type="button"
            onClick={() => dispatch(Panels.Slice.actions.create())}>+</button>
        <div className="dropdown right">
            <button className="btn" onClick={() => menuToggle(!showMenu)}>{props.user.displayName}</button>
            <div id="user-menu" className="dropdown-menu dropdown-menu-right" hidden={!showMenu}>
                {/* <button className="dropdown-item">Settings [WIP]</button> */}
                <button onClick={() => dispatch(User.Slice.actions.logout())}
                    className="dropdown-item">Logout</button>
            </div>
        </div>
        <TaskPanel current={current} newTask={() => 
            dispatch(Panels.Slice.actions.addEntry(current?.ikey))}/>
    </>)
}