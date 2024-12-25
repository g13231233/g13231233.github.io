document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const cardCollection = document.getElementById('cardCollection');
    const drawCardButton = document.getElementById('drawCardButton');
    const cardPack = document.getElementById('cardPack');
    const loginRegister = document.getElementById('loginRegister');

    let users = JSON.parse(localStorage.getItem('users')) || {};

    function register() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (!username || !password) {
            alert('用户名和密码不能为空！');
            return;
        }
        if (users[username]) {
            alert('用户名已存在！');
            return;
        }
        users[username] = {
            password: password,
            cards: []
        };
        localStorage.setItem('users', JSON.stringify(users));
        alert('注册成功！');
        login();
    }

    function login() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const user = users[username];
        if (user && user.password === password) {
            cardCollection.style.display = 'block';
            loginRegister.style.display = 'none';
            renderCards();
        } else {
            alert('用户名或密码错误！');
        }
    }

    function drawCard() {
        const card = generateCard();
        users[usernameInput.value].cards.push(card);
        localStorage.setItem('users', JSON.stringify(users));
        renderCards();
    }

    function generateCard() {
        const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        const rarity = rarities[Math.floor(Math.random() * rarities.length)];
        return {
            name: `Card ${Math.floor(Math.random() * 100)}`,
            rarity: rarity,
            attack: Math.floor(Math.random() * 10) + 1,
            health: Math.floor(Math.random() * 10) + 1
        };
    }

    function renderCards() {
        const user = users[usernameInput.value];
        cardPack.innerHTML = '';
        user.cards.forEach(card => {
            const cardElement = document.createElement('li');
            cardElement.textContent = `${card.name} - ${card.rarity} (攻击力: ${card.attack}, 生命值: ${card.health})`;
            cardPack.appendChild(cardElement);
        });
    }

    registerButton.addEventListener('click', register);
    loginButton.addEventListener('click', login);
    drawCardButton.addEventListener('click', drawCard);
});