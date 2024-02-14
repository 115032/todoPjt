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



// (2) 이벤트 리스너들

// 1. 추가하기 버튼 누르면 addTask 함수실행
addButton.addEventListener("click", addTask);

// 2. 체크버튼 클릭하는 순간 isComplete 을 true 로 바꿔주고
    // - true이면 끝난걸로 간주하고 밑줄 보여죽
    // - false이면 안끝난것으로 간주하고 그대로



// (3) 함수들

// 1. addTask 함수
function addTask() {
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

    for(let i=0; i<taskList.length; i++) {
        
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task-checked">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div class="buttons">
            <button  onclick="toggleComplete('${taskList[i].id}')"><span class="material-symbols-outlined">
            refresh
            </span></button>
            <button onclick="deleteTask('${taskList[i].id}')"><span class="material-symbols-outlined">
            delete
            </span></button>
        </div>
    </div>`
        } else {
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div class="buttons">
                <button onclick="toggleComplete('${taskList[i].id}')"><span class="material-symbols-outlined">
                done
                </span></button>
                <button onclick="deleteTask('${taskList[i].id}')"><span class="material-symbols-outlined">
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
      if(taskList[i].id == id){
        taskList[i].isComplete = !taskList[i].isComplete;
        // true ↔ false vice-versa 로 움직이게하기! 
        break;
      }    
    }
    render();
    console.log(taskList)
}

function deleteTask(id) {
    for(let i = 0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    render();
}


function randomID(){
    return Math.random().toString(36).substring(2, 11);
}
