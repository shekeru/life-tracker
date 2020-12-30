import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as CtxMenu from '../store/CtxMenu'

export function ContextMenu() {
    let info = CtxMenu.Select()
    return (<nav id="ctxmenu" hidden={!info.show} style={{top: info.yPos, left: info.xPos}}>
        <ul>{info.opts.map((item, idx) => 
            <li key={idx}>{item}</li>
        )}</ul>
    </nav>);
}