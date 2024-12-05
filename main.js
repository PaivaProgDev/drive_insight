const inputField = document.querySelector('.input-field');
const list = document.querySelector('.card-list');
const loaderBg = document.querySelector('.loader-bg');
let lovedCar = '';

// LISTA DE CARROS
let listCars = [];

// FAZ A REQUISIÇÃO
const getCars = () => {
   fetch('./api/cars.json')
      .then(res => res.json())
      .then(data => {
         data.brands.forEach(car => {
            listCars.push(car);
            cardGenerate(car.id, car.name, car.brand, car.images, car.price, car.origin, car.logo, car.model);
         });
      });
};

const codeGenerator = () => {
   // GERA UM CÓDIGO DE 7 CARACTERES PARA OS CARDS
   return Math.random().toString(36).substring(2, 9);
};

const cardGenerate = (id, name, brand, img, price, origin, logo, model) => {
   // CRIA UM NOVO CARD
   const newCar = document.createElement('li');
   newCar.className = 'card';
   newCar.classList.add(codeGenerator());
   newCar.id = id;
   // CONTEÚDO DOS CARDS
   newCar.innerHTML = `
         <img class="car-image" src="${img[0].black}" id="image-${id}" alt="Imagem dos Carros">
         <div class="card-body">
            <div class="car-details">
               <div class="brand-name-car">
                  <h1 class="car-name">${name}</h1>
                  <span>|</span>
                  <h2>${brand}</h2>
                  <img class="logo-image" src="${logo}">
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                  <path
                     d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                     stroke-linecap="round" stroke-linejoin="round"
                     class="loved-icon ionicon-fill-none ionicon-stroke-width ${id}">
                  </path>
               </svg>
            </div>
            <div>
               <span class="model">Modelo ${model}</span>
               <span>|</span>
               <span class="origin">Origem ${origin}</span>
            </div>
            <span class="price" id="price-${id}">R$ ${price.version}</span>
            <p class="info-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, autem?</p>
            <hr class="separator-line">
            <h3 class="color-title">Cores</h3>
            <ul class="color-list">
               <li class="color black-color" onclick="getCarsIndex(${id}, 'black')"></li>
               <li class="color gray-color" onclick="getCarsIndex(${id}, 'gray')"></li>
               <li class="color white-color" onclick="getCarsIndex(${id}, 'white')"></li>
            </ul>
         </div>
   `;
   // ANEXA OS CARDS NO DOCUMENTO
   list.appendChild(newCar);
};

const getCarsIndex = (carId, color) => {
   // ECONTRA O CARRO NO ARRAY
   const selectedCar = listCars.find(car => car.id === carId);

   // ENCONTRA A IMG NO ARRAY
   const selectedImage = selectedCar.images.find(img => img[color]);

   // ATUALIZA A IMAGEM DO CARD
   const image = document.getElementById(`image-${carId}`);
   image.src = selectedImage[color];
};

const searchCar = () => {
   // ARRAY PARA ARMAZENAR OS CARROS FILTRADOS
   const filteredData = [];
   const entry = inputField.value.toLowerCase();
   list.innerHTML = '';

   // LISTA TODOS OS CARROS
   listCars.forEach(car => {
      const carName = car.name.toLowerCase();
      const carBrand = car.brand.toLowerCase();

      // GERA OS CARDS DE ACORDO COM A PESQUISA
      if (carName.includes(entry) || carBrand.includes(entry)) {
         filteredData.push(car);
         cardGenerate(car.id, car.name, car.brand, car.images, car.prices, car.origin, car.logo);
      }
   });

   // VERIFICA SE TEM ALGUM ITEM RELACIONADO COM A PESQUISA
   if (filteredData.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'Nenhum carro encontrado...';
      list.appendChild(message);
   }
};

inputField.addEventListener('input', searchCar);

document.addEventListener('click', (e) => {
   // VERIFICA SE O ELEMENTO QUE TEVE O CLICK TEM A CLASSE LOVED-ICON
   if (e.target.classList.contains('loved-icon')) {
      // MARCA O CARRO COM "AMEI"
      e.target.classList.toggle('liked');
   }
});

document.addEventListener('DOMContentLoaded', getCars);