import React from "react";

import { CUSTOMER_URL } from "../../config/apiUrl";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
export const UserContext = React.createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.
  const login = async (usernameOrEmail, password) => {};
  const confirmRegister = async (username, code) => {};
  const signup = async (username, password, given_name, family_name) => {};

  // same thing here
  const logout = () => {};

  // Finally, return the interface that we want to expose to our other components
  return <UserContext.Provider value={"22"}>{children}</UserContext.Provider>;
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context;
};
