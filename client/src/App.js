import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import auth from "./components/utils/auth";

const SignUp = lazy(() => import("./components/page/SignUp"));
const SignIn = lazy(() => import("./components/page/SignIn"));
const Home = lazy(() => import("./components/page/Home"));
const AdminDashboard = lazy(() => import("./components/page/AdminDashboard"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PageNotFound = lazy(() => import("./components/404"));
const DashboardV2 = lazy(() => import("./components/page/Dashboard_v2"));

export default function App() {
  return (
    <div className="App">
      <Navbar auth={auth} />
      <Suspense fallback={<h1>Loading Page....</h1>}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/sign-in" render={() => <SignIn auth={auth} />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/admindashboard" render={() => <AdminDashboard />} />
          <ProtectedRoute path="/dashboard" auth={auth} component={DashboardV2} />
          <Route path="*" render={() => <PageNotFound />} />
        </Switch>
      </Suspense>
    </div>
  );
}

