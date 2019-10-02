$(document)
    .ready(function () {

        let itemList = [];

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        function addItem() {
            let input = $('input[name = ListItem]').val();

            let itemObj = {
                id: generateUUID(),
                name: input
            };

            itemList.push(itemObj);

            renderToDoList();

            $('input[name=ListItem]').val('');
        }

        function renderToDoList() {
            $('#list').empty();

            itemList.forEach(function(item) {
                let todoList = document.createElement('li');
                todoList.id = item.id;
                todoList.class = "";

                todoList.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" /><span>' + item.name + '</span>';

                document.getElementById("list").appendChild(todoList);
            });
        }

        $('#button').click(addItem);

        $("input[name=ListItem]").keyup(function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                addItem();
            }
        });

        $(document).on('click', 'input[name=done-todo]', function (event) {
            $(this).parent()
                .toggleClass('checked');
        });

        $('#filters li a').on('click', function(){
            var checked = $("li[class='checked']");
            var unchecked = $("li[class='']");

            if (this.dataset.filter === "all") {
                checked.show();
                unchecked.show();
            } else if (this.dataset.filter === "active") {
                checked.hide();
                unchecked.show();
            } else if (this.dataset.filter === "complete") {
                checked.show();
                unchecked.hide();
            }
        });

        $(document).on('dblclick', 'li', function () {
            $(this)
                .children('span')
                .attr('contentEditable', 'true')
                .focus()
                .keypress(function (event) {
                    var keycode = (event.keyCode
                        ? event.keyCode
                        : event.which);
                    if (keycode === '13') {
                        event.target.blur();

                        $(this).children('span')
                            .attr('contenteditable', 'false');

                        todoList.find(element => element.id === $(this).parent()[0].id)
                            .name = $(this).text();

                        renderTodoList();
                    }
                });
        });


    });