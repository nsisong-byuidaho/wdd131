const b = document.querySelector("button");
const input = document.querySelector("#favchap");
const ul = document.querySelector("#list");

let chaptersArray = getChapterList() || [];


chaptersArray.forEach(chapter => displayList(chapter));


b.addEventListener("click", () => {
    if (input.value != "")
    {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();

        input.value = "";
        input.focus();    
    }
    else {
        input.focus();
    }
});



function displayList(item) {
    const li = document.createElement("li");
    const del = document.createElement("button"); 
    li.textContent = item;
    del.textContent = "❌";
    del.classList.add("delete");
    
    li.appendChild(del);
    ul.appendChild(li);
    
    del.addEventListener("click", () => {
            ul.removeChild(li);
            deleteChapter(li.textContent);
            input.focus();
    });
}

function setChapterList() {
    localStorage.setItem("BOMList", JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem("BOMList"));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length -1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

