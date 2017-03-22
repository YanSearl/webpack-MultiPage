import {Component} from 'react';
import ReactDOM    from 'react-dom';

import RigsterLogin from './rigster-login';

import closeBtnImg from '../../../images/login/close-btn.png';

import login from '../../../less/login.less'



class Login extends Component {
    constructor() {
        super();
         
        this.state = {
            data: ''
        }
    }

    componentWillMount() {
        
    }
    render() {
        return (
            <div className="">
                <div >
                    {this.state.data}
                </div>
                
                <h1>
                    
                    <img src={closeBtnImg} />
                </h1>
                {loanFW.url}
                <RigsterLogin />
            </div>
        )
    } 
}



ReactDOM.render(
    <Login />,
    document.getElementById('cnt')
);


// document.getElementById('title').innerText = '登录';