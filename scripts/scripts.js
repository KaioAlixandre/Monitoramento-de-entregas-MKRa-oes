const carrinho = document.getElementById("cart-button");




function openModal() {
    document.getElementById("product-modal").classList.remove("hidden");
    document.getElementById("product-modal").classList.add("flex");
  }

  function closeModal() {
    document.getElementById("product-modal").classList.add("hidden");
    document.getElementById("product-modal").classList.remove("flex");
  }

  // Captura do formulário (exemplo)
  document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Pedido enviado com sucesso!");
    closeModal();
  });