const loadPhone = async (searchText = "samsung") => {
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
  /* Display only first 12 phones */
  phones = phones.slice(0, 12);
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
        <div class="card-actions justify-center">
            <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
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

const handelShowDetails = async (id) => {
  console.log("clicked show details", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show_details_phone_name");
  phoneName.innerText = phone.name;

  const showDetails_container = document.getElementById(
    "show_details_container"
  );
  showDetails_container.innerHTML = `
  <img class="flex justify-center mx-auto mt-5" src="${phone.image}"  alt="">
  <p class="text-base mt-2"><span><span class ="font-bold">Storage:</span> ${
    phone?.mainFeatures?.storage
  }</span></p>
  <p class="text-base mt-2"><span><span class ="font-bold">Display Size:</span> ${
    phone?.mainFeatures?.displaySize
  }</span></p>
  <p class="text-base mt-2 "><span><span class ="font-bold">Memory :</span> ${
    phone?.mainFeatures?.memory
  }</span></p>
  <p class="text-base mt-2 w-auto"><span><span class ="font-bold">Sensore :</span> ${
    phone?.mainFeatures?.sensors
  }</span></p>
  <p class="text-base mt-2 w-auto"><span><span class ="font-bold">GPS :</span> ${
    phone?.others?.GPS || "No GPS"
  }</span></p>
  <p class="text-base mt-2 w-auto"><span><span class ="font-bold">Release Date :</span> ${
    phone?.releaseDate
  }</span></p>
  `;
  /* show the modal */
  show_details_modal.showModal();
};
/*  */
/* Handel show all */
/* const handelShowAll = () => {
  handelSearch();
}; */
loadPhone();
