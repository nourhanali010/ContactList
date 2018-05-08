var i=0;
var userID;
function person(name,telphone,gender,email)
{
	this.name=name;
	this.telphone=telphone;
    this.gender=gender;
    this.email=email;
	this.id=i++;
	function setname(name)
	{
		this.name=name;
	}
    function settelphone(telphone)
    {
        this.telphone=telphone;
    }
    function setgender(gender)
    {
        this.gender=gender;
    }
	function getname()
	{
		return this.name
	}
    function getgender()
    {
        return this.gender;
    }
    function gettelphone()
    {
        return this.telphone;
    }
    function getid()
    {
        return this.id;
    }
}

function getAllNotes()
{
	var personArray = JSON.parse(localStorage.getItem('contacts'));

	if(personArray !==null)
   { 
       for(i=0;i<personArray.length;i++)
       {  
           if(personArray[i].gender==="male")
                var img=$("<img>").attr("src","./img/male.png");
           else
                var img=$("<img>").attr("src","./img/female.png");
           var h=$("<h2></h2>").text(personArray[i].name);
           var a=$("<a></a>").attr("href","tel"+personArray[i].telphone); 
           a.attr("data-role","button");
           a.attr("data-icon","phone");
           var outerA=$("<a></a>").attr("onclick","gotoContactDetails("+personArray[i].id+")");
           a.addClass("ui-btn ui-btn-icon-notext ui-icon-phone");
           outerA.addClass("ui-btn");
           outerA.append(img);
           outerA.append(h);
           var li=$("<li></li>").append(outerA);
           li.append(a);
           li.addClass("ui-li-has-alt ui-li-has-thumb");
           $("#listcontact").append(li)
       }	
    }
}

function addContact()
{

    personName=$("#textinput-fc").val();
    personEmail=$("#email").val();
    persontel=$("#phone").val();
    if($("#flip-checkbox-2").prop('checked') === true)
    {
        personGender="female";
    }
    else
    {
        personGender="male";
    }
    //
	var newPerson=new person(personName,persontel,personGender,personEmail);
	var personArray=JSON.parse(window.localStorage.getItem("contacts"));
	if(personArray===null)
	{
		personArray=new Array();
		personArray.push(newPerson);
		window.localStorage.setItem("contacts",JSON.stringify(personArray));
	}
	else
	{
		personArray.push(newPerson);
		window.localStorage.setItem("contacts",JSON.stringify(personArray));
	}

    window.location = "contactlist.html";

    return false;
}

        function editContact(event)
{
//	var noteDesc=document.getElementById("noteDesc").value
//	var noteColor=document.getElementById("noteColor").value;
//              
	        var noteArray=JSON.parse(window.localStorage.getItem("contacts"));
		//noteArray.push(newNote);
                var person=noteArray.indexOf(id);
                person.setname();
                person.settelphone();
                person.setgender();
                noteArray[id]=person;
		window.localStorage.setItem("contacts",JSON.stringify(noteArray));
}



$(document).ready(function (){
    getAllNotes();
}
);

function gotoContactDetails(id){
  userID=id;
  window.location = "contactlist.html#contact-details";
  var personArray=JSON.parse(window.localStorage.getItem("contacts"));
  
   for(i=0;i<personArray.length;i++)
    {  
       if(personArray[i].id===id) {
        $("#contactDetialsName").text(personArray[i].name);
        $("#contactDetailsPhone").attr("href","tel"+personArray[i].telphone); 
        if(personArray[i].gender==="male")
            $("#contactDetialsImg").attr("src","./img/male.png");
        else
            $("#contactDetialsImg").attr("src","./img/female.png");
       }
    }
}

function delContact()
{
    var personArray=JSON.parse(window.localStorage.getItem("contacts"));
    var index=-1;
    for(i=0;i<personArray.length;i++)
    {  
        if(personArray[i].id===userID) {
            index=i;
        }
    }
    personArray.splice(index, 1);
	window.localStorage.setItem("contacts",JSON.stringify(personArray));
    window.location = "contactlist.html";
}


function goToEditContact()
{

    window.location = "contactlist.html#edit-contact";
    var personArray=JSON.parse(window.localStorage.getItem("contacts"));
    for(i=0;i<personArray.length;i++)
    {  
       if(personArray[i].id===userID) {
        $("#edittextinput-fc").val(personArray[i].name);
        $("#editemail").val(personArray[i].email);
        $("#editphone").val(personArray[i].telphone);
        if(personArray[i].gender==="male"){
            $('#editflip-checkbox-2').prop('checked', false).flipswitch( "refresh" ) ;;
        }
        else{
            $('#editflip-checkbox-2').prop('checked', false).flipswitch( "refresh" ) ;;
        }
       }
    }
}

function editContact(){


    personName=$("#edittextinput-fc").val();
    personEmail=$("#editemail").val();
    persontel=$("#editphone").val();
    if($("#editflip-checkbox-2").prop('checked') === true)
    {
        personGender="female";
    }
    else
    {
        personGender="male";
    }

    var personArray=JSON.parse(window.localStorage.getItem("contacts"));
    
    for(i=0;i<personArray.length;i++)
    {  
        if(personArray[i].id===userID) {
            personArray[i].name=personName;
            personArray[i].gender=personGender;
            personArray[i].email=personEmail;
            personArray[i].telphone=persontel;
        }
    }
	window.localStorage.setItem("contacts",JSON.stringify(personArray));
    window.location = "contactlist.html";

    return false;
}
