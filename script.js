document.getElementById('addCart').addEventListener('click', function (event) {
    event.preventDefault();
    addToCart();
});

var items = ['toast', 'posset', 'chicken', 'pie', 'salad', 'risotto'];

var gstRate = 5;
var tipRate = 10;

var costs = {
    'toast': 125,
    'posset': 250,
    'chicken': 395,
    'pie': 350,
    'salad': 250,
    'risotto': 495
};

function addToCart() {

    var totalItems = 0;
    var totalGST = 0;
    var totalTip = 0;
    var totalCost = 0;

    items.forEach(item => {
        var quantity = parseInt(document.getElementById(item).value) || 0;
        var cost = costs[item];

        if (quantity > 0) {
            var itemCost = quantity * cost;
            var gst = itemCost * (gstRate / 100);
            var tip = itemCost * (tipRate / 100);

            totalItems += quantity;
            totalGST += gst;
            totalTip += tip;
            totalCost += itemCost + gst + tip;
        }
    });

    if (totalItems === 0) {
        alert('Your cart is empty. Please add some items.');
        return;
    }

    var totalItems = 0;
    var totalGST = 0;
    var totalTip = 0;
    var totalCost = 0;

    var checkoutColumn = document.getElementById('checkoutColumn');
    checkoutColumn.innerHTML = '';

    items.forEach(item => {
        var quantity = parseInt(document.getElementById(item).value) || 0;
        var cost = costs[item];

        
        if (quantity > 0) {
            var itemCost = quantity * cost;
            var gst = itemCost * (gstRate / 100);
            var tip = itemCost * (tipRate / 100);

            totalItems += quantity;
            totalGST += gst;
            totalTip += tip;
            totalCost += itemCost + gst + tip;

            var itemElement = document.createElement('span');
            itemElement.innerText = item.charAt(0).toUpperCase() + item.slice(1) + ' : ' + quantity;
            checkoutColumn.appendChild(itemElement);
        }
        
    });

    var totalItemsElement = document.createElement('span');
    totalItemsElement.innerText = 'Total Items : ' + totalItems;
    checkoutColumn.insertBefore(totalItemsElement, checkoutColumn.firstChild);

    var gstElement = document.createElement('span');
    gstElement.innerText = 'GST : ₹' + totalGST.toFixed(2);
    checkoutColumn.appendChild(gstElement);

    var tipElement = document.createElement('span');
    tipElement.innerText = 'Tip : ₹' + totalTip.toFixed(2);
    checkoutColumn.appendChild(tipElement);

    var totalElement = document.createElement('span');
    totalElement.innerText = 'Total : ₹' + totalCost.toFixed(2);
    checkoutColumn.appendChild(totalElement);
}

document.querySelector('button[value="order"]').addEventListener('click', function (event) {
    event.preventDefault();

    var totalItems = 0;
    var totalGST = 0;
    var totalTip = 0;
    var totalCost = 0;

    items.forEach(item => {
        var quantity = parseInt(document.getElementById(item).value) || 0;
        var cost = costs[item];

        if (quantity > 0) {
            var itemCost = quantity * cost;
            var gst = itemCost * (gstRate / 100);
            var tip = itemCost * (tipRate / 100);

            totalItems += quantity;
            totalGST += gst;
            totalTip += tip;
            totalCost += itemCost + gst + tip;
        }
    });

    if (totalCost === 0) {
        alert('Please order something');
        return;
    }

    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.fontFamily = 'Bebas Neue, sans-serif';

    
    var receipt = document.createElement('div');
    receipt.style.backgroundColor = 'white';
    receipt.style.padding = '20px';
    receipt.style.borderRadius = '10px';

    
    var checkoutColumn = document.getElementById('checkoutColumn');
    var receiptContent = document.createElement('p');
    receiptContent.innerHTML = checkoutColumn.innerHTML.replace(/<span>/g, '<br><span>');
    receipt.appendChild(receiptContent);

    
    var thankYouMessage = document.createElement('p');
    thankYouMessage.innerText = 'Thank you for your order!';
    receipt.appendChild(thankYouMessage);

    
    var okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.addEventListener('click', function () {
        document.body.removeChild(overlay);
    });
    receipt.appendChild(okButton);

    overlay.appendChild(receipt);

    document.body.appendChild(overlay);
});

