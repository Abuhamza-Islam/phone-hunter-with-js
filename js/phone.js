const loadPhone = async (searchText = 'iphone',isShowAll) => {
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

  // console.log('is show all: ',isShowAll);
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
                    
                    <div class="card-actions justify-center">
                    <button onclick ="handleShowDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
                    </div>
                </div>
       `;
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetails = async (id) =>{
  console.log('click show details',id);
  //load single phone data
  const res  = await  fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

}

//
const showPhoneDetails = (phone)=>{
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
     phoneName.classList = 'text-center text-3xl mb-3'
  phoneName.innerText = phone.name; 

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.classList = "flex flex-col gap-3  justify-center items-center text-left";


  showDetailContainer.innerHTML = `
  <img class="hover:h-96 w-sm" src="${phone.image}" alt=""/>

 <div class="hover:text-3xl">
    <p><span class="hover:font-bold hover:text-green-500">Storage:</span> ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'N/A'}</p>
    <p><span class="hover:font-bold hover:text-green-500">Display:</span> ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'N/A'}</p>
    <p><span class="hover:font-bold hover:text-green-500">Chipset:</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'N/A'}</p>
    <p><span class="hover:font-bold hover:text-green-500">Memory:</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'N/A'}</p>    
</div>

`;

  //show the modal
  show_details_modal.showModal();
}



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

loadPhone();
