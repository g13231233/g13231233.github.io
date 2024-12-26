document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const cardContainer = document.getElementById('cardContainer');

    // 示例卡牌数据，包括稀有度和概率
    const cards = [
        { name: '白银', description: '抽取下家一张牌。', rarity: 'silver', probability: 0.6 },
        { name: '白银', description: '抽取上家一张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金', description: '抽取牌库中三张牌。', rarity: 'gold', probability: 0.3 },
        { name: '黄金', description: '选择三张手牌扔掉。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩', description: '每个人给自己一个炸弹。', rarity: 'vibrant', probability: 0.1 }
    ];

    function drawCard() {
        const totalProbability = cards.reduce((acc, card) => acc + card.probability, 0);
        const random = Math.random() * totalProbability;
        
        let cumulativeProbability = 0;
        
        for (const card of cards) {
            cumulativeProbability += card.probability;
            if (random <= cumulativeProbability) {
                showCard(card);
                break;
            }
        }
    }

    function showCard(card) {
        // 清空容器中的旧卡牌
        cardContainer.innerHTML = '';
        // 创建新卡牌元素
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.rarity}`;
        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        `;
        // 将新卡牌添加到容器中
        cardContainer.appendChild(cardElement);
    }

    drawButton.addEventListener('click', drawCard);
});
