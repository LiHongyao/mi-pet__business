import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import {
  renderRoutes
} from 'react-router-config'
import routes from './router';
import Fallback from './components/Fallback'

function App() {
  return (
    <Suspense fallback={Fallback}>
      <Router>
        <div className="App">
          {/* 路由配置 */}
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
