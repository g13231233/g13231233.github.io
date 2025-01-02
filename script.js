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

        { name: '🖤白银🖤[炸弹翻倍]', description: '本局使用1次炸弹积分翻1倍，只生效1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[炸弹翻倍]', description: '本局使用1次炸弹积分翻2倍，只生效1次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[炸弹翻倍]', description: '本局使用1次炸弹积分翻3倍，只生效1次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[公平交易]', description: '和上家互相交换1张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[公平交易]', description: '和上家互相交换2张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[公平交易]', description: '和上家互相交换3张牌，双方不允许交流，选好牌背面朝上交易。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[坐牢]', description: '本局没有任何海克斯效果，并且扣除5积分，刷新海克斯不扣5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[坐牢]', description: '本局没有任何海克斯效果，但奖励5积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[坐牢]', description: '重置所有人的海克斯科技，但是没有任何奖励。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[禁言]', description: '禁止出牌1回合，1回合后从已出牌库中任选1张牌，也可以不禁言不选。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[禁言]', description: '禁止出牌2回合，2回合后从已出牌库中任选2张牌，也可以不禁言不选。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[禁言]', description: '禁止出牌3回合，3回合后从已出牌库中任选3张牌，也可以不禁言不选。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[预言家]', description: '你的上家把所有炸弹都明牌放在备战席。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[预言家]', description: '你的上家和下家把所有炸弹都明牌放在备战席。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[预言家]', description: '除自己外所有人把炸弹都明牌放在备战席，另外每个人都任意给自己1张牌。', rarity: 'vibrant', probability: 0.1 },

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

        { name: '🖤白银🖤[锦上添花]', description: '第1个出完牌的话，积分另外加5。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[锦上添花]', description: '第1个出完牌的话，积分另外加10。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[锦上添花]', description: '第1个出完牌的话，积分另外加20。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[军火商]', description: '可以使用5积分当作无敌炸弹，每局能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[军火商]', description: '可以使用5积分当作无敌炸弹，每局能使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[军火商]', description: '可以使用5积分当作无敌炸弹，每局能使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意1张牌，无限次数。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意2张牌，无限次数。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[妮寇复制器]', description: '可以使用5积分复制1次已出牌库中的任意3张牌，无限次数。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[搞破坏]', description: '随机扔掉上家1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[搞破坏]', description: '随机扔掉上家2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[搞破坏]', description: '随机扔掉上家3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[拆卸器]', description: '拆除上家抽到的海克斯科技为己用，没有上家则失效。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[拆卸器]', description: '把上家和下家的海克斯科技全部拆走自己用，没有上家的话只能拆下家。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[拆卸器]', description: '拆走所有人的海克斯科技自己用并禁用刷新。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[模仿秀]', description: '任何时候都可以模仿1次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[模仿秀]', description: '任何时候都可以模仿2次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[模仿秀]', description: '任何时候都可以模仿3次其他人出的牌，比如：其他人出345，自己也可以随时打出345。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[贼不走空]', description: '偷上家5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[贼不走空]', description: '偷上家和下家各5积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[贼不走空]', description: '偷在场玩家每人10积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[黏性炸药]', description: '出炸弹的时候可以额外带1张牌，每局只能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[黏性炸药]', description: '出炸弹的时候可以额外带2张牌，每局只能使用1次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[黏性炸药]', description: '出炸弹的时候可以额外带3张牌，每局只能使用1次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[盗版炸弹]', description: '任意3张牌当炸弹用，只能用来炸普通牌，对正版炸弹不生效。每局只能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[盗版炸弹]', description: '任意3张牌当炸弹用，对正版炸弹生效，永远比正版炸弹大1个级别。每局只能使用1次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[盗版炸弹]', description: '任意3张牌当炸弹用，比王炸大，但比军火商的无敌炸弹弱。每局只能使用1次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[执法官]', description: '本局在已出的牌库中强制拿走任何人的1个炸弹。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[执法官]', description: '本局在已出的牌库中强制拿走任何人的2个炸弹。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[执法官]', description: '本局在已出的牌库中强制拿走任何人的3个炸弹。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[进化]', description: '任意1个炸弹变为王炸。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[进化]', description: '任意2个炸弹变为王炸。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[进化]', description: '任意3个炸弹变为王炸。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[点金器]', description: '本局每使用1次炸弹积分加5。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[点金器]', description: '本局每使用1次炸弹积分加10。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[点金器]', description: '本局每使用1次炸弹积分加20。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[强制交易]', description: '强制使用5积分购买上家1个炸弹，如果没有炸弹或者炸弹不够则交易失败也就无需支付积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[强制交易]', description: '强制使用5积分购买上家2个炸弹，如果没有炸弹或者炸弹不够则交易失败也就无需支付积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[强制交易]', description: '强制使用5积分购买上家3个炸弹，炸弹不够的话有1个给1个，有2个给2个。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[吸血鬼]', description: '本局口头自选上家1张牌，大小王不能吸，上家没有则吸血失败。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[吸血鬼]', description: '本局口头自选上家2张牌，大小王不能吸，上家没有则吸血失败。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[吸血鬼]', description: '本局口头自选上家3张牌，大小王不能吸，上家没有则吸血失败。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[丢垃圾]', description: '本局可以丢弃1张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[丢垃圾]', description: '本局可以丢弃2张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[丢垃圾]', description: '本局可以丢弃3张牌，其他人可以捡走，没人要的牌作废，请按顺序捡垃圾。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[狸猫换太子]', description: '本局可以拿出自己1张不要的牌换已出牌库中的任意1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[狸猫换太子]', description: '本局可以拿出自己2张不要的牌换已出牌库中的任意2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[狸猫换太子]', description: '本局可以拿出自己3张不要的牌换已出牌库中的任意3张牌。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '🖤白银🖤[有内鬼终止交易]', description: '本局每出1个炸弹，扣除5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[有内鬼终止交易]', description: '本局每出1个炸弹，扣除10积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[有内鬼终止交易]', description: '本局每出1个炸弹，扣除20积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻1倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻2倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[超级加倍]', description: '把自己任意数量的积分放到积分池，挑战获得第1名积分翻3倍，挑战失败积分消失，不可放弃挑战，可刷新海克斯。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[篡改数据]', description: '强制把上家海克斯删除，在牌库随机抽1张牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[篡改数据]', description: '强制把上家和下家海克斯删除，在牌库随机抽2张牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[篡改数据]', description: '强制把所有人海克斯删除，在牌库随机抽3张牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[驯龙大师]', description: '把任意1张王放在备战席，3回合后加上任意1张牌组成王炸。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[驯龙大师]', description: '把任意1张王放在备战席，2回合后加上任意1张牌组成王炸。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[驯龙大师]', description: '把任意1张王放在备战席，1回合后加上任意1张牌组成王炸。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[制裁者]', description: '本局第1个出炸弹的人你可以随机抽他手中1张牌自己用，每局只能抽1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[制裁者]', description: '本局第1个出炸弹的人你可以随机抽他手中2张牌自己用，每局只能抽1次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[制裁者]', description: '本局第1个出炸弹的人你可以随机抽他手中3张牌自己用，每局只能抽1次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[七天无理由]', description: '本局可以在上家手里随机抽1张牌，不想要的牌可以还回去。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[七天无理由]', description: '本局可以在上家手里随机抽2张牌，不想要的牌可以还回去。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[七天无理由]', description: '本局可以在上家手里随机抽3张牌，不想要的牌可以还回去。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[拆弹专家]', description: '给上家5积分让他任意扔掉1个炸弹，如果没有炸弹积分不退，可以不用。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[拆弹专家]', description: '给上家5积分让他任意扔掉2个炸弹，有几个仍几个，如果没有炸弹积分不退，可以不用。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[拆弹专家]', description: '给上家5积分让他任意扔掉3个炸弹，有几个仍几个，如果没有炸弹积分不退，可以不用。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[指挥官]', description: '强制指挥上家收回刚出的牌1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[指挥官]', description: '强制指挥上家收回刚出的牌2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[指挥官]', description: '强制指挥上家收回刚出的牌3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[幸运大奖]', description: '在积分池随机抽出3个积分币，如果抽出3个同样面额的积分币就可以拿走其中1个积分币，其他情况积分币都放回积分池。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[幸运大奖]', description: '在积分池随机抽出3个积分币，如果抽出3个同样面额的积分币就可以拿走其中1个积分币，其他情况积分币都放回积分池。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[幸运大奖]', description: '在积分池随机抽出3个积分币，如果抽出3个同样面额的积分币就可以拿走其中1个积分币，其他情况积分币都放回积分池。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[克隆实验室]', description: '克隆任意1个人的海克斯，遇见不想克隆的可以放弃。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[克隆实验室]', description: '克隆任意2个人的海克斯，遇见不想克隆的可以放弃。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[克隆实验室]', description: '克隆任意3个人的海克斯，遇见不想克隆的可以放弃。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[老八保底]', description: '如果自己是最后1名，保底积分加5，如果不是最后1名则失效。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[老八保底]', description: '如果自己是最后1名，保底积分加10，如果不是最后1名则失效。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[老八保底]', description: '如果自己是最后1名，保底积分加20，如果不是最后1名则失效。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[约德尔人]', description: '每回合必须从已出牌库中拿走1张最小的牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[约德尔人]', description: '每回合必须从已出牌库中拿走2张最小的牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[约德尔人]', description: '每回合必须从已出牌库中拿走3张最小的牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[两极反转]', description: '除了炸弹外，强制改变牌型，比如：上家出了连子，你可以出任意对子改变牌型，不能出同牌型，每局能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[两极反转]', description: '除了炸弹外，强制改变牌型，比如：上家出了连子，你可以出任意对子改变牌型，不能出同牌型，每局能使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[两极反转]', description: '除了炸弹外，强制改变牌型，比如：上家出了连子，你可以出任意对子改变牌型，不能出同牌型，每局能使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[真假美猴王]', description: '选择任意1张牌可以当做小王使用，小王的功能它都有，但不能当王炸出，每局可以使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[真假美猴王]', description: '选择任意1张牌可以当做小王使用，小王的功能它都有，但不能当王炸出，每局可以使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[真假美猴王]', description: '选择任意1张牌可以当做小王使用，小王的功能它都有，但不能当王炸出，每局可以使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[卧底炸弹]', description: '其他人出的炸弹可以说是自己出的卧底炸弹，别人压不上的话，自己就可以接着出任意牌型，每局能用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[卧底炸弹]', description: '其他人出的炸弹可以说是自己出的卧底炸弹，别人压不上的话，自己就可以接着出任意牌型，每局能用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[卧底炸弹]', description: '其他人出的炸弹可以说是自己出的卧底炸弹，别人压不上的话，自己就可以接着出任意牌型，每局能用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[买定离手]', description: '无论谁使用了炸弹你都可以在刚出的炸弹中任意选择1张牌，让其他人猜花色，猜对的人给他5积分，猜错的人给你5积分，每局只能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[买定离手]', description: '无论谁使用了炸弹你都可以在刚出的炸弹中任意选择1张牌，让其他人猜花色，猜对的人给他5积分，猜错的人给你5积分，每局只能使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[买定离手]', description: '无论谁使用了炸弹你都可以在刚出的炸弹中任意选择1张牌，让其他人猜花色，猜对的人给他5积分，猜错的人给你5积分，每局只能使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[最强防御]', description: '可以选择性防御其他人对自己使用的一切负面被动效果，每局能防御1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[最强防御]', description: '可以选择性防御其他人对自己使用的一切负面被动效果，每局能防御2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[最强防御]', description: '可以选择性防御其他人对自己使用的一切负面被动效果，每局能防御3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[灵魂互换]', description: '强制你和上家交换所有手牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[灵魂互换]', description: '强制所有人互相交换手牌给上家。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[灵魂互换]', description: '所有人互相交换手牌给上家，任何人都可以选择不换。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[变形重组器]', description: '任何时候都可以把手中的牌放入已出牌库中打乱重新抓同样数量的牌，每局能使用1次。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[变形重组器]', description: '任何时候都可以把手中的牌放入已出牌库中打乱重新抓同样数量的牌，每局能使用2次。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[变形重组器]', description: '任何时候都可以把手中的牌放入已出牌库中打乱重新抓同样数量的牌，每局能使用3次。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[魔法攻击]', description: '本局只能通过花色来出牌，无论别人出了多大的牌，无论什么牌型，你需要出同样数量同样花色的牌就能管上，比如：上家出345，你出任意3张牌只要花色一样就行，每回合都需要报牌，大小王不能王炸但可以是任意花色。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[魔法攻击]', description: '本局只能通过花色来出牌，无论别人出了多大的牌，无论什么牌型，你只需要出同样数量的牌就能管上，不用看花色，比如：上家出345，你出任意3张牌就行，每回合都需要报牌，大小王不能炸功能全部失效。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[魔法攻击]', description: '本局只能通过花色来出牌，无论别人出了多大的牌，无论什么牌型，你只需要出同样数量的牌就能管上，比如：上家出345，你出任意3张牌就行，不需要报牌，大小王不能炸功能全部失效。', rarity: 'vibrant', probability: 0.1 },
        
        { name: '🖤白银🖤[慈善家]', description: '本局如果没拿前2名，送在场每人5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[慈善家]', description: '本局如果没拿前2名，送在场每人10积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[慈善家]', description: '本局如果没拿前2名，送在场每人20积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[撤股跑路]', description: '拿走第1名本局总积分收益的50%。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[撤股跑路]', description: '拿走前2名本局总积分收益的50%。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[撤股跑路]', description: '拿走所有人本局获得的积分。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[梭哈]', description: '本局没有系统积分奖励，所有人把桌面上的积分都放在一起，第1名把全部面额是20积分的拿走，第2名把全部面额是10积分的拿走，第3名把全部面额是5积分的拿走，第4没有。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[梭哈]', description: '本局没有系统积分奖励，所有人把桌面上的积分都放在一起，第1名把全部面额是20积分的拿走，第2名把全部面额是10积分的拿走，第3名把全部面额是5积分的拿走，第4没有。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[梭哈]', description: '本局没有系统积分奖励，所有人把桌面上的积分都放在一起，第1名把全部面额是20积分的拿走，第2名把全部面额是10积分的拿走，第3名把全部面额是5积分的拿走，第4没有。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[权势滔天]', description: '本局4人打的话随机抽14张牌丢弃，3个人打丢9张，有大王或小王的人可以在丢弃的牌库中自选1张牌，大王优先选，大小王都在1个人手里的话可以拿走所有丢弃的牌。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[权势滔天]', description: '本局4人打的话随机抽14张牌丢弃，3个人打丢9张，有大王或小王的人可以在丢弃的牌库中自选2张牌，大王优先选，大小王都在1个人手里的话可以拿走所有丢弃的牌。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[权势滔天]', description: '本局4人打的话随机抽14张牌丢弃，3个人打丢9张，有大王或小王的人可以在丢弃的牌库中自选3张牌，大王优先选，大小王都在1个人手里的话可以拿走所有丢弃的牌。', rarity: 'vibrant', probability: 0.1 },

        { name: '🖤白银🖤[财神降临]', description: '奖励在场每个人5积分。', rarity: 'silver', probability: 0.6 },
        { name: '💛黄金💛[财神降临]', description: '奖励在场每个人10积分。', rarity: 'gold', probability: 0.3 },
        { name: '💜棱彩💜[财神降临]', description: '奖励在场每个人20积分。', rarity: 'vibrant', probability: 0.1 },


        
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
