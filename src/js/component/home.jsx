import React, { useEffect, useState } from "react";
import Todolist from "./todolist.jsx";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([]);
	const [listMap, setListMap] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Azumydori", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setTaskList(data);
			})
			.catch(error => {});
	}, []);

	useEffect(() => {
		if (taskList.length) {
			setListMap(
				taskList.map((task, index) => {
					return (
						<Todolist
							text={task}
							id={index}
							key={index.toString()}
							delete={deleteTask}
						/>
					);
				})
			);
		}
	}, [taskList]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Azumydori", {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [taskList]);

	const deleteTask = indexDelete => {
		setTaskList(taskList.filter((_, index) => index !== indexDelete));
	};

	return (
		<div className="text-center mt-5">
			<form
				className="to-do-list"
				onSubmit={event => {
					event.preventDefault();
				}}>
				<h1>TASKLIST</h1>
				<input
					className="task"
					type="tasks"
					onKeyPress={event => {
						if (event.key == "Enter") {
							if (event.key === "Enter") {
								setTaskList([
									...taskList,
									{ label: event.target.value, done: false }
								]);
								event.currentTarget.value = "";
							}
						}
					}}
					placeholder="add new task"
				/>
				<ul className="list">{listMap}</ul>
				<p className="remaining">{listMap.length} Tasks TO DO</p>
				<h8>Click the tasks to DELETE it</h8>
			</form>
		</div>
	);
};

export default Home;
