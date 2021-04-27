let currentTabId;
let currentWinId;
let wechatTabId;
let wechatWinId;
let previousTab;
let previousWin;

function onError(e) {
    console.log("***Error: " + e);
};

function setButtonIcon(imageURL) {
    try {
        browser.browserAction.setIcon({ path: imageURL });
    } catch (e) {
        onError(e);
    }
};

function createPinnedTab() {
    browser.tabs.create(
        {
            url: "https://wx.qq.com",
            pinned: true,
            active: true
        }
    )
};

function handleSearch(wechatTabs) {
    //console.log("currentTabId: " + currentTabId);
    //console.log("currentWinId: " + currentWinId);
    if (wechatTabs.length > 0) {
        //console.log("there is a wechat tab");
        wechatTabId = wechatTabs[0].id;
        wechatWinId = wechatTabs[0].windowId;
        if (wechatTabId === currentTabId) {
            //console.log("I'm in the wechat tab");
            browser.windows.update(previousWin, { focused: true })
            browser.tabs.update(previousTab, { active: true, });
        } else {
            //console.log("I'm NOT in the wechat tab");
            previousTab = currentTabId;
            previousWin = currentWinId;
            browser.windows.update(wechatWinId, { focused: true, });
            browser.tabs.update(wechatTabId, { active: true, });
        }
        setButtonIcon(wechatTabs[0].favIconUrl);
    } else {
        //console.log("there is NO wechat tab");
        previousTab = currentTabId;
        createPinnedTab();
    }
};

function handleClick(tab) {
    //console.log("*********Button clicked*********");
    currentTabId = tab.id;
    currentWinId = tab.windowId;
    var querying = browser.tabs.query({ url: "*://wx.qq.com/*" });
    querying.then(handleSearch, onError);
};

function update(details) {
    if (details.reason === "install" || details.reason === "update") {
        browser.runtime.openOptionsPage();
    }
};

browser.browserAction.onClicked.addListener(handleClick);
browser.runtime.onInstalled.addListener(update)