const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(`
     https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //clear phoneContainer before adding new cards
  phoneContainer.textContent = '';

  //display show all button if there are 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
         showAllContainer.classList.remove('hidden');
  }
  else{
    showAllContainer.classList.add('hidden');
  }

  console.log('is show all: ',isShowAll);
  //show the limited search result or display only first 12 phones if not show all
// console.log(phones.length);
  if(!isShowAll){
    phones = phones.slice(0,12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card w-96 bg-gray-100 shadow-xl m-5 p-5";

    phoneCard.innerHTML = `              
                <figure>
                    <img
                    src="${phone.image}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
       `;
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);
};

//get the search value and send it to the loadPhone()
const getSearchValue =(isShowAll)=>{
  toggleLoadingSpinner(true);
    const  searchBox= document.getElementById('input-field');
    const searchValue = searchBox.value;
    // console.log(searchValue);    
    loadPhone(searchValue,isShowAll);
    // searchBox.value = '';

}
// //another input-field-2 for recaping 
// const getInputValue = () =>{
//   toggleLoadingSpinner(true);
//     const inputField = document.getElementById('input-field-2');
//     const inputFieldValue = inputField.value;
//     // console.log(inputFieldValue);
//     loadPhone(inputFieldValue);
//     inputField.value = '';
// }
const toggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner = document.getElementById('loading-spinner');
  // LoadingSpinner.classList.remove('hidden');

if(isLoading){
  LoadingSpinner.classList.remove('hidden');
}
else{
  LoadingSpinner.classList.add('hidden');
}
}


//handle show all button
const handleShowAll = () =>{
  getSearchValue(true);
}

// loadPhone();
