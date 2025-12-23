#!/usr/bin/env node

import fs from "fs/promises";

const args = process.argv.slice(2);

async function addTask(newTask) {

    if (newTask == undefined) {
        throw new Error("You haven't provided the task.")
    }

    const date = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    const newData = {
        description: newTask,
        status: "",
        createdAt: `${date} at ${time}`,
        updatedAt: `${date} at ${time}`
    };

    let getData = await readData();
    let taskId = getData["latestId"] + 1;

    getData[taskId] = newData;
    getData["latestId"] = taskId;

    await writeData(getData);
    console.log(`Task "${newTask}" added successfully (ID: ${taskId})`);
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
        console.error(err.message);
    }
}

async function writeData(newData) {
    try {
        await fs.writeFile("./data/data.json", JSON.stringify(newData), "utf8");
    } catch (err) {
        console.log(err.message);
    }
}

switch (args[0]) {
    case "add":
        try {
            addTask(args[1]);
        } catch (err) {
            console.error(err.message);
        }

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