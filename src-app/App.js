import React, {Component} from 'react';
//引入路由器及路由
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <BrowserRouter>
      {/* switch只匹配其中一个路由 */}
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }

}
 
export default App;

