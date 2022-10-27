import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
     changeLayoutMode,
} from "../../store/actions";
import { layoutModeTypes } from 'constants/layout';
import { useSelector, useDispatch } from "react-redux";

export default function LayoutModeChangeButton() {
     const dispatch = useDispatch();
     const {
          layoutModeType
     } = useSelector(state => ({
          layoutModeType: state.Layout.layoutModeType,
     }));

     const modeHandler = (mode) => {
          localStorage.setItem('mode', mode);
          dispatch(changeLayoutMode(mode));
     }

     return (

          <div style={{display:'inline-flex',flexDirection:'column',justifyContent:'center',marginRight:'10px'}}>
               {layoutModeType === layoutModeTypes.DARK ? <span  onClick={() => modeHandler(layoutModeTypes.LIGHT)}><LightModeIcon /></span> : <span onClick={() => modeHandler(layoutModeTypes.DARK)}><DarkModeIcon /></span>}
          </div>

     )
}