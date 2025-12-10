#!/usr/bin/env node

const args = process.argv.slice(2);


function addTask() {
    console.log("add task");
}

function updateTask() {
    console.log("update task");
}

function deleteTask() {
    console.log("delete task");
}

function listTasks() {
    console.log("list tasks");
}

switch (args[0]) {
    case "add":
        addTask();
        break;

    case "update":
        updateTask();
        break;

    case "delete":
        deleteTask();
        break;

    case "list":
        listTasks();
        break;

    default:
        console.log(`There is no ${args[0]} option.`);
        break;
}