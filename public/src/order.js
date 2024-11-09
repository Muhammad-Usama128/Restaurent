window.addEventListener('load', async () => {
  document.getElementById('Address').innerHTML = localStorage.getItem('signin')
  if (localStorage.getItem('dish') !== null) {
    let x = localStorage.getItem('dish')
    try {
      const response = await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dish: x }),
      });

      const result = await response.json();
      dish = await result.dish;
      data = `
    <tr>
                    <td>
                        <div class="cart1">
                            <img src=${dish.img} alt=${dish.name}>
                            <div class="cart-detail">
                                <p class="cart-name">${dish.name}</p>
                                <p class="cart-price">${dish.desc}</p>
                            </div>
                        </div>
                    </td>
                    <td>X1</td>
                    <td>${dish.price}</td>
                </tr>
    `
      document.getElementsByTagName('tbody')[0].innerHTML = data
      setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        totals = dish.price
        document.getElementsByClassName('right1')[0].getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML = totals
      document.getElementsByClassName('right1')[0].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerHTML = totals + 200
      }, 1500);

    } catch (error) {
      document.getElementById('Error').style.right = '20px'
    }
  }
  else {
    x = JSON.parse(localStorage.getItem('cart'))
    totals = 0
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
      <tr>
                    <td>
                        <div class="cart1">
                            <img src=${dish.img} alt=${dish.name}>
                            <div class="cart-detail">
                                <p class="cart-name">${dish.name}</p>
                                <p class="cart-price">${dish.desc}</p>
                            </div>
                        </div>
                    </td>
                    <td>X${dishes.qty}</td>
                    <td>${dish.price}</td>
                </tr>
                `
        document.getElementsByTagName('tbody')[0].innerHTML += cart
        totals += (dishes.qty * dish.price)

      } catch (error) {
        document.getElementById('Error').style.right = '20px'
      }
    })
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none'
      document.getElementsByClassName('right1')[0].getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML = totals
      document.getElementsByClassName('right1')[0].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerHTML = totals + 200
    }, 1500);
  }
})


document.getElementsByClassName('add')[0].getElementsByClassName('fa-plus')[0].addEventListener('click', () => {
  document.getElementsByClassName('add')[0].getElementsByClassName('fa-plus')[0].style.display = 'none'
  document.getElementsByClassName('add')[0].getElementsByClassName('input')[0].style.display = 'block'
})
document.getElementsByClassName('input')[0].getElementsByTagName('button')[0].addEventListener('click', () => {
  input_value = document.getElementsByClassName('input')[0].getElementsByTagName('input')[0].value.trim();
  if (input_value == "" || input_value == null || input_value.length == 0) {
    document.getElementsByClassName('add')[0].getElementsByClassName('input')[0].getElementsByTagName('p')[0].innerHTML = 'Address is required.'
  }
  else if (input_value.length < 10) {
    document.getElementsByClassName('add')[0].getElementsByClassName('input')[0].getElementsByTagName('p')[0].innerHTML = 'Address is too short.'
  }
  else {
    document.getElementById('Address').innerHTML = input_value
    document.getElementsByClassName('add')[0].getElementsByClassName('input')[0].style.display = 'none'
  }
})


let isChecked = false;
function checkSelection() {
  const checkboxes = document.querySelectorAll('input[name="Payment"]');


  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
      if (checkbox.value === 'cash') {
        document.getElementsByClassName('left1')[0].getElementsByTagName('p')[2].style.display = 'block'
        document.getElementsByClassName('right1')[0].getElementsByTagName('p')[2].style.display = 'block'
        document.getElementsByClassName('right1')[0].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerHTML = totals + 200 + 50
      }
      else {
        if (document.getElementsByClassName('left1')[0].getElementsByTagName('p')[2].style.display == 'block') {
          document.getElementsByClassName('left1')[0].getElementsByTagName('p')[2].style.display = 'none'
          document.getElementsByClassName('right1')[0].getElementsByTagName('p')[2].style.display = 'none'
          document.getElementsByClassName('right1')[0].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerHTML = totals + 200 - 50
        }
      }
    }
  });
}

const checkboxes = document.querySelectorAll('input[name="Payment"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', checkSelection);
});

document.getElementsByClassName('btn1')[0].getElementsByTagName('button')[0].addEventListener('click', ()=>{
  if(isChecked == true){
    window.location.replace('/')
  }
  else{
      document.getElementById('Error').style.right = '20px'
      setTimeout(() => {
        document.getElementById('Error').style.right = '100%'
      }, 4000);
  }
})
if (localStorage.getItem('signin') === null) {
  window.location.replace('/')
}