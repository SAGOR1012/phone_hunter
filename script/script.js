const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones);
};
const displayPhones = (phones) => {
  //   console.log(phones.length);

  /* Display "show all " button if there are more then 12 phones */
  const showAllContainer = document.getElementById("showAll_container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  phones = phones.slice(0, 5);
  /* 1 Find id  */
  const phoneContainer = document.getElementById("phone_container");

  /* Clear previous result */
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);

    /* 2 Create  a div*/
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;

    /* 3 Set inner html */
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;

    /* 4 Append child  */
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

/* handel search */
const handelSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search_field");
  const searchText = searchField.value;
  loadPhone(searchText);
  // console.log(searchText);
};
/* spinner function */
const toggleLoadingSpinner = (isloading) => {
  const loadingSpinner = document.getElementById("loading_spinner");
  if (isloading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadPhone();
