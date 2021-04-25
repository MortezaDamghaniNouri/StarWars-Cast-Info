function array_printer(input_array){

    for(let i = 0;i < input_array.length;++i){
        console.log(input_array[i])



    }



}
let number_of_items;
let temp_results_one;
let current_page_number = 1;
function fetch_sender(){
    fetch("https://swapi.dev/api/starships/")
        .then(response => response.json())
        .then(data => {
            number_of_items = data.count;
            temp_results_one = data.results;
            for(let i=0;i < temp_results_one.length;++i){
                let li = document.getElementById("name" + (i + 1).toString());
                li.innerHTML = JSON.stringify(temp_results_one[i].name);

            }



        }).catch(error => window.alert(error))







}


function starships_click_handler(input, index){

    let new_child = document.createElement("div");
    new_child.id = "starship_info" + index.toString();
    new_child.innerHTML = JSON.stringify(temp_results_one[index - 1])
    new_child.style.color = "black";
    let films = document.createElement("div");
    films.id = "films" + index.toString();
    films.innerHTML = "FILMS:";
    films.style.display = "block";
    films.style.color = "red";
    // new_child.append(films);

    let films_urls = temp_results_one[index - 1].films;
    array_printer(films_urls);
    for(let i = 0;i < films_urls.length;++i){
        let film_name;
        fetch(films_urls[i])
            .then(response => response.json())
            .then(data => {
                film_name = data.title;
                let new_film_title_child = document.createElement("div");
                new_film_title_child.class = "film_title";
                new_film_title_child.innerHTML = film_name;
                new_film_title_child.style.color = "lime";
                films.appendChild(new_film_title_child);


                let old_child = document.getElementById("starship_info" + index.toString())
                if (old_child == null){
                    new_child.appendChild(films);
                    input.appendChild(new_child);

                }
                else{
                    new_child.appendChild(films);
                    input.replaceChild(new_child, old_child);


                }


            }).catch(error => window.alert(error))


    }


}


function page_button_handler(input) {
    if(input == 2){
        if(current_page_number * 10 < number_of_items) {

            fetch("https://swapi.dev/api/starships/" + "?page=" + (current_page_number + 1).toString())
                .then(response => response.json())
                .then(data => {
                    temp_results_one = data.results;
                    for(let i=0;i < temp_results_one.length;++i){
                        let li = document.getElementById("name" + (i + 1).toString());
                        li.innerHTML = JSON.stringify(temp_results_one[i].name);

                    }



                }).catch(error => window.alert(error))
            ++current_page_number;

        }
    }
    else{
        if(current_page_number != 1) {

            fetch("https://swapi.dev/api/starships/" + "?page=" + (current_page_number - 1).toString())
                .then(response => response.json())
                .then(data => {
                    temp_results_one = data.results;
                    for (let i = 0; i < temp_results_one.length; ++i) {
                        let li = document.getElementById("name" + (i + 1).toString());
                        li.innerHTML = JSON.stringify(temp_results_one[i].name);

                    }


                }).catch(error => window.alert(error))
            --current_page_number;
        }}


}







