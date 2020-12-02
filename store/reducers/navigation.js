import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  menuItems: [],
  modalBackdropVisible: false,
  menuVisibility: false,
  navIsAnimating: false,
  hydrated: false,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      if (!state.hydrated) {
        return { ...state, ...action.payload.navigation, hydrated: true };
      }
      return state;
    case "SET_MENU_ITEMS":
      return {
        ...state,
        menuItems: action.menuItems.sort(sortByInitialMenuItemsOrder),
      };
    case "SET_MENU_CATEGORY_HERO_FOCUS":
      return {
        ...state,
        setFocus: action.setFocus,
      };
    case "SET_MODAL_BACKDROP_VISIBLE":
      return {
        ...state,
        modalBackdropVisible: action.isVisible,
      };
    case "SET_MENU_VISIBILITY":
      return {
        ...state,
        menuVisibility: action.isVisible,
      };
    case "SET_NAV_IS_ANIMATING":
      return { ...state, navIsAnimating: action.navIsAnimating };
    case "SET_HEADER_HEIGHT":
      return { ...state, headerHeight: action.headerHeight };
    default:
      return state;
  }
};
export default navigationReducer;
