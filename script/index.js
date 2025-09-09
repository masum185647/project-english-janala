const loadlessons =()=> {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    // promise of response 
    .then(res => res.json())
    .then((json) => displayLessons(json.data))
}

const removeActive =()=>{
    const lessonButtons =document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn)=> btn.classList.remove("active"))
}
const loadLevelWord =(id) =>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data) =>{
        removeActive();
        const clickBtn =document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    })

}

const displayLevelWord =(words)=>{
   const wordContainer  =document.getElementById("word-container")
   wordContainer.innerHTML ="";
   if(words.length ==0){
    wordContainer.innerHTML =`
    <div class="text-center col-span-full p-6 rounded space-y-3">
    <img class =" mx-auto" src="./assets/alert-error.png" alt="">
   <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
   <h2 class="font-bold text-3xl" >নেক্সট Lesson এ যান</h2>
   </div>

    `;
    return
   }
   for (let word of words){
        // console.log(word)
         const card = document.createElement("div");
         card.innerHTML =`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
        <h2>${word.word ? word.word:"word missing"}</h2>
        <p>meaning/pronunciation</p>
        <div>"${word.meaning ? word.meaning:"meaning missing"} / ${word.pronunciation ? word.pronunciation:"pronunciation missing"}"</div>

     <div class="flex justify-between items-center">
     <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF30] hover:bg-[#1A91FF80] "> <i class="fa-solid fa-circle-exclamation"></i></button>
      <button class="btn bg-[#1A91FF40] hover:hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
        </div>


    </div>
         `
         wordContainer.append(card)
    }
}


const displayLessons = (lessons) =>{
// get the container 
const levelContainer =document.getElementById("level-container")
// get into every lessons
for (let lesson of lessons){
    const btnDiv =document.createElement("div");
    btnDiv.innerHTML =`
    <button id ="lesson-btn-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})" class =" btn btn-outline btn-primary lesson-btn" href="" class="" ><i class="fa-solid fa-book-open"></i> lesson -${lesson.level_no}</button>
      </li>
    `
    // append into container
    levelContainer.append(btnDiv);
}

}
loadlessons();