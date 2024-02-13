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

// 2. 버튼 누르는 것을 가져오기
let addButton = document.getElementById('addBtn');

// 3. 할 일 추가시 저장될 배열 array 만들기
let taskList = [];


// (2) 이벤트 리스너들

// 1. 추가하기 버튼 누르면 addTask 함수실행
addButton.addEventListener("click", addTask);



// (3) 함수들

// 1. addTask 함수
function addTask() {
    // console.log("clicked");
    // addTask 클릭 잘 동작 확인

    let taskContent = taskInput.value
    // taskInput에 입력되는 value를 taskContent 변수에 저장
    
    taskList.push(taskContent);
    // taskContent를 taskList 변수에 저장
    console.log(taskContent)
    render();
}
 
// 2. taskList를 그려주는 함수

 function render() {
    let resultHTML = '';
    // string 저장 변수 만듬

    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div class="buttons">
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.querySelector('.taskListBox').innerHTML = resultHTML;

 }

