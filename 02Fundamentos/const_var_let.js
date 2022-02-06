var x = 5;

function foo() {
    console.log("x:", x); // no obtenemos '5' sino 'undefined'
    var x = 10;
    console.log("x:", x); // 10
};
foo()


var myFriendCats = 2;
function showMyCats() {
    console.log("myCats", myCats);
    showMyFriendCats();
}
function showMyFriendCats(){
    console.log("myFriendCats", myFriendCats);
    showMyUncleCats();
}
function showMyUncleCats(){
    console.log("My uncle does not have cats-");
}
var myCats = 3;
showMyCats();

