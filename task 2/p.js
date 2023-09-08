document.addEventListener("DOMContentLoaded", function () {
    // Sample data for users and chat messages
    let users = [
      { id: 1, username: "user1", password: "password1", name: "vijai" },
      { id: 2, username: "user2", password: "password2", name: "abhishek" },
      { id: 3, username: "user3", password: "password3", name: "vishal" },
    ];
  
    let currentUser = null;
    let tasks = [];
    let messages = [];
  
    // Function to populate user list
    function populateUserList() {
      const userList = document.getElementById("user-list");
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
      });
    }
  
    // Function to add a new user
    function addUser() {
      const newUsernameInput = document.getElementById("new-username");
      const newUsername = newUsernameInput.value;
      if (newUsername.trim() !== "") {
        const newUser = {
          id: users.length + 1,
          username: "user" + (users.length + 1),
          password: "password" + (users.length + 1),
          name: newUsername,
        };
        users.push(newUser);
        populateUserList();
        populateAssigneeDropdown(); // Update the assignee dropdown with the new user
        newUsernameInput.value = "";
      }
    }
  
    // Event listener for "Add User" button
    const addUserBtn = document.getElementById("add-user-btn");
    addUserBtn.addEventListener("click", addUser);
  
    // Function to populate assignee dropdown
    function populateAssigneeDropdown() {
      const assignDropdown = document.getElementById("assign-to");
      assignDropdown.innerHTML = "";
      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        assignDropdown.appendChild(option);
      });
    }
  
    // Function to add a new task
    function addTask(assigneeId, taskText) {
      if (taskText) {
        const assignee = users.find((user) => user.id === parseInt(assigneeId));
        const task = {
          id: tasks.length + 1,
          assignee: assignee ? assignee.name : "Unassigned",
          text: taskText,
          completed: false,
        };
        tasks.push(task);
        populateTaskList();
      }
    }
  
    // Function to edit a task
    function editTask(taskId) {
      const taskToEdit = tasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        const newTaskText = prompt("Edit the task:", taskToEdit.text);
        if (newTaskText !== null) {
          taskToEdit.text = newTaskText;
          populateTaskList();
        }
      }
    }
  
    // Function to delete a task
    function deleteTask(taskId) {
      tasks = tasks.filter((task) => task.id !== taskId);
      populateTaskList();
    }
  
    // Function to mark a task as completed
    function markTaskAsCompleted(taskId, completed) {
      const taskToMark = tasks.find((task) => task.id === taskId);
      if (taskToMark) {
        taskToMark.completed = completed;
        populateTaskList();
      }
    }
  
    // Function to populate task list
    function populateTaskList() {
      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () =>
          markTaskAsCompleted(task.id, checkbox.checked)
        );
  
        const span = document.createElement("span");
        span.textContent = task.assignee
          ? `${task.assignee}: ${task.text}`
          : task.text;
  
        // Display "Done" when the task is completed
        if (task.completed) {
          const doneSpan = document.createElement("span");
          doneSpan.textContent = " (Done)";
          span.appendChild(doneSpan);
        }
  
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn"); // Add CSS class "edit-btn"
        editBtn.addEventListener("click", () => editTask(task.id));
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn"); // Add CSS class "delete-btn"
        deleteBtn.addEventListener("click", () => deleteTask(task.id));
  
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Function to display chat messages
    function displayChatMessages() {
      const chatBox = document.getElementById("chat-box");
      chatBox.innerHTML = "";
    
      messages.forEach((message) => {
        const div = document.createElement("div");
        div.classList.add("chat-message");
    
        const senderName = message.senderId
          ? users.find((user) => user.id === message.senderId)?.name
          : "Unknown User";
    
        // Add Font Awesome icon in front of the message
        const icon = document.createElement("i");
        icon.classList.add("fab", "fa-snapchat-ghost");
    
        const messageText = document.createElement("span");
        messageText.textContent = `${senderName}: ${message.text}`;
    
        div.appendChild(icon);
        div.appendChild(messageText);
        chatBox.appendChild(div);
      });
    }
    
  
    // Function to send a chat message
    function sendMessage() {
      const messageInput = document.getElementById("message");
      const message = messageInput.value;
  
      if (message) {
        // Choose a random user from the users array
        const randomUser = users[Math.floor(Math.random() * users.length)];
  
        messages.push({ senderId: randomUser.id, text: message });
        displayChatMessages();
        messageInput.value = "";
      }
    }
  
    // Event listener for the "Assign Task" button
    const assignTaskBtn = document.getElementById("assign-task-btn");
    assignTaskBtn.addEventListener("click", () => {
      const assignDropdown = document.getElementById("assign-to");
      const taskInput = document.getElementById("task");
      const assigneeId = assignDropdown.value;
      const taskText = taskInput.value;
      addTask(assigneeId, taskText);
      taskInput.value = "";
    });
  
    // Event listener for the "Send" button
    const sendBtn = document.getElementById("send-btn");
    sendBtn.addEventListener("click", sendMessage);
  
    // Function to clear the chat messages
    function clearChat() {
      messages = [];
      displayChatMessages();
    }
  
    // Event listener for the "Clear Chat" button
    const clearChatBtn = document.getElementById("clear-chat-btn");
    clearChatBtn.addEventListener("click", clearChat);
  
    // Initialize the user list, assignee dropdown, and task list
    populateUserList();
    populateAssigneeDropdown();
    populateTaskList();
  });