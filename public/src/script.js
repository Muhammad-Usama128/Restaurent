
window.addEventListener('load', async (e) => {
  const pathname = window.location.pathname
  let trendfood;
  let food_cards = "";
  if (pathname == '/') {
    try {
      const response = await fetch('/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishname: 'home' }),
      });

      const result = await response.json();
      trendfood = await result.trendfood;
      trandingcards(trendfood)
      cartname()
      cartupdate()
      setTimeout(() => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementById('loading').style.display = 'none'
      }, 1600);
    } catch (error) {
      document.getElementById('loading').getElementsByClassName('fa-spinner')[0].style.display = 'none'
      document.getElementById('Error').style.right = '20px'
    }
  }
  else if (pathname == '/pakfood') {
    try {
      const response = await fetch('/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishname: 'pakfood' }),
      });

      const result = await response.json();
      trendfood = await result.trendfood;
      food_cards = await result.foodcards;
      // trandingcards(trendfood)
      cards(food_cards)
      cartname()
      cartupdate()
      setTimeout(() => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementById('loading').style.display = 'none'
      }, 1600);
    } catch (error) {
      document.getElementById('loading').getElementsByClassName('fa-spinner')[0].style.display = 'none'
      document.getElementById('Error').style.right = '20px'

    }
  }
  else if (pathname == '/chinesefood') {
    try {
      const response = await fetch('/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishname: 'chinesefood' }),
      });

      const result = await response.json();
      trendfood = await result.trendfood;
      food_cards = await result.foodcards;
      // trandingcards(trendfood)
      cards(food_cards)
      cartname()
      cartupdate()
      setTimeout(() => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementById('loading').style.display = 'none'
      }, 1600);
    } catch (error) {
      document.getElementById('loading').getElementsByClassName('fa-spinner')[0].style.display = 'none'
      document.getElementById('Error').style.right = '20px'

    }
  }
  else if (pathname == '/fastfood') {
    try {
      const response = await fetch('/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishname: 'fastfood' }),
      });

      const result = await response.json();
      trendfood = await result.trendfood;
      food_cards = await result.foodcards;
      // trandingcards(trendfood)
      cards(food_cards)
      cartname()
      cartupdate()
      setTimeout(() => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
        document.getElementById('loading').style.display = 'none'
      }, 1600);
    } catch (error) {
      document.getElementById('loading').getElementsByClassName('fa-spinner')[0].style.display = 'none'
      document.getElementById('Error').style.right = '20px'

    }
  }

  function trandingcards(trendfood) {
    let tranding_cards = document.getElementById('tranding-cards')
    tranding_cards.innerHTML = ''
    let cards = ''
    trendfood.forEach(element => {
      let rate = element.rating
      let rated = ''
      if (rate >= 4.5) {
        rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      `
      }
      else if (rate >= 3.5) {
        rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
      }
      else if (rate >= 2.5) {
        rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
      }
      else if (rate >= 1.5) {
        rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
      }
      else if (rate >= 0.5) {
        rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
      }
      else {
        rated = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
      }
      cards += `
        <div class="swiper-slide tranding-slide">
        <div class="card">
        <img src=${element.img} alt=${element.name}>
        <div class="card-detail">
        <div class="details">
        <p class="p-left">${element.name}</p>
        <p class="p-right">Rs.${element.price}.00</p>
        </div>
        <div class="rating">
        <span style="font-size:large; font-weight: bolder;">${element.rating}</span>
        ${rated}
        </div>
        <div class="btn">
        <i class="fa-solid fa-cart-shopping"></i>
        <a class="orderbtn">Order Now</a>
        </div>
        </div>
        </div>
        </div>
        `
      tranding_cards.innerHTML += cards
    });
  }
})
function cards(foodcards) {
  let tranding_cards = document.getElementById('food-cards')
  tranding_cards.innerHTML = ''
  let cards = ''
  foodcards.forEach(element => {
    let rate = element.rating
    let rated = ''
    if (rate >= 4.5) {
      rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      `
    }
    else if (rate >= 3.5) {
      rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    }
    else if (rate >= 2.5) {
      rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    }
    else if (rate >= 1.5) {
      rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    }
    else if (rate >= 0.5) {
      rated = `
      <i style="color: orange;" class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    }
    else {
      rated = `
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      `
    }
    cards += `
        <div class="card">
        <img src=${element.img} alt=${element.name}>
        <div class="card-detail">
        <div class="details">
        <p class="p-left">${element.name}</p>
        <p class="p-right">Rs.${element.price}.00</p>
        </div>
        <div class="rating">
        <span style="font-size:large; font-weight: bolder;">${element.rating}</span>
        ${rated}
        </div>
        <div class="btn">
        <i class="fa-solid fa-cart-shopping"></i>
        <a class="orderbtn">Order Now</a>
        </div>
        </div>
        </div>
        `
  });
  tranding_cards.innerHTML = cards
}
if (!localStorage.getItem('cart')) {
  empty = []
  localStorage.setItem('cart', JSON.stringify(empty))
}


function cartname() {
  const card = document.getElementsByClassName('btn')
  for (let i = 0; i < card.length; i++) {
    card[i].getElementsByClassName('fa-cart-shopping')[0].addEventListener('click', () => {
      if (localStorage.getItem('signin') !== null) {
        heading = card[i].parentElement.parentElement.getElementsByClassName('p-left')[0].innerHTML
        x = JSON.parse(localStorage.getItem('cart') || '[]')
        if (!x.some(s => s.name === heading)) {
          head = { name: heading, qty: 1 }
          x.unshift(head)
          localStorage.setItem('cart', JSON.stringify(x))
          cartupdate();
        }
      }
      else {
        window.location.assign('/signin')
      }
    })
    card[i].getElementsByClassName('orderbtn')[0].addEventListener('click', (e) => {
      if (localStorage.getItem('signin') === null) {
        window.location.assign('/signin')
      }
      else {
        heading = card[i].parentElement.parentElement.getElementsByClassName('p-left')[0].innerHTML
        localStorage.setItem('dish', heading)
        window.location.assign('/order')
      }
    })
  }

}
function cartupdate() {
  x = JSON.parse(localStorage.getItem('cart'))
  document.getElementsByClassName('carts')[0].innerHTML = ''
  if (x.length !== 0) {
    document.getElementsByClassName('carts-text')[0].style.display = 'none'
    x.forEach(async (dishes) => {
      try {
        const response = await fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dish: dishes.name }),
        });

        const result = await response.json();
        dish = await result.dish;
        cart = `
      <div class="cart1">
                <i class="fa-solid cross fa-circle-xmark"></i>
                <img src=${dish.img} alt=${dish.name}>
                <div class="cart-detail">
                <p class="cart-name">${dish.name}</p>
                <p class="cart-price">Rs.<span>${dish.price}</span>.00</p>
                </div>
                <div class="cart-quantity"> 
                <i class="fa-solid fa-circle-minus"></i>
                <p class="quantity">${dishes.qty}</p>
                <i class="fa-solid fa-circle-plus"></i>
                </div>
                </div>
                `
        document.getElementsByClassName('carts')[0].innerHTML += cart

      } catch (error) {
        document.getElementById('Error').style.right = '20px'
      }
      total()
      minusplus()
    })
  }
  else {
    document.getElementsByClassName('carts-text')[0].style.display = 'block'
    document.getElementsByClassName('total-order')[0].getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML = '00'
  }
}
function minusplus() {

  const fa_minus = document.getElementsByClassName('fa-circle-minus')
  const fa_plus = document.getElementsByClassName('fa-circle-plus')
  const cross = document.getElementsByClassName('fa-circle-xmark')

  for (let i = 0; i < fa_minus.length; i++) {
    fa_minus[i].addEventListener('click', () => {
      let quantity = fa_minus[i].parentElement.getElementsByClassName('quantity')[0]
      let disname = fa_minus[i].parentElement.parentElement.getElementsByClassName('cart-detail')[0].getElementsByClassName('cart-name')[0].innerHTML
      let dishes = JSON.parse(localStorage.getItem('cart'))
      quant = quantity.innerHTML
      quant = parseInt(quant)
      if (quant > 1) {
        quant = quant - 1
        dishes.forEach((e) => {
          if (e.name == disname) {
            e.qty = quant
            localStorage.setItem('cart', JSON.stringify(dishes))
          }
        })
        quantity.innerHTML = quant
        total()
      }
      else {
        cross[i].click();
      }
    })

    fa_plus[i].addEventListener('click', () => {
      let quantity = fa_plus[i].parentElement.getElementsByClassName('quantity')[0]
      let disname = fa_plus[i].parentElement.parentElement.getElementsByClassName('cart-detail')[0].getElementsByClassName('cart-name')[0].innerHTML
      let dishes = JSON.parse(localStorage.getItem('cart'))
      quant = quantity.innerHTML
      quant = parseInt(quant)
      quant = quant + 1
      dishes.forEach((e) => {
        if (e.name == disname) {
          e.qty = quant
          localStorage.setItem('cart', JSON.stringify(dishes))
        }
      })
      quantity.innerHTML = quant
      total()
    })
    cross[i].addEventListener('click', () => {
      let name = cross[i].parentElement.getElementsByClassName('cart-detail')[0].getElementsByClassName('cart-name')[0].innerHTML
      x = JSON.parse(localStorage.getItem('cart'))
      x = x.filter(s => s.name !== name);
      localStorage.setItem('cart', JSON.stringify(x))
      cartupdate()
    })
  }
}

function total() {
  let cards = document.getElementsByClassName('cart1')
  let totalpay = 0
  for (let i = 0; i < cards.length; i++) {
    let price = cards[i].getElementsByTagName('span')[0].innerHTML
    let quan = cards[i].getElementsByClassName('quantity')[0].innerHTML
    let pritotal = 0
    price = parseInt(price)
    quan = parseInt(quan)
    if (quan >= 0) {
      pritotal = price * quan
      totalpay += pritotal
    }
  }
  document.querySelector('.total-order p span').innerHTML = totalpay
}

function order() {
  let cart = JSON.parse(localStorage.getItem('cart'))
  if (cart.length > 0) {
    if (localStorage.getItem('dish') !== null) {
      localStorage.removeItem('dish')
    }
    window.location.assign('/order')
  }
}

if (localStorage.getItem('signin') !== null) {
  document.querySelector('.btnOrder a').style.display = 'none'
  document.querySelector('.btnOrder .sig-in').style.display = 'flex'
}
function logout() {
  localStorage.removeItem('signin')
  window.location.replace('/')
}