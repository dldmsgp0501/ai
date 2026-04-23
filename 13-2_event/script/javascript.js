let btn1=document.getElementById("btn1")
let fadebox=document.getElementById("fadebox")
btn1.addEventListener("click",function(){
    fadebox.style.transition="all 1s";
    fadebox.style.opacity=0;
});
let btn2=document.getElementById("btn2")
btn2.addEventListener("click",function(){
    fadebox.style.transition="all 1s";
    fadebox.style.opacity=1;
});
let btn3=document.getElementById("btn3")
let fadetogglebox=document.getElementById("fadetogglebox")
btn3.addEventListener("click",function(){
    fadetogglebox.classList.toggle("fade-hidden")
});
let btn4=document.getElementById("btn4")
let slidebox=document.getElementById("slidebox")
btn4.addEventListener("click",function(){
    slidebox.classList.add("slide-hidden")
});
let btn5=document.getElementById("btn5")
btn5.addEventListener("click",function(){
    slidebox.classList.remove("slide-hidden")
});
let btn6=document.getElementById("btn6")
let slidetogglebox=document.getElementById("slidetogglebox")
btn6.addEventListener("click",function(){
    slidetogglebox.classList.toggle("slide-hidden")
});
let btn7=document.getElementById("btn7")
let anim=document.getElementById("anim")
btn7.addEventListener("click",function(){
    anim.classList.add("ani-move")
});
let btn8=document.getElementById("btn8")
btn8.addEventListener("click",function(){
    anim.classList.remove("ani-move")
});

