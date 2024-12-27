document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const cardContainer = document.getElementById('cardContainer');
    let cardCount = 0;
    const maxDraws = 4;

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

        { name: '白银[心态炸了]', description: '选择一个人收取1个炸弹，返还四张自己不要的牌，如果选择的人没有炸弹的话倒贴一个炸弹给对方，自己也没有炸弹海克斯作废。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[心态炸了]', description: '选择一个人收取1个炸弹，返还四张自己不要的牌，如果选择的人没有炸弹就收取失败。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[心态炸了]', description: '选择一个人收取1个炸弹，返还四张自己不要的牌，如果没有炸弹用最大的四张牌代替。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[溜了溜了]', description: '选择1张牌扔掉。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[溜了溜了]', description: '选择2张牌扔掉。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[溜了溜了]', description: '选择3张牌扔掉。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[炸弹翻倍]', description: '本局使用1次炸弹积分翻1倍。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[炸弹翻倍]', description: '本局使用2次炸弹积分翻2倍。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[炸弹翻倍]', description: '本局使用3次炸弹积分翻3倍。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[公平交易]', description: '选择一个人互相交换1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[公平交易]', description: '选择一个人互相交换2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[公平交易]', description: '选择一个人互相交换3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[坐牢]', description: '本局没有任何海克斯效果。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[坐牢]', description: '本局没有任何海克斯效果。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[坐牢]', description: '本局没有任何海克斯效果。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[禁言]', description: '选择一个人禁止出牌1回合，但被禁言的人每回合可以从牌库中抽1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[禁言]', description: '选择一个人禁止出牌2回合，但被禁言的人每回合可以从牌库中抽2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[禁言]', description: '选择一个人禁止出牌3回合，但被禁言的人每回合可以从牌库中抽3张牌。', rarity: 'vibrant', probability: 0.1 },
    ];

    function drawCard() {
        if (cardCount >= maxDraws) {
            cardContainer.innerHTML = '';
            cardCount = 0;
            alert('抽卡记录已重置！');
            return;
        }

        const totalProbability = cards.reduce((acc, card) => acc + card.probability, 0);
        const random = Math.random() * totalProbability;
        let cumulativeProbability = 0;

        for (const card of cards) {
            cumulativeProbability += card.probability;
            if (random <= cumulativeProbability) {
                showCard(card, ++cardCount);
                break;
            }
        }
    }

    function showCard(card, count) {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.rarity}`;
        cardElement.innerHTML = `
            <h3>${card.name} 玩家${count}</h3>
            <p>${card.description}</p>
        `;
        cardContainer.appendChild(cardElement);
    }

    drawButton.addEventListener('click', drawCard);
});
