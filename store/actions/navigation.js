export const setMenuItemsAction = (menuItems) => {
  return {
    type: "SET_MENU_ITEMS",
    menuItems,
  };
};
export const setMenuCategoryHeroFocus = (setFocus) => {
  return {
    type: "SET_MENU_CATEGORY_HERO_FOCUS",
    setFocus,
  };
};
export const setModalBackdropVisibleAction = (isVisible) => ({
  type: "SET_MODAL_BACKDROP_VISIBLE",
  isVisible,
});
export const setMenuVisibility = (isVisible) => ({
  type: "SET_MENU_VISIBILITY",
  isVisible,
});
export const setNavIsAnimating = (navIsAnimating) => ({
  type: "SET_NAV_IS_ANIMATING",
  navIsAnimating,
});
export const setHeaderHeight = (headerHeight) => ({
  type: "SET_HEADER_HEIGHT",
  headerHeight,
});
