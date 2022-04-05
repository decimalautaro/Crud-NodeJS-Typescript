function counter() {
    let countdown = 3;
  
    let timerDiv = document.getElementById("timer");
  
    let timer = setInterval(function () {
      timerDiv.innerHTML = `Volviendo a listar categorias en  ${countdown}`;
      countdown--;
      if (countdown === 0) {
        clearInterval(timer);
        window.location.href = "./category"
      }
    }, 1000);
  }