function adicionarEquipamento() {
  const equipamentoForm = document.getElementById('equipamentoForm');
  const equipamentoData = new FormData(equipamentoForm);

  const equipamento = {};
  equipamentoData.forEach((value, key) => {
    equipamento[key] = value;
  });

  const equipamentosTable = document.getElementById('equipamentosTable').getElementsByTagName('tbody')[0];
  const newRow = equipamentosTable.insertRow();
  const keys = Object.keys(equipamento);

  for (let i = 0; i < keys.length; i++) {
    const cell = newRow.insertCell(i);
    cell.textContent = equipamento[keys[i]];
  }

  const qrCodeCell = newRow.insertCell(keys.length);
  const qrCode = generateQRCodeUrl(JSON.stringify(equipamento));
  qrCodeCell.innerHTML = `<img src="${qrCode}" alt="QR Code">`;

  const actionCell = newRow.insertCell(keys.length + 1);
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', function() {
    removerEquipamento(newRow);
  });
  actionCell.appendChild(removeButton);

  const printButtonCell = newRow.insertCell(keys.length + 2);
  const printButton = document.createElement('button');
  printButton.classList.add('print-button');
  printButton.textContent = 'Imprimir Etiqueta';
  printButton.addEventListener('click', function() {
    imprimirEtiqueta(equipamento);
  });
  printButtonCell.appendChild(printButton);
}

function generateQRCodeUrl(text) {
  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' + encodeURIComponent(text);
}

function removerEquipamento(row) {
  const equipamentosTable = document.getElementById('equipamentosTable').getElementsByTagName('tbody')[0];
  equipamentosTable.removeChild(row);
}

function imprimirEtiqueta(equipamento) {
  const etiquetaContent = `
    <h2>Informações do Equipamento</h2>
    <p><strong>Nome: </strong>${equipamento.nome}</p>
    <p><strong>Modelo: </strong>${equipamento.modelo}</p>
    <p><strong>Fabricante: </strong>${equipamento.fabricante}</p>

    <img src="${generateQRCodeUrl(JSON.stringify(equipamento))}" alt="QR Code" />
  `;

  const etiquetaWindow = window.open('', '_blank');
  etiquetaWindow.document.write(`
    <html>
      <head>
        <title>Etiqueta do Equipamento</title>
      </head>
      <body>
        ${etiquetaContent}
      </body>
    </html>
  `);

  etiquetaWindow.document.close();
  etiquetaWindow.print();
}
