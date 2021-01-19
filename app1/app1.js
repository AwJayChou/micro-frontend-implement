let count = 100;

document.getElementById('button').addEventListener('click', function() {
    this.textContent = count ++ ;
})