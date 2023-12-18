const loadData =async(searchText,isShowAll)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones =data.data
    displayPhones(phones,isShowAll)
    }
    
const displayPhones = (phones,isShowAll)=>{
   // console.log(phones);
   const phoneContainer = document.getElementById('phone-container')
   phoneContainer.textContent= ''
   
   const showAll = document.getElementById('show-all')
   if(phones.length >=7 && !isShowAll){
        showAll.classList.remove('hidden')
   }
   else{
    showAll.classList.add('hidden')
   }
   if(!isShowAll){
    phones = phones.slice(0,6)
   }

    phones.forEach(phones => {
        console.log(phones);
    const phoneCard = document.createElement('div')
    phoneCard.classList= `card w-80  bg-gray-200 shadow-xl mx-auto`
    phoneCard.innerHTML =` 
    <figure><img src="${phones.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phones.phone_name}</h2>
      <p>Brand: ${phones.brand}</p>
      <div class="card-actions justify-center">
        <button id="showDetail" onclick="handleShowDetail('${phones.slug}')" class="btn btn-primary">Details</button>
      </div>
    </div>`
    phoneContainer.appendChild(phoneCard)

    
    });
    toggleSpinner(false)
}

const handleShowDetail = async(id)=>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone= data.data
    showPhoneDetail(phone)
    //console.log(id);
}

const showPhoneDetail = (phone)=>{
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML=`
    <div class="mx-auto p-4">
    <div class="p-8">
        <img src="${phone.image}">
    </div>
    <h2 class="text-xl p-1"><span class="font-bold">Brand: </span> ${phone.brand}</h2>
    <h2 class="text-2xl"><span class="font-bold">Model Name: </span> ${phone.name}</h2>
    <p class="text-xl">Feature: ${phone.mainFeatures.storage}</p>
    <p class="text-xl"><span class="font-bold">Display: </span> ${phone.mainFeatures.displaySize}</p>
    <p class="text-xl"><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p class="text-xl"><span class="font-bold">Memomry: </span>${phone.mainFeatures.memory}</p>
    <p class="text-xl"><span class="font-bold">Bluetooth: </span>${phone.others.Bluetooth}</p>
    <p class="text-xl"><span class="font-bold">GPS: </span>${phone.others.GPS}</p>
    <p class="text-xl"><span class="font-bold">Radio: </span>${phone.others.Radio}</p>
    <p class="text-xl"><span class="font-bold">USB: </span>${phone.others.USB}</p>
    <p class="text-xl"><span class="font-bold">WLAN: </span>${phone.others.WLAN}</p>
    <p class="text-lg"><span class="font-bold">Release Date: </span>${phone.releaseDate}</p>
    </div>
    
    `
    show_detail_modal.showModal()
   
    
}


const handleSearch= (isShowAll)=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    console.log(searchText);
    toggleSpinner(true)
    loadData(searchText,isShowAll)

}

//loading spinner
const toggleSpinner = (isloading)=>{
    const loadingSpinner = document.getElementById('spinner')
    if(isloading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
    
    
}

//showAll
const handleShowAll= ()=>{
    handleSearch(true)
}