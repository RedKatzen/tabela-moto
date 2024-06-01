document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormBtn');
    const dataForm = document.getElementById('dataForm');
    const spreadsheetBody = document.getElementById('spreadsheetBody');
    const averageSpan = document.getElementById('average');
  
    let previousKmTotal = 0;

    openFormBtn.addEventListener('click', function() {
      dataForm.classList.toggle('hidden');
    });

    function calculateAverage() {
        const mediaCells = spreadsheetBody.querySelectorAll('td:nth-child(6)'); // Select all cells in the 6th column (Media)
        let total = 0;
        let count = 0;
    
        mediaCells.forEach(cell => {
          const mediaValue = parseFloat(cell.textContent);
          if (!isNaN(mediaValue)) {
            total += mediaValue;
            count++;
          }
        });
    
        if (count > 0) {
          const average = total / count;
          averageSpan.textContent = `Rendimento: ${average.toFixed(2)}`;
        } else {
          averageSpan.textContent = "Sem dados";
        }
    }
  
    function addRowToSpreadsheet(date, time, andado, ltsAbast, kmTotal, media) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${date}</td>
        <td>${time}</td>
        <td>${andado}</td>
        <td>${ltsAbast}</td>
        <td>${kmTotal}</td>
        <td>${media}</td>
      `;
      spreadsheetBody.appendChild(row);
      calculateAverage()
    }

    dataForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      let today = new Date();

      const dateInput = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const timeInput = today.getHours() + ':' + today.getMinutes();
      const ltsInput = parseFloat(document.getElementById('ltsInput').value);
      const kmInput = parseFloat(document.getElementById('kmInput').value);
  
      if (isNaN(ltsInput) || isNaN(kmInput)) {
        alert("Preenche os campos com valores válidos.");
        return;
      }
  
      const andado = kmInput - previousKmTotal;
      previousKmTotal = kmInput;
  
      const media = andado / ltsInput;
  
      addRowToSpreadsheet(dateInput, timeInput, andado.toFixed(2), ltsInput.toFixed(2), kmInput.toFixed(2), media.toFixed(2));

      dataForm.reset();
      dataForm.classList.add('hidden');
    });
}); 


document.querySelector('form').addEventListener('submit', function(e){
  e.preventDefault();

  let formData = new FormData(e.target);

  fetch('submit-form',{
    method: 'POST',
    body: formData
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
});