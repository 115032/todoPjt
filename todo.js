// 유저가 인풋을 입력한다.
// 추가하기 버튼 누르면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼 누르면 완료의미의 줄이 텍스트에 생긴다
// 진행중, 완료 등 탭을 누르면 언더바가 이동한다.
// 진행중 누르면 진행중 아이템만, 완료 누르면 완료된 아이템만 보인다.
// 전체 누르면 전체 아이템 보여주기 한다!

// (1) 변수 선언들

// 1. 유저가 인풋 입력하는 것을 가져오기
let taskInput = document.getElementById('task-input')

// 2. "추가하기" 버튼 누르는 것을 가져오기
let addButton = document.getElementById('addBtn');

// 3. 할 일 추가시 저장될 배열 array 만들기
let taskList = [];

// 4 filter 버튼 완료 & 미완료 버튼가져오기

let tabs = document.querySelectorAll(".tab-area div")


// 5  
let mode = 'all'

let filterList = [];




// (2) 이벤트 리스너들

// 1. 추가하기 버튼 누르면 addTask 함수실행
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
 if(event.keyCode === 13) {
    addTask(event)
 }
});


    for(let i = 1; i<tabs.length; i++) {
        tabs[i].addEventListener("click", function(event)
        {filter(event)})
      }
      


// (3) 함수들

// 1. addTask 함수
function addTask() {

    let taskValue = taskInput.value
    if(taskValue == "") return alert("할 일을 입력하세요!")
    // console.log("clicked");
    // addTask 클릭 잘 동작 확인

    // let taskContent = taskInput.value
    // taskInput에 입력되는 value를 taskContent 변수에 저장
    
    
    
    let task = {
        id: randomID(),
        taskContent: taskInput.value,
        isComplete:false
    }
    
  
    taskList.push(task);
    // taskContent를 taskList 변수에 저장
    // console.log(taskContent)
    taskInput.value = "";
    // 입력 후 남아있는 텍스트 사라지게 하기!
    render();
}
 
// 2. taskList를 그려주는 함수

 function render() {

    let resultHTML = '';
    // string 저장 변수 만듬
    let list = [];

   // 내가 선택한 탭에 따라서
   if(mode === 'all') {
    list = taskList;
   } 
   else if(mode === 'ongoing' || mode === 'completed') {
    list = filterList;
   }
   // 리스트를 달리 보여준다
   // all 은 taskList
   // ongoing & completed 는 filterList


    for(let i=0; i<list.length; i++) {
        
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task-checked">
        <div class="task-done">${list[i].taskContent}</div>
        <div class="buttons">
            <button  onclick="toggleComplete('${list[i].id}')"><span class="material-symbols-outlined">
            refresh
            </span></button>
            <button onclick="deleteTask('${list[i].id}')"><span class="material-symbols-outlined">
            delete
            </span></button>
        </div>
    </div>`}  
     
        else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="buttons">
                <button onclick="toggleComplete('${list[i].id}')"><span class="material-symbols-outlined">
                done
                </span></button>
                <button onclick="deleteTask('${list[i].id}')"><span class="material-symbols-outlined">
                delete
                </span></button>
            </div>
        </div>`
        }
     }

    document.querySelector('.taskListBox').innerHTML = resultHTML;

 }

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].id === id){
        taskList[i].isComplete = !taskList[i].isComplete;
        // true ↔ false vice-versa 로 움직이게하기! 
        break;
      }    
    }
    filter();
}

function deleteTask(id) {
    for(let i = 0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
          filterList = filterList.filter(task=>task.id!==id);
          break;
        }
    }
    filter();
}


function filter(e) {
    
    // console.log("filter", event.target.id)
    // 각 버튼 클릭 시 filter 잘 찍히는지 확인
    if (e) {
        mode = e.target.id;
        underline.style.width = e.target.offsetWidth + "px";
        underline.style.left = e.target.offsetLeft + "px";
        underline.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      }
     filterList = [];
    
    
    if (mode === "ongoing"){
        // 진행중 리스트
        // task.isComplete = false
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
    } else if(mode === "completed") {
       for(let i=0; i<taskList.length;i++) {
        if(taskList[i].isComplete == true) {
            filterList.push(taskList[i])
        }
       }
    }
render();
}


function randomID(){
    return Math.random().toString(36).substring(2, 11);
}

// 언더바 만들기

let underline = document.getElementById('underline');
// 언더바 가지고 오기

let menuTaps = document.querySelectorAll('#all, #ongoing, #completed');

menuTaps.forEach(menu=>menu.addEventListener("click",(e)=>indicator(e)))

function indicator(e) {
   underline.style.left = e.currentTarget.offsetLeft + "px";
   underline.style.width = e.currentTarget.offsetWidth + "px";
   underline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
} 
