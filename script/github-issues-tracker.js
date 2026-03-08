
const createLabels = (arr) =>{
    const labels = arr.map ((el) =>`<span class="btn bg-[#FFF8DB] rounded-3xl text-[#D97706]">${el}</span>`);
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



const allApiCard = document.getElementById("all-api-card");

async function loadAllCard (){
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const apiData = await res.json();
    displayApi(apiData.data);
}
const displayApi = (cardApi) =>{
    console.log(cardApi);
    cardApi.forEach((card) => {
        console.log(card);
        const apiCard = document.createElement("div");
        apiCard.className ="bg-white p-5 shadow-2xl rounded-lg border-t-4 border-t-[#00A96E] space-y-3";





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
                <p class="text-slate-500"> #1 ${card.author}</p>
                <p class="text-slate-500">${card.createdAt}</p>
            </div>
        `
        allApiCard.appendChild(apiCard)
        
    });
}
loadAllCard ()