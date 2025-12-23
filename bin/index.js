#!/usr/bin/env node

import fs from "fs/promises";

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

function markTask() {
    console.log("mark task");
}

async function readData() {
    try {
        const getData = await fs.readFile("./data/data.json", "utf8");
        const data = JSON.parse(getData);
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function writeData(newData) {
    try {

        const getData = await fs.readFile("./data/data.json");
        const data = JSON.parse(getData);

        // add the new data
        data[counter] = newData;

        await fs.writeFile("./data/data.json", JSON.stringify(data), "utf8");

    } catch (err) {
        console.log(err);
    }
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

    case "mark-in-progress":
        markTask();
        break;

    case "mark-done":
        markTask();
        break;

    default:
        console.log(`There is no ${args[0]} option.`);
        break;
}