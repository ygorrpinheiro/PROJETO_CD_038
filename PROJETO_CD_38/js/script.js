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
  const qrCodeUrl = generateQRCodeUrl(JSON.stringify(equipamento));

  const zplContent = `
    ^XA
    ^POI
    ^LL400
    ^PW700
    ^LS0
    ^CF0,30^FO30,50^FDInformacoes do Equipamento^FS
    ^CF0,20^FO30,100^FDAppliance:^FS
    ^CF0,20^FO180,100^FD${equipamento.equipamento}^FS
    ^CF0,20^FO30,150^FDMarca:^FS
    ^CF0,20^FO180,150^FD${equipamento.marca}^FS
    ^CF0,20^FO30,200^FDModelo:^FS
    ^CF0,20^FO180,200^FD${equipamento.modelo}^FS
    ^CF0,20^FO30,250^FDTipo:^FS
    ^CF0,20^FO180,250^FD${equipamento.tipo}^FS
    ^CF0,20^FO30,300^FDPatrimônio:^FS
    ^CF0,20^FO180,300^FD${equipamento.patrimonio}^FS
    ^CF0,20^FO30,350^FDSérie:^FS
    ^CF0,20^FO180,350^FD${equipamento.serie}^FS
    ^CF0,20^FO30,400^FDObservação:^FS
    ^CF0,20^FO180,400^FD${equipamento.observacao}^FS
    ^FO300,60^BQ,2,5
    ^FDQA,${qrCodeUrl}^FS
    ^XZ
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Etiqueta do Equipamento</title>
      </head>
      <body>
        <pre>${zplContent}</pre>
        <script>
          // Print the ZPL content
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
}



  function consultaEquipamento() {
    const patrimonioConsulta = document.getElementById('patrimonioConsulta').value;
    const serieConsulta = document.getElementById('serieConsulta').value;
      // Obtém o número de patrimônio para consulta

    // Lógica para buscar o equipamento com o número de patrimônio fornecido
    // Por exemplo, você pode percorrer a lista de equipamentos e encontrar o correspondente pelo número de patrimônio.
    // Vou simular uma resposta para esse exemplo.
    const equipamentoEncontrado = {
        equipamento: 'Equipamento de Exemplo',
        marca: 'Marca Exemplo',
        modelo: 'Modelo Exemplo',
        tipo: 'Tipo Exemplo',
        patrimonio: patrimonioConsulta,
        serie: serieConsulta,
        observacao: 'Observação Exemplo'
    };
    

    // Exibindo o equipamento encontrado na tabela
    const tbody = document.querySelector('#equipamentosTable tbody');
    tbody.innerHTML = '';  // Limpa o conteúdo anterior da tabela

    const newRow = tbody.insertRow();
    newRow.innerHTML = `
        <td>${equipamentoEncontrado.equipamento}</td>
        <td>${equipamentoEncontrado.marca}</td>
        <td>${equipamentoEncontrado.modelo}</td>
        <td>${equipamentoEncontrado.tipo}</td>
        <td>${equipamentoEncontrado.patrimonio}</td>
        <td>${equipamentoEncontrado.serie}</td>
        <td>${equipamentoEncontrado.observacao}</td>
    `;

}
