document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const cardContainer = document.getElementById('cardContainer');

    // 示例卡牌数据，包括稀有度和概率
    const cards = [
        { name: '白银[坑下家]', description: '随机抽取下家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[坑下家]', description: '随机抽取下家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[坑下家]', description: '随机抽取下家3张牌。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '白银[坑上家]', description: '随机抽取上家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[坑上家]', description: '随机抽取上家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[坑上家]', description: '随机抽取上家3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[抓咸菜]', description: '随机抽取牌库中1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[抓咸菜]', description: '随机抽取牌库中2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[抓咸菜]', description: '随机抽取牌库中3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[心态炸了]', description: '收取其中一人手中1个炸弹，没有炸弹收取失败后倒贴一个炸弹给对方，自己也没有就作废。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[心态炸了]', description: '收取所有人手中1个炸弹，其他人没有炸弹就收取失败。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[心态炸了]', description: '收取所有人手中1个炸弹，没有炸弹用最大的四张牌代替。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[溜了溜了]', description: '选择1张手牌扔掉。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[溜了溜了]', description: '选择2张手牌扔掉。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[溜了溜了]', description: '选择3张手牌扔掉。', rarity: 'vibrant', probability: 0.1 },
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
