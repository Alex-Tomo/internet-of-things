window.onload = () => {
    axios.get('http://localhost:8080/')
        .then(function (response) {
            // handle success
            document.getElementById('balance').innerHTML = "Balance £" + response.data.balance;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

document.getElementById('updateButton').addEventListener('click', () => {
    let depositAmount = document.getElementById('depositAmount').value;
    let depositLimit = document.getElementById('depositLimit').value;
    let color = document.getElementById('colours').value;
    let noise = document.getElementById('noises').value;

    axios({
        method: 'post',
        url: 'http://localhost:8080/',
        data: {
            depositAmount: depositAmount,
            depositLimit: depositLimit,
            color: color,
            noise: noise,
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