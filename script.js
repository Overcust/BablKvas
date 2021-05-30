window.onload=function(){
    var cart = {};
    var goods = {}
    function showTime(){
        var time = new Date().toLocaleTimeString()
        document.querySelector('.date').innerHTML = time;
    }  
    setInterval(showTime, 1000);
    $.getJSON("https://spreadsheets.google.com/feeds/list/1LZ5bAm74UyuPibiJ0qFbxMBzEMM0gf5zk4FLmYHDF4o/od6/public/values?alt=json",
    function(data){
        data=data['feed']['entry']
        console.log(data);
        goods = arrayHelper(data)
        console.log(goods)
        show(data)
    }
    )
    function show(data){
        var out = '';
        for(var i = 0; i < data.length; i++){
            out +=`<div class="card">`;
            out +=`<h3 class="title">${data[i]['gsx$name']['$t']}</h3>`;
            out +=`<img src="${data[i]['gsx$image']['$t']}" alt="">`;
            out +=`<p class="price">Цена: ${data[i]['gsx$price']['$t']} </p>`;
            out +=`<button id = "buy_product" name="add_to_cart" data="${data[i]['gsx$article']['$t']}">Купить</button>`;
            out +=`</div>`;
        }
        document.querySelector('.shop_field').innerHTML = out;
    }
    document.onclick = function(e){
        console.log(e.target.attributes.name.nodeValue,e.target.attributes.data.nodeValue);
        if(e.target.attributes.name.nodeValue == 'add_to_cart'){
            addToCart(e.target.attributes.data.nodeValue)
        }
        

    }
    function addToCart(elem){
        if(cart[elem] !== undefined){
            cart[elem]++;
        }
        else{
            cart[elem] = 1
        }
        console.log(cart)
        showCart();
    }
    function arrayHelper(arr){
        var out = {};
        for(var i = 0; i < arr.length; i++){
            var temp = {}
            temp['articul'] = arr[i]['gsx$article']['$t']
            temp['name'] = arr[i]['gsx$name']['$t']
            temp['count'] = arr[i]['gsx$count']['$t']
            temp['price'] = arr[i]['gsx$price']['$t']
            temp['image'] = arr[i]['gsx$image']['$t']
            out[arr[i]['gsx$article']['$t']] = temp;
      }   
      return out;
     }
    function showCart(){
        var ul = document.querySelector('.cart')
        ul.innerHTML = ''
        var sum = 0
        for(var key in cart){
            var li = '<li>'
            li += goods[key]['name'] + ' ';
            li += cart[key] + 'шт. ';
            li += goods[key]['price']*cart[key];
            sum += goods[key]['price']*cart[key]
            ul.innerHTML += li;
        }
        ul.innerHTML += 'Итог: ' + sum;
     } 
  }