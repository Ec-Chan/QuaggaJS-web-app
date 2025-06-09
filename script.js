let count = 0;

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#scanner-container'),
    constraints: {
      facingMode: "environment"
    }
  },
  decoder: {
    readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"]
  }
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  Quagga.start();
});

Quagga.onDetected(function(data) {
  const code = data.codeResult.code;
  const format = data.codeResult.format;

  // Prevent duplicate entries
  if (!document.querySelector(`td[data-code="${code}"]`)) {
    count++;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${count}</td>
      <td data-code="${code}">${code}</td>
      <td>${format}</td>
    `;
    document.querySelector('#barcode-table tbody').appendChild(row);
  }
});
