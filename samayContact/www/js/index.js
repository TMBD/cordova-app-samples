document.addEventListener("deviceready", loadContacts, false);

function loadContacts(){
    let options = new ContactFindOptions();
    // options.filter = "";
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["name"];

    navigator.contacts.find(fields, handleContacts, handleError, options);



    function handleContacts(contacts) {
        let listContacts = "";
        for (let i = 0; i < contacts.length; i++) {
            console.log(contacts[i]);

            listContacts += `
            <li contact-id="${contacts[i].id}">
                <a href="#contact-show">
                    <img src="img/contactIcon.png" alt="Icon du contact">
                    <h3>${contacts[i].name.formatted}</h3>
                    <p>${contacts[i].phoneNumbers[0].value}</p>
                </a>
            </li>`;
        }

        contactList.innerHTML = listContacts;

        $("li").click(function(){
            getContacts($(this).attr("contact-id"));
        });

        $(contactList).listview("refresh");

    }


    function handleError(error) {
        console.log("erreur lors de la recuperation");
        console.log(error);    
    }

}

function getContacts(id) {
    let options = new ContactFindOptions();
    options.filter = id;
    options.multiple = false;
    let fields = ["id"];
    navigator.contacts.find(fields, handleContact, handleContactError, options);
}

function handleContact(contacts) {
    if(contacts.length != 0){
        let contact = contacts[0];
        contactName.innerHTML = contact.name.formatted;
        contactNumber.innerHTML = contact.phoneNumbers[0].value;
        contactEmail.innerHTML = contact.emails != null ? contact.emails[0].value : "Email non renseigné";
        contactAddress.innerHTML = contact.addresses != null ? contact.addresses[0].formatted : "Adresse non renseignée";
    }else{
        console.log("contact non trouvé");
    }

}

function handleContactError(error) {
    console.log("erreur lors de la recuperation");
    console.log(error);  
}



function save(){
    let errorElement = document.getElementById("error");
    
    let name = document.getElementById("name");
    let familyName = document.getElementById("familyName");
    let nickname = document.getElementById("nickname");
    let phoneNumberMobile = document.getElementById("phoneNumberMobile");
    let phoneNumberWork = document.getElementById("phoneNumberWork");
    let email = document.getElementById("email");
    let address = document.getElementById("address");

    var onSuccess = function(){
        errorElement.style.display = "none";
        name.value = "";
        familyName.value = "";
        nickname.value = "";
        phoneNumberMobile.value = "";
        phoneNumberWork.value = "";
        email.value = "";
        address.value = "";
        alert("Contact enregistré avec succès");
        loadContacts();
    }

    var onError = function(){
        errorElement.style.display = "block";
        errorElement.innerHTML = "Erreur lors l'enregistrement";
    }

    

    if(name.value.trim() != "" && phoneNumberMobile.value.trim() != ""){
        var contact = navigator.contacts.create();
        contact.displayName = name.value;
        contact.nickname = nickname.value;         
                   

        // populate some fields
        var contactName = new ContactName();
        contactName.givenName = name.value;
        contactName.familyName = familyName.value;
        contact.name = contactName;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField("mobile", phoneNumberMobile.value, false) ;
        phoneNumbers[1] = new ContactField("travail", phoneNumberWork.value, true);
        contact.phoneNumbers = phoneNumbers ;

        var addresses = [];
        addresses[0] = new ContactAddress("home", address.value, true);
        contact.addresses = addresses ;

        var emails = [];
        emails[0] = new ContactField("email", email.value, true);
        contact.emails = emails ;
        // save to device
        contact.save(onSuccess,onError);
    }else{
        alert("le prénom et le numéro de portable sont obligatoires");
    }

}