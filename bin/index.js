#!/usr/bin/env node

import fs from "fs/promises";

const args = process.argv.slice(2);

function getDate() {
    const date = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    return `${date} at ${time}`;
}

async function addTask(newTask) {

    if (newTask == undefined) {
        throw new Error("You haven't provided the task.")
    }

    const date = getDate();

    const newData = {
        description: newTask,
        status: "todo",
        createdAt: date,
        updatedAt: date
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

    const date = getDate();

    getData[taskId]["description"] = updatedData;
    getData[taskId]["updatedAt"] = date;

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

function printTasks(status, data) {
    for (const id in data) {
        if (id === "latestId") continue;
        if (status !== "" && status !== data[id].status) continue;

        console.log(`ID [${id}] --- Status:${data[id].status}`);
        console.log(`---> ${data[id].description}\n`);
    }
}

async function listTasks(flag) {

    const getData = await readData();

    if (flag === undefined) {
        printTasks("", getData);
    } else if (flag.toLowerCase() === "done") {
        printTasks("done", getData);
    } else if (flag.toLowerCase() === "todo") {
        printTasks("todo", getData);
    } else if (flag.toLowerCase() === "in-progress") {
        printTasks("in-progress", getData);
    } else {
        throw new Error(`Invalid command (${flag})`);
    }
}

async function markTask(markStatus, taskId) {

    if (taskId === undefined || taskId === "") {
        throw new Error("You haven't provided the task id to mark task.");
    }

    const getData = await readData();

    if (getData[taskId] === undefined) {
        throw new Error(`Task with id ${taskId} doesn't exist.`);
    }

    if (markStatus.toLowerCase() === "mark-in-progress") {
        getData[taskId]["status"] = "in-progress";
    } else {
        getData[taskId]["status"] = "done";
    }

    const date = getDate()

    getData[taskId]["updatedAt"] = date;

    await writeData(getData);
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

        try {
            await listTasks(args[1]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }

        break;

    case "mark-in-progress":
        try {
            await markTask("mark-in-progress", args[1]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }
        break;

    case "mark-done":
        try {
            await markTask("mark-done", args[1]);
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }
        break;

    default:
        console.log(`There is no ${args[0]} option.`);
        break;
}