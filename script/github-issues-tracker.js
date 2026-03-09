
// all issues
const allIssuesCount = document.getElementById("all-issues-count");
// all btn
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// all api card 
const allApiCard = document.getElementById("all-api-card");
// loading spinner
const loadingSpinner = document.getElementById("loading-spinner");
// modalDeals
const modalCard =document.getElementById("modal-card");



// all Issues

// labels
const createLabels = (arr) =>{

    const labels = arr.map ((el) =>`<span class="btn bg-[#FFF8DB] rounded-3xl text-[#D97706]">${el.toUpperCase()}</span>`);
    return (labels.join(" "));
}


document.getElementById("search-btn").addEventListener("click", () => {
    const inputSearch = document.getElementById("input-search");
    const searchIssues = inputSearch.value.trim().toLowerCase();
    console.log(searchIssues);
    async function searchAllIssues (){

        const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}");
        const search = await res.json();
        console.log(search);
    }
        
})


// btn 
const allActiveBtn = (activeBtn) => {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    activeBtn.classList.add("btn-primary")
};


// btn function
// open btn
async function showOpenCard(){
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const openIssues =  data.data.filter(card => card.status ==="open");
    console.log(openIssues);
    displayApi(openIssues)
    allActiveBtn(openBtn);
}

// Closed btn
async function showClosedCard(){
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const closedIssues =  data.data.filter(card => card.status ==="closed");
    console.log(closedIssues);
    displayApi(closedIssues)
    allActiveBtn(closedBtn);
}

allBtn.addEventListener ("click", () =>{
    loadAllCard()
    allActiveBtn(allBtn);
});
openBtn.addEventListener ("click", () =>{
    showOpenCard()
});
closedBtn.addEventListener ("click", () =>{
    showClosedCard()
});


// Dynamic upload all api card

async function loadAllCard (){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const apiData = await res.json();
    loadingSpinner.classList.add("hidden");
    displayApi(apiData.data);
}
const displayApi = (cardApi) =>{
    console.log(cardApi);
    allApiCard.innerHTML =" ";
    cardApi.forEach((card) => {
        const apiCard = document.createElement("div");
        // apiCard.className ="bg-white p-5 shadow-2xl rounded-lg border-t-4 border-t-[#00A96E] space-y-3";
        apiCard.className ="bg-white p-5 shadow-2xl rounded-lg border-t-4 border-t-[#00A96E]";
        





// assignee: "jane_smith"
// author: "john_doe" ^__
// createdAt: "2024-01-15T10:30:00Z" ^__
// description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior." ^__
// id: 1
// labels: (2) ['bug', 'help wanted'] ^__
// priority: "high" ^__
// status: "open"
// title: "Fix navigation menu on mobile devices ^__
// updatedAt: "2024-01-15T10:30:00Z"



        apiCard.innerHTML =`
            <div onclick="loadModal(${card.id})" class="space-y-3">
                <div class="flex justify-between">
                    <div class="w-8 h-8 rounded-full bg-[#CBFADB] flex justify-center items-center">
                        <i class="fa-solid fa-spinner text-[#00A96E]"></i>
                    </div>
                    <div class="btn bg-[#FEECEC] px-8 rounded-3xl">
                        <button class="text-[#EF4444]">${card.priority.toUpperCase()}</button>
                    </div>
                </div>

                <h3 class="text-xl font-semibold">${card.title}</h3>
                <p class="line-clamp-2 text-slate-500">${card.description}</p>
                <div class="flex gap-2">
                    <div class="">${createLabels(card.labels)}</div>
                </div>
                <hr class="border border-slate-300">
                <div>
                    <p class="text-slate-500"> #${card.id} by ${card.author}</p>
                    <p class="text-slate-500">${card.createdAt}</p>
                </div>
            </div>
        `  
        allApiCard.appendChild(apiCard)
        
    });
}
loadAllCard ();



// modal function
const loadModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const modalDeals = await res.json();
    mobileWordDetails(modalDeals.data);
};






// assignee: "mike_docs"
// author: "link_larry"
// createdAt: "2024-01-07T13:15:00Z"
// description: "Several links in the documentation are broken or pointing to outdated pages."
// id: 34
// labels: ['documentation']
// priority: "low"
// status: "closed"
// title: "Broken links in documentation"
// updatedAt: "2024-01-18T15:00:00Z"




const mobileWordDetails = (word) => {
    console.log(word);
    modalCard.innerHTML =`
    
                            <h1 class="text-3xl font-bold">${word.title}</h1>
                        <div class="flex items-center gap-2">
                            <span class="btn text-white bg-[#00A96E] rounded-3xl">${word.status.toUpperCase()}</span>
                            <p class="text-slate-500">. Opened by ${word.author}</p>
                            <p class="text-slate-500">. ${word.createdAt}</p>
                        </div>
                        <div class="flex gap-2">
                        <div class="">${createLabels(word.labels)}</div>
                        </div>
                        <p class="line-clamp-2 text-slate-500">${word.description}</p>
                        <div class="flex space-x-56 bg-[#F8FAFC] rounded-2xl p-4">
                            <div>
                                <p class="text-slate-500">Assignee:</p>
                                <h2 class="text-xl font-semibold">${word.assignee.toUpperCase()}</h2>
                            </div>
                            <div>
                                <p class="text-slate-500">Priority:</p>
                                <span class="btn text-white bg-[red] rounded-3xl">${word.priority.toUpperCase()}</span>
                            </div>

                        </div>
    `;
    document.getElementById ("my_modal_5").showModal()
}