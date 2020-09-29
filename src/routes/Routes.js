import React from "react";
import { Switch, Route } from "react-router-dom";
import Job from "../pages/Job";
import Login from "../pages/Login";
import JobDetail from "../pages/JobDetail";
import ProtectedRoute from "./ProtectedRoute";
import FourOhFour from "../pages/FourOhFour";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Job} />
      <ProtectedRoute
        path="/detail/:id"
        render={(props) => <JobDetail name="will" />}
      />
      <Route path="*" component={FourOhFour} />
    </Switch>
  );
};

export default Routes;
