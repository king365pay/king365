(function () {
    'use strict';
    let contract, odometer;
    let comm = {
        host: '',isLoadOk:false,
        getUrlKey: function (name, url) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
        }
    };
    Vue.directive('timer', {
        bind(el, binding) {
            el.__time = binding.value * 1000;
            el.__timer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__time - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                el.innerText = el.__time > Date.now() ? f(h) + ':' + f(m) + ':' + f(s) : '00:00:00';
                if (el.__time < Date.now() && Cookies.get('RTrxToken')) {
                    setInterval(() => {
                        // window.location.reload();
                    }, 5000);
                }
            }, 1000);
        },
        update(el, binding) {
            el.__time = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__timer);
        }
    });
    Vue.directive('ctimer', {
        bind(el, binding) {
            el.__ctime = binding.value * 1000;
            el.__ctimer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__ctime - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                let dd = d > 0 ? d + i18n.t('message.period.day') : '',
                    hh = h > 0 ? h + i18n.t('message.period.hrs') : '',
                    mm = m > 0 ? m + i18n.t('message.period.mins') : '',
                    ss = s > 0 ? s + i18n.t('message.period.secs') : '';
                el.innerText = el.__ctime > Date.now() ? dd + hh + mm + ss : '00:00:00';
            }, 1000);
        },
        update(el, binding) {
            el.__ctime = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__ctimer);
        }
    });
    
    Vue.directive('cstimer', {
        bind(el, binding) {
            el.__ctime = binding.value * 1000;
            el.__ctimer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__ctime - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                let dd = d > 0 ? d + i18n.t('message.period.day') : '',
                    hh = h > 0 ? h + i18n.t('message.period.hrs') : '',
                    mm = m > 0 ? m + i18n.t('message.period.mins') : '',
                    ss = s > 0 ? s + i18n.t('message.period.secs') : '';
                el.innerText = el.__ctime > Date.now() ? dd + hh + mm + ss : '结算中';
                // if (el.__time < Date.now() && Cookies.get('RTrxToken')) {
                //     setInterval(() => {
                //         window.location.reload();
                //     }, 5000);
                // }
            }, 1000);
        },
        update(el, binding) {
            el.__ctime = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__ctimer);
        }
    });

    const i18n = new VueI18n({
        locale: Cookies.get('lang') ? Cookies.get('lang') : 'en',
        messages: {
            en: {
                message: {
                    LSOSOSOq:'Not triggered',
                    lang: 'English',
                    loginTip2:'Distributed defi address, whether to enter the blockchain browser to view',
                    ecosystemLISPO:'common problem',
                    ecosystemLISPO1:' Smart contract technology-this is a new phenomenon in today s decentralized economy.<\/br> Process and distribute the financial flow of digital assets.<\/br> All processes are carried out in an open and decentralized blockchain cabinet.<\/br>The KING 365 cryptocurrency infrastructure supports such contracts. ',
                    
        
                    loginTip1:'helpful',
                    ecosystemLIS:'01.You can fully see the code of the KING 365 smart contract here, so you can have full confidence in the safety and long-term operation of the project!',

                    ecosystemLIS1:'Zero risk',
                    ecosystemLIS2:'KING 365 developers deployed a self-executing smart contract on the TRON blockchain that is permanent and cannot be modified by any entity',

                    ecosystemLIS3:'Instant transaction',
                    ecosystemLIS4:'Profits from other members enter your personal wallet directly, there is no accumulation in the system, and the profit belongs to you only',

                    ecosystemLIS5:'Conditional invariance',
                    ecosystemLIS6:'KING 365 smart contract is just a payment gateway that can facilitate peer-to-peer commission payment between participants',

                    ecosystemLIS7:'Decentralization',
                    ecosystemLIS8:'There are no managers or administrators, only creators participate in the project on an equal footing with everyone else',

                    ecosystemLIS9:'Transparency and anonymity',
                    ecosystemLIS10:'The smart contract is public, anyone can see the code and the entire transaction record, which ensures the integrity of the system and real project statistics',

                    ecosystemLIS11:'100% online',
                    ecosystemLIS12:'All funds are transferred between members without any hidden fees, and the contract balance is always zero',



                    ecosystem1:'The world s first win-win ecosystem',
                    Walkinglantern:'Beware of false resources. Community KING 365 has only one site address- www.as136.com',
                    contenLI1:'1. What is KING 365?',
                    contenLI2:'2. Who manages the KING 365 platform?',
                    contenLI3:'3. Who created KING 365?',
                    contenLI4:'4. What is a smart contract? What are its advantages?',
                    contenLI5:'5. What do I need to join?',
                    contenLI6:'6. Which wallet should I use?',
                    contenLI7:'7. Where can I get more information about KING 365?',
                    contenLI8:'8. What do I need to create a Tron wallet?',
                    contenLI9:'9. If I have never participated in the processing of encrypted digital currency before, how to buy and sell BTC ETH USDT TRX?',
                    contenLI10:'10. How to participate in circulation in the KING 365 community?',
                    contenLI11:'11. Can I register online for circulation without a partner?',
                    contenLI12:'12. What will happen to my account if I interrupt the cooperation with the KING 365 community?',
                    contenLI13:'13. I have participated in the circulation, what should I do in the next step?',
                    contenLI14:'14. How to achieve goals through KING 365?',
                    contenLI15:'15. Is passive income possible?',
                    contenLI16:'16. How to inspire network nodes? What if I can’t call?',
                    contenLI17:'17. How much rate of return can be obtained?',
                    contenLI18:'18. Do I need to withdraw encrypted digital currency assets from KING 365?',
                    contenLI19:'19. Will KING 365 shut down?',
                    contenLI20:'20. The global distributed circulation of KING 365 is not interfered by any national government departments. The code is the rule and the law. It will always be enforced by the smart contract and cannot be closed or modified. What is the direct community network node? What is the daily rate of return of block network nodes?',
                    contenLI21:'21. What is the difference between KING 365 and Sergey Mavrodi’s community economic and ecological plan?',
                    contenLI22:'22. What are the risks of KING 365? How long can I play?',

                    contenLI1C:'1. What is KING 365? KING 365 is the international distributed circulation of the global decentralized ecosystem, and it is also the first ever TRON smart contract marketing and circulation scenario. This is a self-executing software algorithm that can execute the function of distributing partner rewards among members of the global distributed community under certain conditions (circulation marketing plan). The contract code is publicly available. Information about transactions can always be viewed on the link: https://tronscan.io.',
                    contenLI2C:'2. Who manages the KING 365 platform? The KING 365 platform is composed of global distributed smart contracts that automatically execute transactions, and cannot be interfered by any objective factors in the transaction process.',
                    contenLI3C:'3. Who created KING 365? The KING 365 concept belongs to a global distributed encrypted digital currency enthusiast organization. They are members of the community without any special privileges. The code is the rule and the law. Today, KING 365 is a peer-to-peer community to which platform members belong, and the platform itself also belongs to this community.',
                    contenLI4C:'4. What is a smart contract? What are its advantages? Smart contract is an algorithm in encrypted digital currency blockchain technology. TRON is the first choice for creating KING 365 distributed circulation smart contracts. The main purpose of this type of contract is to automate the relationship and give the opportunity to automate the commitment.',
                    contenLI5C:'5. What do I need to join? You already have almost everything you need. The rest is to install an encrypted digital currency wallet and Telegram on your device (smartphone, tablet, PC) for global distributed circulation.',
                    contenLI6C:'6. Which wallet should I use? KING 365 is applicable to all TRON encrypted digital currency wallets. We recommend the following:Pobao TronLink wallet, iMToKen, ToKenPocket support mobile devices (smartphones, tablets), and also support computers and laptops that should use Chrome extensions. TronLink wallet official address: https://www.tronlink.org/',
                    contenLI7C:'7. Where can I get more information about KING 365? Subscribe to the verified KING 365 channel on Telegram. Send any questions to KING 365 distributed members and they will be happy to share their experience.Join the chat on Telegram t.me/KING 365. We also recommend that you research the material on the website in the "College" section.',
                    contenLI8C:'8. What do I need to create a Tron wallet? For PC, you need to go to the website tronlink.org and install the extension for your browser.For mobile devices, you need to install Pobao TronLink Wallet AppWhen registering, please dont forget to store the encrypted digital currency wallet password safely.',
                    contenLI9C:'9. If I have never participated in the processing of encrypted digital currency before, how to buy and sell BTC ETH USDT TRX? There are many ways to buy/sell cryptocurrency in exchange for fiat currency (regular currency). They are all designed for encrypted digital currency users and have a user-friendly interface. Your first transaction to convert legal currency into digital currency will take you no more than five minutes. We recommend using the proven currency exchange aggregator bestchange.ru',
                    contenLI10C:'10. How to participate in circulation in the KING 365 community? To participate in circulation in KING 365, you need to send a circulation time period to the created smart contract to activate the KING 365 distributed circulation account. Choosing the circulation time period itself constitutes your registration in the community.Please note: When recharging an encrypted digital currency wallet, you need to consider the network commission, which is usually about 1TRX.',
                    contenLI11C:'11. Can I register online for circulation without a partner? Yes. Registration without an invitation link will get you into the KING 365 distributed node team ID.',
                    contenLI12C:'12. What will happen to my account if I interrupt the cooperation with the KING 365 community? No one can close your account, even if they have a strong will. The account will always be stored in one of the TRON network blocks. But you will not be able to continue to earn income from each shared distributed circulation network node.',
                    contenLI13C:'13. I have participated in the circulation, what should I do in the next step? In order to interact effectively with the KING 365 community, you need to:1. Waiting for the settlement process of the circulation time period2. Chat with the person who invited you or other experienced members. They will help you take the first step.3. Go to the "College" section, which contains courses on how to work effectively in the community.',
                    contenLI14C:'14. How to achieve goals through KING 365? It is based on establishing a network of partners. You introduce the potential of the community to potential partners and encourage them to cooperate with you. The partners who use your network node and their daily interest rate generated by their participation in periodic circulation transactions will be sent to your smart contract address, and then they will be immediately redirected to your wallet. The community is used directly with marketing projects. You can learn more about the marketing plan in the video.',
                    contenLI15C:'15. Is passive income possible? The KING 365 community is built in such a way that all members of the network block node can help each other. Passive income is possible; it depends on the partners’ activities, and partners can eventually appear on the community network through sharing or participating in circulation.To ensure that you will have passive income in the future, you need to make a determined effort to attract new partners and open a new charter in KING 365Once you invite an active community node to join the team, you can already make a lot of money and achieve your goals. The speed at which this happens depends entirely on mobility,contenLI16C:You dont have to force others to participate. At present, many friends are interested in how to make money through the revolution of blockchain technology in network data, and many of them are actively seeking new opportunities. You can meet them on social networks yourself, or you can set up automatic sales channels so that anyone interested can find yourself. You can find more details about this issue in the "College" section of the KING 365 community.Take advantage of your strengths, watch webinars, and ask questions to experience community members. You don’t need to wait long to be successful. Your result depends entirely on your ability to act!',
                    contenLI16C:'16. How to inspire network nodes? What if I can’t call? You dont have to force others to participate. At present, many friends are interested in how to make money through the revolution of blockchain technology in network data, and many of them are actively seeking new opportunities. You can meet them on social networks yourself, or you can set up automatic sales channels so that anyone interested can find yourself. You can find more details about this issue in the "College" section of the KING 365 community.Take advantage of your strengths, watch webinars, and ask questions to experience community members. You don’t need to wait long to be successful. Your result depends entirely on your ability to act!',
                    contenLI17C:'17. How much rate of return can be obtained? The amount of income depends on your participation in the circulation cycle activities and the quality indicators of network nodes participating in the circulation activities.According to the number of partners, 4 different investment levels of the KING 365 community are considered.First, there is a simple relationship. The more network nodes you cooperate, the more circulation tokens you will raise; the higher the partner quality index, the higher the income you will get.',
                    contenLI18C:'18. Do I need to withdraw encrypted digital currency assets from KING 365? KING 365 does not retain any encrypted digital currency assets, so the balance of the smart contract itself is equal to zero. The huge amount of data is the circulation of the community, you can check it yourself by following LINK. Your income directly enters your personal encrypted digital currency wallet from the KING 365 global distributed network node. Only you can use the encrypted digital currency wallet, no other objective factors can manage your Token assets',
                    contenLI19C:'19. Will KING 365 shut down? No, KING 365 data is completely public, checkable and trustworthy, and KING 365 open source code has been audited and made publicKING 365s global distributed circulation is not subject to any national border government intervention. The code is the rule and the law, which will always be enforced by the smart contract and cannot be closed or modified.',
                    contenLI20C:'20. The global distributed circulation of KING 365 is not interfered by any national government departments. The code is the rule and the law. It will always be enforced by the smart contract and cannot be closed or modified. What is the direct community network node? What is the daily rate of return of block network nodes?Directly under the community node isIt refers to the first level partner that connects with your direct community network. The daily rate of return of block network node refers to the daily rate of return of participating circulation cycle. KING 365 is divided into four cycles: 1 day circulation 7 days circulation 15 days circulation 30 days circulation 1 day 101% 7 days 110.5% 15 days 130% 30 days 190%. Take circulation 10000 usdt as an example to illustrate that participating circulation 15 days 10000 usdt daily gains 2%, that is 200 usdt 15 days is the rate of return of 3000usdt 15 days contract expiration, 30% of the rate of return can be obtained by 13000usdt block network node directly',
                    contenLI21C:'21. What is the difference between KING 365 and Sergey Mavrodi’s community economic and ecological plan? Because it did not make an unfulfillable promise to its members. The success of each community member depends on the ecological network community node KING 365 will not incur debts or other obligationsKING 365 is a distributed circulation of smart contracts based on blockchain technology and has nothing to do with the pyramid schemeThe principle of the pyramid scheme is that most of the funds are concentrated in the hands of its creators. The sooner you arrive, the more you can get. The pyramid scheme can be closed at any time. The members of the KING 365 community, no matter the builder or everyone in the KING 365 community are equal. No one can terminate the operation of the community, because its function is guaranteed by the blockchain network smart contract, which cannot be deleted or changed. Even if the website stops operating, as long as there is electricity and Internet access, all data and the entire structure will remain unchanged, and the smart contract will continue to operate.',
                    contenLI22C:'22. What are the risks of KING 365? How long can I play? The KING 365 community does not have any hard risks. The only objective risk is to stop the implementation of community network nodesKING 365 does not have any central authority. All community network node users do not need to register or withdraw cash. They only need to bind their USDT (TRC20) encrypted digital currency wallet address to carry out USDT (TRC20) global distributed circulation and reach a contract. The smart return is stipulated. You only need to continue to invite the implementation to withdraw your circulation. The community runs based on the smart contract in the blockchain system, and the code of the smart contract is in the public domain.All transfers go directly to your encrypted digital currency wallet, without any hidden assets, and without using any third-party resources. This ensures that any money you earn belongs to you. KING 365 has a total of 9 stages. The contract will run automatically from stage 0, and will be based on the number of real-time wallet addresses (a), fund circulation (b), fund return (c), and historical fluctuations ( d), linear period (n) and other data are calculated to get the estimated end time (x) of the current stage,Period formula: x ≈adc1!b1-c1+ad2c2!b2-c2+ad3c3!b3-c3+…adncn!bn-cn,0≤x<+∞The contract will start to run intelligently from stage 0, and based on the number of real-time addresses, asset circulation, historical increase, and linear cycle simulation, the end time period of the current stage will be obtained. When this time is reached, the smart contract will automatically reset and enter the next A stageAnd every time you raise a stage, the profit of ToKens asset circulation will automatically increase by 50%, and all loss-making wallet addresses in the previous stage will receive a creation reward of double the amount of assets. This means that every KING 365 community network node is tied to 9 lifelines. Even if one lifeline is exhausted for a long time, there are second, third, and even ninth lifelines, and each lifeline will be It will become stronger and stronger, and all operating instructions are implemented by blockchain technology smart contracts, so this is completely safe.For example, when the smart contract enters the first stage of the lifeline, 10% of the circulating Token assets will enter the creation prize pool, which will be automatically distributed to all the wallet addresses that lost money in the previous stage, and 20% of the circulating ToKen assets will flow into the creation prize pool in the second stage of the lifeline. Used to issue the previous level of loss-making encrypted digital currency wallet address. In the third stage, 30% of the circulating ToKen assets will enter the creation prize pool, which will be used to issue all the loss-making crypto wallet addresses of the second stage, and so on, until the ninth stage will have 90% of the circulating volume used to issue the previous stage The address of the losing wallet. Each loss-making address can get 2 times the amount of loss-making rewards. When the creation rewards for all the loss-making addresses of the previous level have been issued, the creation bonus pool will no longer flow into ToKen assets.',


                    sigOut: 'Sign out',
                    sigIn: 'Sign in',
                    syslang: 'System language',
                    circulation: 'Circulation',
                    predict: 'Countdown to the end of the estimate',
                    ring: 'Current ring number',
                    description: "Redefine the attributes of decentralization, redefine the dapp ecology, redefine democracy and freedom The technology of smart contracts ensures the complete safety of all participants' funds.No one can steal funds or change contract intelligence",
                    join: 'How to join',
                    joinDesc: '<p>1: Log in to your usdt (trc20) wallet address after using the network node sharing link to automatically activate the account for decentralized Finance (defi) circulation intelligent mining <\/p> <p>2: Select the circulation period and pay the amount of USDT (TRC20) you need to circulate to the payment address. <\/p><p>3: After the circulation expires, the contract will automatically return the increased USDT (TRC20) to your wallet address. <\/p>',
                    share: 'Introduction',
                    shareDesc: '<p>1: Nine-ringDEFI adopts a distributed and decentralized circulation return method. TheDEFI runs automatically from the 0th ring. When the circulation is not enough to pay for the return, theDEFI will automatically reset and enter the next Ring, up to the 9th ring. <\/p> <p>2: Every time you increase one link, the rate of return on capital circulation will automatically increase by 50%, which will be used to encourage participation in the next link. <\/p><p>3: For every increase of one link, 10%-90% of the circulating funds will enter the Chuanghuan prize pool, which will be used to double reward all the wallet addresses that lost money in the previous link. <\/p>',
                    ruleDesc: '<p>4: USDT (TRC20) circulation reward rules at the 0th ring: <br> Return 101% after 1 day of circulation, 110.5% after 7 days of circulation, 130% after 15 days of circulation and 190% after 30 days of circulation<\/p><p>5: Sharing reward rules: <br>Every time you circulate 100 USDT, you can get a generation of sharing rewards, and you can get up to 20 generations of sharing rewards. <br>If you circulate 100 USDT by yourself, you can get 30% of the income for each generation.<br>If you circulate 200 USDT by yourself, you can get 20% of the income for the second generation. %<br>Circulate 400-1000USDT by yourself, get 5% of each income of 4-10 generations<br>Circulate 1100-2000USDT by yourself, get 1% of each income of 11-20 generations<\/p>',
                    present: 'source code',
                    prizeLog: 'Bonus details',
                    contAddress: 'Please enter the address TRC20',
                    startCir: 'Start circulation',
                    back: 'return',
                    contContract: 'statistics',
                    coutAddre: 'Total historical addresses',
                    countCirul: 'Total historical circulation',
                    prizePool: 'Innovation Prize Pool',
                    loginSuccTip: 'login successful',
                    sharePlan: 'KING 365 sharing program',
                    shareTip: 'Use any wallet address to pay to this address, and return to the logged-in wallet address after the fund circulation expires',
                    shareLink: 'Share link',
                    friendsTotal: 'Total number of node',
                    fCirculatTotal: 'Total circulation of node',
                    tissue: 'Node address',
                    personal1st: 'Personal 1st generation node',
                    personal2st: 'Personal 2nd generation node',
                    personal3st: 'Personal 3rd generation node',
                    personal4st: 'Personal 4-10 generation node',
                    personal11st: 'Personal 11-20 generation node',
                    copyText: 'copy',
                    personalData: 'Personal data statistics',
                    circulateUsdt: 'total circulating USDT',
                    returnUsdt: 'total return USDT',
                    shareReward: 'share reward USDT',
                    innovatReward: 'creation reward USDT',
                    curPersonalPL: 'Current total profit and loss USDT ',
                    recharge: 'Recharge',
                    hashOrder: 'My order',
                    cirTime: 'Cycle',
                    circulationIn: 'Circulation amount',
                    status: 'status',
                    view: 'View',
                    loginTip: 'Please bind yourDEFI address USDT (TRC20)',
                    qrCCode: 'Payment QR code',
                    qrCCodeExpir: 'QR code expiration time',
                    trcErrTip: 'TRX address format is incorrect',
                    cirReturn: 'Circulation return',
                    occupy: 'Distributed DEFI address, whether to enter the block explorer to check',
                    address: 'address',
                    regTime: 'Registration time',
                    troAdrrs: 'Transparent address',
                    cTime: 'time',
                    current: 'current',
                    amount: 'Amount',
                    cirRes: 'Circulat → return',
                    msg: {
                        busy:'The system is busy, please try again later! ',
                        paramErr:'Parameter error',
                        Occupy:'DistributedDEFI address, whether to enter the block explorer to check',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['in circulation','back','finish','fuse'],
                    oFail:'FAIL',
                    quest:'Question',
                    mtoken:'Cooperation token',
                }
            },
            zh: {
                message: {
                    lang: '中文繁體',
                    ecosystemLIS:'在這裏可以完全看到KING 365智能合約的代碼，因此您可以對項目的安全性和長期運營完全充滿信心！',
                    loginTip2:'分佈式DEFI地址，是否進入區塊鏈瀏覽器查看',

                    LSOSOSOq:'未觸發',
                    ecosystemLISPO:'常見問題',
                    ecosystemLISPO1:' 智能合約技術——這是當今去中心化經濟中的一種新現象<\/br> 處理和分配數字資產的財務流<\/br> 所有流程均在開放且分散的區塊鏈櫃中進行<\/br>KING 365加密貨幣基礎設施支持此類合約',
                    
            
                    ecosystemLIS1:'零風險',
                    ecosystemLIS2:'KING 365開發人員在波場區塊鏈上部署了壹個永久存在且無法被任何實體修改的自執行智能合約',

                    ecosystemLIS3:'即時交易',
                    ecosystemLIS4:'利潤從其他成員直接進入您的個人錢包，系統中沒有累積，收益僅屬於您',

                    ecosystemLIS5:'條件不變性',
                    ecosystemLIS6:'KING 365智能合約不過是壹個支付網關，可促進參與者之間的點對點傭金支付',

                    ecosystemLIS7:'分權化',
                    ecosystemLIS8:'沒有管理者或管理員，只有創造者與其他所有人壹樣平等參與項目',

                    ecosystemLIS9:'透明度和匿名性',
                    ecosystemLIS10:'智能合約是公開的，任何人都可以看到代碼和整個交易記錄,這保證了系統和真實項目統計的完整性',

                    ecosystemLIS11:'100%在線',
                    ecosystemLIS12:'所有資金在會員之間轉移，沒有任何隱藏費用，合同余額始終為零100% online',


                    ecosystem1:'全球分佈式生態系統',

                    sigOut: '登出',
                    sigIn: '登入',
                    syslang: '系統語言',
                    circulation: '流通量',
                    Walkinglantern:'提防虛假資源。社區KING 365只有壹個站點地址www.as136.com',
                    predict: '預估結束倒計時',
                    ring: '當前輪數',
                    description: '重新定义去中心化属性，重新定义dapp生态，重新定义民主和自由智能合约的技术确保所有参与者资金的完全安全。没有人能窃取资金或者改变合同智能',
                    join: '如何加入',
                    joinDesc: '<p>1：使用网络节点分享鏈接進入後登入您的USDT（TRC20）錢包地址自動激活账户进行decentralized finance（DeFi）流通性智能挖矿<\/p> <p>2：選擇流通周期，並向付幣地址支付您需要流通的USDT（TRC20）數量。<\/p><p>3：流通到期後，合約將自動返回增長後的USDT(TRC20)至您的錢包地址。<\/p>',
                    share: 'KING 365介紹',
                    shareDesc: '<p>1：KING 365 DEFI采用分布式去中心化的流通返回方式，DEFI從第0輪開始自動運行，當流通量不足以支付返回量時，DEFI將自動重置並進入下壹輪，最高達到第9輪。<\/p> <p>2：每提高壹輪，資金流通收益率將自動提高50%，用於激勵下壹輪的參與熱度。<\/p><p>3：每提高壹輪，將有10%-90%的流通資金進入創輪獎池，用於雙倍獎勵上壹輪所有虧損的錢包地址。<\/p>',
                    ruleDesc: '<p>4：USDT（TRC20）第0輪時流通獎勵規則：<br>流通1天後返回101%，流通7天後返回110.5%，流通15天後返回130% ，流通30天後返回190%<\/p><p>5：分享獎勵規則：<br>自己每多流通100USDT,就可多拿壹代的分享獎勵，最高能夠獲得20代的分享獎勵。<br>自己流通100USDT，可獲得1代每次收益的30%<br>自己流通200USDT，可獲得2代每次收益的20%<br>自己流通300USDT，可獲得3代每次收益的10%<br>自己流通400-1000USDT，可獲得4-10代每次收益的5%<br>自己流通1100-2000USDT，可獲得11-20代每次收益的1%<\/p>',
                    present: '開源代碼',
                    prizeLog: '獎金明細',
                    contAddress: '請輸入您的USDT(TRC20)錢包地址',
                    startCir: '開始流通',
                    back: '退回',
                    contContract: '匯統',
                    coutAddre: '歷史參與地址',
                    countCirul: '歷史參與流通',
                    prizePool: '創輪獎池',
                    loginSuccTip: '登錄成功',
                    sharePlan: 'KING 365分享計劃',
                    shareTip: '使用任何錢包地址向該地址付幣，資金流通到期後，返回至登入的錢包地址',
                    shareLink: '分享鏈接',
                    friendsTotal: '節點總地址數',
                    fCirculatTotal: '節點流通總量',
                    tissue: '節點地址',
                    personal1st: '個人1代節點',
                    personal2st: '個人2代節點',
                    personal3st: '個人3代節點',
                    personal4st: '個人4-10代節點',
                    personal11st: '個人11-20代節點',
                    copyText: '復制',
                    personalData: '個人數據統計',
                    circulateUsdt: '個人總流通USDT',
                    returnUsdt: '個人總返回USDT',
                    shareReward: '個人分享獎勵USDT',
                    innovatReward: '個人創輪獎勵USDT',
                    curPersonalPL: '當前個人總盈虧USDT',
                    recharge: '充值',
                    hashOrder: '我的訂單',
                    cirTime: '流通周期',
                    circulationIn: '流通金額',
                    status: '狀態',
                    view: '查看',
                    loginTip: '請綁定您正確USDT(TRC20)錢包地址',
                    loginTip1:'用戶已被禁用',
                    qrCCode: '付幣二維碼',
                    qrCCodeExpir: '二維碼失效時間',
                    cirReturn: '流通返回',
                    trcErrTip: 'TRX地址格式不正確',
                    occupy: '分布式DEFI地址，是否進入區塊瀏覽器查看',
                    troAdrrs: '透明地址',
                    address: '地址',
                    regTime: '註冊時間',
                    cTime: '時間',
                    current: '當前',
                    amount: '金額',
                    cirRes: '流通→返回',
                    msg: {
                        busy: '系統繁忙，請稍後再試！',
                        paramErr: '參數錯誤',
                        Occupy:'分布式DEFI地址，是否進入區塊瀏覽器查看',
                    },
                    period: {
                        year: '年', month: '月', day: '天', hrs: '時', mins: '分', secs: '秒',
                    },
                    oStatus: ['流通中', '返還中', '已完成', '熔斷'],
                    oFail:'失敗',
                    quest:'遇到問題',
                    mtoken:'合作令牌',
                }
            }, 
            ja: {
                message: {
                    lang: '日本語',
                    LSOSOSOq:'トリガーされない',
                    loginTip1:'ユーザが無効になりました',

                    ecosystemLIS:'KING 365スマートコントラクトのコードはこちらでご覧いただけますので、プロジェクトの',

                    loginTip2:'分散式DEFIアドレスはブロックチェーンブラウザに入るかどうか確認してください。',

                    ecosystemLISPO:'一般的な問題',
                    ecosystemLISPO1:' スマートコントラクトテクノロジー-これは、今日の分散型経済における新しい現象です<\/br> デジタル資産の財務フローを処理および配布します<\/br> すべてのプロセスは、オープンで分散型のブロックチェーンキャビネットで実行されます<\/br>KING 365暗号通貨インフラストラクチャはそのような契約をサポートします',
                    

                    ecosystemLIS1:'ゼロリスク',
                    ecosystemLIS2:'KING 365の開発者は、永続的でどのエンティティも変更できない自己実行型のスマートコントラクトをTRONブロックチェーンに展開しました',

                    ecosystemLIS3:'インスタントトランザクション',
                    ecosystemLIS4:'他のメンバーからの利益はあなたの個人的な財布に直接入り、システムに蓄積はなく、利益はあなただけに帰属します',

                    ecosystemLIS5:'条件付き不変性',
                    ecosystemLIS6:'KING 365スマートコントラクトは、参加者間のピアツーピアの手数料支払いを容易にすることができる単なる支払いゲートウェイです',

                    ecosystemLIS7:'分散化',
                    ecosystemLIS8:'管理者や管理者はいません。他のすべての人と対等な立場でプロジェクトに参加するのはクリエイターだけです。',

                    ecosystemLIS9:'透明性と匿名性',
                    ecosystemLIS10:'スマートコントラクトは公開されており、誰でもコードとトランザクションレコード全体を見ることができます。これにより、システムと実際のプロジェクト統計の整合性が保証されます。',

                    ecosystemLIS11:'100％オンライン',
                    ecosystemLIS12:'すべての資金は隠された料金なしでメンバー間で転送され、契約残高は常にゼロです',




                    sigOut: 'サインアウト',
                    ecosystem1:'全世界分布型生態システム',
                    sigIn: 'サインイン',
                    syslang: 'システム言語',
                    circulation: 'サーキュレーション',
                    Walkinglantern:'虚偽の資源に注意する。コミュニティKING 365は一つのサイトアドレスしかありません。www.as136.com',
                    predict: '見積もりの​​最後までのカウントダウン',
                    ring: '現在のリング番号',
                    description: '地方分権化の属性を再定義し、dappエコロジーを再定義し、民主主義と自由を再定義しますスマートコントラクトのテクノロジーは、すべての参加者の資金の完全な安全性を保証します。誰も資金を盗んだり、契約情報を変更したりすることはできません',
                    join: '参加する',
                    joinDesc: '<p> 1：ネットワークノードを使ってリンクを共有してログインしたらUSDT（TRC 20）ウォレットアドレスが自動的にアクティブになります。 <\ / p> <p> 2：流通期間を選択し、流通に必要なUSDT（TRC20）の金額を支払い先住所に支払います。 <\ / p> <p> 3：流通の期限が切れると、契約により、増加したUSDT（TRC20）が自動的にウォレットアドレスに返されます。 <\ / p>',
                    share: 'リング紹介',
                    shareDesc: '<p> 1：9リングのスマートコントラクトは、分散型および分散型の循輪リターン方式を採用しています。スマートコントラクトは、0番目のリングから自動的に実行されます。循輪がリターンの支払いに十分でない場合、スマートコントラクトは自動的にリセットされ、次のリングに入ります。リング、9番目のリングまで。 <\ / p> <p> 2：1つのリンクを増やすたびに、資本循輪の収益率が自動的に50％増加します。これは、次のリンクへの参加を促すために使用されます。 <\ / p> <p> 3：リンクが1つ増えるごとに、循輪資金の10％〜90％がChuanghuan賞金プールに入ります。これは、前のリンクでお金を失ったすべてのウォレットアドレスに2倍の報酬を与えるために使用されます。 <\ / p>',
                    ruleDesc: '<p> 4：0番目のリングでのUSDT（TRC20）循輪報酬ルール：<br>流通は1日後に101%に戻り、流通は7日後に110.5%に戻り、流通は15日後に130%に戻り、流通は30日後に190%に戻る。<\ / p> <p> 5：共有報酬ルール：<br> 100 USDTを配布するたびに、1世代の共有報酬を取得でき、最大20世代の共有報酬を取得できます。 <br> 100 USDTを自分で回覧すると、各世代の収入の30％を得ることができます。<br> 200 USDTを自分で回覧すると、第2世代の収入の20％を得ることができます。 ％<br> 400-1000USDTを自分で循輪させ、4-10世代の各収入の5％を取得します<br> 1100-2000USDTを自分で循輪させ、11-20世代の各収入の1％を取得します<\ / p>',
                    present: 'コード',
                    prizeLog: 'ボーナスの詳細',
                    contAddress: 'スマート契約アドレスUSDT（TRC20）を入力してください',
                    startCir: '循輪を開始します',
                    back: '戻る',
                    contContract: '契約統計',
                    coutAddre: '契約住所の数',
                    countCirul: '流通している契約の数',
                    prizePool: 'イノベーション賞金プール',
                    loginSuccTip: 'ログイン成功',
                    sharePlan: 'KING 365共有計画',
                    shareTip: '任意のウォレットアドレスを使用してこのアドレスに支払い、資金の流通が期限切れになった後、ログインしたウォレットアドレスに戻ります',
                    shareLink: '共有リンク',
                    friendsTotal: '友達の総数',
                    fCirculatTotal: '友達の総循輪',
                    tissue: 'ノードアドレス',
                    personal1st: '個人1世代ノード',
                    personal2st: '個人2世代ノード',
                    personal3st: '個人3世代ノード',
                    personal4st: '個人4-10世代ノード',
                    personal11st: '個人11-20世代ノード',
                    copyText: 'コピー',
                    personalData: '個人データ統計',
                    circulateUsdt: '個々の総循輪USDT量',
                    returnUsdt: 'USDTの個別のトータルリターン額',
                    shareReward: '個人シェア報酬USDT金額',
                    innovatReward: '個人作成報酬USDTの金額',
                    curPersonalPL: '現在の個人の損益USDTの合計額',
                    recharge: '充電する',
                    hashOrder: 'スマートコントラクトオーダー',
                    cirTime: '循輪サイクル',
                    circulationIn: '循輪量',
                    status: '状態',
                    view: '見る',
                    loginTip: 'スマートコントラクトアドレスUSDT（TRC20）をバインドしてください',
                    qrCCode: '支払いQRコード',
                    qrCCodeExpir: 'QRコードの有効期限',
                    trcErrTip: 'TRXアドレス形式が正しくありません',
                    cirReturn: '循輪リターン',
                    occupy: '分散型スマートコントラクトアドレス、チェックするためにブロックエクスプローラーに入るかどうか',
                    address: '住所',
                    regTime: '登録時間',
                    troAdrrs: 'Transparent address',
                    cTime: '時間',
                    current: '電流',
                    amount: '量',
                    cirRes: '循輪→戻る',
                    msg: {
                        busy: 'システムがビジーです。しばらくしてからもう一度お試しください。',
                        paramErr: 'パラメータエラー',
                        Occupy:'分散型スマートコントラクトアドレス、チェックするためにブロックエクスプローラーに入るかどうか',
                    },
                    period: {
                        year: '年', month: '月', day: '天', hrs: '時', mins: '分', secs: '秒',
                    },
                    oStatus: ['流通中','復帰','完了','融合'],
                    oFail:'失敗',
                    quest:'遭遇問題',
                    mtoken:'協力トークン',
                }
            },
            ko: {
                message: {
                    lang: '한국어',
                    sigOut: '로그 아웃',
                    loginTip1:'사용자 가 비활성화 되 었 습 니 다',
                    ecosystemLISPO:'일반적인 문제',
                    ecosystemLISPO1:' 스마트 계약 기술-이것은 오늘날 탈 중앙화 경제에서 새로운 현상입니다<\/br>디지털 자산의 재무 흐름을 처리하고 배포합니다<\/br>모든 프로세스는 개방적이고 분산 된 블록 체인 캐비닛에서 수행됩니다<\/br>KING 365 암호 화폐 인프라는 이러한 계약을 지원합니다',
                    loginTip2:'분포 식 DEFI 주소, 블록 체인 브 라 우 저 에 들 어가 서 확인 할 지 여부',

                    ecosystemLIS:'여기에서 KING 365 스마트 계약의 코드를 완전히 볼 수 있으므로 프로젝트의 안전과 장기 운영에 대한 완전한 확신을 가질 수 있습니다!',

                    LSOSOSOq:'트리거되지 않음',
                    ecosystemLIS1:'위험 없음',
                    ecosystemLIS2:'KING 365 개발자는 영구적으로 존재하며 TRON 블록 체인의 어떤 엔티티도 수정할 수없는 자체 실행 스마트 계약을 배포했습니다.',

                    ecosystemLIS3:'즉시 거래',
                    ecosystemLIS4:'다른 회원의 이익은 개인 지갑에 직접 입력되며 시스템에 누적되지 않으며 이익은 귀하에게만 해당됩니다.',

                    ecosystemLIS5:'조건부 불변',
                    ecosystemLIS6:'KING 365 스마트 계약은 참가자 간의 P2P 수수료 지불을 용이하게 할 수있는 지불 게이트웨이입니다.',

                    ecosystemLIS7:'분산',
                    ecosystemLIS8:'관리자 나 관리자가 없으며 제작자 만 다른 모든 사람과 동등하게 프로젝트에 참여합니다.',

                    ecosystemLIS9:'투명성과 익명 성',
                    ecosystemLIS10:'스마트 계약은 공개되어 누구나 코드와 전체 거래 기록을 볼 수있어 시스템의 무결성과 실제 프로젝트 통계를 보장합니다.',

                    ecosystemLIS11:'100 % 온라인',
                    ecosystemLIS12:'모든 자금은 숨겨진 수수료없이 회원간에 이체되며 계약 잔액은 항상 0입니다.',




                    ecosystem1:'전 세계 분포 식 생태 시스템',
                    sigIn: '로그인',
                    Walkinglantern:'허위 자원 을 경계 하 다.커 뮤 니 티 KING 365 는 하나의 사이트 주소 만 있 습 니 다 -www.as136.com', 
                    syslang: '시스템 언어',
                    circulation: '순환',
                    predict: '예상치 끝까지 카운트 다운',
                    ring: '현재 링 번호',
                    description: '탈 중앙화의 속성을 재정의하고, dapp 생태계를 재정의하고, 민주주의와 자유를 재정의합니다.스마트 계약 기술은 모든 참가자의 자금의 완전한 안전을 보장합니다.누구도 자금을 훔치거나 계약 정보를 변경할 수 없습니다',
                    join: '가입 방법',
                    joinDesc: '<p> 1 :1: 인터넷 노드 로 링크 를 공유 하고 들 어가 서 USDT (TRC 20) 지갑 주소 자동 으로 계 정 을 활성화 시 켜 decentralized finance (DeFi) 유통 성 스마트 발굴 을 진행 합 니 다. <\ / p> <p> 2 : 유통 기간을 선택하고 수취인 주소로 유통해야하는 USDT (TRC20) 금액을 지불합니다. <\ / p> <p> 3 : 유통이 만료 된 후 계약은 자동으로 증가 된 USDT (TRC20)를 귀하의 지갑 주소로 반환합니다. <\ / p>',
                    share: '나인 링 소개',
                    shareDesc: '<p> 1 : 나인 링 스마트 계약은 분산 및 분산 순환 반환 방식을 채택합니다. 스마트 계약은 0 번째 링부터 자동으로 실행됩니다. 순환이 반환 비용을 지불하기에 충분하지 않으면 스마트 계약이 자동으로 재설정되고 다음 단계로 들어갑니다. 링, 9 번째 링까지. <\ / p> <p> 2 : 링크 하나를 늘릴 때마다 자본 순환 수익률이 자동으로 50 % 씩 증가하여 다음 링크에 대한 참여를 장려하는 데 사용됩니다. <\ / p> <p> 3 : 하나의 링크가 증가 할 때마다 순환 자금의 10 % -90 %가 상금 풀에 들어가 이전 링크에서 손실 된 모든 지갑 주소를 두 배로 보상하는 데 사용됩니다. <\ / p>',
                    ruleDesc: '<p> 4 : 0 번째 링에서 USDT (TRC20) 유통 보상 규칙 : <br> 유통 1 일 만 에 101%, 유통 7 일 만 에 110.5%, 유통 15 일 만 에 130%, 유통 30 일 만 에 190%. <\ / p> <p> 5 : 공유 보상 규칙 : <br> 100 USDT를 유통 할 때마다 1 세대 공유 보상을받을 수 있으며 최대 20 세대까지 공유 보상을받을 수 있습니다. <br> 직접 100 달러를 유통하면 세대당 수입의 30 %를받을 수 있습니다. <br> 자신이 200 달러를 유통하면 2 세대 수입의 20 %를받을 수 있습니다. % <br> 직접 400-1000USDT를 유통하고, 4 ~ 10 세대 소득의 5 %를 얻으십시오. <br> 직접 1100-2000USDT를 유통하고, 11 ~ 20 세대 소득의 1 %를 얻으십시오. <\ / p>',
                    present: '오픈 소스 코드',
                    prizeLog: '보너스 세부 정보',
                    contAddress: '스마트 계약 주소 USDT (TRC20)를 입력하세요.',
                    startCir: '순환 시작',
                    back: '반환',
                    contContract: '계약 통계',
                    coutAddre: '과거에 참여한 스마트 계약 주소의 총 수',
                    countCirul: '스마트 계약 순환에 대한 역사적 참여의 총량',
                    prizePool: '혁신 상 풀',
                    loginSuccTip: '성공적 로그인',
                    sharePlan: 'KING 365 공유 프로젝트',
                    shareTip: '지갑 주소를 사용하여이 주소로 결제하고 펀드 유통이 만료 된 후 로그인 한 지갑 주소로 돌아갑니다.',
                    shareLink: '링크 공유',
                    friendsTotal: '총 친구 수',
                    fCirculatTotal: '친구의 총 순환',
                    tissue: '노드 주소',
                    personal1st: '개인 1 세대 노드',
                    personal2st: '개인 2 세대 노드',
                    personal3st: '개인 3 세대 노드',
                    personal4st: '개인 4 - 10 세대 노드',
                    personal11st: '개인 11 - 20 대 노드',
                    copyText: '부',
                    personalData: '개인 데이터 통계',
                    circulateUsdt: '개별 총 유통 USDT 수량',
                    returnUsdt: 'USDT의 개별 총 반환 금액',
                    shareReward: '개인 주식 보상 USDT 금액',
                    innovatReward: '개인 창작물 보상 USDT 금액',
                    curPersonalPL: '현재 총 개인 손익 USDT 금액',
                    recharge: '재충전',
                    hashOrder: '스마트 계약 주문',
                    cirTime: '순환주기',
                    circulationIn: '유통량',
                    status: '상태',
                    view: '전망',
                    loginTip: '스마트 계약 주소 USDT (TRC20)를 바인딩하십시오.',
                    qrCCode: '결제 QR 코드',
                    qrCCodeExpir: 'QR 코드 만료 시간',
                    trcErrTip: 'TRX 주소 형식이 잘못되었습니다.',
                    cirReturn: '순환 반환',
                    occupy: '분산 된 스마트 계약 주소, 블록 탐색기 입력 여부 확인',
                    address: '주소',
                    regTime: '등록 시간',
                    troAdrrs: 'Transparent address',
                    cTime: '시각',
                    current: '흐름',
                    amount: '양',
                    cirRes: '유통 → 반품',
                    msg: {
                        busy: '시스템이 사용 중입니다. 나중에 다시 시도하십시오! ',
                        paramErr: '매개 변수 오류',
                        Occupy:'분산 스마트 계약 주소, 블록 탐색기 입력 여부 확인',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: [ '유통 중', '복귀', '완료', '퓨즈'],
                    oFall:'실패',
                    quest:'만남 문제',
                    mtoken:'합작 영패',
                }
            },
            ar: {
                message: {
                    lang: ' العربية',
                    loginTip1:'وقد تم تعطيل المستخدم ',
                    ecosystemLISPO:'مشكلة شائعة',
                    ecosystemLISPO1:'تقنية العقود الذكية - هذه ظاهرة جديدة في الاقتصاد اللامركزي اليوم.<\/br>معالجة وتوزيع التدفق المالي للأصول الرقمية.<\/br>يتم تنفيذ جميع العمليات في خزانة blockchain مفتوحة وغير مركزية.<\/br>تدعم البنية التحتية للعملات المشفرة KING 365 مثل هذه العقود.',
                    
                    loginTip2:'وزعت ديفي العنوان ، أدخل كتلة سلسلة المتصفح لمعرفة ما إذا كان',


                    LSOSOSOq:'لم يتم تشغيلها',




                    ecosystemLIS:' مكنك رؤية رمز عقKING 365 الذكي بالكامل هنا ، حتى تثق تمامًا في سلامة وتشغيل المشروع على المدى الطويل!',


                    ecosystemLIS1:'合約',
                    ecosystemLIS2:'و KING 365 عقدًا ذكيًا ذاتي التنفيذ على blockchain TRON وهو دائم ولا يمكن تعديله من قبل أي كيان',

                    ecosystemLIS3:'معاملة فورية',
                    ecosystemLIS4:'الأرباح من الأعضاء الآخرين تدخل محفظتك الشخصية مباشرة ، ولا يوجد تراكم في النظام ، والربح ملك لك فقط',

                    ecosystemLIS5:'الثبات الشرطي',
                    ecosystemLIS6:'عقد KING 365 الذكي هو مجرد بوابة دفع يمكنها تسهيل دفع العمولة من نظير إلى نظير بين المشاركين',

                    ecosystemLIS7:'اللامركزية',
                    




                    ecosystemLIS8:'لا يوجد مديرين أو إداريين ، يشارك المبدعون فقط في المشروع على قدم المساواة مع أي شخص آخر',

                    ecosystemLIS9:'الشفافية وعدم الكشف عن هويته',
                    ecosystemLIS10:'العقد الذكي علني ، يمكن لأي شخص الاطلاع على الكود وسجل المعاملة بالكامل ، مما يضمن سلامة النظام وإحصائيات المشروع الحقيقية',

                    ecosystemLIS11:'100٪ عبر الإنترنت',
                    ecosystemLIS12:'يتم تحويل جميع الأموال بين الأعضاء دون أي رسوم خفية ، ويكون رصيد العقد دائمًا صفرًا',



                    ecosystem1:'النظم الإيكولوجية العالمية الموزعة',
                    Walkinglantern:' حذار من الموارد الزائفة  المجتمع جوكر واحد فقط عنوان الموقع  جوكر',
                    alkinglantern:'حذار من الموارد الزائفة  المجتمع جوكر واحد فقط عنوان الموقع  جوكر',
                    sigOut: 'خروج',
                    sigIn: 'تسجيل الدخول',
                    syslang: 'لغة النظام',
                    circulation: 'الدوران',
                    predict: 'العد التنازلي حتى نهاية التقدير',
                    ring: 'رقم الخاتم الحالي',
                   
                    description:'أعد تعريف سمات اللامركزية ، وأعد تعريف بيئة dapp ، وأعد تعريف الديمقراطية والحرية تضمن تقنية العقود الذكية السلامة الكاملة لأموال جميع المشاركين.لا أحد يستطيع سرقة الأموال أو تغيير ذكاء العقد',

                    join: 'كيف تنضم',
                    joinDesc: '<p> 1.استخدام عقدة شبكة مشاركة الرابط للدخول في تسجيل الدخول الخاص بك USDT عنوان المحفظة تلقائيا تفعيل حساب Decentralized Finance تداول التعدين الذكي <\ / p> <p> 2: حدد فترة الإعارة وادفع مبلغ USDT (TRC20) الذي تريد تعميمه على عنوان الدفع. <\/p> <p> 3: بعد انتهاء صلاحية التداول ، سيعيد العقد تلقائيًا زيادة USDT (TRC20) إلى عنوان محفظتك. <\ / ع>',
                    share: 'تسع حلقات مقدمة',
                    shareDesc: '<p> 1: يعتمد العقد الذكي المكون من تسعة حلقات على طريقة إرجاع تداول موزعة ولا مركزية. يعمل العقد الذكي تلقائيًا من الحلقة 0. عندما لا يكون التداول كافيًا للدفع مقابل العائد ، سيتم إعادة تعيين العقد الذكي تلقائيًا ويدخل العقد التالي الخاتم ، حتى الحلقة التاسعة. <\ / p> <p> 2: في كل مرة تقوم فيها بزيادة ارتباط واحد ، سيزداد معدل العائد على تداول رأس المال تلقائيًا بنسبة 50٪ ، والتي سيتم استخدامها لتشجيع المشاركة في الرابط التالي. <\/p> <p> 3: مقابل كل زيادة لرابط واحد ، ستدخل 10٪ -90٪ من الأموال المتداولة إلى مجموعة الجوائز ، والتي سيتم استخدامها لمضاعفة مكافأة جميع عناوين المحفظة التي فقدت أموالاً في الرابط السابق. <\ / ع>',
                    ruleDesc: '<p> 4: قواعد مكافأة التداول USDT (TRC20) في الحلقة 0: <br> بعد يوم واحد من التداول يعود إلى 101 ٪ ، بعد أيام من التداول يعود 110.5 ٪ ، بعد أيام من التداول يعود 130 ٪ ، بعد أيام من التداول يعود 190<\ / p>',
                    present: 'كود المصدر المفتوح',
                    prizeLog: 'تفاصيل المكافأة',
                    contAddress: 'الرجاء إدخال عنوان العقد الذكي USDT (TRC20)',
                    startCir: 'ابدأ الدورة الدموية',
                    back: 'إرجاع',
                    contContract: 'إحصائيات العقد',
                    coutAddre: 'العدد الإجمالي لعناوين العقود الذكية المشاركة التاريخية',
                    countCirul: 'المبلغ الإجمالي للمشاركة التاريخية في تداول العقود الذكية',
                    prizePool: 'مجموع جوائز الابتكار',
                    loginSuccTip: 'تم تسجيل الدخول بنجاح',
                    sharePlan: 'جوكر خطة تقاسم',
                    shareTip: 'استخدم أي عنوان محفظة للدفع لهذا العنوان ، والعودة إلى عنوان المحفظة الذي تم تسجيل الدخول إليه بعد انتهاء صلاحية تداول الأموال',
                    shareLink: 'رابط المشاركة',
                    friendsTotal: 'إجمالي عدد الأصدقاء',
                    fCirculatTotal: 'إجمالي تداول الأصدقاء',
                    tissue: 'عنوان العقدة',
                    personal1st: 'جيل الشخصية عقدة',
                    personal2st: 'الجيل الثاني من العقد الشخصية',
                    personal3st: 'شخصية الجيل الثالث عقدة',
                    personal4st: 'الشخصية 4-10 جيل عقدة',
                    personal11st: 'جيل 11-20 العقدة الشخصية',
                    copyText: 'نسخ',
                    personalData: 'إحصائيات البيانات الشخصية',
                    circulateUsdt: 'إجمالي كمية USDT المتداولة الفردية',
                    returnUsdt: 'إجمالي مبلغ العائد الفردي من USDT',
                    shareReward: 'مبلغ USDT لمكافأة الأسهم الفردية',
                    innovatReward: 'مقدار مكافأة الإبداع الشخصي USDT',
                    curPersonalPL: 'إجمالي مبلغ الربح والخسارة الشخصي الحالي من USDT',
                    recharge: 'تعبئة رصيد',
                    hashOrder: 'طلب عقد ذكي',
                    cirTime: 'دورة الدورة الدموية',
                    circulationIn: 'كمية التداول',
                    status: 'الحالة',
                    view: 'رأي',
                    loginTip: 'يرجى ربط عنوان العقد الذكي الخاص بك USDT (TRC20)',
                    qrCCode: 'رمز الاستجابة السريعة للدفع',
                    qrCCodeExpir: 'وقت انتهاء صلاحية رمز الاستجابة السريعة',
                    trcErrTip: 'تنسيق عنوان TRX غير صحيح',
                    cirReturn: 'گردش خون بازگشت',
                    occupy: 'عنوان العقد الذكي الموزع ، سواء للدخول إلى متصفح الحظر للتحقق',
                    address: 'عنوان',
                    regTime: 'وقت التسجيل',
                    troAdrrs: 'Transparent address',
                    cTime: 'زمن',
                    current: 'تيار',
                    amount: 'كمية',
                    cirRes: 'الدورة الدموية → العودة',
                    msg: {
                        busy: 'النظام مشغول ، يرجى المحاولة مرة أخرى لاحقًا!',
                        paramErr: 'خطأ في المعلمة',
                        Occupy:'عنوان العقد الذكي الموزع ، سواء لإدخال مستكشف الكتل للتحقق',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['متداولة', 'عودة', 'منجز', 'فتيل'],
                    oFail:'بالفشل',
                    quest:'مشكلة',
                    mtoken:'رمز التعاون',
                }
            },
            ru: {
                message: {
                    lang: 'Pусский',
                    ecosystem1:'Глабальная распаўсюджаная экасістэма',
                    ecosystemLISPO:'агульная праблема',
                    loginTip1:'Карыстальнік выключаны',
                    ecosystemLISPO1:'Тэхналогія разумных кантрактаў - гэта новая з ява ў сучаснай дэцэнтралізаванай эканоміцы.Апрацоўка і размеркаванне фінансавага патоку лічбавых актываў.<\/br>Усе працэсы ажыццяўляюцца ў адкрытым і дэцэнтралізаваным шафе блокчейн.<\/br>Інфраструктура криптовалют<\/br>KING 365 падтрымлівае такія кантракты.',

                    ecosystemLIS:'Тут вы можаце цалкам убачыць код разумнага кантракту KING 365, каб вы маглі быць у поўнай упэўненасці ў бяспецы і доўгатэрміновай працы праекта!',
                    
                    loginTip2:'Размяшчаны адрас defi, ці ўвядзіце ў браўзэр blockchain для прагляду',

                    ecosystemLIS1:'Нулявы рызыка',

                    ecosystemLIS2:'Распрацоўшчыкі KING 365 разгарнулі самастойны смарт-кантракт на блокчейне TRON, які з яўляецца пастаянным і не можа быць зменены любой арганізацыяй',  
                    LSOSOSOq:'Не спрацоўвае',

                    ecosystemLIS3:'Імгненная транзакцыя',
                    ecosystemLIS4:'Прыбытак ад іншых удзельнікаў паступае непасрэдна ў ваш асабісты кашалёк, у сістэме няма назапашвання, і прыбытак належыць толькі вам',

                    ecosystemLIS5:'Умоўная нязменнасць',

                    ecosystemLIS6:'Інтэлектуальны кантракт KING 365 - гэта проста плацежны шлюз, які можа палегчыць аднарангавую аплату камісіі паміж удзельнікамі',


                    ecosystemLIS7:'Дэцэнтралізацыя',


                    ecosystemLIS8:'Няма кіраўнікоў і адміністратараў, толькі стваральнікі ўдзельнічаюць у праекце на роўных з усімі',

                    ecosystemLIS9:'Празрыстасць і ананімнасць',
                    ecosystemLIS10:'Смарт-кантракт з яўляецца публічным, кожны можа ўбачыць код і ўвесь запіс транзакцыі, што забяспечвае цэласнасць сістэмы і рэальную статыстыку праекта',

                    ecosystemLIS11:'100% у Інтэрнэце',
                    ecosystemLIS12:'Усе сродкі пераводзяцца паміж членамі без якіх-небудзь схаваных камісій, а баланс кантракту заўсёды роўны нулю',








           

                    sigOut: 'Выйсці',
                    sigIn: 'Увайсці',
                    syslang: 'Сістэмная мова',
                    circulation: 'Тыраж',
                    Walkinglantern:'Паглядзіце на няправільныя рэсурсы.У Community KING 365 ёсць толькі адзін адрас сайта -www.as136.com',
                    predict: 'Зваротны адлік да канца ацэнкі',
                    ring: 'Бягучы нумар званка',
                    description: 'Перагледзець атрыбуты дэцэнтралізацыі, перавызначыць экалогію Даппа, перагледзець дэмакратыю і свабодуТэхналогія разумных кантрактаў забяспечвае поўную бяспеку сродкаў усіх удзельнікаў.Ніхто не можа скрасці сродкі або змяніць кантрактныя звесткі',
                    join: 'Як далучыцца',
                    joinDesc: '<p> 1: 1: Уваходзіце ў ваш адрас паперніка usdt (trc20) пасля выкарыстання спасылкі падзельніка сеткавых вузлаў, каб аўтаматычна актывізаваць рахунак для дэцентралізаванага фінансавага (defi) круглення інтэлектуальнага ру <\ / p> <p> 2: Выберыце перыяд звароту і заплаціце суму USDT (TRC20), якую трэба перадаць на адрас плацяжу. <\/p> <p> 3: Пасля заканчэння накладу кантракт аўтаматычна верне павялічаны USDT (TRC20) на ваш адрас кашалька. <\ / p>',
                    share: 'Увядзенне дзевяці кольцаў',
                    shareDesc: '<p> 1: Смарт-кантракт на дзевяць кольцаў прымае размеркаваны і дэцэнтралізаваны спосаб звароту звароту. Смарт-кантракт запускаецца аўтаматычна з 0-га кальца. Калі накладу недастаткова для аплаты вяртання, смарт-кантракт аўтаматычна скінецца і ўвядзе наступны Кальцо, да 9-га кальца. <\ / p> <p> 2: Кожны раз, калі вы павялічваеце адно звяно, норма рэнтабельнасці звароту капіталу аўтаматычна павялічваецца на 50%, што будзе выкарыстоўвацца для матывацыі ўдзелу ў наступнай спасылцы. <\/p> <p> 3: За кожнае павелічэнне адной спасылкі 10% -90% абарачальных сродкаў будзе паступаць у прызавы фонд Чуанхуаня, які будзе выкарыстоўвацца для падвойнага ўзнагароджання ўсіх адрасоў кашалька, якія страцілі грошы ў папярэдняй спасылцы. <\ / p>',
                    ruleDesc: '<p> 4: Правілы ўзнагароджання за зварот USDT (TRC20) падчас 0-га кальца: <br> Вяртаецца 101% пасля 1 дзеня круглення, 110,5% пасля 7 дзён круглення, 130% пасля 15 дзён круглення і 190% пасля 30 дзён круглення <\ / p> <p> 5: Правілы сумеснага ўзнагароджання: <br> Кожны раз, калі вы распаўсюджваеце 100 USDT, вы можаце атрымліваць пакаленне за ўзнагароды за сумеснае выкарыстанне і атрымліваць да 20 пакаленняў за ўзнагароды. <br> Калі вы распаўсюджваеце 100 USDT самастойна, вы можаце атрымліваць 30% даходу за кожнае пакаленне. <br> Калі вы распаўсюджваеце 200 USDT самастойна, вы можаце атрымліваць 20% даходу для другога пакалення. % <br> Накіруйце 400-1000USDT самастойна, атрымайце 5% ад кожнага даходу 4-10 пакаленняў <br> Накіруйце 1100-2000USDT самастойна, атрымайце 1% ад кожнага даходу 11-20 пакаленняў <\ / p>',
                    present: 'адкрыты зыходны код',
                    prizeLog: 'Бонусныя дадзеныя',
                    contAddress: 'Калі ласка, увядзіце адрас смарт-кантракту USDT (TRC20)',
                    startCir: 'Пачніце тыраж',
                    back: 'вяртанне',
                    contContract: 'Статыстыка кантрактаў',
                    coutAddre: 'Агульная колькасць адрасоў інтэлектуальнага кантракту, якія ўдзельнічаюць у гісторыі',
                    countCirul: 'Агульная сума гістарычнага ўдзелу ў абарачэнні смарт-кантрактаў',
                    prizePool: 'Прызавы фонд інавацый',
                    loginSuccTip: 'ўваход паспяховы',
                    sharePlan: 'Comment',
                    shareTip: 'Выкарыстоўвайце любы адрас кашалька для аплаты па гэтым адрасе і вярніцеся на адрас кашалька, які ўвайшоў у сістэму пасля заканчэння абарачэння фонду',
                    shareLink: 'Падзяліцца спасылкай',
                    friendsTotal: 'Агульная колькасць сяброў',
                    fCirculatTotal: 'Агульны наклад сяброў',
                    tissue: 'Адрас вузла',
                    personal1st: 'Асабістыя генерацыі 1 вузла',
                    personal2st: 'Асабістыя генерацыі 2 вузлаў',
                    personal3st: 'Асабісты вузел трэцяга пакалення',
                    personal4st: 'Асабістыя генерацыі 4- 10 вузлаў',
                    personal11st: 'Асабісты вузел 11- 20 генерацыі',
                    copyText: 'копія',
                    personalData: 'Статыстыка персанальных дадзеных',
                    circulateUsdt: 'Агульная колькасць абарачаных USDT',
                    returnUsdt: 'Агульная сума вяртання USDT',
                    shareReward: 'Узнагарода за індывідуальную ўзнагароду USDT',
                    innovatReward: 'Сума ўзнагароды за асабістае стварэнне USDT',
                    curPersonalPL: 'Бягучая агульная сума асабістага прыбытку і страт USDT',
                    recharge: 'Перазарадка',
                    hashOrder: 'Інтэлектуальны заказ па кантракце',
                    cirTime: 'Цыркуляцыйны цыкл',
                    circulationIn: 'Сума накладу',
                    status: 'статус',
                    view: 'Выгляд',
                    loginTip: 'Звяжыце свой адрас смарт-кантракту USDT (TRC20)',
                    qrCCode: 'QR-код аплаты',
                    qrCCodeExpir: 'Час заканчэння QR-кода',
                    trcErrTip: 'Фармат адраса TRX няправільны',
                    cirReturn: 'Вяртанне тыражу',
                    occupy: 'Размеркаваны адрас смарт-кантракту, ці трэба ўводзіць правадыр блокаў для праверкі',
                    address: 'адрас',
                    regTime: 'Час рэгістрацыі',
                    troAdrrs: 'Transparent address',
                    cTime: 'час',
                    current: 'бягучы',
                    amount: 'Сума',
                    cirRes: 'Тыраж → зварот',
                    msg: {
                        busy: 'Сістэма занятая, паўтарыце спробу пазней!',
                        paramErr: 'Памылка параметра',
                        Occupy:'Размеркаваны адрас смарт-кантракту, ці трэба ўводзіць правадыр блокаў для праверкі',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['У звароце', 'вяртаецца', 'завершаны', 'засцерагальнік'],
                    oFail:'няўдача',
                    quest:'праблема',
                    mtoken:'Знак супрацоўкі',
                }
            },
            fa: {
                message: {
                    LSOSOSOq:'راه اندازی نشده است',
                    loginTip1:'کاربر فعال شده است',
                    ecosystemLISPO:'مشکل مشترک',

                    ecosystemLISPO1:'فناوری قرارداد هوشمند - این یک پدیده جدید در اقتصاد غیر متمرکز امروز است.<\/br>پردازش و توزیع جریان مالی دارایی های دیجیتال.<\/br>تمام فرایندها در یک کابینت بلاکچین باز و غیرمتمرکز انجام می شود.<\/br>زیرساخت ارز رمزنگاری KING 365 از چنین قراردادهایی پشتیبانی می کند.',

                    loginTip2:'آدرس فایده جدا شده، آیا برای دیدن بررسی زنجیر بلوک وارد شود',
                    ecosystemLIS:'در اینجا می توانید کد قرارداد هوشمند KING 365 را کاملاً مشاهده کنید ، بنابراین می توانید به ایمنی و عملکرد طولانی مدت پروژه اطمینان کامل داشته باشید!',


                    ecosystemLIS1:'خطر صفر',
                    ecosystemLIS2:'توسعه دهندگان KING 365 یک قرارداد هوشمند خود اجرا در زنجیره بلوک TRON مستقر کرده اند که دائمی است و توسط هیچ شخص دیگری قابل اصلاح نیست',

                    ecosystemLIS3:'معامله فوری',
                    ecosystemLIS4:'سود سایر اعضا مستقیماً وارد کیف پول شخصی شما می شود ، در سیستم انباشت وجود ندارد و سود فقط متعلق به شماست',

                    ecosystemLIS5:'عدم تحقق مشروط',
                    ecosystemLIS6:'قرارداد هوشمند KING 365 فقط یک درگاه پرداخت است که می تواند پرداخت کمیسیون نظیر به نظیر را بین شرکت کنندگان تسهیل کند',

                    ecosystemLIS7:'تمرکززدایی',
                    ecosystemLIS8:'هیچ مدیر یا سرپرستی وجود ندارد ، فقط سازندگان با شرایط برابر با بقیه در پروژه شرکت می کنند',

                    ecosystemLIS9:'شفافیت و گمنامی',
                    ecosystemLIS10:'قرارداد هوشمند عمومی است ، هر کسی می تواند کد و کل پرونده معامله را مشاهده کند ، این امر از یکپارچگی سیستم و آمار واقعی پروژه اطمینان می دهد',

                    ecosystemLIS11:'100٪ آنلاین',
                    ecosystemLIS12:'کلیه وجوه بدون هیچ گونه هزینه پنهانی بین اعضا منتقل می شود و مانده قرارداد همیشه صفر است',










     




                    lang: 'فارسی',
                    ecosystem1:'اکوسیستم توزیع جهانی',
                    Walkinglantern:'از منابع دروغ محافظت کنید.جاکر اجتماعی فقط یک آدرس سایت دارد.www.as136.com',
                    sigOut: 'خروج از سیستم',
                    sigIn: 'ورود',
                    syslang: 'زبان سیستم',
                    circulation: 'جریان',
                    predict: 'شمارش معکوس تا پایان برآورد',
                    ring: 'شماره حلقه فعلی',
                    description: 'ویژگی های تمرکززدایی را دوباره تعریف کنید ، محیط زیست dapp را دوباره تعریف کنید ، دموکراسی و آزادی را دوباره تعریف کنید فناوری قراردادهای هوشمند ایمنی کامل وجوه شرکت کنندگان را تضمین می کند. هیچ کس نمی تواند وجوه سرقت کند یا اطلاعات قرارداد را تغییر ده',
                    join: 'چگونگی عضویت',
                    joinDesc: '<p> 1: به آدرس کیف پول USDT (TRC20) خود وارد شوید تا پس از استفاده از لینک اشتراک دوست برای ورود ، قرارداد هوشمند را به طور خودکار فعال کنید. <\ / p> <p> 2: دوره تیراژ را انتخاب کنید و مبلغ USDT (TRC20) مورد نیاز برای پرداخت به آدرس پرداخت را پرداخت کنید. <\/p> <p> 3: پس از انقضا تیراژ ، قرارداد به طور خودکار USDT (TRC20) افزایش یافته را به آدرس کیف پول شما بازمی گرداند. <\ / p>',
                    share: 'نه حلقه مقدمه',
                    shareDesc: '<p> 1: قرارداد هوشمند نه حلقه ای روش بازگشتی توزیع شده و غیرمتمرکز را در پیش می گیرد. قرارداد هوشمند از حلقه 0 به طور خودکار اجرا می شود. هنگامی که تیراژ برای پرداخت هزینه بازگشت کافی نیست ، قرارداد هوشمند به طور خودکار تنظیم می شود و وارد مرحله بعدی می شود حلقه ، تا حلقه 9. <\ / p> <p> 2: هر بار که یک پیوند را افزایش می دهید ، نرخ بازده گردش سرمایه به طور خودکار 50٪ افزایش می یابد ، که برای ایجاد انگیزه در پیوند بعدی استفاده می شود. <\/p> <p> 3: به ازای هر افزایش یک پیوند ، 10٪ -90٪ وجوه در گردش وارد جایزه می شوند ، که برای پاداش مضاعف به آدرسهای کیف پول از دست رفته در پیوند قبلی استفاده می شود. <\ / p>',
                    ruleDesc: '<p> 4: قوانین پاداش گردش USDT (TRC20) در حلقه 0: <br> 101٪ پس از 1 روز گردش ، 110٪ پس از 7 روز گردش و 130٪ پس از 15 روز گردش <\ / p> <p> 5: به اشتراک گذاشتن قوانین پاداش: <br> هر بار که 100 USDT را به گردش در می آورید ، می توانید نسلی از پاداش های مشترک را دریافت کنید و می توانید تا 20 نسل از پاداش های مشترک را دریافت کنید. <br> اگر 100 USDT را خودتان به گردش در آورید ، می توانید 30٪ از درآمد هر نسل را بدست آورید. <br> اگر 200 USDT را توسط خودتان گردش دهید ، می توانید 20٪ درآمد نسل دوم را بدست آورید. ٪ <br> 400-1000USDT را خودتان به گردش در آورید ، 5٪ از هر درآمد 4-10 نسل را بدست آورید <br> 1100-2000USDT را خودتان گردش دهید ، 1٪ از هر درآمد 11-20 نسل را دریافت کنید',
                    present: 'کد منبع باز',
                    prizeLog: 'جزئیات جایزه',
                    contAddress: 'لطفاً آدرس قرارداد هوشمند USDT (TRC20) را وارد کنید',
                    startCir: 'گردش خون را شروع کنید',
                    back: 'برگشت',
                    contContract: 'آمار قرارداد',
                    coutAddre: 'تعداد کل آدرس های قرارداد هوشمند مشارکت کننده تاریخی',
                    countCirul: 'مقدار کل مشارکت تاریخی در گردش قرارداد هوشمند',
                    prizePool: 'جایزه نوآوری',
                    loginSuccTip: 'ورود به سیستم موفقیت آمیز است',
                    sharePlan: 'برنامه شریک بازی',
                    shareTip: 'برای پرداخت به این آدرس از هر آدرس کیف پول استفاده کنید و پس از انقضا گردش صندوق به آدرس کیف پول وارد شده برگردید',
                    shareLink: 'لینک را به اشتراک بگذارید',
                    friendsTotal: 'تعداد کل دوستان',
                    fCirculatTotal: 'گردش کلی دوستان',
                    tissue: 'آدرس نوع',
                    personal1st: 'نسل شخصی ۱ گره',
                    personal2st: 'نسل شخصی ۲ گره',
                    personal3st: 'گرم سوم نسل شخصی',
                    personal4st: 'نسل شخصی 4-10 گره',
                    personal11st: 'گرم نسل ۱۱-۲۰ شخصی',
                    copyText: 'کپی 🀄',
                    personalData: 'آمار داده های شخصی',
                    circulateUsdt: 'مقدار کل USDT در گردش فردی',
                    returnUsdt: 'مبلغ برگشتی کل USDT',
                    shareReward: 'پاداش سهم فردی مبلغ USDT',
                    innovatReward: 'مقدار پاداش خلقت شخصی USDT',
                    curPersonalPL: 'سود و زیان شخصی کل USDT',
                    recharge: 'شارژ مجدد',
                    hashOrder: 'سفارش قرارداد هوشمند',
                    cirTime: 'چرخه گردش خون',
                    circulationIn: 'مقدار گردش خون',
                    status: 'وضعیت',
                    view: 'چشم انداز',
                    loginTip: 'لطفاً آدرس قرارداد هوشمند خود را USDT (TRC20) متصل کنید',
                    qrCCode: 'کد QR پرداخت',
                    qrCCodeExpir: 'زمان انقضا کد QR',
                    trcErrTip: 'قالب آدرس TRX نادرست است',
                    cirReturn: 'عودة الدورة الدموية',
                    occupy: 'توزیع آدرس قرارداد هوشمند ، اینکه آیا برای بررسی به بلوک کاوشگر وارد شوید',
                    address: 'نشانی',
                    regTime: 'زمان ثبت نام',
                    cTime: 'زمان',
                    current: 'جاری',
                    amount: 'میزان',
                    cirRes: 'گردش. بازگشت',
                    msg: {
                        busy: 'سیستم شلوغ است ، لطفاً بعداً دوباره امتحان کنید!',
                        paramErr: 'خطای پارامتر',
                        Occupy:'توزیع آدرس قرارداد هوشمند ، اینکه آیا برای بررسی به بلوک کاوشگر وارد شوید',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['در گردش است', 'عودت', 'تکمیل شده', 'فیوز'],
                    oFail:'شکست',
                    quest:'مسئله',
                    mtoken:'علامت همکاری',
                }
            },
            es: {
                // 
                message: {
                    
                    lang: 'Espa&ntilde;ol',
                    sigOut: 'desconectar',
                    sigIn: 'Registrarse',
                    
                    loginTip1: 'کمک کننده',
                    ecosystemLISPO:'problema comun',

                    ecosystemLISPO1:'Tecnología de contrato inteligente: este es un fenómeno nuevo en la economía descentralizada de hoy.<\/br>Procesar y distribuir el flujo financiero de activos digitales<\/br>Todos los procesos se llevan a cabo en un gabinete blockchain abierto y descentralizado.<\/br>La infraestructura de criptomonedas KING 365 admite tales contratos.',

                    LSOSOSOq:'No activado',

                    loginTip2:'Dirección defi distribuida, introduzca el navegador de la cadena de bloques para ver',

                    ecosystemLIS:'Aquí puede ver completamente el código del contrato inteligente KING 365, para que pueda tener plena confianza en la seguridad y el funcionamiento a largo plazo del proyecto.',







                    ecosystemLIS1:'Riesgo cero',

                    ecosystemLIS2:'Los desarrolladores de KING 365 implementaron un contrato inteligente autoejecutable en la cadena de bloques TRON que es permanente y no puede ser modificado por ninguna entidad.',  


                    ecosystemLIS3:'Transacción instantánea',
                    ecosystemLIS4:'Las ganancias de otros miembros ingresan directamente a su billetera personal, no hay acumulación en el sistema y las ganancias solo le pertenecen a usted',

                    ecosystemLIS5:'Invariancia condicional',

                    ecosystemLIS6:'El contrato inteligente KING 365 es solo una pasarela de pago que puede facilitar el pago de comisiones de igual a igual entre los participantes',


                    ecosystemLIS7:'Descentralización',


                    ecosystemLIS8:'No hay gerentes ni administradores, solo los creadores participan en el proyecto en pie de igualdad con todos los demás',

                    ecosystemLIS9:'Transparencia y anonimato',
                    ecosystemLIS10:'El contrato inteligente es público, cualquiera puede ver el código y todo el registro de transacciones, lo que garantiza la integridad del sistema y las estadísticas reales del proyecto.',

                    ecosystemLIS11:'100% online',
                    ecosystemLIS12:'Todos los fondos se transfieren entre miembros sin tarifas ocultas y el saldo del contrato es siempre cero.',






 











                    syslang: 'Lenguaje del sistema',
                    ecosystem1:'Global Distributed Ecosystem',
                    circulation: 'Circulación',
                    Walkinglantern:'Cuidado con los recursos falsos.El KING 365 comunitario sólo tiene una dirección de www.as136.com',
                    predict: 'Cuenta regresiva hasta el final del presupuesto',
                    ring: 'Número de timbre actual',
                    description: 'Redefinir los atributos de la descentralización, redefinir la ecología dapp, redefinir la democracia y la libertadLa tecnología de los contratos inteligentes garantiza la total seguridad de los fondos de todos los participantes.Nadie puede robar fondos o cambiar la inteligencia del contrato.',
                    join: 'Como unirse',
                    joinDesc: '<p> 1: Inicie sesión en la dirección de su billetera USDT (TRC20) para activar automáticamente el contrato inteligente después de usar el enlace para compartir del amigo para ingresar. <\ / p> <p> 2: Seleccione el período de circulación y pague la cantidad de USDT (TRC20) que necesita para circular a la dirección de pago. <\/p> <p> 3: Después de que expire la circulación, el contrato devolverá automáticamente el USDT aumentado (TRC20) a la dirección de su billetera. <\ / p>',
                    share: 'Introducción a los Nueve Anillos',
                    shareDesc: '<p> 1: El contrato inteligente de nueve anillos adopta un método de devolución de circulación distribuida y descentralizada. El contrato inteligente se ejecuta automáticamente desde el anillo 0. Cuando la circulación no es suficiente para pagar la devolución, el contrato inteligente se restablecerá automáticamente y entrará en el siguiente Ring, hasta el noveno ring. <\ / p> <p> 2: Cada vez que aumente un enlace, la tasa de rendimiento de la circulación de capital aumentará automáticamente en un 50%, lo que se utilizará para fomentar la participación en el siguiente enlace. <\/p> <p> 3: Por cada aumento de un enlace, el 10% -90% de los fondos circulantes entrarán en el premio acumulado, que se utilizará para recompensar al doble a todas las direcciones de billetera que perdieron dinero en el enlace anterior. <\ / p>',
                    ruleDesc: '<p> 4:Reglas de recompensa de circulación en la Ronda 0 de usdt (trc20): <br> Después de 1 día de circulación, 101%, 110,5% después de 7 días de circulación, 130% después de 15 días de circulación y 190% después de 30 días de circulación. <\ / p> <p> 5: Reglas de recompensas compartidas: <br> Cada vez que circula 100 USDT, puede obtener una generación de recompensas compartidas y puede obtener hasta 20 generaciones de recompensas compartidas. <br> Si circula 100 USDT usted mismo, puede obtener el 30% de los ingresos de cada generación. <br> Si circula 200 USDT usted mismo, puede obtener el 20% de los ingresos de la segunda generación. % <br> Circule 400-1000USDT usted mismo, obtenga el 5% de cada ingreso de 4-10 generaciones <br> Circule 1100-2000USDT usted mismo, obtenga el 1% de cada ingreso de 11-20 generaciones <\ / p>',
                    present: 'código fuente abierto',
                    prizeLog: 'Detalles de bonificación',
                    contAddress: 'Ingrese la dirección del contrato inteligente USDT (TRC20)',
                    startCir: 'Iniciar la circulación',
                    back: 'regreso',
                    contContract: 'Estadísticas de contratos',
                    coutAddre: 'El número total de direcciones históricas de contratos inteligentes participantes',
                    countCirul: 'La cantidad total de participación histórica en la circulación de contratos inteligentes.',
                    prizePool: 'Bolsa de premios de innovación',
                    loginSuccTip: 'Inicio de sesión correcto',
                    sharePlan: 'KING 365 share Program',
                    shareTip: 'Use cualquier dirección de billetera para pagar a esta dirección y regrese a la dirección de billetera con la sesión iniciada después de que expire la circulación de fondos',
                    shareLink: 'Compartir enlace',
                    friendsTotal: 'Número total de amigos',
                    fCirculatTotal: 'Circulación total de amigos',
                    tissue: 'Dirección del nodo',
                    personal1st: 'Nodo de generación personal',
                    personal2st: 'Nodo personal de segunda generación',
                    personal3st: 'Nodo personal de tercera generación',
                    personal4st: 'Nodo de generación personal 4 - 10',
                    personal11st: 'Nodo de generación personal 11 - 20',
                    copyText: 'Copiar',
                    personalData: 'Estadísticas de datos personales',
                    circulateUsdt: 'Cantidad de USDT circulante total individual',
                    returnUsdt: 'Importe de devolución total individual de USDT',
                    shareReward: 'Importe de USDT de recompensa de acciones individuales',
                    innovatReward: 'La cantidad de recompensa de creación personal USDT',
                    curPersonalPL: 'Cantidad actual total de ganancias y pérdidas personales en USDT',
                    recharge: 'Recargar',
                    hashOrder: 'Orden de contrato inteligente',
                    cirTime: 'Ciclo de circulación',
                    circulationIn: 'Cantidad de circulación',
                    status: 'estado',
                    view: 'Ver',
                    loginTip: 'Vincula tu dirección de contrato inteligente USDT (TRC20)',
                    qrCCode: 'Código QR de pago',
                    qrCCodeExpir: 'Hora de vencimiento del código QR',
                    trcErrTip: 'El formato de la dirección TRX es incorrecto',
                    cirReturn: 'Retorno de circulación',
                    occupy: 'Dirección de contrato inteligente distribuida, si se debe ingresar al explorador de bloques para verificar',
                    address: 'habla a',
                    regTime: 'Tiempo de registro',
                    troAdrrs: 'Transparent address',
                    cTime: 'hora',
                    current: 'Actual',
                    amount: 'Cantidad',
                    cirRes: 'Circulación → retorno',
                    msg: {
                        busy: 'El sistema está ocupado, inténtelo de nuevo más tarde.',
                        paramErr: 'error de parametro',
                        Occupy:'Dirección de contrato inteligente distribuida, si se debe ingresar al explorador de bloques para verificar',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['En circulación', 'Regresando', 'terminado', 'Fusible'],
                    oFail:'fracaso',
                    quest:'problema',
                    mtoken:'Token de cooperación',
                }
            },

        }
    })
    // Main
    var vm = new Vue({
        el: '#App',
        i18n,
        data: {          
            expiredate:'',
            addressList:'',
            financials:[],

            
            totalconten:{},
            orders:[],   //订单
            personal:{
                profit: null,
                recharge_quantity_sum: null,
                ring_reward: null,
                share_reward: null,
                withdraw_quantity_sum: null
            }, // 个人数据统计
            userFromSumGroups:{
       
              lv1: null,
              lv2: null,
              lv3: null,
              lv4: null,
              lv5: null

            }, //節點地址
            share_plan:{
                form_user_count: null,
                recharge_quantity_sum: null,
                share_url: null,
            }, 
            urlApi:'https://aaa.as136.com',

            tab: 'main',
            langShow:false,
            deposit_amount: 0,
            trxAmount: '',













            
            selectDay: 1,
            cirReturn:130,
            qrcodeText: '',
            curTitle: '',
            curTeamlist: [],
            prizeLogs: {
                data: [],
            },
            contract: {
                ring_pool: 0,
                circulation: 0,
                coutAddre: 0,
                prizePool: 0,
                countdown_at: 5184000, 
                AdrsList:[],
            },
            tron: {
                account: '',
                personal1st: 0,
                personal2st: 0,
                personal3st: 0,
                personal4st: 0,
                personal11st: 0,
                returnUsdt: 0,
                shareReward: 0,
                innovatReward: 0,
                curPersonalPL: 0,
                orderList: [],
                teams: [[], [], [], [], []],
                user: {
                    'd1': '',
                    'd7': '',
                    'd15': '',
                    'failtm': 0,
                    'flow': 0,
                    'tflow': 0,
                    'team': 0,
                },
            },

            coinList:[{"id":"huobipro","logo":"huobipro.png","url":"https:\/\/www.huobi.pr"},{"id":"binance","logo":"binance.png","url":"https:\/\/www.binancezh.pro"},{"id":"coinbasepro","logo":"coinbasepro.png","url":"https:\/\/pro.coinbase.com\/"},{"id":"bitfinex","logo":"bitfinex.png","url":"https:\/\/www.bitfinex.com"},{"id":"bitflyer","logo":"bitflyer.png","url":"https:\/\/bitflyer.jp\/"},{"id":"bitmex","logo":"bitmex_200.png?v=1573453365","url":"https:\/\/www.bitmex.com\/"},{"id":"bittrex","logo":"bittrex.png","url":"https:\/\/bittrex.com"},{"id":"okex","logo":"okex.png","url":"https:\/\/www.okexcn.com"},{"id":"zb","logo":"zb.png","url":"https:\/\/www.zb.center"},{"id":"bitstamp","logo":"bitstamp.png","url":"https:\/\/www.bitstamp.net"},{"id":"kraken","logo":"kraken.png","url":"https:\/\/www.kraken.com"},{"id":"gemini","logo":"gemini.png","url":"https:\/\/gemini.com\/"},{"id":"poloniex","logo":"poloniex.png?v=1600153929","url":"https:\/\/poloniex.com"},{"id":"mexc","logo":"mexc.png","url":"https:\/\/www.mxc.ai"},{"id":"gate-io","logo":"gate-io.png","url":"https:\/\/www.gateio.tv"},{"id":"bikicoin","logo":"bikicoin_200.png?v=1584932151","url":"https:\/\/www.biki.cc"},{"id":"hitbtc","logo":"hitbtc.png","url":"https:\/\/hitbtc.com"},{"id":"bituan","logo":"bituan.png?v=1591673036","url":"https:\/\/www.bituan.pro"},{"id":"aofex","logo":"aofex.png","url":"https:\/\/aofex.com"},{"id":"coinw","logo":"coinw.png?v=1597374303","url":"https:\/\/www.coinw.pw"},{"id":"bitget","logo":"bitget.png","url":"https:\/\/www.bitget.info"},{"id":"wbfex","logo":"wbfex_200.png?v=1583205240","url":"https:\/\/www.wbfex.com"},{"id":"ztcom","logo":"ztcom_200.png?v=1585106397","url":"https:\/\/www.ztb.im"},{"id":"bit-z","logo":"bit-z.png?v=1602641673","url":"https:\/\/www.bitz.ai"},{"id":"upbit","logo":"upbit.png","url":"https:\/\/upbit.com\/home"},{"id":"hotcoin","logo":"hotcoin.png","url":"https:\/\/www.hotcoinex.cc"},{"id":"bg","logo":"bg.png","url":"http:\/\/www.bgex.com\/"},{"id":"dcoin","logo":"dcoin_200.png?v=1577158793","url":"https:\/\/www.dcoin.com"},{"id":"ubank","logo":"ubank.png","url":"https:\/\/ubanks.ai\/"},{"id":"liquid","logo":"liquid.png","url":"https:\/\/www.liquid.com\/"},{"id":"loex","logo":"loex_200.png?v=1576483090","url":"https:\/\/www.loex.io"},{"id":"zbg","logo":"zbg.png","url":"https:\/\/www.zbg.com\/"},{"id":"cointiger","logo":"cointiger_200.png?v=1582084026","url":"https:\/\/www.cointiger.com\/"},{"id":"shuzibi","logo":"shuzibi.png?v=1593328236","url":"https:\/\/www.digifinex.com"},{"id":"coinbene","logo":"coinbene.png?v=1605860044","url":"https:\/\/www.coinbene.plus\/"},{"id":"tokencan","logo":"tokencan.png","url":"https:\/\/www.tokencan.co\/"},{"id":"ourbit","logo":"ourbit.png?v=1594350201","url":"https:\/\/www.ourbit.com"},{"id":"zgcom","logo":"zgcom.png?v=1591068166","url":"https:\/\/www.zg.com"},{"id":"bibox","logo":"bibox.png","url":"https:\/\/www.bibox.com"},{"id":"kucoin","logo":"kucoin.png","url":"https:\/\/www.kucoin.io\/"},{"id":"bybit","logo":"bybit_200.png?v=1584414963","url":"https:\/\/www.bybit.com"},{"id":"bithumb","logo":"bithumb.png","url":"https:\/\/www.bithumb.com\/"},{"id":"xmex","logo":"xmex_200.png?v=1582687802","url":"https:\/\/www.xmex.co"},{"id":"bigone","logo":"bigone.png","url":"https:\/\/bigonechina.com"},{"id":"biteceo","logo":"biteceo.png","url":"https:\/\/www.ceobi.co"},{"id":"coinbig","logo":"coinbig.png?v=1591685197","url":"https:\/\/www.coinbig.in"},{"id":"sjscom","logo":"sjscom.png?v=1596090574","url":"https:\/\/www.sjs.com\/"},{"id":"hoo","logo":"hoo.png?v=1597221468","url":"https:\/\/hoo.com\/"},{"id":"bmex","logo":"1585189838532_200.png?v=1585290071","url":"https:\/\/bmex.vip"},{"id":"bfx","logo":"bfx.png","url":"https:\/\/www.bfxnu.pro"},{"id":"pkex","logo":"pkex.png?v=1593488768","url":"https:\/\/www.pkex.com"},{"id":"bhex","logo":"bhex.png?v=1586943468","url":"https:\/\/www.hbtc.co"},{"id":"aex","logo":"aex.png?v=1595212803","url":"https:\/\/www.aex.plus\/"},{"id":"hkexone","logo":"hkexone.png","url":"https:\/\/www.hkex.la"},{"id":"bibull","logo":"bibull.png?v=1588930726","url":"https:\/\/www.bibull.co\/"},{"id":"bitmax","logo":"bitmax.png","url":"https:\/\/www.btmx.io\/"},{"id":"yobit","logo":"yobit.png","url":"https:\/\/yobit.net"},{"id":"coinone","logo":"coinone.png","url":"https:\/\/coinone.co.kr\/"},{"id":"citex","logo":"citex.png","url":"https:\/\/www.citex.io\/"},{"id":"bicc","logo":"bicc.png","url":"https:\/\/www.bi.cc"},{"id":"coincheck","logo":"coincheck.png","url":"https:\/\/coincheck.com\/"},{"id":"bkex","logo":"bkex.png?v=1587708422","url":"https:\/\/www.bkex.com"},{"id":"hcex","logo":"hcex.png?v=1597306114","url":"https:\/\/www.hcex.net\/"},{"id":"bebt","logo":"bebt.png?v=1597979574","url":"https:\/\/www.bebt.me"},{"id":"xt","logo":"xt.png","url":"https:\/\/www.xt.com"},{"id":"kmex","logo":"kmex.png?v=1594175760","url":"https:\/\/www.kmex.io\/"},{"id":"btcc","logo":"btcc.png?v=1591319081","url":"https:\/\/www.btcc.com\/"},{"id":"bione","logo":"bione_200.png?v=1584520181","url":"https:\/\/www.bione.me"},{"id":"lhang","logo":"lhang.png","url":"https:\/\/www.lbank.info"},{"id":"ubiex","logo":"ubiex_200.png?v=1585548420","url":"https:\/\/www.ubiex.co\/"},{"id":"cftcex","logo":"cftcex.png?v=1605685626","url":"https:\/\/www.cftcex.com"},{"id":"whaleex","logo":"whaleex.png","url":"https:\/\/w.whaleex.com.cn\/"},{"id":"jbexcom","logo":"jbexcom.png","url":"https:\/\/www.jbex.com\/"},{"id":"bingbon","logo":"1571887239335_200.png?v=1577180550","url":"https:\/\/www.bingbon.com"},{"id":"boxexio","logo":"boxexio.png","url":"https:\/\/www.boxex.io\/"},{"id":"btnex","logo":"1570775086434_200.png?v=1570775207","url":"https:\/\/www.btnex.pro\/"},{"id":"bbvip","logo":"bbvip.png?v=1605778350","url":"https:\/\/www.ubitmex.com\/"},{"id":"bqex","logo":"bqex.png","url":"http:\/\/www.bqex.org\/"},{"id":"tokok","logo":"tokok.png","url":"https:\/\/www.tokok.com\/"},{"id":"sfex","logo":"1571187035835_200.png?v=1585278569","url":"http:\/\/sfex.one"},{"id":"hotbit","logo":"hotbit.png?v=1585819031","url":"https:\/\/www.hotbit.pro\/"},{"id":"zibit","logo":"zibit.png?v=1600763987","url":"https:\/\/www.zibit.pro\/"},{"id":"boboo","logo":"1574149917741_200.png?v=1574150013","url":"https:\/\/www.boboo.vip"},{"id":"champagne","logo":"champagne.png?v=1603934324","url":"https:\/\/www.chex.pro"},{"id":"bitbank","logo":"bitbank.png","url":"https:\/\/bitbank.cc"},{"id":"bitmart","logo":"bitmart.png","url":"https:\/\/www.bitmart.news"},{"id":"gj","logo":"gj.png","url":"https:\/\/www.gj.live\/"},{"id":"dibi","logo":"dibi.png?v=1590374802","url":"https:\/\/www.dibic.net\/"},{"id":"ocx","logo":"ocx_200.png?v=1579483760","url":"http:\/\/www.ocx.com\/"},{"id":"homiex","logo":"1575958707218_200.png?v=1577858755","url":"https:\/\/www.homiex.io\/"},{"id":"phoenixglobal","logo":"1579485858870_200.png?v=1584347689","url":"https:\/\/www.phoenixglobal.cc\/"},{"id":"bingoex","logo":"1575012955691_200.png?v=1575267138","url":"https:\/\/www.bingoex.pro"},{"id":"btex","logo":"btex.png","url":"https:\/\/www.btex.com\/"},{"id":"asproex","logo":"1573009753688_200.png?v=1573009920","url":"https:\/\/www.asproex.com\/"},{"id":"londonexchange","logo":"londonexchange.png?v=1603443885","url":"https:\/\/www.ldxex.com"},{"id":"goko","logo":"goko.png","url":"https:\/\/www.goko.vip\/"},{"id":"exmo","logo":"exmo.png","url":"https:\/\/exmo.com\/"},{"id":"umex","logo":"umex.png?v=1602729285","url":"https:\/\/www.bitfly.co"},{"id":"zaif","logo":"zaif.png","url":"https:\/\/zaif.jp"},{"id":"immex","logo":"immex.png?v=1600242649","url":"https:\/\/www.immex.vip"},{"id":"ffexpro","logo":"ffexpro.png","url":"https:\/\/www.ffex.pro\/"},{"id":"bithumbpro","logo":"bithumbpro.png","url":"https:\/\/www.bithumb.global"},{"id":"deepcoin","logo":"deepcoin.png","url":"https:\/\/deepcoin.com\/"},{"id":"rightbtccc","logo":"rightbtccc.png?v=1597645085","url":"https:\/\/www.rightbtc.cc\/"},{"id":"aboutcoin","logo":"aboutcoin.png?v=1602318543","url":"https:\/\/www.boniry.pro"},{"id":"exx","logo":"exx.png","url":"https:\/\/www.exxcn.com\/"},{"id":"wankejia","logo":"wankejia.png","url":"https:\/\/www.wkj.link\/"},{"id":"hopex","logo":"hopex.png?v=1603942313","url":"https:\/\/www.hopex.com"},{"id":"itex","logo":"itex.png?v=1597904195","url":"http:\/\/itex.cc\/"},{"id":"alokex","logo":"alokex.png?v=1604287037","url":"https:\/\/www.alokex.me"},{"id":"gx","logo":"1572505884349_200.png?v=1572505997","url":"https:\/\/www.gx.com\/"},{"id":"iotuyy","logo":"iotuyy.png","url":"http:\/\/www.iotuyy.com"},{"id":"vb","logo":"vb.png","url":"https:\/\/www.vb.co\/"},{"id":"aax","logo":"aax.png?v=1586490610","url":"https:\/\/www.aaxpro.com"},{"id":"bitsg","logo":"bitsg.png","url":"https:\/\/www.bitsg.cc"},{"id":"idcm","logo":"idcm.png?v=1594892113","url":"https:\/\/www.idcm.cc\/"},{"id":"zdcoin","logo":"zdcoin.png?v=1590030323","url":"https:\/\/www.zhidian.io\/"},{"id":"bw","logo":"bw.png","url":"https:\/\/www.bw.io\/"},{"id":"zgtop","logo":"zgtop.png","url":"https:\/\/www.zgpro.top\/ "},{"id":"bitcoinwin","logo":"bitcoinwin.png?v=1585622421","url":"https:\/\/www.bitcoinwin.io\/"},{"id":"newtonxchange","logo":"newtonxchange.png","url":"https:\/\/www.newtonx.vip\/"},{"id":"deerdex","logo":"deerdex.png?v=1593412889","url":"https:\/\/www.deerdex.top"},{"id":"fatbtc","logo":"fatbtc.png","url":"https:\/\/www.fatbtc.com"},{"id":"dfex","logo":"dfex.png","url":"https:\/\/www.dfex.im\/"},{"id":"btcmax","logo":"btcmax.png","url":"https:\/\/www.btcmax.com"},{"id":"60com","logo":"60com.png","url":"https:\/\/www.bjex.pro"},{"id":"bitfx","logo":"bitfx.png?v=1599636701","url":"https:\/\/www.bitfx.info"},{"id":"beecoin","logo":"beecoin.png?v=1603352156","url":"https:\/\/www.benson.today\/"},{"id":"luno","logo":"luno.png","url":"https:\/\/www.luno.com"},{"id":"qb","logo":"qb.png","url":"https:\/\/www.qb.com\/"},{"id":"bbkx","logo":"bbkx.png","url":"https:\/\/www.bbkx.com"},{"id":"grccoin","logo":"1583915904994_200.png?v=1583916190","url":"https:\/\/www.grccoin.co"},{"id":"nowex","logo":"nowex.png?v=1603762163","url":"https:\/\/www.exfinex.com"},{"id":"proex","logo":"proeX.png?v=1592986577","url":"https:\/\/www.proex.io\/"},{"id":"hypex","logo":"hypex.png","url":"https:\/\/www.hpx.world"},{"id":"dragonex","logo":"dragonex.png","url":"https:\/\/www.dragonex.in\/"},{"id":"btcbox","logo":"btcbox.png","url":"https:\/\/www.btcbox.co.jp\/"},{"id":"aemex","logo":"aemex.png?v=1595581243","url":"https:\/\/www.senbit.com\/"},{"id":"zone","logo":"zone.png?v=1606126431","url":"https:\/\/www.zone-coin.com"},{"id":"cdae","logo":"cdae.png","url":"https:\/\/www.bzex.me"},{"id":"goldex","logo":"goldex.png","url":"https:\/\/www.goldex.cc\/"},{"id":"awd","logo":"awd.png?v=1596695420","url":"https:\/\/www.bitone.one\/"},{"id":"bcex","logo":"bcex.png","url":"https:\/\/www.bcex.hk"},{"id":"99ex","logo":"99ex.png","url":"https:\/\/www.9ex.vip\/"},{"id":"up","logo":"up.png","url":"https:\/\/www.up.top\/"},{"id":"saex","logo":"1583391892233_200.png?v=1583392301","url":"https:\/\/www.saex.io\/"},{"id":"hotbi","logo":"hotbi.png","url":"https:\/\/hotbi.io\/"},{"id":"bitzon","logo":"bitzon.png","url":"https:\/\/www.bitzon.com\/"},{"id":"hubi","logo":"hubi.png","url":"https:\/\/www.hubi.com\/"},{"id":"huahuo","logo":"huahuo.png?v=1597202030","url":"http:\/\/huahuolab.com\/"},{"id":"bizex","logo":"bizex.png?v=1599534179","url":"http:\/\/www.bizex.cc\/"},{"id":"vbit","logo":"vbit.png?v=1588064663","url":"https:\/\/www.vbit.me\/"},{"id":"instantex","logo":"instantex_200.png?v=1574042411","url":"https:\/\/www.zoooo.io\/"},{"id":"ubay","logo":"ubay.png","url":"https:\/\/www.ubay.bz\/"},{"id":"bma","logo":"bma.png?v=1586844392","url":"https:\/\/s4.bmaclub.com\/"},{"id":"gaea","logo":"gaea_200.png?v=1574216044","url":"https:\/\/www.gmex.io"},{"id":"bitmc","logo":"bitmc.png?v=1605597824","url":"https:\/\/www.bit-mc.com\/"},{"id":"beeex","logo":"beeex.png","url":"https:\/\/www.beeex.com\/"},{"id":"upupex","logo":"1584597848004_200.png?v=1584598706","url":"https:\/\/www.upupex.com\/"},{"id":"tab","logo":"1572316516571_200.png?v=1581901493","url":"https:\/\/www.tac.top\/"},{"id":"tsc","logo":"tsc.png?v=1591860755","url":"https:\/\/www.coinlead.cc\/"},{"id":"chicago","logo":"chicago.png?v=1600065065","url":"https:\/\/www.chicagobit.cc\/"},{"id":"wenx","logo":"wenx.png?v=1590743688","url":"https:\/\/www.wenxpro.com\/"},{"id":"hydax","logo":"hydax.png","url":"https:\/\/www.hydax.com\/"},{"id":"bitepro","logo":"bitepro.png?v=1595318063","url":"http:\/\/www.bitepro.cn\/"},{"id":"allcoin","logo":"allcoin.png?v=1602210916","url":"https:\/\/www.ukex.co"},{"id":"fchain","logo":"fchain.png?v=1597650712","url":"https:\/\/www.fchain.one\/"},{"id":"blex","logo":"blex.png?v=1604564487","url":"https:\/\/www.bilanex.com"},{"id":"bimin","logo":"1571217766053_200.png?v=1571989802","url":"https:\/\/www.bimin.co\/"},{"id":"exshell","logo":"exshell_200.png?v=1574754772","url":"https:\/\/www.nvex.io\/"},{"id":"crius","logo":"crius.png","url":"https:\/\/www.crius.plus"},{"id":"bbex","logo":"bbex.png","url":"https:\/\/www.bb.exchange\/"},{"id":"pcm","logo":"pcm.png?v=1600841165","url":"https:\/\/www.pcbitpro.com"},{"id":"nutex","logo":"nutex.png","url":"https:\/\/www.nutex.io"},{"id":"manhattan","logo":"manhattan.png?v=1600064097","url":"http:\/\/www.mhdbit.com\/"},{"id":"btc100pro","logo":"btc100pro.png?v=1589190119","url":"https:\/\/www.btc100.pro\/"},{"id":"bafeex","logo":"bafeex_200.png?v=1572840086","url":"https:\/\/www.bafeex.io\/"},{"id":"emex","logo":"emex.png","url":"https:\/\/www.emex.cc\/"},{"id":"58coin","logo":"58coin.png","url":"https:\/\/www.58ex.com\/"},{"id":"nstarex","logo":"nstarex.png?v=1588065469","url":"https:\/\/nstarex.com\/"},{"id":"ame","logo":"ame.png?v=1604027903","url":"https:\/\/www.ame.kim"},{"id":"ix","logo":"ix.png","url":"https:\/\/ix.com\/"},{"id":"snapex","logo":"snapex.png","url":"https:\/\/www.snapex.com\/"},{"id":"antcoin","logo":"1572243706114_200.png?v=1574920844","url":"https:\/\/www.antcoin.pro\/"},{"id":"coinka","logo":"1571210121761_200.png?v=1572691387","url":"https:\/\/www.coinka.me"},{"id":"ko","logo":"ko.png?v=1601014398","url":"https:\/\/www.kozf.com\/"},{"id":"btcbl","logo":"btcbl_200.png?v=1579676692","url":"https:\/\/www.redapple.tv\/"},{"id":"tmux","logo":"tmux.png?v=1597217489","url":"http:\/\/coindance.vip"},{"id":"coinber","logo":"coinber.png?v=1603433975","url":"https:\/\/newbit.online"},{"id":"xhex","logo":"xhex.png?v=1604544720","url":"https:\/\/www.xhex.vip"},{"id":"bioex","logo":"bioex.png?v=1601001101","url":"http:\/\/www.xecoin.cc\/"},{"id":"royalcoin","logo":"royalcoin.png","url":"https:\/\/www.royalcoin.pro\/"},{"id":"wbex","logo":"wbex.png?v=1596164190","url":"http:\/\/www.wbex.vip\/"},{"id":"bocoin","logo":"bocoin.png?v=1600153379","url":"https:\/\/www.kbcoin.top\/"},{"id":"batcoin","logo":"batcoin.png?v=1603681849","url":"https:\/\/www.batcoin.top\/"},{"id":"exbank","logo":"exbank.png?v=1604653241","url":"https:\/\/www.dbosex.com"},{"id":"bhbank","logo":"bhbank.png?v=1594007286","url":"http:\/\/bhbex.info"},{"id":"coineal","logo":"coineal.png","url":"https:\/\/www.coineal.com\/"},{"id":"9coinexchange","logo":"9coinexchange.png","url":"https:\/\/www.9coin.com"},{"id":"aacoin","logo":"aacoin.png","url":"http:\/\/www.aacoin.com\/"}],
            accList: [],
            param: {
                type: '',
                pagesize: 20,
                page: 0
            },
            loadStatus: true,
            isPost: true,
            isSend: true,
            loc_lg:Cookies.get('lang') ? Cookies.get('lang') : 'en',
            recode: '',
            statusNum:'',
            questions:[],
        },
        mounted() {
            this.homeList();
            this.questionsd();




            fetch(this.urlApi+'/api/user_address?_tm=' + Date.now()).then(res => res.json()).then(res => {
                if (res.code == 200) {
                    this.contract = res.data.total;
                    this.contract.AdrsList = res.data.address.data;
                    const _this = this;
                    setInterval(() => {
                        if (!_this.isSend) return;
                        _this.isSend = false;
                        fetch(this.urlApi+'/api/user_address?_tm=' + Date.now()).then(res => res.json()).then(res => {
                            _this.isSend = true;
                            if (res.code == 200) {
                                _this.contract = res.data.total;
                                _this.contract.AdrsList = res.data.address.data;
                            }
                        });
                    }, 5000);
                }
            });
            let lang = comm.getUrlKey('lang', window.location.href);
            if (lang) {
                this.lang(lang);
            }else{
                this.loc_lg=i18n.locale;
            }
            let _hef = window.location.href;
            let code = comm.getUrlKey('invite_code',_hef);
            const reg = /^(T)?[0-9a-zA-Z]{33}$/;
            if (reg.test(code)) {
                this.trxAmount = '';
                this.recode = code;
            }
        }, filters: {
            oStatus(st) {
                return st==-1? i18n.t('message.oFail') : i18n.t('message.oStatus')[st];
            },
            formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
                if (!date) return '---';
                if (typeof (date) === 'number') {
                    date = new Date(date * 1000)
                }
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                return fmt
            }
        },
        watch: {
            'contract.circulation'() {
                if (!odometer) {
                    odometer = new Odometer({
                        el: this.$refs.odometer,
                        format: 'd,ddd,ddd',
                        theme: 'digital'
                    });
                }
                console.log(this.contract.circulation)
                odometer.update(parseInt(this.contract.circulation));
            }
        },
        methods: {
            questionsd(){
                this.get(this.urlApi+'/api/questions?lang='+this.loc_lg).then(res => {
                    if (res.code == 200) {
                        this.questions = res.data;
                    }
                });
            },
            homeList(){
                this.get(this.urlApi+'/api/home',{recode: this.recode}).then(res => {
                    if (res.code == 200) {
                        this.addressList = res.data.address;
                        this.selectDay = res.data.financials[0].cycle;
                        this.statusNum = res.data.financials[0].statusNum;
                        this.cirReturn = (res.data.financials[0].rate*100).toFixed(2);
                        this.financials = res.data.financials;
                        this.totalconten = res.data.total;
                        this.orders = res.data.orders;
                        if(res.data.personal){
                            this.personal = res.data.personal;  //个人数据
                        }
                        if(res.data.share_plan){
                            this.share_plan = res.data.share_plan;    // 九环分享计划
                        }
                        if(res.data.userFromSumGroups){
                            this.userFromSumGroups = res.data.userFromSumGroups;    //節點地址
                        }

                        if(this.financials[0].rechargeAddress !=null){
                            this.setQRtext(this.financials[0].rechargeAddress.address);
                            this.expiredate = this.financials[0].rechargeAddress.expire_date;
                        }

                    }
                });
            },
            toggle: function (item) {
                this.questions.forEach((v) => {
                  if (item.title === v.title) {
                  } else {
                    v.choose = false;
                  }
                });
                if (this.types != 'share') {
                  item.choose = !item.choose;
                  this.$forceUpdate()
                }
              },
            signOut() {
                this.trxAmount = '';
                Cookies.remove('RTrx');
                Cookies.remove('RTrxToken');
                window.location.reload();
            },
            showTeams(i, title) {
                this.curTitle = title;
                this.tab = 'tissue';         
                this.get(this.urlApi+'/api/settlement/subUser?lv='+i).then(res => {
                    if (res.code == 200) {
                        this.curTeamlist = res.data;
                    } else {
                        this.notice(i18n.t('message.msg.' + res.msg));
                    }
                });
            },
            setQRtext(text) {
                console.log(text)
                    jQuery('#qrcode').empty();
                    this.qrcodeText = text;
                    jQuery('#qrcode').qrcode({
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: text
                    });
            },

            setQRtextS(text) {
                    if(text){
                        jQuery('#qrcode').empty();
                        this.qrcodeText = text.address;
                        jQuery('#qrcode').qrcode({
                            render: "canvas",
                            width: 200,
                            height: 200,
                            text: text.address
                        });
                    }

            },
            prizeLog(title, type = 2) {

                this.curTitle = title;
                this.param.type = type;
                this.acclogs();
                this.tab = 'hashOrder';
            },
            acclogs() {
                if (!this.isPost) return;
                this.isPost = false;
                let _this = this;
                this.get(this.urlApi+'/api/financial_order',{recode: this.recode}).then(res => {
                    this.isPost = true;
                    if (res.code == 200) {
                        _this.accList = res.data;
                    } else {
                        this.notice(i18n.t('message.msg.' + res.msg));
                    }
                });
            },
            lang(lg) {
                this.langShow=false;
                i18n.locale = lg;
                Cookies.set('lang', lg);
                this.loc_lg=lg;
                this.questionsd();

            },
            login() {
                var val = this.trxAmount;
                const reg = /^(T)?[0-9a-zA-Z]{33}$/;
                if (reg.test(val)) {
                    if (!this.isPost) return;
                    this.isPost = false;
                    this.post(this.urlApi+'/api/auth/login', {address: val, recode: this.recode}).then(res => {
                        // debugger;
                        this.isPost = true;
                        setTimeout(function() {
                            comm.isLoadOk=true
                        }, 800);
                        if (res.code == 200) {
                            Cookies.set('RTrxToken', res.data.access_token);
                            Cookies.set('RTrx', val);
                            this.trxAmount = '';
                            window.location.reload();
                        } else if (res.code == 400) {
                            this.notice(i18n.t('message.loginTip1'),'4caf50');
                        } else if (res.code == 401) {
                            this.notice(i18n.t('message.loginTip2'),'4caf50');
                        }
                    });
                } else {
                    this.notice(i18n.t('message.trcErrTip'));
                }
            },
            isLogin() {
                return Cookies.get('RTrxToken') ? true : false;
            },
            post(url, postData) {
                return new Promise((resolve, reject) => {
                    postData._tm = Date.now();
                    axios.post(url, postData, {
                        headers: {
                            'Authorization':Cookies.get('RTrxToken') ? 'Bearer '+Cookies.get('RTrxToken') : '',
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(res => {
                        resolve(res.data);
                    }).catch(err => {
                        reject(err.data);
                    });
                });
            },
            get(url) {
                return new Promise((resolve, reject) => {
                    axios.get(url, {
                            headers: {
                                'Authorization':Cookies.get('RTrxToken') ? 'Bearer '+Cookies.get('RTrxToken') : '',
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(function (res) {
                            resolve(res.data);
                        }).catch(function (error) {
                            reject(err.data);
                        });
                });
            },
            safe(val) {
                return this.tron.account ? (typeof (val) === 'number' ? parseFloat(val) : val) : '---';
            },
            notice(msg, color = '007eff', time = 3000) {
                return new Promise((resolve, reject) => {
                    let wrap = $('<div style="box-sizing:border-box; position:fixed; left:calc(50% - 160px); box-shadow:0 5px 25px rgba(0,0,0,0.2); width:320px; top:40px; background:#' + (color ? color : '007eff') + '; border-radius:10px; color:#fff; padding:20px 20px; text-transform:none; font:16px/1.2 Tahoma, sans-serif; cursor:pointer; z-index:999999; text-align:center;">' + msg + '</div>')
                        .on('click', () => {
                            wrap.remove();
                            resolve();
                        })
                        .appendTo('body');
                    if (time > 0) setTimeout(() => {
                        wrap.remove();
                    }, time);
                });
            },
            copyText(value) {
                let s = document.createElement('input');
                s.value = value;
                document.body.appendChild(s);
                if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    s.contentEditable = true;
                    s.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(s);
                    let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    s.setSelectionRange(0, 999999);
                }
                else s.select();
                try {
                    document.execCommand('copy');
                    this.notice('Copied!', '4caf50');
                }
                catch (err) {
                    this.notice('Copy error', 'e53935');
                }
                s.remove();
            }
        }
    });
})();