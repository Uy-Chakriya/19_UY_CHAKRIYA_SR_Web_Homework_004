let tasks = [
        { id: 1, name: 'Java Homework', priority: 'High', status: 'Progress' },
        { id: 2, name: 'Korean Homework', priority: 'Medium', status: 'Progress' }
    ];

    let currentEditId = null;
    let selectedPriority = '';
    let selectedStatus = '';

    function renderTasks() {
        const container = document.getElementById('taskList');
        if (tasks.length === 0) {
            container.innerHTML = `<div class="text-center p-10 text-gray-500 bg-white/50 rounded-xl italic">
                Click add task btn to create new task..
             </div>`;
            return;
        }

        container.innerHTML = tasks.map(task =>
            `<div class="bg-white rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center transition-all hover:shadow-md">
                <div class="w-full md:w-1/3 font-medium  text-xl mb-2 md:mb-0">${task.name}</div>

                <div class="w-full md:w-1/4 font-medium  text-xl mb-2 md:mb-0 ${theColourForPriority(task.priority)}">
                    ${task.priority}
                </div>

                <div class="w-full md:w-1/4 font-medium  text-xl mb-4 md:mb-0 text-black">
                    ${task.status}
                </div>

                <div class="w-full md:w-1/6 flex justify-start md:justify-end gap-6">
                    <button onclick="editTheModel(${task.id})" class="text-blue-700 text-3xl hover:scale-110 transition"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="deleteTheModal(${task.id})" class="text-red-500 text-3xl hover:scale-110 transition"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        `).join('');
    }

    function theColourForPriority(cpriority) {
        if (cpriority === 'High') return 'text-red-500';
        if (cpriority === 'Medium') return 'text-yellow-500';
        return 'text-green-500';
    }

    function openAddModal() {
        currentEditId = null;
        resetForm();
        document.getElementById('modalTitle').innerText ='Add Task';
        document.getElementById('submitBtn').innerText ='Add';
        document.getElementById('cancelBtn').classList.add('hidden');
        document.getElementById('theModel').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('theModel').classList.add('hidden');
    }

    function editTheModel(id) {
        currentEditId = id;
        const task = tasks.find(task => task.id === id);
        document.getElementById('taskInput').value = task.name;
        document.getElementById('modalTitle').innerText = ''; 
        document.getElementById('submitBtn').innerText = 'Update';
        document.getElementById('cancelBtn').classList.remove('hidden');

        const priBtn = [...document.querySelectorAll('.pri-btn')].find(b => b.innerText === task.priority);
        const staBtn = [...document.querySelectorAll('.status-btn')].find(b => b.innerText === task.status);
        
        if(priBtn) selectPriority(task.priority, priBtn);
        if(staBtn) selectStatus(task.status, staBtn);
        
        document.getElementById('theModel').classList.remove('hidden');
    }

    function handleTheTaskSubmit() {
        const name = document.getElementById('taskInput').value;
        if (!name || !selectedPriority || !selectedStatus) {
            alert("Please fill all fields");
            return;
        }

        if (currentEditId) {
            const index = tasks.findIndex(t => t.id === currentEditId);
            tasks[index] = { ...tasks[index], name, priority: selectedPriority, status: selectedStatus };
        } else {
            tasks.push({
                id: Date.now(),
                name,
                priority: selectedPriority,
                status: selectedStatus
            });
        }
        closeModal(); 
        renderTasks();
    }

    function selectPriority(val, btn) {
        selectedPriority = val;
        document.querySelectorAll('.pri-btn').forEach(b => {
            b.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500', 'text-white');
        });
        const color = val === 'High' ? 'bg-red-500' : val === 'Medium' ? 'bg-yellow-500' : 'bg-green-500';
        btn.classList.add(color, 'text-white');
    }

    function selectStatus(val, btn) {
        selectedStatus = val;
        document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('bg-cyan-400', 'text-white'));
        btn.classList.add('bg-cyan-400', 'text-white');
    }

    function resetForm() {
        document.getElementById('taskInput').value = '';
        selectedPriority = '';
        selectedStatus = '';
        document.querySelectorAll('.pri-btn,.status-btn').forEach(b => {
            b.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-cyan-400','text-white');
        });
    }

    function deleteTheModal(id) {
        document.getElementById('deleteModal').classList.remove('hidden');
        document.getElementById('deleteButton').onclick = () => {
            tasks = tasks.filter(t => t.id !== id);
            closeDeleteModal();
            renderTasks();
        };
    }

    function closeDeleteModal() { 
        document.getElementById('deleteModal').classList.add('hidden'); 
    }
    
    renderTasks();