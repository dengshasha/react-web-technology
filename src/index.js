import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './css/index.css';

import Product from './pages/Product';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Team from './pages/Team';
import Support from './pages/Support';
import JoinUs from './pages/JoinUs';
import Home from './pages/Home';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <div>

            <Route exact path="/" component={Home} />
            <Route path="/products" component={Product} />
            <Route path="/blog" component={Blog} /> {/*只会匹配/blog 而不会匹配/blog/1*/}
            <Route path="/blogDetails/:id" component={BlogDetails} /> {/*只会匹配/blog/1 而不会匹配/blog*/}
            <Route path="/team" component={Team} />
            <Route path="/support" component={Support} />
            <Route path="/joinUs" component={JoinUs} />

        </div>
    </Router>
), document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
