const loadData = async (isShowALL,isShowPre) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  const aiData = data.data.tools;
  showDisplayData(aiData,isShowALL,isShowPre);
};

const showDisplayData = (dataSlice,isShowALL) => {
  const features_added = document.getElementById("ai-container");
  const seeMoreBtn = document.getElementById("seeMore_btn")

let isSlice =''
  if (!isShowALL) {
    isSlice = dataSlice.slice(0,6)
       
  }else{
    isSlice =  dataSlice.slice(6)
    seeMoreBtn.classList.add("hidden")
  }


   isSlice.forEach((element) => {
    const createCard = document.createElement("div");
    createCard.classList = `card bg-base-100 shadow-2xl p-5`;
    createCard.innerHTML = `
    <div onclick="handleShowDetails('${element.id}'); show_modal_details.showModal()">
            <figure>
              <img class='w-full h-[230px] p-1 rounded-2xl'  src=${element?.image} 
              alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="text-left">
                <div class='my-4'>
                <h3 class="text-3xl font-semibold mb-3">Features</h3>
                    ${element.features
                      .map(
                        (element) =>
                          `<li class='list-decimal text-gray-500 font-medium'>${element}</li>`
                      )
                      .join("")}    
                </div>
                <hr>
              <div class="flex justify-between items-center my-3">
                    <div>
                        <h3 class="text-2xl font-semibold mb-2">${
                          element.name
                        }</h3>
                        <div class="flex gap-2">
                            <img src="./images/Frame (1).png" alt="" srcset="">
                            <p>${element.published_in}</p>
                        </div>
                    </div>
                    <div>
                        <img class="bg-[#FEF7F7] p-2 rounded-full" src="./images/Frame (2).png" alt="" srcset="">
                    </div>
              </div>
            </div>
                      </div>
          `;
    features_added.appendChild(createCard);
  });

};

const seeMoreHandler = () =>{
     loadData(true)
}

const handleShowDetails = async(id) =>{
    const aiDetailsUrl = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(aiDetailsUrl)
    const aiJsonData = await res.json()
    const aiDetails = aiJsonData.data
    showModalDetails(aiDetails)
}

const showModalDetails = (aiDetails) =>{
     const pricing = aiDetails?.pricing
     const features = aiDetails?.features
     const integrations = aiDetails?.integrations 
     const input_output_examples = aiDetails?.input_output_examples

     console.log(typeof features);
     const modalContainer =  document.getElementById('modal-container')
           modalContainer.innerHTML = `
     <div class="flex-1 border border-[#EB5757] p-5 bg-red-50 rounded-lg h-full">
         <h3 class='text-2xl font-bold'>${aiDetails.description}</h3>
         <div class="grid grid-cols-3 my-5 gap-3"> 
            ${pricing?.map(price => 
                `
                <div class='bg-white rounded-lg text-center p-2'>
                  <p class='text-lg text-green-500'>${price.price ? price.price : "Price not added"}<p/>
                  <p class='text-lg text-orange-500'>${price.plan ? price.plan :"plan not added"}<p/>
               </div>
               `).join("")} 
            
             <!-- <div class="bg-white p-3 rounded-lg text-green-500">10/  month Basic</div>
             <div class="bg-white p-3 rounded-lg text-orange-500">10/ month Basic</div>
             <div class="bg-white p-3 rounded-lg text-red-500">10/ month Basic</div> -->
         </div>
         <div class="flex justify-between">
            <div>
               <h3 class='text-2xl font-bold mb-2'>Features</h3>
                <div class='text-gray-500'>
                  <li>${features[1].feature_name}</li>
                  <li>${features[2].feature_name}</li>
                  <li>${features[3].feature_name}</li>
            </div>
            </div>
            <div>
               <h3 class='text-2xl font-bold mb-2'>Integration</h3>
                 
                 ${integrations
                      .map(
                        (integration) =>
                          `<li class=' text-gray-500'>${integration}</li>`
                      )
                      .join("")}
                 
            </div>
         </div>
      </div>

      <div class="flex-1">
          <div class="border border-[#E7E7E7] p-5 text-center rounded-lg h-full">
            <img src=${aiDetails.image_link[0]} alt="" srcset="">

            ${input_output_examples
                      .map(
                        (inOutExm) =>
                          `
                             <div>
                                
                             <h3 class=' text-lg font-bold'>${inOutExm.input}</h3>
                             <h3 class='text-gray-500'>${inOutExm.output.slice(0,100)}</h3>

                             </div>  
                          `
                      )
                      .join("")}
          </div>
      </div>
           
           `

}


loadData();
