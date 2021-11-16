window.onload = () => {
    axios.get('http://localhost:8080/')
        .then(function (response) {
            // handle success
            console.log(response);
            document.getElementById('balance').innerHTML = "Balance £" + response.data.walletList[0].balance;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

document.getElementById('updateButton').addEventListener('click', () => {
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
});

document.getElementById('depositAmountSpan').innerHTML =
    'Amount to Desposit ' + document.getElementById('depositAmount').value + ':';

document.getElementById('depositAmount').addEventListener('change', () => {
    document.getElementById('depositAmountSpan').innerHTML =
        'Amount to Desposit ' + document.getElementById('depositAmount').value + ':';
});