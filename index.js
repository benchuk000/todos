
(function() {

    var todos = [];
    onButtonAll();
    onButtonActive();
    onButtonCompleted();
    document.getElementById('input_id').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
           todos.push({
               value: e.target.value,
               isChecked: false
           });
            updateTodos(todos);
            e.target.value = '';

        }
    });

function updateTodos(todos){
    var count = 0;
    var todoUl =  document.getElementById('todo-list');
    document.getElementById('todo-list').innerHTML = '';
    todos.forEach(function(item,i,todos){
        var newLi = document.createElement('li');
        newLi.className = 'todo-list__item';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.index = i;
        checkbox.className = 'input-checkbox';
        checkbox.checked = item.isChecked;
        newLi.appendChild(checkbox);
        count++;
        var valueSpan = document.createElement('span');
        valueSpan.innerHTML = item.value;
        valueSpan.id ='todo-list__span_'+ i;
        newLi.appendChild(valueSpan);
        todoUl.appendChild(newLi);
        var deleteButton = document.createElement('button');
        deleteButton.id = 'delete-button'+i;
        deleteButton.innerHTML = 'X';
        deleteButton.className = 'delete-button';
        newLi.appendChild(deleteButton);
        deleteButton.addEventListener('click',function (e) {
            todos.splice(i,1);
            updateTodos(todos);
        });
        newLi.addEventListener('mouseover',function (e) {
            deleteButton.className = 'delete-button--visible';
        });
        newLi.addEventListener('mouseout',function (e) {
            deleteButton.className = 'delete-button';
        });
        if(item.isChecked){
            valueSpan.className = 'todo-list__span';
        }
    });

    processClick(count);


}
function processClick(count) {
    var checks = document.getElementsByClassName('input-checkbox');
    var div = document.getElementById('todo-footer__item');
    div.innerHTML = '';
    div.innerHTML = count +' '+ 'items left';
    for(var i=0;i<checks.length; i++){
        checks[i].addEventListener('click', function(e){
            if(e.target.checked){
             todos[e.target.index].isChecked = true;

                document.getElementById('todo-list__span_'+e.target.index).className = 'todo-list__span';
                count--;
                div.innerHTML = count +' '+ 'items left';

            }
            else{
                todos[e.target.index].isChecked = false;

                document.getElementById('todo-list__span_'+e.target.index).className = '';
                count++;
                div.innerHTML = count +' '+ 'items left';
            }


        });
    }
}
function onButtonAll(){
    var allButton = document.getElementById('allButton');
    allButton.addEventListener('click',function (e) {
        updateTodos(todos);
    });
}
function onButtonActive(){
        var activeButton = document.getElementById('activeButton');

        activeButton.addEventListener('click',function (e) {
           var actives =  todos.filter(function (item,i,todos) {
                return item.isChecked === false;
           });
            updateTodos(actives);
        });
    }
    function onButtonCompleted(){
        var completedButton = document.getElementById('completedButton');

        completedButton.addEventListener('click',function (e) {
            var completeds =  todos.filter(function (item,i,todos) {
                return item.isChecked;
            });
            updateTodos(completeds);
        });
    }
})();

