document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const cardContainer = document.getElementById('cardContainer');
    let cardCount = 0;
    const maxDraws = 4;

    const cards = [
        
        { name: '🖤白银🖤[坑上家]', description: '随机抽取上家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[坑上家]', description: '随机抽取上家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[坑上家]', description: '随机抽取上家3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[抓咸菜]', description: '随机抽取牌库中1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[抓咸菜]', description: '随机抽取牌库中2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[抓咸菜]', description: '随机抽取牌库中3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果选择的人没有炸弹的话倒贴1个炸弹给对方，自己也没有炸弹海克斯作废。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果选择的人没有炸弹就收取失败。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[心态炸了]', description: '收取上家1个炸弹，返还3张或3张以上自己不要的牌，如果没有炸弹用最大的3张牌代替。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[溜了溜了]', description: '选择1张牌扔掉。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[溜了溜了]', description: '选择2张牌扔掉。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[溜了溜了]', description: '选择3张牌扔掉。', rarity: 'vibrant', probability: 0.1 },

        { name: '🤍白银🤍[炸弹翻倍]', description: '本局只需使用1次炸弹积分翻1倍。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[炸弹翻倍]', description: '本局只需使用1次炸弹积分翻2倍。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[炸弹翻倍]', description: '本局只需使用1次炸弹积分翻3倍。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[公平交易]', description: '和上家互相交换1张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[公平交易]', description: '和上家互相交换2张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[公平交易]', description: '和上家互相交换3张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[坐牢]', description: '本局没有任何海克斯效果，并且扣除5积分，刷新海克斯不扣5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[坐牢]', description: '本局没有任何海克斯效果，但奖励5积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[坐牢]', description: '重置所有人的海克斯科技，但是没有任何奖励。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[禁言]', description: '禁止出牌1回合，1回合后从已出牌库中任选1张牌，也可以不选。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[禁言]', description: '禁止出牌2回合，2回合后从已出牌库中任选2张牌，也可以不选。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[禁言]', description: '禁止出牌3回合，3回合后从已出牌库中任选3张牌，也可以不选。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[预言家]', description: '你的上家只对你1个人明牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[预言家]', description: '你的上家对所有人明牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[预言家]', description: '你的上家和下家都对所有人明牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[妙手回春]', description: '给上家1张自己不想要的牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[妙手回春]', description: '给上家2张自己不想要的牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[妙手回春]', description: '给上家3张自己不想要的牌。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '🖤白银🖤[炒冷饭]', description: '本局任何时候都可以在已出的牌库中选1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[炒冷饭]', description: '本局任何时候都可以在已出的牌库中选2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[炒冷饭]', description: '本局任何时候都可以在已出的牌库中选3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[先手优势]', description: '开局优先抓牌和出牌，在牌库中随机摸1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[先手优势]', description: '开局优先抓牌和出牌，在牌库中随机摸2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[先手优势]', description: '开局优先抓牌和出牌，在牌库中任意选2张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[小偷小摸]', description: '出1次炸弹可以随机偷1次积分池中的积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[小偷小摸]', description: '出1次炸弹可以随机偷2次积分池中的积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[小偷小摸]', description: '出1次炸弹可以随机偷3次积分池中的积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[走为上策]', description: '第1个出完牌的话，积分另外加5。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[走为上策]', description: '第1个出完牌的话，积分另外加10。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[走为上策]', description: '第1个出完牌的话，积分另外加20。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[军火商]', description: '可以使用5积分当作无敌炸弹，一局能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[军火商]', description: '可以使用5积分当作无敌炸弹，一局能使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[军火商]', description: '可以使用5积分当作无敌炸弹，一局能使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意1张牌，无限次数。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意2张牌，无限次数。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意3张牌，无限次数。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[搞破坏]', description: '随机扔掉上家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[搞破坏]', description: '随机扔掉上家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[搞破坏]', description: '随机扔掉上家3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[拆卸器]', description: '拆除上家抽到的海克斯科技为己用。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[拆卸器]', description: '把上家和下家的海克斯科技全部拆走。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[拆卸器]', description: '拆走全部人的海克斯科技并禁用刷新。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[模仿秀]', description: '任何时候都可以模仿1次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[模仿秀]', description: '任何时候都可以模仿2次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[模仿秀]', description: '任何时候都可以模仿3次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[贼不走空]', description: '偷上家5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[贼不走空]', description: '偷上家10积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[贼不走空]', description: '偷上家20积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[黏性炸药]', description: '第1次出炸弹的时候可以额外带1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[黏性炸药]', description: '第1次出炸弹的时候可以额外带2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[黏性炸药]', description: '第1次出炸弹的时候可以额外带3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[盗版炸弹]', description: '任意3张牌当炸弹用，只能用来炸普通牌，对正版炸弹不生效。一局只能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[盗版炸弹]', description: '任意3张牌当炸弹用，对正版炸弹生效，永远比正版炸弹大1个级别。一局只能使用1次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[盗版炸弹]', description: '任意3张牌当炸弹用，比王炸大，但比军火商的无敌炸弹弱。一局只能使用1次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[执法官]', description: '本局在已出的牌库中强制拿走任何人的1个炸弹。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[执法官]', description: '本局在已出的牌库中强制拿走任何人的2个炸弹。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[执法官]', description: '本局在已出的牌库中强制拿走任何人的3个炸弹。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[进化]', description: '任意1个炸弹变为王炸。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[进化]', description: '任意2个炸弹变为王炸。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[进化]', description: '任意3个炸弹变为王炸。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[炸翻积分池]', description: '本局每使用1次炸弹积分加5。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[炸翻积分池]', description: '本局每使用1次炸弹积分加10。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[炸翻积分池]', description: '本局每使用1次炸弹积分加20。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[强制交易]', description: '强制使用5积分购买上家1个炸弹，如果没有炸弹或者炸弹不够则交易失败，无需支付积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[强制交易]', description: '强制使用10积分购买上家2个炸弹，如果没有炸弹或者炸弹不够则交易失败，无需支付积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[强制交易]', description: '强制使用15积分购买上家3个炸弹，如果没有炸弹或者炸弹不够则交易失败，无需支付积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[吸血鬼]', description: '本局自选上家1张牌，上家没有则吸血失败。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[吸血鬼]', description: '本局自选上家2张牌，上家没有则吸血失败。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[吸血鬼]', description: '本局自选上家3张牌，上家没有则吸血失败。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[丢垃圾]', description: '本局可以丢弃1张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[丢垃圾]', description: '本局可以丢弃2张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[丢垃圾]', description: '本局可以丢弃3张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[狸猫换太子]', description: '本局可以拿出自己1张不要的牌换已出牌库中的任意1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[狸猫换太子]', description: '本局可以拿出自己2张不要的牌换已出牌库中的任意2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[狸猫换太子]', description: '本局可以拿出自己3张不要的牌换已出牌库中的任意3张牌。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '🖤白银🖤[有内鬼终止交易]', description: '本局只要出1个炸弹，扣除5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[有内鬼终止交易]', description: '本局只要出1个炸弹，扣除10积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[有内鬼终止交易]', description: '本局只要出1个炸弹，扣除20积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻1倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻2倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻3倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'vibrant', probability: 0.1 },

        

        
    ];

    function drawCard() {
        if (cardCount >= maxDraws) {
            cardContainer.innerHTML = '';
            cardCount = 0;
            alert('本局游戏结束，重置海克斯！');
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
            <h3>${card.name} ·${count}号玩家·</h3>
            <p>${card.description}</p>
        `;
        cardContainer.appendChild(cardElement);
    }

    drawButton.addEventListener('click', drawCard);
});
