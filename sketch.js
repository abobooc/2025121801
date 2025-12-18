// 簡易問答題 (multiple-choice) + p5.js 視覺化分數

let finalScore = 0;
let maxScore = 0;
let scoreText = "";

// 是非題題庫（防災主題，共 26 題，來自使用者提供）
let questions = [
    { q: '看到外面刮大風下大雨，就是有颱風來了。', answer: false, hint: '強風大雨不一定都是颱風，也可能是鋒面或豪雨。', explain: '強風大雨不一定代表颱風，也可能是其他天氣系統造成。' },
    { q: '全球暖化會使地球溫度越來越高。', answer: true, hint: '暖化代表整體氣溫上升。', explain: '全球平均溫度上升稱為全球暖化，會影響氣候系統。' },
    { q: '天然災害是指大自然力量威脅到人類生活環境、生命財產安全。', answer: true, hint: '重點是自然力量造成的危害。', explain: '天然災害為自然現象對人類造成的威脅或損害。' },
    { q: '台灣的海岸地區不會發生海嘯。', answer: false, hint: '台灣位在地震帶附近。', explain: '若發生海底地震或地形位移，台灣海岸也可能遭受海嘯。' },
    { q: '看到大樓有大量濃煙冒出，表示該大樓很可能發生火災。', answer: true, hint: '濃煙通常來自燃燒。', explain: '濃煙常是燃燒物產生，需提高警覺並避難。' },
    { q: '台灣常常發生地震大多是因為地殼釋放出多餘的能量。', answer: true, hint: '地殼運動會釋放能量形成地震。', explain: '地殼內能量釋放會以震波的形式表現為地震。' },
    { q: '每年7到9月颱風特別容易侵襲台灣。', answer: true, hint: '這段時間是台灣颱風季。', explain: '夏季為颱風生成與侵襲的高峰期。' },
    { q: '聞到怪味可能是瓦斯味，應打開門窗讓空氣流通。', answer: true, hint: '避免瓦斯累積最重要。', explain: '如疑似瓦斯外洩應迅速通風並遠離火源。' },
    { q: '全球暖化不會對人類造成危害。', answer: false, hint: '全球暖化會影響氣候、健康與生活。', explain: '全球暖化會導致極端氣候、海平面上升與生態影響。' },
    { q: '身體潮濕時應避免碰觸電器和插座。', answer: true, hint: '水會增加觸電風險。', explain: '水傳導電流，潮濕狀態下使用電器易有觸電風險。' },
    { q: '火災產生的煙霧會讓人呼吸困難。', answer: true, hint: '煙霧比火更容易傷人。', explain: '煙霧含有有害氣體且會阻礙呼吸，應遠離並戴口罩或撤離。' },
    { q: '全球暖化影響下，疾病等問題會越來越嚴重。', answer: true, hint: '氣候變化影響病菌與傳染病。', explain: '氣候變遷會改變病媒與疾病傳播條件。' },
    { q: '全球暖化會使海平面上升並淹沒城市。', answer: true, hint: '冰川融化導致海水上升。', explain: '冰層融化與熱膨脹會造成平均海平面上升。' },
    { q: '使用電熱器要遠離易燃物品以防火災。', answer: true, hint: '高溫容易引燃物品。', explain: '電熱器周圍應留空間並遠離紙張或布料。' },
    { q: '海水突然下降露出大片沙灘，可能是海嘯前兆。', answer: true, hint: '海嘯前海水會異常後退。', explain: '若發現海水異常退卻，應立即遠離海岸並往高處避難。' },
    { q: '坡面出現整齊裂縫可能是地形改變徵兆。', answer: true, hint: '山坡滑動前會出現裂縫。', explain: '地表裂縫可能預示土石滑動風險，應注意撤離。' },
    { q: '樹木或電線桿傾斜代表斜坡曾滑動。', answer: true, hint: '地面移動會影響上方物體。', explain: '傾斜結構可能代表地下土體已發生位移。' },
    { q: '海嘯只會發生在其他國家，台灣不會發生。', answer: false, hint: '只要有海底地震就可能發生海嘯。', explain: '台灣周邊海域也會發生地震，因此有海嘯風險。' },
    { q: '燃燒紙錢會產生二氧化碳，使地球更熱。', answer: true, hint: '二氧化碳是溫室氣體。', explain: '燃燒會排放二氧化碳等溫室氣體，長期累積影響氣候。' },
    { q: '雷雨時不應躲在樹下，以免遭雷擊。', answer: true, hint: '高大物體容易引雷。', explain: '躲在樹下有被雷擊的風險，應尋找低矮且安全地點。' },
    { q: '爆竹又刺激又好玩，可以找親友一起玩。', answer: false, hint: '爆竹可能造成受傷或火災。', explain: '爆竹具有危險性，應避免不安全的施放行為。' },
    { q: '上下樓梯不可以奔跑。', answer: true, hint: '避免跌倒受傷。', explain: '樓梯奔跑易滑倒造成受傷。' },
    { q: '搭乘機車時可以坐或站在前方踏板。', answer: false, hint: '踏板沒有安全防護。', explain: '站在踏板非常危險，應坐穩並配戴安全裝備。' },
    { q: '吃東西前洗手可以預防腸病毒。', answer: true, hint: '腸病毒透過接觸傳染。', explain: '勤洗手可減少病菌傳播風險。' },
    { q: '微波爐爆米花時可把耳朵靠近聽聲音。', answer: false, hint: '靠近運轉中的微波爐不安全。', explain: '靠近運轉設備不僅危險也可能影響聽力或被燙傷。' },
    { q: '野外教學時應穿鮮豔衣服而非制服。', answer: false, hint: '團體活動通常需統一服裝。', explain: '多數學校活動要求穿著制服以利管理與識別。' }
];

let currentIndex = 0;
let finished = false;
let roundQuestions = []; // 本次回合要使用的題目清單（隨機抽取）
// 鼓勵與動畫系統
let confetti = [];
let confettiMax = 0;
let finalMessage = '';
let finalSubtitle = '';

// --- 第三單元（拖曳式選擇題）題庫 ---
let unit3Questions = [
    { q: '有時候大雨後山區道路會中斷，是因為', choices: ['旱災 (太久沒下雨)','山崩','風太大'], answer: 2, hint: '雨水會讓山坡土石鬆動。', explain: '大量雨水會使土石鬆動並造成山崩或土石流，導致道路中斷。' },
    { q: '北極熊快要從地球上消失了，是因為', choices: ['全球暖化','水災','海嘯'], answer: 1, hint: '冰層融化影響生存。', explain: '全球暖化造成冰層縮減，影響北極熊棲地及食物來源。' },
    { q: '下大雨後石塊滾落可能發生？', choices: ['風災','土石流','地震'], answer: 2, hint: '大量雨水加上土石流動。', explain: '土石流會使石塊沿坡面滑落，造成危險。' },
    { q: '山區道路被石頭擋住發生什麼災害？', choices: ['水災','山崩','火災'], answer: 2, hint: '山坡岩石大量掉落。', explain: '山崩發生時岩石土石大量滑落，可能阻斷道路。' },
    { q: '乳牛排泄物產生的甲烷會造成？', choices: ['狂牛症','全球暖化','火災'], answer: 2, hint: '甲烷屬於溫室氣體。', explain: '甲烷是強烈的溫室氣體，會促進全球暖化。' },
    { q: '台灣較少發生的天災是？', choices: ['地震','颱風','龍捲風'], answer: 3, hint: '台灣很少出現。', explain: '龍捲風在台灣較不常見，相較於地震與颱風頻率低。' },
    { q: '暑假最容易發生且造成農損的災害？', choices: ['地震','颱洪','火災'], answer: 2, hint: '夏季風雨強。', explain: '颱風與豪雨會造成農田淹水與作物損失。' },
    { q: '牆壁出現嚴重龜裂最可能是？', choices: ['地震','颱風','水災'], answer: 1, hint: '結構受到強烈震動。', explain: '地震會對建築結構造成強烈震動並產生裂縫。' },
    { q: '潮濕地板使用電器最可能發生？', choices: ['觸電','水災','火災'], answer: 1, hint: '水會導電。', explain: '潮濕會降低絕緣性，增加觸電風險。' },
    { q: '接觸高溫物品可能發生？', choices: ['感冒','中毒','燙傷'], answer: 3, hint: '皮膚直接受熱。', explain: '接觸高溫表面會造成皮膚燙傷。' },
    { q: '颱風不會造成哪一種災害？', choices: ['洪水','土石流','地震'], answer: 3, hint: '與地底活動無關。', explain: '地震是地殼活動造成，與颱風無直接關係。' },
    { q: '地震可能造成的災害包括', choices: ['房屋倒塌','停水停電','以上皆是'], answer: 3, hint: '地震影響很多層面。', explain: '地震會導致結構受損與基礎設施中斷。' },
    { q: '火災現場最先出現的感覺是？', choices: ['被電到','呼吸困難','身體刺痛'], answer: 2, hint: '煙霧影響呼吸。', explain: '煙霧會導致呼吸困難，是火災初期常見症狀。' },
    { q: '地震主要造成的傷害是？', choices: ['房子倒塌','淹水','觸電'], answer: 1, hint: '建築物結構受損。', explain: '房屋倒塌是地震造成的主要直接人身危害之一。' },
    { q: '虎頭蜂螫傷嚴重時可能？', choices: ['昏迷、死亡','沒影響','刺傷'], answer: 1, hint: '毒性很強。', explain: '毒性或過敏反應嚴重時可能危及生命。' },
    { q: '哪一項不是地震發生的原因？', choices: ['火山爆發','地殼板塊運動','地牛翻身'], answer: 3, hint: '屬於民間說法。', explain: '「地牛翻身」是俗稱，非地震學上正式原因。' }
];

let roundUnit3 = [];
let unit3CurrentIndex = 0;
let unit3Score = 0;
let unit3Max = 0;
// 新增：答題追蹤與計時器
let answers = []; // {index, userValue, correct}
let timerDuration = 20; // 每題秒數
let timerRemaining = 0;
let timerInterval = null;
// 解鎖「全部題庫」所需完成次數追蹤（儲存在 localStorage）
let completedQuizCount = parseInt(localStorage.getItem('completedQuizCount') || '0', 10) || 0;
// currentMode: 'quiz' | 'unit3' | 'all'
let currentMode = null;
// 當啟動全部題庫時，分階段執行（part1: TF, part2: unit3）
let allPhase = null;

function setup() {
    // 在指定容器中建立 canvas
    console.log('[quiz] setup() start, document.readyState=', document.readyState);
    const holder = document.getElementById('canvasHolder');
    const w = Math.min(window.innerWidth - 40, 700);
    const h = 260;
    let cnv = createCanvas(w, h);
    if (holder) cnv.parent('canvasHolder');
    // 初始化時先隱藏 canvasHolder，只有進入單元 2 時顯示
    if (holder) holder.classList.add('hidden');
    noLoop();

    // 初始化題目與分數
    maxScore = questions.length;
    finalScore = 0;
    scoreText = `得分: ${finalScore}/${maxScore}`;

    // 在 DOM 準備好後建立題目 UI 並綁定單元按鈕
    function bindUnitButtons(){
        createQuizUI();
        bindTFButtons();
        bindHintAndKeyboard();
        // 綁定全部題庫按鈕
        const unitAll = document.getElementById('unitAllBtn');
        if (unitAll) unitAll.addEventListener('click', ()=> startAllUnit());
        const unit1 = document.getElementById('unit1Btn');
        const unit2 = document.getElementById('unit2Btn');
        const unit3 = document.getElementById('unit3Btn');
        const videoBack = document.getElementById('videoBackBtn');
        if (unit1) unit1.addEventListener('click', ()=>{
            const startScreen = document.getElementById('startScreen');
            const videoUnit = document.getElementById('videoUnit');
            const quiz = document.getElementById('quiz');
            if (startScreen) startScreen.classList.add('hidden');
            if (quiz) quiz.classList.add('hidden');
            if (videoUnit) videoUnit.classList.remove('hidden');
            // pause any quiz animation
                noLoop();
                // hide canvas while watching video
                const holder = document.getElementById('canvasHolder');
                if (holder) holder.classList.add('hidden');
        });
            if (unit2) unit2.addEventListener('click', ()=> startQuiz());
            if (unit3) unit3.addEventListener('click', ()=> startUnit3());
        if (videoBack) videoBack.addEventListener('click', ()=>{
            const startScreen = document.getElementById('startScreen');
            const videoUnit = document.getElementById('videoUnit');
            if (videoUnit) videoUnit.classList.add('hidden');
            if (startScreen) startScreen.classList.remove('hidden');
                // hide canvas when back to menu
                const holder = document.getElementById('canvasHolder');
                if (holder) holder.classList.add('hidden');
        });
        updateScoreDisplay();
    }

    if (!document.getElementById('question')){
        console.error('[quiz] DOM element #question not found when setup ran.');
        // 若尚未有 DOM，等 DOMContentLoaded
        window.addEventListener('DOMContentLoaded', ()=>{
            console.log('[quiz] DOMContentLoaded fired, initializing UI');
            bindUnitButtons();
            updateAllUnitButton();
        });
    } else {
        bindUnitButtons();
        updateAllUnitButton();
    }
}

// 檢查並更新「全部題庫」按鈕的狀態
function updateAllUnitButton(){
    const btn = document.getElementById('unitAllBtn');
    const status = document.getElementById('unlockStatus');
    if (!btn || !status) return;
    status.textContent = `已完成測驗: ${completedQuizCount} 次 / 2 次（完成兩次可解鎖「全部題庫」）`;
    if (completedQuizCount >= 2){
        btn.disabled = false;
        btn.textContent = '單元：全部題庫';
    } else {
        btn.disabled = true;
        btn.textContent = '單元：全部題庫（需解鎖）';
    }
}

function startQuiz(){
    // 隨機抽取 10 題（若題庫少於 10 題則全部使用）
    roundQuestions = getRandomQuestions(10);
    maxScore = roundQuestions.length;
    finalScore = 0;
    currentIndex = 0;
    answers = [];

    // 設定模式並顯示 quiz，隱藏 start
    currentMode = 'quiz';
    allPhase = null;
    // 顯示 quiz，隱藏 start
    const startScreen = document.getElementById('startScreen');
    const quiz = document.getElementById('quiz');
    if (startScreen) startScreen.classList.add('hidden');
    if (quiz) quiz.classList.remove('hidden');
    // 若影片區塊正在顯示，隱藏它
    const videoUnit = document.getElementById('videoUnit');
    if (videoUnit) videoUnit.classList.add('hidden');

    // 顯示 canvas 以便在完成時呈現成績視覺化
    const holder = document.getElementById('canvasHolder');
    if (holder) holder.classList.remove('hidden');

    // 隱藏 unit3（拖曳題）區塊若存在
    const unit3 = document.getElementById('unit3');
    if (unit3) unit3.classList.add('hidden');

    // 停止畫布的持續動畫（只在完成時動畫）
    noLoop();

    // 隱藏畫面上的分數方框，直到答題完成再顯示，並重置分數文字
    setScoreVisibility(false);
    const sd = document.getElementById('scoreDisplay'); if (sd) sd.textContent = `得分: 0/${maxScore}`;

    showQuestion(currentIndex);
    updateScoreDisplay();
}

function getRandomQuestions(n){
    const copy = questions.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

// 通用：從指定陣列隨機抽 n 題
function getRandomFromArray(arr, n){
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

function startUnit3(){
    roundUnit3 = getRandomFromArray(unit3Questions, 10);
    unit3Max = roundUnit3.length;
    unit3Score = 0;
    unit3CurrentIndex = 0;

    // 顯示 unit3，隱藏其他
    const startScreen = document.getElementById('startScreen');
    const videoUnit = document.getElementById('videoUnit');
    const quiz = document.getElementById('quiz');
    const unit3 = document.getElementById('unit3');
    if (startScreen) startScreen.classList.add('hidden');
    if (videoUnit) videoUnit.classList.add('hidden');
    if (quiz) quiz.classList.add('hidden');
    if (unit3) unit3.classList.remove('hidden');

    // 設定模式
    currentMode = 'unit3';
    allPhase = null;
    // 隱藏 canvas（成績只在單元2顯示）
    const holder = document.getElementById('canvasHolder');
    if (holder) holder.classList.add('hidden');

    // 單元3 進行時也不要顯示分數欄位，並重置單元3 分數顯示
    setScoreVisibility(false);
    const u3 = document.getElementById('unit3ScoreDisplay'); if (u3) u3.textContent = `得分: 0/${unit3Max}`;

    showUnit3Question(unit3CurrentIndex);
    updateUnit3ScoreDisplay();
}

function showUnit3Question(index){
    const list = roundUnit3.length ? roundUnit3 : unit3Questions;
    const q = list[index];
    const qEl = document.getElementById('unit3Question');
    const optsEl = document.getElementById('unit3Options');
    const dropBox = document.getElementById('unit3DropBox');
    const nextBtn = document.getElementById('unit3NextBtn');
    if (!qEl || !optsEl || !dropBox || !nextBtn) return console.error('[unit3] Missing UI elements');

    qEl.textContent = `第 ${index + 1} 題 / 共 ${list.length} 題： ${q.q}`;
    // 清空選項與 dropbox
    optsEl.innerHTML = '';
    dropBox.textContent = '把你的答案拖到這裡';
    nextBtn.disabled = true;

    // 建立可拖曳選項
    q.choices.forEach((text, i)=>{
        const d = document.createElement('div');
        d.className = 'draggable choice';
        d.setAttribute('draggable','true');
        d.dataset.choiceIndex = i + 1; // 1-based
        d.textContent = `${i+1}. ${text}`;
        d.style.padding = '8px 10px';
        d.style.border = '1px solid #ccc';
        d.style.borderRadius = '6px';
        d.style.background = '#fff';
        d.style.cursor = 'grab';
        d.addEventListener('dragstart', (ev)=>{
            ev.dataTransfer.setData('text/plain', d.dataset.choiceIndex);
        });
        optsEl.appendChild(d);
    });

    // drop handlers
    dropBox.ondragover = function(ev){ ev.preventDefault(); dropBox.classList.add('drop-over'); };
    dropBox.ondragleave = function(ev){ dropBox.classList.remove('drop-over'); };
    dropBox.ondrop = function(ev){
        ev.preventDefault();
        dropBox.classList.remove('drop-over');
        const choiceIndex = parseInt(ev.dataTransfer.getData('text/plain'), 10);
        // 檢查答案
        const correct = (choiceIndex === q.answer);
        if (correct) unit3Score++;
        // 顯示回饋
        dropBox.textContent = (correct ? '答對！' : `答錯，正確答案：${q.answer}. ${q.choices[q.answer-1]}`);
        // disable dragging for this round
        const children = optsEl.querySelectorAll('.draggable');
        children.forEach(ch=> ch.setAttribute('draggable','false'));
        nextBtn.disabled = false;
        updateUnit3ScoreDisplay();
    };
}

function updateUnit3ScoreDisplay(){
    const el = document.getElementById('unit3ScoreDisplay');
    if (el) el.textContent = `得分: ${unit3Score}/${unit3Max}`;
}

// 下一題按鈕處理
document.addEventListener('click', (e)=>{
    if (e.target && e.target.id === 'unit3NextBtn'){
        const list = roundUnit3.length ? roundUnit3 : unit3Questions;
        if (unit3CurrentIndex < list.length - 1){
            unit3CurrentIndex++;
            showUnit3Question(unit3CurrentIndex);
        } else {
            finishUnit3();
        }
    }
    if (e.target && e.target.id === 'unit3BackBtn'){
        // 回到單元選單
        const unit3 = document.getElementById('unit3');
        const startScreen = document.getElementById('startScreen');
        if (unit3) unit3.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
        // hide canvas if any
        const holder = document.getElementById('canvasHolder');
        if (holder) holder.classList.add('hidden');
    }
});

function finishUnit3(){
    // 顯示小結（但不啟動 canvas）
    const qEl = document.getElementById('unit3Question');
    if (qEl) qEl.textContent = `已完成所有題目。 最終成績: ${unit3Score}/${unit3Max}`;
    // 顯示操作按鈕（再試一次 / 回到單元選單 已在 UI）
    // 完成單元3 後顯示分數欄位
    setScoreVisibility(true);
    // 將完成次數記錄到 localStorage，並更新解鎖狀態（計入解鎖條件）
    completedQuizCount = (parseInt(localStorage.getItem('completedQuizCount') || '0', 10) || 0) + 1;
    localStorage.setItem('completedQuizCount', String(completedQuizCount));
    updateAllUnitButton();
}

function windowResized() {
    // 保持 canvas 寬度合理
    const w = Math.min(window.innerWidth - 40, 700);
    resizeCanvas(w, height);
    if (finished) redraw();
}

function createQuizUI() {
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', () => {
        const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
        if (currentIndex < list.length - 1) {
            currentIndex++;
            showQuestion(currentIndex);
        } else {
            finishQuiz();
        }
    });

    // 綁定提示按鈕（若存在）
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) hintBtn.addEventListener('click', ()=> showHint());

    // 綁定回首頁按鈕（若存在）
    const homeBtn = document.getElementById('quizHomeBtn');
    if (homeBtn) homeBtn.addEventListener('click', ()=>{
        // 回到單元選單，重置狀態
        const quiz = document.getElementById('quiz'); if (quiz) quiz.classList.add('hidden');
        const startScreen = document.getElementById('startScreen'); if (startScreen) startScreen.classList.remove('hidden');
        // 停止動畫、計時與清理畫布
        noLoop();
        stopTimer();
        const holder = document.getElementById('canvasHolder'); if (holder) holder.classList.add('hidden');
        // 隱藏並重置分數顯示
        setScoreVisibility(false);
        const sd = document.getElementById('scoreDisplay'); if (sd) sd.textContent = `得分: 0/0`;
        answers = [];
        finalScore = 0;
        updateScoreDisplay();
    });
}

// 啟動「全部題庫」：先做 TF（全部題庫），完成後自動接 unit3
function startAllUnit(){
    // 只在已解鎖時執行
    if (completedQuizCount < 2) return alert('尚未達成解鎖條件：需完成測驗 2 次');
    // 顯示講義頁面（非測驗）
    const startScreen = document.getElementById('startScreen');
    const allUnit = document.getElementById('allUnit');
    const quiz = document.getElementById('quiz');
    const unit3 = document.getElementById('unit3');
    if (startScreen) startScreen.classList.add('hidden');
    if (quiz) quiz.classList.add('hidden');
    if (unit3) unit3.classList.add('hidden');
    if (allUnit) allUnit.classList.remove('hidden');
    // 準備講義內容：合併所有題目（TF + unit3 題庫）並顯示 question/hint/explain
    const content = document.getElementById('allUnitContent');
    if (!content) return;
    content.innerHTML = '';
    // 先列出是非題
    const tfHeader = document.createElement('div'); tfHeader.style.fontWeight = '700'; tfHeader.textContent = '一、是非題（講義）'; content.appendChild(tfHeader);
    questions.forEach((q,i)=>{
        const item = document.createElement('div'); item.style.background='#fff'; item.style.padding='10px'; item.style.borderRadius='8px'; item.style.boxShadow='0 2px 6px rgba(0,0,0,0.04)';
        const title = document.createElement('div'); title.style.fontWeight='600'; title.textContent = `Q${i+1}. ${q.q}`;
        const hint = document.createElement('div'); hint.style.color='var(--muted)'; hint.style.marginTop='6px'; hint.textContent = `提示: ${q.hint || ''}`;
        const explain = document.createElement('div'); explain.style.marginTop='6px'; explain.textContent = `說明: ${q.explain || ''}`;
        item.appendChild(title); item.appendChild(hint); item.appendChild(explain);
        content.appendChild(item);
    });
    // 再列出選擇題（unit3Questions）
    const mcHeader = document.createElement('div'); mcHeader.style.fontWeight = '700'; mcHeader.style.marginTop='12px'; mcHeader.textContent = '二、選擇題（講義）'; content.appendChild(mcHeader);
    unit3Questions.forEach((q,i)=>{
        const item = document.createElement('div'); item.style.background='#fff'; item.style.padding='10px'; item.style.borderRadius='8px'; item.style.boxShadow='0 2px 6px rgba(0,0,0,0.04)';
        const title = document.createElement('div'); title.style.fontWeight='600'; title.textContent = `Q${i+1}. ${q.q}`;
        const choices = document.createElement('div'); choices.style.marginTop='6px';
        q.choices.forEach((c, idx)=>{
            const ch = document.createElement('div'); ch.textContent = `${idx+1}. ${c}`; choices.appendChild(ch);
        });
        const answer = document.createElement('div'); answer.style.marginTop='6px'; answer.style.color='var(--muted)'; answer.textContent = `正確答案: ${q.answer}. ${q.choices[q.answer-1]}`;
        const explain = document.createElement('div'); explain.style.marginTop='6px'; explain.textContent = `說明: ${q.explain || ''}`;
        item.appendChild(title); item.appendChild(choices); item.appendChild(answer); item.appendChild(explain);
        content.appendChild(item);
    });
    // 綁定返回按鈕（存在於 DOM）
    const back = document.getElementById('allUnitBackBtn'); if (back) back.addEventListener('click', ()=>{
        if (allUnit) allUnit.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
    });
}

function bindTFButtons(){
    const t = document.getElementById('trueBtn');
    const f = document.getElementById('falseBtn');
    t.addEventListener('click', ()=> selectTF(true));
    f.addEventListener('click', ()=> selectTF(false));
}

function showQuestion(index) {
    finished = false;
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[index];
    const questionEl = document.getElementById('question');
    if (!questionEl) { console.error('[quiz] showQuestion: #question element missing'); return; }
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');
    const total = list.length;
    questionEl.textContent = `第 ${index + 1} 題 / 共 ${total} 題： ${q.q}`;
    q.answered = false;

    // 清除先前解釋與提示
    const explainEl = document.getElementById('explain'); if (explainEl) explainEl.textContent = '';

    // 重置按鈕狀態
    trueBtn.disabled = false; trueBtn.classList.remove('correct','wrong');
    falseBtn.disabled = false; falseBtn.classList.remove('correct','wrong');

    // 確保答題中不顯示分數方框
    setScoreVisibility(false);

    // 更新進度（顯示已完成題數比例）
    const pct = Math.round((index) / total * 100);
    progressFill.style.width = pct + '%';

    console.log(`[quiz] showQuestion idx=${index}, pct=${pct}%, question="${q.q}"`);

    // 更新下一題按鈕文字
    nextBtn.textContent = (index < total - 1) ? '下一題' : '完成並顯示成績';
    nextBtn.disabled = true; // 要先答題才能下一題
    // 啟動題目計時
    startTimer();
    updateScoreDisplay();
}

function selectTF(value){
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[currentIndex];
    if (!q || q.answered) return;
    q.answered = true;
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');

    // disable both
    trueBtn.disabled = true; falseBtn.disabled = true;

    const correct = q.answer === value;
    if (correct) finalScore++;

    // 記錄作答
    answers.push({ index: currentIndex, userValue: value, correct: correct });

    // 標示顏色
    if (q.answer === true){
        trueBtn.classList.add('correct');
        if (value === false) falseBtn.classList.add('wrong');
    } else {
        falseBtn.classList.add('correct');
        if (value === true) trueBtn.classList.add('wrong');
    }

    updateScoreDisplay();

    // 啟用下一題按鈕
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;
    // 停止計時並顯示解釋
    stopTimer();
    const explainEl = document.getElementById('explain');
    if (explainEl) explainEl.textContent = (correct ? '答對！' : '答錯，') + ` 正確答案：${q.answer ? '是' : '否'}. ` + (q.explain ? `解釋: ${q.explain}` : '');

}

// 啟動/停止計時器、提示與鍵盤綁定
function bindHintAndKeyboard(){
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) hintBtn.addEventListener('click', ()=> showHint());

    window.addEventListener('keydown', (e)=>{
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const quizEl = document.getElementById('quiz');
        if (!quizEl || quizEl.classList.contains('hidden')) return;
        if (e.key === 't' || e.key === 'T' || e.key === 'y' || e.key === 'Y'){
            const tb = document.getElementById('trueBtn'); if (tb && !tb.disabled) tb.click();
        } else if (e.key === 'f' || e.key === 'F' || e.key === 'n' || e.key === 'N'){
            const fb = document.getElementById('falseBtn'); if (fb && !fb.disabled) fb.click();
        } else if (e.key === 'Enter'){
            const nb = document.getElementById('nextBtn'); if (nb && !nb.disabled) nb.click();
        }
    });
}

function startTimer(){
    stopTimer();
    timerRemaining = timerDuration;
    const td = document.getElementById('timerDisplay');
    if (td) td.textContent = `時間: ${timerRemaining}s`;
    timerInterval = setInterval(()=>{
        timerRemaining--;
        if (td) td.textContent = `時間: ${timerRemaining}s`;
        if (timerRemaining <= 0){
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

function stopTimer(){
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    const td = document.getElementById('timerDisplay'); if (td && timerRemaining>0) td.textContent = `時間: --`;
}

function handleTimeout(){
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[currentIndex];
    const trueBtn = document.getElementById('trueBtn');
    const falseBtn = document.getElementById('falseBtn');
    if (trueBtn) trueBtn.disabled = true;
    if (falseBtn) falseBtn.disabled = true;
    answers.push({ index: currentIndex, userValue: null, correct: false });
    const explainEl = document.getElementById('explain');
    if (explainEl) explainEl.textContent = `時間到！正確答案：${q.answer ? '是' : '否'}。` + (q.explain ? ` 解釋: ${q.explain}` : '');
    const nextBtn = document.getElementById('nextBtn'); if (nextBtn) nextBtn.disabled = false;
}

function showHint(){
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    const q = list[currentIndex];
    const explainEl = document.getElementById('explain');
    if (!explainEl) return;
    if (q.hint) explainEl.textContent = `提示: ${q.hint}`;
    else explainEl.textContent = `提示: 想一想為何此敘述是${q.answer ? '正確' : '錯誤'}的。`;
}

// 控制分數欄位顯示（在作答過程中隱藏，完成後顯示）
function setScoreVisibility(show){
    const sd = document.getElementById('scoreDisplay');
    if (sd) sd.style.display = show ? 'block' : 'none';
    const u3 = document.getElementById('unit3ScoreDisplay');
    if (u3) u3.style.display = show ? 'block' : 'none';
}

function renderReview(){
    const review = document.getElementById('review');
    const reviewList = document.getElementById('reviewList');
    if (!review || !reviewList) return;
    const quiz = document.getElementById('quiz'); if (quiz) quiz.classList.add('hidden');
    review.classList.remove('hidden');
    reviewList.innerHTML = '';
    const list = (roundQuestions && roundQuestions.length) ? roundQuestions : questions;
    for (let i=0;i<list.length;i++){
        const q = list[i];
        const ans = answers.find(a=>a.index===i);
        const div = document.createElement('div'); div.className='review-item';
        const qn = document.createElement('div'); qn.className='q'; qn.textContent = `Q${i+1}. ${q.q}`;
        const meta = document.createElement('div'); meta.className='meta';
        const userText = ans ? (ans.userValue===null ? '未作答' : (ans.userValue ? '是' : '否')) : '未作答';
        const correctText = q.answer ? '是' : '否';
        meta.textContent = `你的答案: ${userText}；正確: ${correctText}` + (q.explain ? `；說明: ${q.explain}` : '');
        div.appendChild(qn); div.appendChild(meta);
        reviewList.appendChild(div);
    }
    const reviewBack = document.getElementById('reviewBackBtn');
    const reviewRetry = document.getElementById('reviewRetryBtn');
    if (reviewBack) reviewBack.addEventListener('click', ()=>{
        review.classList.add('hidden');
        const startScreen = document.getElementById('startScreen'); if (startScreen) startScreen.classList.remove('hidden');
        const holder = document.getElementById('canvasHolder'); if (holder) holder.classList.add('hidden');
    });
    if (reviewRetry) reviewRetry.addEventListener('click', ()=>{
        review.classList.add('hidden');
        // 隱藏並重置分數區域
        const sd = document.getElementById('scoreDisplay'); if (sd) { sd.style.display = 'none'; sd.textContent = `得分: 0/0`; }
        const u3 = document.getElementById('unit3ScoreDisplay'); if (u3) { u3.style.display = 'none'; u3.textContent = `得分: 0/0`; }
        answers = [];
        currentMode = 'quiz';
        startQuiz();
    });
}

function updateScoreDisplay() {
    const scoreEl = document.getElementById('scoreDisplay');
    if (scoreEl) scoreEl.textContent = `得分: ${finalScore}/${maxScore}`;
}

function finishQuiz() {
    finished = true;
    scoreText = `最終成績: ${finalScore}/${maxScore}`;
    // 將進度條置為 100%
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = '100%';

    // 在題目區顯示總結
    const questionEl = document.getElementById('question');
    if (questionEl) questionEl.textContent = `已完成所有題目。 ${scoreText}。`;
    // 根據分數選擇鼓勵內容與動畫強度
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;
    if (percentage >= 90) {
        finalMessage = '太棒了！你是防災小達人！🎉';
        finalSubtitle = '保持警覺，繼續學習可得更完美的準備！';
        confettiMax = 160;
    } else if (percentage >= 70) {
        finalMessage = '很棒！你有不錯的防災知識！🌟';
        finalSubtitle = '再接再厲，熟悉更多技巧會更好。';
        confettiMax = 100;
    } else if (percentage >= 50) {
        finalMessage = '不錯，繼續努力！👍';
        finalSubtitle = '溫習重點可幫助你做得更好。';
        confettiMax = 60;
    } else {
        finalMessage = '別灰心，你可以的！💪';
        finalSubtitle = '建議重試或閱讀防災資料，安全最重要。';
        confettiMax = 40;
    }

    // 生成 confetti 粒子
    confetti = [];
    for (let i = 0; i < confettiMax; i++) {
        confetti.push(createConfetti());
    }

    // 顯示重試/回到開始按鈕
    appendFinishButtons();

    // 啟動 draw 的動畫循環以播放 confetti
    loop();
    // 完成後顯示分數方框
    setScoreVisibility(true);
    // 顯示檢討清單
    renderReview();

    // 若是普通測驗完成，計次以解鎖「全部題庫」
    if (currentMode === 'quiz'){
        completedQuizCount = (parseInt(localStorage.getItem('completedQuizCount') || '0', 10) || 0) + 1;
        localStorage.setItem('completedQuizCount', String(completedQuizCount));
        updateAllUnitButton();
    }

    // 如果目前是啟動全部題庫流程的第一階段，轉到第二階段（unit3）
    if (currentMode === 'all' && allPhase === 'part1'){
        // 短暫延遲再開始 unit3，讓使用者看到成績畫面
        setTimeout(()=>{
            // 關閉 confetti 與成績畫面，直接進入 unit3
            const review = document.getElementById('review'); if (review) review.classList.add('hidden');
            const quiz = document.getElementById('quiz'); if (quiz) quiz.classList.add('hidden');
            // 啟動 unit3
            allPhase = 'part2';
            startUnit3();
        }, 1200);
    }
}

function createConfetti(){
    const colors = ['#ff4d4d','#ffb84d','#ffd24d','#4dff88','#4dd0ff','#8c4dff'];
    return {
        x: random(0, width),
        y: random(-height * 0.5, 0),
        vx: random(-1.5, 1.5),
        vy: random(1, 4),
        size: random(6, 14),
        color: random(colors),
        rot: random(0, TWO_PI),
        rotSpeed: random(-0.1, 0.1)
    };
}

function appendFinishButtons(){
    // 移除舊的容器
    const meta = document.querySelector('.meta');
    if (!meta) return;
    let container = document.getElementById('finishActions');
    if (container) container.remove();
    container = document.createElement('div');
    container.id = 'finishActions';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.marginTop = '10px';

    const retryBtn = document.createElement('button');
    retryBtn.id = 'retryBtn';
    retryBtn.textContent = '再試一次';
    retryBtn.className = 'next';
    retryBtn.addEventListener('click', ()=>{
        // 直接重新開始新回合
        // 隱藏 finish actions
        container.remove();
        finished = false;
        confetti = [];
        finalMessage = '';
        finalSubtitle = '';
        // 隱藏檢討面板並清空其內容
        const review = document.getElementById('review'); if (review) review.classList.add('hidden');
        const reviewList = document.getElementById('reviewList'); if (reviewList) reviewList.innerHTML = '';
        // 隱藏並重置分數區域
        const sd = document.getElementById('scoreDisplay'); if (sd) { sd.style.display = 'none'; sd.textContent = `得分: 0/0`; }
        const u3 = document.getElementById('unit3ScoreDisplay'); if (u3) { u3.style.display = 'none'; u3.textContent = `得分: 0/0`; }
        // 清空作答記錄並開始新回合
        answers = [];
        // 若從全部題庫流程來重試，復原模式
        currentMode = 'quiz';
        startQuiz();
    });

    const backBtn = document.createElement('button');
    backBtn.id = 'backBtn';
    backBtn.textContent = '回到開始';
    backBtn.className = 'next';
    backBtn.addEventListener('click', ()=>{
        container.remove();
        // 顯示開始畫面、隱藏 quiz
        const startScreen = document.getElementById('startScreen');
        const quiz = document.getElementById('quiz');
        if (quiz) quiz.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
        finished = false;
        confetti = [];
        finalMessage = '';
        finalSubtitle = '';
        noLoop();
        // 隱藏成績畫布，因為回到單元選單
        const holder = document.getElementById('canvasHolder');
        if (holder) holder.classList.add('hidden');
    });

    container.appendChild(retryBtn);
    container.appendChild(backBtn);
    meta.appendChild(container);
}

function draw() {
    background(250);
    stroke(200);
    noFill();
    rect(8, 8, width - 16, height - 16, 8);

    textAlign(CENTER);
    if (!finished) {
        fill(80);
        textSize(20);
        text('答題中，請在上方介面作答；完成後在此顯示成績。', width / 2, height / 2);
        return;
    }

    // 顯示最終成績
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;
    // 大標題與顏色
    textSize(32);
    if (percentage >= 90) fill(0, 140, 80);
    else if (percentage >= 70) fill(40, 120, 200);
    else if (percentage >= 50) fill(255, 170, 30);
    else fill(200, 0, 0);

    text(finalMessage, width / 2, height / 2 - 50);

    // 子標
    textSize(16);
    fill(80);
    text(finalSubtitle, width / 2, height / 2 - 20);

    // 顯示分數和百分比
    textSize(22);
    fill(60);
    text(scoreText + `  （正確率: ${percentage}%）`, width / 2, height / 2 + 10);

    // 畫徽章
    push();
    const badgeX = width / 2;
    const badgeY = height - 70;
    translate(badgeX, badgeY);
    noStroke();
    if (percentage >= 90) {
        fill(255, 215, 0);
        ellipse(0, 0, 110, 110);
        fill(255);
        textSize(36);
        text('🏅', 0, 10);
    } else if (percentage >= 70) {
        fill(200, 230, 255);
        ellipse(0, 0, 90, 90);
        fill(80);
        textSize(32);
        text('🌟', 0, 10);
    } else if (percentage >= 50) {
        fill(240, 240, 200);
        ellipse(0, 0, 80, 80);
        fill(80);
        textSize(28);
        text('👍', 0, 10);
    } else {
        fill(255, 220, 220);
        ellipse(0, 0, 80, 80);
        fill(80);
        textSize(28);
        text('💪', 0, 10);
    }
    pop();

    // 更新並繪製 confetti
    for (let i = confetti.length - 1; i >= 0; i--) {
        const p = confetti[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.rot += p.rotSpeed;

        push();
        translate(p.x, p.y);
        rotate(p.rot);
        noStroke();
        fill(p.color);
        rectMode(CENTER);
        rect(0, 0, p.size, p.size * 0.6);
        pop();

        // 移除超出畫布的粒子
        if (p.y > height + 50) confetti.splice(i, 1);
    }

    // 若 confetti 已清空，停止動畫循環以節省資源
    if (confetti.length === 0) {
        noLoop();
    }
}