import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { component: Component, auth, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.isAuthenticated()) {
          return <Component auth={auth}/>;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  );
}
