import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';


import * as Panels from '../store/Panels'
import {RootState} from '../web/Store'

export function IndexPage() {
    const dispatch = useDispatch()
    let panels = useSelector(
        (st: RootState) => st.panels
    );
    console.log(panels)
    return (
        <>
            <div className="btn-group">
                {panels.map((val, idx) => (
                    <button type="button" className="btn btn-outline-info" 
                        key={val.ikey}>{val.title}</button>
                ))}
            </div>
            <button className="btn btn-light" type="button"
                onClick={() => dispatch(Panels.Slice.actions.create())}>+</button>
        </>
    );
}