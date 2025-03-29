document.getElementById('packageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const packageId = document.getElementById('packageId').value;
    const action = document.getElementById('action').value;
    const date = document.getElementById('date').value;

    const logEntry = document.createElement('li');
    logEntry.textContent = `Paquete ID: ${packageId}, Acción: ${action}, Fecha: ${date}`;
    
    document.getElementById('log').appendChild(logEntry);

    // Limpiar el formulario
    this.reset();
});