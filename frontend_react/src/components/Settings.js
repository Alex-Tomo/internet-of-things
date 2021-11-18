import React from "react";
import Nav from "./Nav.js";
import axios from "axios";

class Settings extends React.Component {
    updateAPI() {
        let depositAmount = parseInt(document.getElementById('depositAmount').value);
        let depositLimit = parseInt(document.getElementById('depositLimit').value);
        let colour = parseInt(document.getElementById('colours').value);
        let noise = parseInt(document.getElementById('noises').value);

        axios({
            method: 'post',
            url: 'http://localhost:8080/settings',
            data: {
                walletID: 10215645321,
                walletName: 'Jordan Short',
                depositAmount: depositAmount,
                colour: colour,
                noise: noise,
                depositLimit: depositLimit
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const links = {path: '/', link: 'Home'}

        return (
            <div>
                <h1>Settings</h1>
                <Nav links={links} />
                <span id="depositAmountSpan">Amount to deposit:</span>
                <input name="depositAmount" id="depositAmount" type="range" min="0" max="50" />
                <br /><br />
                <label htmlFor="depositLimit">Monthly Deposit Limit</label>
                <input id="depositLimit" name="depositLimit" type="number" min="0" defaultValue="0"/>
                <br /><br />
                <label htmlFor="colours">Pig Colour</label>
                <select name="colours" id="colours">
                    <option value="0">Light Blue</option>
                    <option value="1">Purple</option>
                    <option value="2">Yellow</option>
                    <option value="3">Dark Blue</option>
                    <option value="4">Green</option>
                    <option value="5">Red</option>
                    <option value="6">White</option>
                    <option value="7">Off</option>
                </select>
                <br /><br />
                <label htmlFor="noises">Pig Noise</label>
                <select name="noises" id="noises">
                    <option value="0">Oink!</option>
                    <option value="1">Wree!</option>
                    <option value="2">Fart 1!</option>
                    <option value="3">Fart 2!</option>
                    <option value="4">Coin Drop 1!</option>
                    <option value="5">Coin Drop 2!</option>
                    <option value="6">Laugh 1!</option>
                    <option value="7">Laugh 2!</option>
                </select>
                <br /><br />
                <button id="updateButton" onClick={this.updateAPI}>Update!</button>
            </div>
        )
    }
}

export default Settings;