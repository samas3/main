/* ================================================================
   1. 游戏数据与状态定义
   ================================================================
*/

// --- 游戏配置常量 ---
const POOL_CAPACITY = {
    1: 27, 2: 27, 3: 9, 4: 9, 5: 0 
};
const MAX_STAR = 4;
const SELL_MULTIPLIER_BASE = 3;

// --- 概率和费用配置 ---
const MECHANICS = {
    'bull': { cost: 1, probs: [0.30, 0.40, 0.25, 0.05, 0.00], envName: '📈 长线利好' },
    'rotation': { cost: 2, probs: [0.10, 0.80, 0.083, 0.017, 0.00], envName: '🔄 轮岗制度' }
};

// --- 角色列表 (已根据用户输入更新) ---
const HERO_LIST = [
    // --- 四星列表 (Cost: 4, Rarity: 4) ---
    { name: "灵砂", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "银狼", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "开拓者•记忆", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "知更鸟", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "杰帕德", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "波提欧", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "罗刹", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "大黑塔", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "符玄", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "遐蝶", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "彦卿", cost: 4, rarity: 4, color: "#a371f7" },
    { name: "海瑟音", cost: 4, rarity: 4, color: "#a371f7" },
    
    // --- 三星列表 (Cost: 3, Rarity: 3) ---
    { name: "那刻夏", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "镜流", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "白厄", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "忘归人", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "姬子", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "刻律德菈", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "真理医生", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "Saber", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "长夜月", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "黄泉", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "希儿", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "星期日", cost: 3, rarity: 3, color: "#58a6ff" },
    { name: "娜塔莎", cost: 3, rarity: 3, color: "#58a6ff" },
    
    // --- 二星列表 (Cost: 2, Rarity: 2) ---
    { name: "丹恒•腾荒", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "砂金", cost: 2, rarity: 2, color: "#3fb950" }, // 关键角色
    { name: "丹恒•饮月", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "花火", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "藿藿", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "缇宝", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "飞霄", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "万敌", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "银枝", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "卡芙卡", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "风堇", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "阮•梅", cost: 2, rarity: 2, color: "#3fb950" },
    { name: "佩拉", cost: 2, rarity: 2, color: "#3fb950" },

    // --- 一星列表 (Cost: 1, Rarity: 1) ---
    { name: "翡翠", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "停云", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "三月七", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "乱破", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "刃", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "艾丝妲", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "阿格莱雅", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "椒丘", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "黑塔", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "赛飞儿", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "貊泽", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "桑博", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "加拉赫", cost: 1, rarity: 1, color: "#a8a8a8" },
    { name: "青雀", cost: 1, rarity: 1, color: "#a8a8a8" },
];

// --- 全局游戏状态 ---
let gameState = {
    gold: 0,
    environment: null,
    refreshCost: 0,
    currentShop: Array(5).fill(null),
    bench: Array(15).fill(null),
    pool: {}, 
    // 金币追踪
    totalGoldSpent: 0,
    totalGoldEarned: 0 
};

// --- DOM 引用 ---
const elSetupModal = document.getElementById('setup-modal');
const elGameInterface = document.getElementById('game-interface');
const elShopCards = document.getElementById('shop-cards');
const elGoldDisplay = document.getElementById('gold-display-text');
const elRefreshCostText = document.getElementById('refresh-cost-text');
const elBtnRefresh = document.getElementById('btn-refresh');
const elInitGoldInput = document.getElementById('init-gold-input');
const elBtnCombat = document.getElementById('btn-combat');

/* ================================================================
   2. 游戏核心逻辑函数
   ================================================================
*/

/**
 * 初始化游戏状态和UI绑定
 */
function initGameLogic(env) {
    const initialGold = parseInt(elInitGoldInput.value);
    gameState.gold = initialGold;
    gameState.environment = env;
    // 重置金币追踪
    gameState.totalGoldSpent = 0;
    gameState.totalGoldEarned = 0;

    // 2. 初始化角色池
    gameState.pool = {};
    HERO_LIST.forEach(hero => {
        const capacity = POOL_CAPACITY[hero.cost] || 0;
        gameState.pool[hero.name] = capacity;
    });
    
    // 应用机制配置
    const mechanics = MECHANICS[env];
    gameState.refreshCost = mechanics.cost;

    // 绑定核心按钮
    elBtnRefresh.onclick = () => refreshShop(true); 
    elBtnCombat.onclick = showGoldStats; // 绑定出战按钮事件

    // 初始化UI
    uiUpdateGold();
    uiUpdateRefreshCost();
    refreshShop(false); 
    document.getElementById('level-display').innerText = 'Lv. 6';
}

/**
 * 刷新商店 (核心函数)
 */
function refreshShop(deductCost) {
    const mechanics = MECHANICS[gameState.environment];
    
    // 1. 费用检查和扣除
    if (deductCost) {
        if (gameState.gold < gameState.refreshCost) {
            alert("资金不足，无法进行市场刷新！");
            return;
        }
        gameState.gold -= gameState.refreshCost;
    }
    
    // 2. 权重随机抽取 5 张卡
    gameState.currentShop = [];
    for (let i = 0; i < 5; i++) {
        let selectedHero = null;
        let attempts = 0;

        while (!selectedHero && attempts < 10) { 
            const costTier = getRandomCostTier(mechanics.probs);
            const availableHeroes = HERO_LIST.filter(h => h.cost === costTier && gameState.pool[h.name] > 0);

            if (availableHeroes.length > 0) {
                const heroIndex = Math.floor(Math.random() * availableHeroes.length);
                const baseHero = availableHeroes[heroIndex];

                selectedHero = { 
                    ...baseHero, 
                    shopId: Date.now() + i, 
                    sold: false,
                    star: 1
                };
            }
            attempts++;
        }
        gameState.currentShop.push(selectedHero); 
    }

    // 3. UI 更新
    uiUpdateGold();
    uiRenderShop();
}

/**
 * 购买角色
 */
function buyHero(shopIndex) {
    const heroToBuy = gameState.currentShop[shopIndex];
    if (!heroToBuy || heroToBuy.sold) return;
    
    const cost = heroToBuy.cost;
    const emptyBenchIndex = gameState.bench.findIndex(slot => slot === null);

    // 1. 检查资金和空位
    if (gameState.gold < cost) {
        alert("资金不足！");
        return;
    }
    if (emptyBenchIndex === -1) {
        alert("备战席已满，请先出售或合成角色！");
        return;
    }
    
    // 2. 扣费和卡池操作
    gameState.gold -= cost;
    gameState.pool[heroToBuy.name]--;
    
    // 追踪金币消费
    gameState.totalGoldSpent += cost;
    
    // 3. 放置到备战席
    gameState.currentShop[shopIndex].sold = true;
    gameState.bench[emptyBenchIndex] = heroToBuy;

    // 4. 合成判定
    checkSynthesis();

    // 5. UI 更新
    uiUpdateGold();
    uiRenderShop();
    uiRenderBench();
}

/**
 * 出售角色 (点击备战席即出售)
 */
function sellHero(benchIndex) {
    const heroToSell = gameState.bench[benchIndex];
    if (!heroToSell) return;

    const star = heroToSell.star;
    const cost = heroToSell.cost;

    // 1. 计算出售金币
    let sellGold;
    
    if (star === 1) {
        sellGold = cost;
    } else {
        // 2星及以上：出售金币比合成总成本少 1
        const componentsToReturn = Math.pow(SELL_MULTIPLIER_BASE, star - 1);
        sellGold = (cost * componentsToReturn) - 1; 
    }
    
    sellGold = Math.max(0, sellGold);

    // 2. 增加金币，但不返还给卡池
    gameState.gold += sellGold;

    // 追踪金币收入
    gameState.totalGoldEarned += sellGold;

    // 3. 清空槽位
    gameState.bench[benchIndex] = null;

    // 4. UI 更新
    uiUpdateGold();
    uiRenderBench();
    console.log(`出售了 ${heroToSell.name} (${star}星)，获得 ${sellGold} 金币。卡池数量保持不变。`);
}

/**
 * 合成判定：检查备战席是否有 3 个相同的（名称+星级）角色可合成。
 * 递归执行直到无法再合成。
 */
function checkSynthesis() {
    let synthesized = false;
    let synthesizedName = null;
    let synthesizedStar = 0;   
    let synthesizedNewStar = 0;
    let synthesizedNewCost = 0; 

    // 1. 统计备战席角色
    const benchCounts = {}; 

    gameState.bench.forEach((hero, index) => {
        if (hero) {
            const key = `${hero.name}_${hero.star}`;
            if (!benchCounts[key]) {
                benchCounts[key] = [];
            }
            benchCounts[key].push(index);
        }
    });

    // 2. 检查是否有 3 个可合成
    for (const key in benchCounts) {
        const indices = benchCounts[key];
        const count = indices.length;

        if (count >= 3) {
            const star = parseInt(key.split('_')[1]);
            const name = key.split('_')[0];
            
            if (star < MAX_STAR) {
                const newStar = star + 1;
                const newHeroTemplate = HERO_LIST.find(h => h.name === name); 

                // 3. 移除旧角色并升级
                const indicesToRemove = indices.slice(0, 3);
                indicesToRemove.forEach(index => {
                    gameState.bench[index] = null; // 移除3个低星角色
                });

                // 找到第一个空位放置新角色
                const emptyBenchIndex = gameState.bench.findIndex(slot => slot === null);
                if (emptyBenchIndex !== -1) {
                    gameState.bench[emptyBenchIndex] = {
                        ...newHeroTemplate,
                        star: newStar
                    };
                } else {
                    console.error("合成成功，但备战席已满，无法放置新角色！"); 
                }

                synthesized = true;
                synthesizedName = name;
                synthesizedStar = star;
                synthesizedNewStar = newStar;
                synthesizedNewCost = newHeroTemplate.cost; 
                
                break; 
            }
        }
    }

    // 4. 机制触发：每次合成获得二星二费角色时，获得一个一星砂金
    if (synthesized && synthesizedNewStar === 2 && synthesizedNewCost === 2) {
        const sandkingTemplate = HERO_LIST.find(h => h.name === "砂金" && h.cost === 2);

        if (sandkingTemplate) {
            const emptyBenchIndex = gameState.bench.findIndex(slot => slot === null);
            
            if (emptyBenchIndex !== -1) {
                
                if (gameState.pool["砂金"] > 0) {
                    // 放置 1 星砂金
                    gameState.bench[emptyBenchIndex] = {
                        ...sandkingTemplate,
                        star: 1
                    };
                    gameState.pool["砂金"]--;
                    console.log(`套路核心触发: 合成 ${synthesizedName} (2星/2费) -> 获得 1 星砂金!`);
                } else {
                    console.log(`套路核心触发: 合成 ${synthesizedName} (2星/2费)，但砂金卡池已空，无法获得。`);
                }
            } else {
                console.warn(`套路核心触发: 合成 ${synthesizedName} (2星/2费)，但备战席已满，无法放置 1 星砂金。`);
            }
        }
    }

    // 5. 递归检查
    if (synthesized) {
        console.log(`合成成功: 3个 ${synthesizedName} (${synthesizedStar}星) -> 1个 (${synthesizedNewStar}星)!`);
        
        uiRenderBench(); 
        checkSynthesis(); 
    }
}


/**
 * 辅助函数：根据概率数组进行加权随机选择
 */
function getRandomCostTier(probabilities) {
    const rand = Math.random();
    let cumulative = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulative += probabilities[i];
        if (rand < cumulative) {
            return i + 1; 
        }
    }
    return 1;
}

/**
 * 结算数据统计函数 (已修改为只显示总收入)
 */
function showGoldStats() {
    const totalEarned = gameState.totalGoldEarned;
    
    alert(`
        --- 本次金币统计 ---
        
        总计出售获得 (收入): 💰 ${totalEarned}
    `);
}


/* ================================================================
   3. UI 渲染与更新函数
   ================================================================
*/

/**
 * 辅助函数：生成星级字符串
 */
function generateStarString(star) {
    return '⭐'.repeat(star);
}

// UI：更新金币
function uiUpdateGold() {
    elGoldDisplay.innerText = gameState.gold;
}

// UI：更新刷新费用文本
function uiUpdateRefreshCost() {
    elRefreshCostText.innerText = `消耗 ${gameState.refreshCost} 金币`;
}

// UI：渲染商店卡牌，并绑定购买事件
function uiRenderShop() {
    elShopCards.innerHTML = '';

    gameState.currentShop.forEach((hero, index) => {
        const card = document.createElement('div');
        
        if (!hero || gameState.pool[hero.name] === 0) { 
            card.className = `card rarity-1 sold-out`;
            card.innerHTML = `<div style="color: #666">池子已空</div>`;
            card.style.cursor = 'default';
        } else {
            card.className = `card rarity-${hero.rarity}`;
            card.innerHTML = `
                <div class="card-name" style="color:${hero.color}">${hero.name}</div>
                <div class="card-cost">💰 ${hero.cost}</div>
                <div style="font-size:10px; color:#8b949e;">剩余: ${gameState.pool[hero.name]}</div>
            `;
            if (!hero.sold) {
                card.onclick = () => buyHero(index); 
            } else {
                 card.classList.add('sold-out');
            }
        }
        elShopCards.appendChild(card);
    });
}

// UI：渲染备战席，并绑定出售事件 
function uiRenderBench() {
    const benchSlots = document.querySelectorAll('.bench-slot');
    
    gameState.bench.forEach((hero, index) => {
        const slot = benchSlots[index];
        slot.innerHTML = '';
        slot.onclick = null; 

        if (hero) {
            // 计算出售价格 (用于提示)
            const components = Math.pow(SELL_MULTIPLIER_BASE, hero.star - 1);
            let sellPrice;
            if (hero.star === 1) {
                sellPrice = hero.cost;
            } else {
                sellPrice = (hero.cost * components) - 1;
            }
            sellPrice = Math.max(0, sellPrice); 

            const starString = generateStarString(hero.star); 

            const piece = document.createElement('div');
            piece.className = 'chess-piece';
            
            piece.style.backgroundColor = hero.color;
            piece.style.width = '75px';
            piece.style.height = '75px';
            piece.style.borderRadius = '8px';
            piece.style.border = `${hero.star}px solid gold`; 
            piece.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.5)';
            piece.style.display = 'flex';
            piece.style.flexDirection = 'column'; 
            piece.style.justifyContent = 'center';
            piece.style.alignItems = 'center';
            piece.style.position = 'relative';
            piece.style.padding = '5px 0';

            piece.innerHTML = `
                <div style="font-size:12px; font-weight:bold; color:white; text-shadow: 0 0 2px black;">
                    ${hero.name}
                </div>
                <div style="font-size:14px; color:yellow; margin-top:2px; line-height:1;">
                    ${starString}
                </div>
            `;

            slot.appendChild(piece);
            
            // 绑定出售事件
            slot.onclick = () => sellHero(index);
            slot.title = `出售 ${hero.name} (${hero.star}星)，获得 ${sellPrice} 💰 (点击出售)`;

        }
    });
}


// --- 纯 UI 交互逻辑 (保留) ---

let selectedEnvironment = null;

function uiSelectEnv(type) {
    selectedEnvironment = type;
    document.querySelectorAll('.env-card').forEach(el => el.classList.remove('selected'));
    document.getElementById(`card-${type}`).classList.add('selected');
}

function uiSwitchToGame() {
    const inputGold = parseInt(elInitGoldInput.value);
    
    if (isNaN(inputGold) || inputGold < 0 || !selectedEnvironment) {
        alert("请检查：资金需为有效数字，且需选择投资环境！");
        return;
    }

    initGameLogic(selectedEnvironment); 

    elSetupModal.style.display = 'none';
    elGameInterface.style.display = 'flex';
    
    const envBadge = document.getElementById('env-badge');
    envBadge.innerText = MECHANICS[selectedEnvironment].envName;
    envBadge.style.backgroundColor = selectedEnvironment === 'bull' ? '#238636' : '#1f6feb';
    
    initBenchUI();
    uiRenderBench(); 
}

// 备战席 UI 初始化 (6 + 9 结构)
function initBenchUI() {
    const row1 = document.getElementById('bench-row-1');
    const row2 = document.getElementById('bench-row-2');
    row1.innerHTML = '';
    row2.innerHTML = '';

    let totalSlots = 0;
    for(let i=0; i<6; i++) { row1.appendChild(createBenchSlot(totalSlots + i)); }
    totalSlots += 6;
    for(let i=0; i<9; i++) { row2.appendChild(createBenchSlot(totalSlots + i)); }
}

function createBenchSlot(index) {
    const slot = document.createElement('div');
    slot.className = 'bench-slot';
    slot.id = `bench-ui-${index}`; 
    return slot;
}