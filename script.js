document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const cardContainer = document.getElementById('cardContainer');
    let cardCount = 0;
    const maxDraws = 4;

    const cards = [
        
        { name: '白银[坑上家]', description: '随机抽取上家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[坑上家]', description: '随机抽取上家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[坑上家]', description: '随机抽取上家3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[抓咸菜]', description: '随机抽取牌库中1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[抓咸菜]', description: '随机抽取牌库中2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[抓咸菜]', description: '随机抽取牌库中3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果选择的人没有炸弹的话倒贴一个炸弹给对方，自己也没有炸弹海克斯作废。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果选择的人没有炸弹就收取失败。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果没有炸弹用最大的3张牌代替。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[溜了溜了]', description: '选择1张牌扔掉。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[溜了溜了]', description: '选择2张牌扔掉。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[溜了溜了]', description: '选择3张牌扔掉。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[炸弹翻倍]', description: '本局任意使用1次炸弹积分翻1倍。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[炸弹翻倍]', description: '本局任意使用1次炸弹积分翻2倍。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[炸弹翻倍]', description: '本局任意使用1次炸弹积分翻3倍。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[公平交易]', description: '和上家互相交换1张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[公平交易]', description: '和上家互相交换2张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[公平交易]', description: '和上家互相交换3张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[坐牢]', description: '本局没有任何海克斯效果，但奖励5积分。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[坐牢]', description: '本局没有任何海克斯效果，但奖励10积分。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[坐牢]', description: '重置所有人的海克斯科技，但是没有任何奖励。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[禁言]', description: '上家禁止出牌1回合，但被禁言的人可以从已出牌库中随机抽1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[禁言]', description: '上家禁止出牌2回合，但被禁言的人可以从已出牌库中随机抽2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[禁言]', description: '上家禁止出牌3回合，但被禁言的人可以从已出牌库中随机抽3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[预言家]', description: '看上家牌3秒。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[预言家]', description: '除了自己外其他全部玩家名牌5秒。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[预言家]', description: '随机选择一个人从头到尾明牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[妙手回春]', description: '给上家1张自己不想要的牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[妙手回春]', description: '给上家2张自己不想要的牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[妙手回春]', description: '给上家3张自己不想要的牌。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '白银[炒冷饭]', description: '任何时候都可以在已出的牌库中选1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[炒冷饭]', description: '任何时候都可以在已出的牌库中选2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[炒冷饭]', description: '任何时候都可以在已出的牌库中选3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[先手优势]', description: '开局优先抓牌和出牌，在牌库中随机摸1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[先手优势]', description: '开局优先抓牌和出牌，在牌库中随机摸2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[先手优势]', description: '开局优先抓牌和出牌，在牌库中任意选2张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '白银[小偷小摸]', description: '出1次炸弹可以随机偷1次积分池中的积分。', rarity: 'silver', probability: 0.6 },
        { name: '黄金[小偷小摸]', description: '出1次炸弹可以随机偷2次积分池中的积分。', rarity: 'gold', probability: 0.3 },
        { name: '棱彩[小偷小摸]', description: '出1次炸弹可以随机偷3次积分池中的积分。', rarity: 'vibrant', probability: 0.1 },
        
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
