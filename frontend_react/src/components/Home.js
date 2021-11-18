import React from "react";
import axios from "axios";
import Nav from "./Nav.js";

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            balance: 'loading balance...'
        }

        this.getBalance = this.getBalance.bind(this)
        this.handleDeposit = this.handleDeposit.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
    }

    getBalance() {
        axios.get('http://localhost:8080/wallets')
            .then(response => {
                // handle success
                let balance = response.data.walletList[0].balance;
                // console.log("Balance £" + balance)
                this.setState({
                    balance: "Balance £" + balance
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    handleDeposit() {
        let depositAmount = parseInt(document.getElementById('deposit').value);

        if(depositAmount > 0) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/deposit',
                data: {
                    deposit: depositAmount
                }
            })
                .then(response => {
                    // handle success
                    // console.log("Balance £" + balance)
                    this.setState(previousState => ({
                        balance: "Balance £" + response.data.balance,
                    }), this.updateBalance);
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                });
        }
    }

    updateBalance() {
        console.log("updated");
        document.getElementById('balance').innerHTML = this.state.balance;
    }

    componentDidMount() {
        this.getBalance();
    }

    render() {
        const links = {path: 'settings', link: 'Settings'}

        return (
            <div>
                <h1>Home</h1>
                <Nav links={links} />
                <p id="balance">{this.state.balance}</p>
                <label htmlFor="deposit">Deposit</label>
                <input id="deposit" name="deposit" type="number" min="1" defaultValue="1"/>
                <button onClick={this.handleDeposit}>Deposit!</button>
            </div>
        )
    }
}

export default Home;