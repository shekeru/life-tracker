import React from 'react';
import { useDispatch } from 'react-redux';

import * as Active from '../store/Active'
import * as Panels from '../store/Panels'

export function IndexPage() {
    const dispatch = useDispatch()
    let panels = Panels.Select()
    let active = Active.Select()
    if(!active && panels.length)
        dispatch(Active.Slice.actions.update(panels[0].ikey))
    return (
        <>
            <div className="btn-group">
                {panels.map((val, idx) => (
                    <button type="button" className={"btn btn-outline-info" + (active == val.ikey ? " active" : "")}
                        onClick={() => dispatch(Active.Slice.actions.update(val.ikey))} key={val.ikey}>{val.title}</button>
                ))}
            </div>
            <button className="btn btn-light" type="button"
                onClick={() => dispatch(Panels.Slice.actions.create())}>+</button>
        </>
    );
}