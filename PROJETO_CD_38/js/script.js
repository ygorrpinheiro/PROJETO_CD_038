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

    const actionCell = newRow.insertCell(keys.length);
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
      removerEquipamento(newRow);
    });
    actionCell.appendChild(removeButton);
  }

  function removerEquipamento(row) {
    const equipamentosTable = document.getElementById('equipamentosTable').getElementsByTagName('tbody')[0];
    equipamentosTable.removeChild(row);
  }
