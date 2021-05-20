//document.addEventListener('deviceready', init, false);

//window.onload();

function ajouterElement(){
    let task = document.getElementById("task");
    if(task.value.trim() != ""){
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(task.value));

        $(item).on("swiperight", function(){
            $(this).toggleClass("done");
        });

        $(item).on("swipeleft", function(){
            $(this).slideUp("slow", function(){
                $(this).remove();
            });
        });

        let taskList = document.getElementById("taskList");
        //let item = "<li>" + task.value + "</li>";
        //taskList.innerHTML += item;
        taskList.appendChild(item);
        task.value = "";
        $(taskList).listview("refresh");
    }
    
}