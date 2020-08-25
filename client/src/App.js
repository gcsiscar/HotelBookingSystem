import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import auth from "./components/utils/auth";

const SignUp = lazy(() => import("./components/page/SignUp"));
const SignIn = lazy(() => import("./components/page/SignIn"));
const Home = lazy(() => import("./components/page/Home"));
const Dashboard = lazy(() => import("./components/page/Dashboard"));
const DashboardV2 = lazy(() => import("./components/page/Dashboard_v2"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PageNotFound = lazy(() => import("./components/404"));

export default function App() {
  return (
    <div className="App">
      <Navbar auth={auth} />
      <Suspense fallback={<h1>Loading Page....</h1>}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/sign-in" render={() => <SignIn auth={auth} />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/test" render={() => <DashboardV2 />} />
          <ProtectedRoute path="/dashboard" auth={auth} component={Dashboard} />
          <Route path="*" render={() => <PageNotFound />} />
        </Switch>
      </Suspense>
    </div>
  );
}

