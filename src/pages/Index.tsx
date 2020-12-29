import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { FirebaseContext } from '../store/Context'
import * as Active from '../store/Active'
import * as Panels from '../store/Panels'
import * as User from '../store/User'

let guard = false;

export function IndexPage(props) {
    const dispatch = useDispatch()
    let panels = Panels.Select()
    let active = Active.Select()
    if(!active && panels.length)
        dispatch(Active.Slice.actions.update(panels[0].ikey))
    return (<>
        <FirebaseContext.Consumer>
            {firebase => {
                if (!guard) {
                    firebase.loadPanels(firebase.auth.currentUser?.uid, 
                        val => dispatch(Panels.Slice.actions.load(val.panels))
                ); guard = true}
                return (<>
                    <div className="btn-group">
                        {panels.map((val, idx) => (
                            <button type="button" className={"btn btn-outline-info" + (active == val.ikey ? " active" : "")}
                                onClick={() => dispatch(Active.Slice.actions.update(val.ikey))} key={val.ikey}>{val.title}</button>
                        ))}
                    </div>
                    <button className="btn btn-light" type="button"
                        onClick={() => dispatch(Panels.Slice.actions.create())}>+</button>
                    <button className="btn userBtn">{props.user.displayName}</button>
                </>)}}
        </FirebaseContext.Consumer>
    </>);
}