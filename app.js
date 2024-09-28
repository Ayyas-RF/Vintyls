let listCarts = []
let products = [
  {
    id: 1,
    product_name: 'Google Pixel 6a',
    price: 5000000,
    description: 'Captures impressive photos and videos, thanks to Google computational photography expertise.',
    img_url: 'Products/gp6a.jpeg',
    qty: 1
    },
  {
    id: 2,
    product_name: 'Google Pixel 7',
    price: 7000000,
    description: 'Boasts a better main camera and a wider ultrawide lens.',
    img_url: 'Products/gp7.jpeg',
    qty: 70
    },
  {
    id: 3,
    product_name: 'Google Pixel 9',
    price: 10000000,
    description: 'Powered by the latest Google Tensor G3 chip, it delivers exceptional performance for demanding tasks.',
    img_url: 'Products/gp9.jpeg',
    qty: 100
    },
]

let cartInit = 0

const listProducts = document.getElementById('list-products')
const cartTotal = document.getElementById('cart-total')
const cartList = document.getElementById('list-cart-products')

const showListCart = () => {
  listProducts.classList.add("d-none")
  cartList.classList.remove("d-none")
}
const backToProduct = () => {
  listProducts.classList.remove("d-none")
  cartList.classList.add("d-none")
}

cartTotal.innerHTML = cartInit

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const productView = (p) => {
  return p.map(product => `<div class="col-lg-4 col-12">
        <div class="card" style="width: 18rem;">
            <img src="${product.img_url}" class="card-img-top" alt="product-1">
            <div class="card-body">
                <h5 class="card-title">${product.product_name}</h5>
                <p class="card-text"><span>${rupiah(product.price)}</span></p>
                <p class="card-text">Stock: <span>${product.qty}</span></p>
                <p class="card-text"> ${product.description}</p>
                <button type="button" class="btn btn-success" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-shopping text-light"></i>
                    Add To Cart
                </button>
            </div>
        </div>
    </div>`).join(",").replaceAll(",", " ")
}



listProducts.innerHTML = productView(products)


function addToCart(id) {

  let newStock = products
  let selectedProduct = newStock.find(produk => produk.id === id)

  if (selectedProduct.qty === 0) {
    Swal.fire("Stock is currently unavailable")
    return
  }

  let pushToCart = newStock.filter(produk => produk.id === id).map(newProduk => ({
    ...newProduk,
    qty: 1
  }))

  if (listCarts.length === 0) {
    listCarts = pushToCart
    console.log(`JIKA CARTNYA O: ${JSON.stringify(listCarts)}`)
  } else if (listCarts.length > 0) {
    let ada = listCarts.some(ada => ada.id === id)

    if (ada) {
      listCarts?.map(l => l.id === id ? ({
        ...l,
        qty: l.qty++
      }) : ({ ...l }))
    }

    if (!ada) {
      listCarts.push({ ...selectedProduct, qty: 1 })
    }
  }

  let newQty = newStock.map(p => {
    if (p.id === id) {
      return {
        ...p,
        qty: p.qty - 1
      }
    }
    return p
  })


  products = newQty
  cartInit++
  cartTotal.innerHTML = cartInit
  listProducts.innerHTML = productView(products)
}