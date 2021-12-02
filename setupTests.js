/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom/extend-expect";

jest.mock("next/router", () => ({
  replace: jest.fn(),
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      replace: jest.fn(),
    };
  },
}));
