import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Agent from "./views/Agent";
import Buyer from "./views/Buyer";
import About from "./views/About";
import Listing from "./views/Listing";
import Appointment from "./views/Appointment";
import CreateAgent from "./components/CreateAgent";

const App = () => {
  return (
    // <Router>
    //   <Header />
    //   <Switch>
    //     <Route exact path="/" component={About} />
    //     <Route path="/user/agent" component={Agent} />
    //     <Route path="/user/buyer" component={Buyer} />
    //     <Route path="/appointment" component={Appointment} />
    //     <Route path="/listing" component={Listing} />
    //   </Switch>
    // </Router>
    <CreateAgent />
  );
};

/** TODO:
 * - downloaded react-router-dom version 5 which allows us to use Switch instead of Routes
 * can now flip to different views/pages but there is a problem inside Header --> the old version of react-router-dom does not have NavLinks i think check over and fix
 *
 */

export default App;
