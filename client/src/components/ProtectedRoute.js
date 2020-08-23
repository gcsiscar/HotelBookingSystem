import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./utils/auth";

export default function ProtectedRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.isAuthenticated()) {
          return <Component />;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  );
};
