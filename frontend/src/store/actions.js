// action - customization reducer
import { SET_USER, RESET_USER } from './constant'; // Assuming you have SET_USER and RESET_USER constants

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData
});

export const resetUser = () => ({
  type: RESET_USER
});

export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
