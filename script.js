import { searchItems } from "./searchitems.js"
import { urls } from "./urls.js"


window.addEventListener("load", function() {
    for (let i = 0; i < searchItems.length; i++) {

        document.getElementsByTagName("script")[2].insertAdjacentHTML('beforebegin', `
            <a href=${urls[i]} target="_blank" rel="noopener noreferrer">
                <h1 id="${searchItems[i].toLowerCase().replaceAll(" ", "")}text">${searchItems[i]}</h1>
            </a>
        `);
        document.getElementById(`${searchItems[i].toLowerCase().replaceAll(" ", "")}text`).style.display = "none"

        // eval(`var ${searchItems[i]} = document.getElementById(${searchItems[i]}text)`)

    }
})

// function sortArray(arra,prop){
//   arra.sort((a,b)=>{
//     if(typeof a[prop] === 'string')
//       return b[prop].localeCompare(a[prop]);
//     return b[prop] - a[prop];
//   });
// }

// function sortArray(ar) {
//     const obcomp = (a, b) => {
//         if (a.match < b.match) {
//             return -1
//         }

//         if (a.match > b.match) {
//             return 1
//         }

//         return 0
//     }

//     ar.sort(obcomp)
// }



/* Declares What The Searchbar and Search Button Are */

var search = document.getElementById("searchbar");
var button = document.getElementById("submit");
var accountBtn = document.getElementById("account");
var loginBtn = document.getElementById("loginBtn");

/* Declares The DOM Elements For searchItems array */



/* Declares The DOM Element If A Search Term Is Not Found In Any Existing Array */

var nonExistantTerm = document.getElementById("item-no");

/* Sets Default Style Properties To DOM Search Term Elements */

nonExistantTerm.style.display = "none"

/* Function That Runs The Search Functionality Based On If The User Clicks The Search Button */

button.addEventListener("click", function() {
    console.log("searched")
    /* Saves User-Generated Search Term To LocalStorage With Variable Name = "query" */
    localStorage.setItem("query", search.value);

    for (var i = 0; i < searchItems.length; i++) {
        // eval(`
        if (document.getElementById(`${searchItems[i].toLowerCase().replaceAll(" ", "")}text`).style.display == "block") {
            document.getElementById(`${searchItems[i].toLowerCase().replaceAll(" ", "")}text`).style.display = "none"
        }
        // `)
    }

    if (nonExistantTerm.style.display == "block") {
        nonExistantTerm.style.display = "none"
    }


    /* For Loop That Goes Through The "searchItems" Array And Sees If Any Results Match */

    var arr = []

    function sortArray(arg, prop) {
        arg.sort((a, b) => {
            if (typeof a[prop] === 'string')
                return b[prop].localeCompare(a[prop]);
            return b[prop] - a[prop];
        });
    }

    for (var i = 0; i < searchItems.length; i++) {
        if (JW(searchItems[i].toLowerCase().replaceAll(" ", ""), search.value.toLowerCase().replaceAll(" ", "")) >= 0.8) {

            arr.push(
                {
                    "i": `${searchItems[i].toLowerCase().replaceAll(" ", "")}text`,
                    "m": JW(searchItems[i].toLowerCase().replaceAll(" ", ""), search.value.toLowerCase().replaceAll(" ", ""))
                }
            )


            // document.getElementById(`${searchItems[i].toLowerCase().replaceAll(" ", "")}text`).style.display = "block"

        }
    }

    // arr.sort((a, b) => {
    //     if (typeof a["m"] === 'string')
    //         return b["m"].localeCompare(a["m"]);
    //     return b["m"] - a["m"];
    // });

    sortArray(arr, "m")
    
    console.log(arr)

    //the problem is not the array sorter, it does work. the problem is the searchItems array appends elements to the page based on their order. unless we change the order of els in the array, it will not reorder correctly.

    for (var i = 0; i < arr.length; i++) {
        document.getElementById(arr[i].i).style.display = "block"
    }


});

window.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        button.click()
    }
})


