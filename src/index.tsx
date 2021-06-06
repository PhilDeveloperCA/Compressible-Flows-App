import 'semantic-ui-css/semantic.min.css';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Home from './views/Home';
import IsentropicFlow from './views/IsentropicFlow3';
import Turbomachinery from './views/Turbomachinery';
import DiffuserNozzle from './views/DiffuserNozzles';

const App = () => {
    return (
        <Router> 
            <Switch>
                <Route path='/isentropicflow'> 
                    <IsentropicFlow />
                </Route>
                <Route exact path = '/'> 
                    <Home />
                </Route>
                <Route exact path = '/turbomachinery' component={Turbomachinery}/>
                <Route exact path = '/quasi2dflow' component={DiffuserNozzle} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

export {};