import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as CtxMenu from '../store/CtxMenu'

export function ContextMenu() {
    let info = CtxMenu.Select()
    return (<nav className="dropdown-menu" hidden={!info.show} 
        style={{ top: info.yPos, left: info.xPos }} id="ctxmenu">
        {info.opts.map((item, idx) => 
            <button className="dropdown-item" onClick={item.event} 
                key={idx}>{item.text}</button>
        )}
    </nav>);
}