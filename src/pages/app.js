import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'normalize.css';
import './app.sass';

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/aaa">
                            aaa
                        </Link>
                    </li>
                    <li>
                        <Link to="/bbb">
                            bbb
                        </Link>
                    </li>
                    <li>
                        <Link to="/c/ccc">
                            ccc
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
