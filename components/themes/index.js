import media, { sizes } from "./media";
const theme = {};
theme.breakpoints = sizes;
theme.media = media;
theme.sizes = {
  maxWidthSmall: "800px",
  maxWidth: "1280px",
  maxWidthLarge: "1920px",
  containerPadding: "10px",
  columnGutter: "10px",
};
theme.spacing = {
  px5: "5px",
  px10: "10px",
  px15: "15px",
  px20: "20px",
  px30: "30px",
  px40: "40px",
  px80: "80px",
  px160: "160px",
};
theme.zIndex = {
  // reserve 0-9 for all other non-overlay z-index.
  navigation: 10,
  modal: 20,
};
theme.palette = {
  primary: "rgb(0, 113, 119)", // Base green
  primaryDarker: "rgb(8, 95, 99)", // Darker green
  primaryMatch: "rgb(217, 231, 231)", // Matched green
  primaryAlpha: {
    mn: "rgba(0, 113, 119, 0.08)",
    md: "rgba(0, 113, 119, 0.2)",
    lg: "rgba(0, 113, 119, 0.5)",
    xl: "rgba(0, 113, 119, 0.7)",
    xxl: "rgba(0, 113, 119, 0.8)",
  },
  secondary: "rgb(5, 60, 73)", // Dark blue
  secondayAlpha: {
    mn: "rgb(5, 60, 73, 0.02)",
    md: "rgb(5, 60, 73, 0.2)",
    lg: "rgb(5, 60, 73, 0.5)",
    xl: "rgb(5, 60, 73, 0.7)",
  },
  // secondaryMatch: '', ??
  textColor: "rgb(138, 142, 147)",
  textColorLight: "rgb(255, 255, 255)",
  // Single unique colours
  positivePink: "rgb(249, 93, 122)",
  positiveGold: {
    base: "rgb(233, 187, 109)",
  },
  // Base whites, blacks and in between as solid and/or alpha.
  negativeLight: {
    base: "rgb(255, 255, 255)",
    alphaMn: "rgba(255, 255, 255, 0.08)",
    alphaMd: "rgba(255, 255, 255, 0.20)",
    alphaLg: "rgba(255, 255, 255, 0.50)",
    alphaXl: "rgba(255, 255, 255, 0.70)",
  },
  negativeDark: {
    base: "rgb(0, 0, 0)",
    alphaMn: "rgba(0, 0, 0, 0.08)",
    alphaMd: "rgba(0, 0, 0, 0.20)",
    alphaLg: "rgba(0, 0, 0, 0.50)",
    alphaXl: "rgba(0, 0, 0, 0.70)",
  },
  negativeGrey: "rgb(245, 246, 246)",
  negativeGreyLight: "rgb(99, 115, 120)",
  negativeGreyDarker: "rgb(233, 233, 233)",
  disabled: {
    background: "rgb(130, 139, 149)",
    color: "rgb(255, 255, 255)",
  },
  overlay: {
    first: "rgb(103, 100, 113)",
    second: "rgb(200, 138, 138)",
    third: "rgb(5, 73, 79)",
  },
};
theme.fontSizes = {
  size70: "7rem",
  size50: "5rem",
  size40: "4rem",
  size32: "3.2rem",
  size24: "2.4rem",
  size22: "2.2rem",
  size18: "1.8rem",
  size17: "1.7rem",
  size16: "1.6rem",
  size15: "1.5rem",
  size14: "1.4rem",
  size13: "1.3rem",
  size12: "1.2rem",
};
theme.lineHeights = {
  large: "2.5",
  medium: "1.5",
  small: "1.2",
};
theme.fontWeights = {
  weight900: "900",
  weight700: "700",
  weight600: "600",
  weight500: "500",
};
theme.fonts = {
  primary: "Mulish, Helvetica Neue, Helvetica, Roboto, sans-serif",
  pre: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  quote: "Georgia, serif",
};
theme.images = {
  article_missing:
    "https://wfpl.org/wp-content/plugins/lightbox/images/No-image-found.jpg",
};
theme.imageContextSizes = {
  sm: {
    listThumbnail: 70,
    // galleryThumbnail: 120, // n/a
    listCard: 250,
    articleLarge: 320,
  },
  md: {
    listThumbnail: 70,
    // galleryThumbnail: 120, // n/a
    listCard: 250,
    articleLarge: 320,
  },
  lg: {
    listThumbnail: 120,
    galleryThumbnail: 250,
    listCard: 250,
    articleLarge: 600,
  },
};
export default theme;
