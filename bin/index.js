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

async function updateTask(taskId, updatedData) {

    if (taskId === undefined || taskId === "") {
        throw new Error("You haven't provided the task id to update task.");
    }

    const getData = await readData();

    if (getData[taskId] === undefined) {
        throw new Error(`There's no task with id ${taskId}`);
    }
    const date = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    getData[taskId]["description"] = updatedData;
    getData[taskId]["updatedAt"] = `${date} at ${time}`;

    await writeData(getData);

}

async function deleteTask(taskId) {
    if (taskId === undefined || taskId === "") {
        throw new Error("You haven't provided the task id to update task.");
    }

    const getData = await readData();

    if (getData[taskId] == undefined) {
        throw new Error(`There's no task with id ${taskId}`);
    }

    delete getData[taskId];
    await writeData(getData);
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
            await addTask(args[1]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }

        break;

    case "update":

        try {
            await updateTask(args[1], args[2]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }

        break;

    case "delete":

        try {
            await deleteTask(args[1]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }

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