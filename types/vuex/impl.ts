import * as COUNTER from "/Users/takefumi.yoshii/github/vuex-definitions-mapper/store/counter/type";
import * as TODOS from "/Users/takefumi.yoshii/github/vuex-definitions-mapper/store/todos/type";
import "vuex";
declare module "vuex" {
    type RootState = {
        counter: {
            count: COUNTER.S["count"];
            flag: COUNTER.S["flag"];
        };
        todos: {
            todos: TODOS.S["todos"];
        };
    };
    type RootGetters = {
        "counter/hogehoge": COUNTER.G["hogehoge"];
        "counter/expo2": COUNTER.G["expo2"];
        "counter/expo": COUNTER.G["expo"];
        "todos/todosCount": TODOS.G["todosCount"];
        "todos/doneCount": TODOS.G["doneCount"];
    };
    type RootMutations = {
        "counter/setCount": COUNTER.M["setCount"];
        "counter/multi": COUNTER.M["multi"];
        "counter/increment": COUNTER.M["increment"];
        "counter/decrement": COUNTER.M["decrement"];
        "todos/addTodo": TODOS.M["addTodo"];
        "todos/doneTodo": TODOS.M["doneTodo"];
    };
    type RootActions = {
        "counter/asyncSetCount": COUNTER.A["asyncSetCount"];
        "counter/asyncMulti": COUNTER.A["asyncMulti"];
        "counter/asyncIncrement": COUNTER.A["asyncIncrement"];
        "counter/asyncDecrement": COUNTER.A["asyncDecrement"];
        "todos/asyncAddTodo": TODOS.A["asyncAddTodo"];
        "todos/asyncDoneTodo": TODOS.A["asyncDoneTodo"];
    };
}
