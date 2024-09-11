document.addEventListener('DOMContentLoaded', function () {
    const quantityDisplay = document.getElementById('quantity');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');
    const toggleButton = document.getElementById('toggleButton');
    const calculatorContainer = document.getElementById('calculatorContainer');

    const inputs = ['capital', 'sp', 'sl', 'risk'];
    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', calculateQuantity);
    });

    // Retrieve saved input values from local storage
    document.getElementById('capital').value = localStorage.getItem('capital') !== null ? localStorage.getItem('capital') : '';
    document.getElementById('sp').value = localStorage.getItem('sp') !== null ? localStorage.getItem('sp') : '';
    document.getElementById('sl').value = localStorage.getItem('sl') !== null ? localStorage.getItem('sl') : '';
    document.getElementById('risk').value = localStorage.getItem('risk') !== null ? localStorage.getItem('risk') : '';
    quantityDisplay.textContent = localStorage.getItem('quantity') || '';

    // Function to calculate the quantity when inputs change
    function calculateQuantity() {
        const capital = parseFloat(document.getElementById('capital').value);
        const sp = parseFloat(document.getElementById('sp').value);
        const sl = parseFloat(document.getElementById('sl').value);
        const risk = parseFloat(document.getElementById('risk').value);
    
        // Check if all values are valid before calculating
        if (capital && sp && sl && risk) {
            let quantity;
    
            if (sp < sl) { // Bear (short) trade
                quantity = Math.floor(risk / (sl - sp));
            } else { // Bull (long) trade
                quantity = Math.floor(risk / (sp - sl));
            }
    
            quantityDisplay.textContent = quantity + " | Required Capital: " + (quantity * sp)/5; // ASsuming 5x is margin
    
            // Save inputs and result to local storage
            localStorage.setItem('capital', capital);
            localStorage.setItem('sp', sp);
            localStorage.setItem('sl', sl);
            localStorage.setItem('risk', risk);
            localStorage.setItem('quantity', quantity);
        }
    }
    
    // Copy the quantity to clipboard and show "Copied" message
    copyBtn.addEventListener('click', function () {
        const quantity = quantityDisplay.textContent;
        
        if (quantity) {
            navigator.clipboard.writeText(quantity).then(() => {
                copyMessage.style.display = 'inline';
                setTimeout(() => {
                    copyMessage.style.display = 'none';
                }, 1000);  // Hide after 1000ms
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        }
    });

   
});
